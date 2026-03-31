import { db } from './firebase';
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';

/**
 * Validates a student code and links it to the user
 */
export const redeemCode = async (userId: string, codeString: string) => {
  try {
    const q = query(
      collection(db, 'student_codes'), 
      where('code', '==', codeString),
      where('isUsed', '==', false)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('الكود غير صالح أو تم استخدامه مسبقاً');
    }
    
    const codeDoc = querySnapshot.docs[0];
    const codeData = codeDoc.data();
    
    // Mark code as used
    await updateDoc(doc(db, 'student_codes', codeDoc.id), {
      isUsed: true,
      usedBy: userId,
      usedAt: serverTimestamp()
    });
    
    // Update user status/access (example: give access to all courses or specific ones)
    await updateDoc(doc(db, 'users', userId), {
      hasAccess: true,
      subscriptionDate: serverTimestamp()
    });
    
    return { success: true, message: 'تم تفعيل الكود بنجاح' };
  } catch (error: any) {
    console.error('Redeem error:', error);
    throw error;
  }
};

/**
 * Checks if user is authorized as admin based on role and optional session key
 */
export const verifyAdminSession = async (uid: string) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  return userDoc.exists() && userDoc.data().role === 'admin';
};