import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  Users, 
  LogOut, 
  CheckCircle2, 
  Key, 
  ShieldCheck, 
  Zap, 
  FileText, 
  Download, 
  Search,
  Settings,
  AlertCircle,
  Clock,
  ExternalLink,
  Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStudentCode, getStudentCodes, deleteStudentCode, StudentCode } from '../lib/admin-utils';

const Admin = () => {
  const { isAdmin } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [studentCodes, setStudentCodes] = useState<StudentCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'lessons' | 'users' | 'codes' | 'settings'>('overview');

  // Course Form
  const [courseTitle, setCourseTitle] = useState('');
  const [courseLevel, setCourseLevel] = useState('1st Prep');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseImage, setCourseImage] = useState('');

  // Lesson Form
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonVideo, setLessonVideo] = useState('');
  const [lessonPdf, setLessonPdf] = useState('');
  const [lessonContent, setLessonContent] = useState('');

  // Code Generation State
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    }
  }, [isAuthorized]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const coursesSnap = await getDocs(collection(db, 'courses'));
      const coursesData = coursesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesData);

      const lessonsSnap = await getDocs(collection(db, 'lessons'));
      const lessonsData = lessonsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLessons(lessonsData);

      const codes = await getStudentCodes();
      setStudentCodes(codes);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('حدث خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified password check for demo - in production, this should be more robust
    if (adminPassword === 'admin2025') {
      setIsAuthorized(true);
      toast.success('تم المصادقة بنجاح');
    } else {
      toast.error('كلمة المرور غير صحيحة');
    }
  };

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      await generateStudentCode();
      const codes = await getStudentCodes();
      setStudentCodes(codes);
      toast.success('تم توليد الكود بنجاح');
    } catch (error) {
      toast.error('خطأ في توليد الكود');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteCode = async (id: string) => {
    try {
      await deleteStudentCode(id);
      setStudentCodes(prev => prev.filter(c => c.id !== id));
      toast.success('تم حذف الكود');
    } catch (error) {
      toast.error('خطأ في الحذف');
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'courses'), {
        title: courseTitle,
        level: courseLevel,
        description: courseDesc,
        image: courseImage || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop',
        createdAt: serverTimestamp(),
      });
      toast.success('تمت إضافة الدورة بنجاح');
      setCourseTitle('');
      setCourseDesc('');
      fetchData();
    } catch (error) {
      toast.error('خطأ في إضافة الدورة');
    }
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return toast.error('اختر دورة أولاً');
    try {
      await addDoc(collection(db, 'lessons'), {
        courseId: selectedCourseId,
        title: lessonTitle,
        videoUrl: lessonVideo,
        pdfUrl: lessonPdf,
        content: lessonContent,
        createdAt: serverTimestamp(),
      });
      toast.success('تمت إضافة الدرس بنجاح');
      setLessonTitle('');
      setLessonVideo('');
      setLessonPdf('');
      setLessonContent('');
      fetchData();
    } catch (error) {
      toast.error('خطأ في إضافة الدرس');
    }
  };

  const deleteItem = async (type: 'courses' | 'lessons', id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteDoc(doc(db, type, id));
      toast.success('تم الحذف بنجاح');
      fetchData();
    } catch (error) {
      toast.error('خطأ في الحذف');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="border-none shadow-2xl bg-white overflow-hidden">
            <div className="h-2 bg-blue-600 w-full" />
            <CardHeader className="text-center pt-10">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={40} />
              </div>
              <CardTitle className="text-3xl font-black">الدخول للمسؤولين</CardTitle>
              <CardDescription className="text-lg">يرجى إدخال كلمة مرور الإدارة للمتابعة</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-12">
              <form onSubmit={handleAdminAuth} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-bold">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input 
                      type="password" 
                      className="h-14 pr-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all rounded-2xl group">
                  <span>فتح اللوحة</span>
                  <Zap className="mr-2 w-5 h-5 group-hover:fill-current" />
                </Button>
              </form>
            </CardContent>
          </Card>
          <p className="text-center mt-8 text-gray-500 text-sm">
            &copy; 2025 منصة مستر حبيب التعليمية. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans" dir="rtl">
      {/* Sidebar Sidebar UI */}
      <motion.aside 
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        className="w-72 bg-white border-l border-slate-200 flex flex-col shadow-xl z-20"
      >
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl">H</div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">لوحة التحكم</h2>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', name: 'الرئيسية', icon: <LayoutDashboard /> },
            { id: 'courses', name: 'إدارة الدورات', icon: <BookOpen /> },
            { id: 'lessons', name: 'إدارة الدروس', icon: <Layers /> },
            { id: 'users', name: 'إدارة الطلاب', icon: <Users /> },
            { id: 'codes', name: 'أكواد الاشتراك', icon: <Key /> },
            { id: 'settings', name: 'إعدادات النظام', icon: <Settings /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              {React.cloneElement(tab.icon as any, { className: 'w-5 h-5' })}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-4 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-2xl font-bold h-12" 
            onClick={() => window.location.href = '/'}
          >
            <LogOut className="w-5 h-5" />
            <span>خروج للمنصة</span>
          </Button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-slate-800">
              {activeTab === 'overview' && 'نظرة عامة على النظام'}
              {activeTab === 'courses' && 'إدارة الدورات التعليمية'}
              {activeTab === 'lessons' && 'المحتوى التعليمي والدروس'}
              {activeTab === 'users' && 'سجل الطلاب والنشاط'}
              {activeTab === 'codes' && 'نظام توليد الأكواد'}
              {activeTab === 'settings' && 'إعدادات المنصة المتقدمة'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="بحث..." className="w-64 pr-10 bg-slate-50 border-none rounded-xl" />
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" />
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-grow p-10 overflow-y-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div 
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-none shadow-sm bg-white p-6 hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform"><BookOpen className="w-6 h-6" /></div>
                        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
                      </div>
                      <h3 className="text-slate-500 font-bold text-sm">إجمالي الدورات</h3>
                      <p className="text-3xl font-black text-slate-800">{courses.length}</p>
                    </Card>
                    <Card className="border-none shadow-sm bg-white p-6 hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform"><Layers className="w-6 h-6" /></div>
                        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+5%</span>
                      </div>
                      <h3 className="text-slate-500 font-bold text-sm">إجمالي الدروس</h3>
                      <p className="text-3xl font-black text-slate-800">{lessons.length}</p>
                    </Card>
                    <Card className="border-none shadow-sm bg-white p-6 hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform"><Users className="w-6 h-6" /></div>
                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">جديد</span>
                      </div>
                      <h3 className="text-slate-500 font-bold text-sm">إجمالي الطلاب</h3>
                      <p className="text-3xl font-black text-slate-800">1,482</p>
                    </Card>
                    <Card className="border-none shadow-sm bg-white p-6 hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:scale-110 transition-transform"><Key className="w-6 h-6" /></div>
                        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">{studentCodes.filter(c => !c.isUsed).length} متبقي</span>
                      </div>
                      <h3 className="text-slate-500 font-bold text-sm">الأكواد النشطة</h3>
                      <p className="text-3xl font-black text-slate-800">{studentCodes.length}</p>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
                      <CardHeader className="border-b border-slate-50 pb-6">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-black">آخر الدورات المضافة</CardTitle>
                          <Button variant="outline" size="sm" className="rounded-xl">مشاهدة الكل</Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        {courses.slice(0, 5).map(c => (
                          <div key={c.id} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                            <div className="flex items-center gap-4">
                              <img src={c.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                              <div>
                                <p className="font-black text-slate-800">{c.title}</p>
                                <p className="text-xs text-slate-500 font-bold">{c.level}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-400">نشط</span>
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
                      <CardHeader className="border-b border-slate-50 pb-6">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-black">سجل الأكواد الأخير</CardTitle>
                          <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setActiveTab('codes')}>توليد كود</Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        {studentCodes.slice(0, 5).map(code => (
                          <div key={code.id} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${code.isUsed ? 'bg-slate-200' : 'bg-blue-100 text-blue-600'}`}>
                                <Key className="w-4 h-4" />
                              </div>
                              <code className="font-mono font-bold text-slate-700">{code.code}</code>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${code.isUsed ? 'bg-slate-200 text-slate-500' : 'bg-green-100 text-green-700'}`}>
                              {code.isUsed ? 'مستخدم' : 'متاح'}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {activeTab === 'codes' && (
                <motion.div 
                  key="codes"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <Card className="border-none shadow-md bg-white rounded-3xl overflow-hidden">
                    <CardHeader className="bg-blue-600 text-white p-10">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                          <CardTitle className="text-3xl font-black mb-2">نظام الأكواد الذكي</CardTitle>
                          <CardDescription className="text-blue-100 text-lg">قم بتوليد أكواد اشتراك فريدة لطلابك لتفعيل المحتوى المدفوع.</CardDescription>
                        </div>
                        <Button 
                          onClick={handleGenerateCode} 
                          disabled={isGenerating}
                          className="bg-white text-blue-600 hover:bg-blue-50 h-16 px-10 rounded-2xl font-black text-lg shadow-xl"
                        >
                          {isGenerating ? 'جاري التوليد...' : 'توليد كود جديد'}
                          <Plus className="mr-2" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-800">قائمة الأكواد المولدة ({studentCodes.length})</h3>
                        <div className="flex gap-2">
                           <Button variant="outline" className="rounded-xl gap-2 font-bold text-slate-600">
                             <Download size={18} />
                             تصدير الأكواد
                           </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studentCodes.map((code) => (
                          <motion.div 
                            layout
                            key={code.id} 
                            className="group relative p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className={`p-3 rounded-2xl ${code.isUsed ? 'bg-slate-200' : 'bg-blue-100 text-blue-600'}`}>
                                <Key className="w-5 h-5" />
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                                onClick={() => code.id && handleDeleteCode(code.id)}
                              >
                                <Trash2 size={18} />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">كود التفعيل</p>
                              <p className="text-2xl font-mono font-black text-slate-800">{code.code}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                              <span className={`flex items-center gap-2 text-xs font-bold ${code.isUsed ? 'text-slate-400' : 'text-emerald-600'}`}>
                                <div className={`w-2 h-2 rounded-full ${code.isUsed ? 'bg-slate-300' : 'bg-emerald-500 animate-pulse'}`} />
                                {code.isUsed ? 'تم الاستخدام' : 'جاهز للاستخدام'}
                              </span>
                              <Button variant="ghost" size="sm" className="text-blue-600 font-bold text-xs" onClick={() => {
                                navigator.clipboard.writeText(code.code);
                                toast.success('تم نسخ الكود');
                              }}>نسخ</Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'courses' && (
                <motion.div 
                   key="courses"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                >
                  <div className="lg:col-span-4">
                    <Card className="border-none shadow-lg bg-white sticky top-28 rounded-3xl overflow-hidden">
                      <div className="bg-slate-800 p-6 text-white">
                        <CardTitle className="flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          إضافة دورة جديدة
                        </CardTitle>
                      </div>
                      <CardContent className="p-8">
                        <form onSubmit={handleAddCourse} className="space-y-6">
                          <div className="space-y-2">
                            <Label className="font-bold">عنوان الدورة</Label>
                            <Input className="h-12 rounded-xl" value={courseTitle} onChange={e => setCourseTitle(e.target.value)} placeholder="مثال: فيزياء الصف الثالث الثانوي" required />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-bold">المرحلة الدراسية</Label>
                            <select className="w-full h-12 px-4 border border-slate-200 rounded-xl bg-slate-50 font-bold" value={courseLevel} onChange={e => setCourseLevel(e.target.value)}>
                              <option>1st Prep</option>
                              <option>2nd Prep</option>
                              <option>3rd Prep</option>
                              <option>1st Secondary</option>
                              <option>2nd Secondary</option>
                              <option>3rd Secondary</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label className="font-bold">وصف الدورة</Label>
                            <textarea className="w-full h-32 p-4 border border-slate-200 rounded-xl bg-slate-50 resize-none" value={courseDesc} onChange={e => setCourseDesc(e.target.value)} placeholder="أدخل تفاصيل الدورة..." required />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-bold">رابط صورة الغلاف</Label>
                            <Input className="h-12 rounded-xl" value={courseImage} onChange={e => setCourseImage(e.target.value)} placeholder="https://..." />
                          </div>
                          <Button className="w-full bg-blue-600 h-14 rounded-2xl font-black text-lg shadow-lg shadow-blue-100" type="submit">
                            حفظ الدورة
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-8 space-y-6">
                    {courses.map(course => (
                      <Card key={course.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden rounded-3xl">
                        <CardContent className="p-0 flex flex-col md:flex-row">
                          <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                             <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="p-8 flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase">{course.level}</span>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl"><Edit2 size={16} /></Button>
                                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl" onClick={() => deleteItem('courses', course.id)}><Trash2 size={16} /></Button>
                                </div>
                              </div>
                              <h4 className="text-xl font-black text-slate-800 mb-2">{course.title}</h4>
                              <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">{course.description}</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                               <div className="flex items-center gap-1"><Layers className="w-3 h-3" /> 12 درس</div>
                               <div className="flex items-center gap-1"><Users className="w-3 h-3" /> 84 طالب</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'lessons' && (
                <motion.div 
                   key="lessons"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                >
                  <div className="lg:col-span-4">
                    <Card className="border-none shadow-lg bg-white sticky top-28 rounded-3xl overflow-hidden">
                       <div className="bg-indigo-600 p-6 text-white">
                        <CardTitle className="flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          إضافة درس جديد
                        </CardTitle>
                      </div>
                      <CardContent className="p-8">
                        <form onSubmit={handleAddLesson} className="space-y-6">
                          <div className="space-y-2">
                            <Label className="font-bold">اختر الدورة</Label>
                            <select className="w-full h-12 px-4 border border-slate-200 rounded-xl bg-slate-50 font-bold" value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)} required>
                              <option value="">اختر الدورة المناسبة...</option>
                              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label className="font-bold">عنوان الدرس</Label>
                            <Input className="h-12 rounded-xl" value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} placeholder="مثال: مقدمة في الكهرباء" required />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-bold">رابط الفيديو (Embed)</Label>
                            <Input className="h-12 rounded-xl" value={lessonVideo} onChange={e => setLessonVideo(e.target.value)} required placeholder="https://www.youtube.com/embed/..." />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-bold">رابط الملزمة (PDF)</Label>
                            <Input className="h-12 rounded-xl" value={lessonPdf} onChange={e => setLessonPdf(e.target.value)} required placeholder="https://..." />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-bold">ملاحظات إضافية</Label>
                            <textarea className="w-full h-32 p-4 border border-slate-200 rounded-xl bg-slate-50 resize-none" value={lessonContent} onChange={e => setLessonContent(e.target.value)} />
                          </div>
                          <Button className="w-full bg-indigo-600 h-14 rounded-2xl font-black text-lg shadow-lg shadow-indigo-100" type="submit">
                            إضافة الدرس
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    {lessons.map(lesson => (
                      <Card key={lesson.id} className="border-none shadow-sm overflow-hidden rounded-3xl bg-white hover:shadow-md transition-all group">
                        <CardContent className="p-0 flex flex-col sm:flex-row">
                          <div className="w-full sm:w-56 h-36 bg-slate-900 flex-shrink-0 relative overflow-hidden">
                             <iframe src={lesson.videoUrl} className="w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                               <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"><Clock size={14} /></div>
                             </div>
                          </div>
                          <div className="p-6 flex-grow flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-black text-slate-800 text-lg mb-1">{lesson.title}</h4>
                                <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                                  <BookOpen size={12} />
                                  {courses.find(c => c.id === lesson.courseId)?.title}
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl"><Edit2 size={16} /></Button>
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl" onClick={() => deleteItem('lessons', lesson.id)}><Trash2 size={16} /></Button>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                               <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-black border-slate-200 gap-1">
                                 <FileText size={12} /> مشاهدة الملزمة
                               </Button>
                               <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                 <ExternalLink size={10} /> تم التحديث: {new Date(lesson.createdAt?.seconds * 1000).toLocaleDateString('ar-EG')}
                               </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div 
                   key="users"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                >
                  <Card className="border-none shadow-md bg-white rounded-3xl overflow-hidden">
                     <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                       <div>
                         <CardTitle className="text-2xl font-black">إدارة الطلاب والنشاط</CardTitle>
                         <CardDescription className="text-slate-400 font-bold">متابعة الطلاب المسجلين وحالتهم الدراسية</CardDescription>
                       </div>
                       <Button className="bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl px-6 font-black gap-2">
                         <Download size={18} />
                         تصدير التقارير (CSV)
                       </Button>
                     </CardHeader>
                     <CardContent className="p-0">
                       <div className="overflow-x-auto">
                        <table className="w-full text-right">
                          <thead>
                            <tr className="bg-slate-50/50 text-slate-400 text-xs font-black uppercase tracking-wider">
                              <th className="p-6">الطالب</th>
                              <th className="p-6">البريد الإلكتروني</th>
                              <th className="p-6">تاريخ الانضمام</th>
                              <th className="p-6">الحالة</th>
                              <th className="p-6">التقدم</th>
                              <th className="p-6 text-center">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              { name: 'أحمد علي', email: 'ahmed@test.com', date: '2023-10-01', status: 'نشط', progress: 85 },
                              { name: 'سارة محمد', email: 'sara@test.com', date: '2023-10-05', status: 'نشط', progress: 42 },
                              { name: 'محمود حسن', email: 'mhmd@test.com', date: '2023-10-12', status: 'غير نشط', progress: 10 },
                              { name: 'ليلى إبراهيم', email: 'laila@test.com', date: '2023-11-02', status: 'نشط', progress: 98 },
                            ].map((user, i) => (
                              <tr key={i} className="group hover:bg-slate-50 transition-colors">
                                <td className="p-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">{user.name[0]}</div>
                                    <span className="font-black text-slate-800">{user.name}</span>
                                  </div>
                                </td>
                                <td className="p-6 text-slate-500 font-bold">{user.email}</td>
                                <td className="p-6 text-slate-400 font-bold">{user.date}</td>
                                <td className="p-6">
                                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${user.status === 'نشط' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="p-6">
                                  <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${user.progress}%` }} />
                                  </div>
                                </td>
                                <td className="p-6 text-center">
                                  <Button variant="ghost" size="sm" className="text-blue-600 font-black hover:bg-blue-50">تعديل</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                       </div>
                     </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div 
                   key="settings"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="space-y-8"
                >
                  <Card className="border-none shadow-md bg-white rounded-3xl overflow-hidden p-8">
                     <div className="flex items-start gap-6 mb-10">
                       <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><Settings className="w-8 h-8" /></div>
                       <div>
                         <h2 className="text-2xl font-black mb-2">إعدادات المنصة المتقدمة</h2>
                         <p className="text-slate-500 font-bold">تحكم في هوية المنصة، الحماية، والاتصال.</p>
                       </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                          <h3 className="text-lg font-black border-r-4 border-orange-500 pr-4">إعدادات الحماية</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                               <div>
                                 <p className="font-bold">حماية الفيديو المتقدمة</p>
                                 <p className="text-xs text-slate-400">تفعيل العلامة المائية ومنع النسخ</p>
                               </div>
                               <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                                 <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                               </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                               <div>
                                 <p className="font-bold">منع تعدد الأجهزة</p>
                                 <p className="text-xs text-slate-400">السماح بجهاز واحد فقط لكل طالب</p>
                               </div>
                               <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                               </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-lg font-black border-r-4 border-blue-500 pr-4">إعدادات التواصل</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                               <Label className="font-bold">رابط الواتساب</Label>
                               <Input className="rounded-xl" placeholder="https://wa.me/..." />
                            </div>
                            <div className="space-y-2">
                               <Label className="font-bold">رابط الفيسبوك</Label>
                               <Input className="rounded-xl" placeholder="https://facebook.com/..." />
                            </div>
                          </div>
                        </div>
                     </div>

                     <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end gap-4">
                        <Button variant="ghost" className="font-bold">إلغاء التغييرات</Button>
                        <Button className="bg-slate-800 hover:bg-slate-900 rounded-xl px-10 font-black h-12 shadow-lg">حفظ كافة الإعدادات</Button>
                     </div>
                  </Card>

                  <Card className="border-none shadow-md bg-amber-50 rounded-3xl p-8 border-r-8 border-amber-400">
                     <div className="flex items-center gap-4 text-amber-800">
                        <AlertCircle className="w-6 h-6" />
                        <h4 className="text-lg font-black">نسخة تجريبية - خطة التطوير (8 خطوات)</h4>
                     </div>
                     <p className="mt-4 text-amber-700 leading-relaxed font-medium">
                        يتم الآن تنفيذ خطوات التطوير الاحترافية: 
                        (1) الاختبارات الشاملة، (2) تحسين الأداء، (3) تعزيز الأمان، (4) إعداد بيئة الإنتاج، 
                        (5) الأتمتة CI/CD، (6) التوثيق، (7) نظام التعليقات، (8) خطة الميزات المستقبلية.
                     </p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;