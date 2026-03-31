import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  Trophy, 
  ArrowLeft, 
  Key, 
  CheckCircle, 
  AlertCircle,
  Zap,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { redeemCode } from '../lib/student-utils';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [recentLessons, setRecentLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeemInput, setRedeemInput] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        const coursesRef = collection(db, 'courses');
        const q = query(coursesRef);
        const snapshot = await getDocs(q);
        setRecentLessons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !redeemInput) return;
    
    setIsRedeeming(true);
    try {
      const result = await redeemCode(currentUser.uid, redeemInput.trim());
      toast.success(result.message);
      setRedeemInput('');
      // Refresh user data
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      setUserData(userDoc.data());
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء تفعيل الكود');
    } finally {
      setIsRedeeming(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-slate-500 animate-pulse">جاري تحميل بياناتك...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20" dir="rtl">
      {/* Top Banner / Hero */}
      <div className="bg-blue-600 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center gap-8 text-white"
          >
            <div className="space-y-4 text-center md:text-right">
              <h1 className="text-4xl md:text-5xl font-black">مرحباً بك، {userData?.name || 'طالبنا العزيز'}! 👋</h1>
              <p className="text-blue-100 text-lg md:text-xl font-medium">سعيدون برؤيتك مرة أخرى. هل أنت مستعد للتعلم اليوم؟</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                 <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/10">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>المستوى: ذهبي</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/10">
                    <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span>النقاط: 2,450</span>
                 </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl text-slate-800 w-full max-w-sm border-b-8 border-slate-100">
               <form onSubmit={handleRedeemCode} className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Key size={20} /></div>
                    <h3 className="font-black text-lg">تفعيل كود الاشتراك</h3>
                  </div>
                  <div className="relative">
                    <Input 
                      placeholder="أدخل كود الاشتراك هنا..." 
                      className="h-14 rounded-2xl bg-slate-50 border-slate-100 pr-4 pl-4 font-mono font-bold text-center"
                      value={redeemInput}
                      onChange={(e) => setRedeemInput(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isRedeeming}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg shadow-blue-100"
                  >
                    {isRedeeming ? 'جاري التفعيل...' : 'تفعيل الكود الآن'}
                  </Button>
               </form>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-12 max-w-7xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Dashboard Stats & Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'الدروس المنجزة', value: '18 / 24', progress: 75, icon: <BookOpen />, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'ساعات المذاكرة', value: '52 ساعة', label: '+4 هذا الأسبوع', icon: <Clock />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { title: 'نقاط التفوق', value: '2,450', label: 'ترتيبك: #15', icon: <Trophy />, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((stat, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                >
                  <Card className="border-none shadow-sm hover:shadow-md transition-all bg-white overflow-hidden group">
                    <div className={`h-1 w-full ${stat.color.replace('text', 'bg')}`} />
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-xs font-black text-slate-400">{stat.title}</CardTitle>
                      <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                        {React.cloneElement(stat.icon as any, { size: 16 })}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                      {stat.progress !== undefined ? (
                        <Progress value={stat.progress} className="mt-3 h-1.5" />
                      ) : (
                        <div className="text-[10px] font-black text-emerald-500 mt-2 bg-emerald-50 w-fit px-2 py-0.5 rounded-md">{stat.label}</div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100"><LayoutDashboard className="text-blue-600" size={20} /></div>
                  متابعة التعلم
                </h2>
                <Link to="/courses" className="text-sm font-bold text-blue-600 hover:underline">مشاهدة كل الدورات</Link>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {recentLessons.length > 0 ? recentLessons.map((course, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    key={course.id}
                  >
                    <Card className="hover:shadow-xl transition-all group cursor-pointer border-none shadow-sm bg-white overflow-hidden rounded-[2rem]">
                      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6 w-full sm:w-auto">
                          <div className="w-24 h-24 rounded-3xl bg-slate-50 overflow-hidden flex-shrink-0 shadow-inner group-hover:rotate-3 transition-transform duration-500">
                            <img 
                              src={course.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop"} 
                              className="w-full h-full object-cover" 
                              alt="" 
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase">{course.level}</span>
                              {i === 0 && <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-black rounded-lg">آخر مشاهدة</span>}
                            </div>
                            <h4 className="font-black text-xl text-slate-800 group-hover:text-blue-600 transition-colors">{course.title}</h4>
                            <p className="text-slate-400 text-xs font-bold">تاريخ البدء: {new Date().toLocaleDateString('ar-EG')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-50">
                          <div className="hidden sm:block text-left">
                            <p className="text-xs font-black text-slate-400 mb-1">مدى التقدم</p>
                            <div className="flex items-center gap-3">
                              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: i === 0 ? '85%' : i === 1 ? '42%' : '15%' }}></div>
                              </div>
                              <span className="text-sm font-black text-slate-700">{i === 0 ? '85%' : i === 1 ? '42%' : '15%'}</span>
                            </div>
                          </div>
                          <Link to={`/lesson/${course.id}`} className="mr-auto sm:mr-0">
                            <Button className="w-12 h-12 rounded-2xl bg-slate-900 hover:bg-blue-600 group-hover:scale-110 transition-all p-0 shadow-lg">
                              <ArrowLeft className="w-5 h-5 text-white" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )) : (
                  <Card className="p-12 text-center bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                     <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                       <BookOpen className="text-slate-300" size={40} />
                     </div>
                     <h3 className="text-xl font-bold text-slate-800 mb-2">لا توجد دورات مسجلة حالياً</h3>
                     <p className="text-slate-500 mb-6">ابدأ رحلتك التعليمية الآن وتصفح قائمة الدورات المتاحة.</p>
                     <Link to="/courses">
                        <Button className="bg-blue-600 rounded-xl h-12 px-8 font-black">استكشاف الدورات</Button>
                     </Link>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
             <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden sticky top-32">
                <div className="h-32 bg-slate-800 relative">
                   <div className="absolute -bottom-12 right-1/2 translate-x-1/2 w-24 h-24 rounded-3xl bg-white p-1.5 shadow-xl rotate-3">
                      <div className="w-full h-full rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black">
                        {userData?.name?.[0] || 'S'}
                      </div>
                   </div>
                </div>
                <CardContent className="pt-16 pb-8 text-center px-8">
                   <div className="space-y-1 mb-6">
                     <h3 className="text-2xl font-black text-slate-800">{userData?.name || 'طالب المنصة'}</h3>
                     <p className="text-slate-400 font-bold text-sm">{userData?.email}</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-50 p-4 rounded-3xl">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">المرحلة</p>
                        <p className="font-bold text-slate-800">{userData?.level || 'لم يحدد'}</p>
                      </div>
                      <div className="border-r border-slate-200">
                        <p className="text-[10px] font-black text-slate-400 uppercase">العضوية</p>
                        <p className="font-bold text-emerald-600">{userData?.hasAccess ? 'نشطة' : 'مجانية'}</p>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <Button className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl border-none shadow-none">تعديل البيانات</Button>
                      <Button variant="ghost" className="w-full h-12 text-rose-500 hover:bg-rose-50 font-bold rounded-2xl">تسجيل الخروج</Button>
                   </div>
                </CardContent>
             </Card>

             <Card className="border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                   <CardTitle className="text-lg font-black flex items-center gap-2">
                      <AlertCircle className="text-orange-500" size={20} />
                      تنبيهات المنصة
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4">
                   {[
                     { title: 'امتحان الفيزياء القادم', time: 'غداً الساعة 6 مساءً', icon: <Clock />, color: 'orange' },
                     { title: 'تم تفعيل حسابك بنجاح', time: 'منذ ساعتين', icon: <CheckCircle />, color: 'emerald' },
                     { title: 'تنبيه أمني: دخول جديد', time: 'منذ يوم', icon: <ShieldCheck />, color: 'blue' },
                   ].map((notif, i) => (
                     <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className={`p-2 rounded-xl bg-${notif.color}-50 text-${notif.color}-600 h-fit`}>
                           {React.cloneElement(notif.icon as any, { size: 16 })}
                        </div>
                        <div>
                           <p className="text-sm font-black text-slate-800">{notif.title}</p>
                           <p className="text-[10px] font-bold text-slate-400">{notif.time}</p>
                        </div>
                     </div>
                   ))}
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;