import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

interface AuthProps {
  mode: 'login' | 'register';
}

const Auth: React.FC<AuthProps> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('تم تسجيل الدخول بنجاح');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          role: 'student',
          createdAt: new Date().toISOString(),
          progress: []
        });
        toast.success('تم إنشاء الحساب بنجاح');
      }
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </CardTitle>
          <CardDescription>
            {mode === 'login' 
              ? 'أهلاً بك مجدداً في منصة مستر حبيب' 
              : 'انضم إلينا وابدأ رحلة التعلم اليوم'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">الاسم بالكامل</Label>
                <Input 
                  id="name" 
                  placeholder="محمد أحمد" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-6" type="submit" disabled={loading}>
              {loading ? 'جاري التحميل...' : (mode === 'login' ? 'دخول' : 'تسجيل')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
            <Link 
              to={mode === 'login' ? '/register' : '/login'} 
              className="text-blue-600 hover:underline mr-1"
            >
              {mode === 'login' ? 'سجل الآن' : 'سجل دخولك'}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;