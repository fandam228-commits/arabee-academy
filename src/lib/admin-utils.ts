import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { nanoid } from 'nanoid';

export interface StudentCode {
  id?: string;
  code: string;
  isUsed: boolean;
  usedBy?: string;
  createdAt: any;
  expiresAt?: any;
}

/**
 * Generates a unique student code
 */
export const generateStudentCode = async (prefix: string = 'MRH-') => {
  const code = `${prefix}${nanoid(6).toUpperCase()}`;
  
  try {
    const codeRef = doc(collection(db, 'student_codes'));
    await setDoc(codeRef, {
      code,
      isUsed: false,
      createdAt: serverTimestamp(),
    });
    return code;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};

/**
 * Fetches all generated codes
 */
export const getStudentCodes = async () => {
  try {
    const q = query(collection(db, 'student_codes'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as StudentCode[];
  } catch (error) {
    console.error('Error fetching codes:', error);
    return [];
  }
};

/**
 * Deletes a code
 */
export const deleteStudentCode = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'student_codes', id));
  } catch (error) {
    console.error('Error deleting code:', error);
    throw error;
  }
};