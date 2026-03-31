import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Play, ArrowLeft, ArrowRight, ShieldAlert, Download, BrainCircuit } from 'lucide-react';
import QuizSystem from '../components/Quiz/QuizSystem';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const LessonView = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const fetchCourseAndLessons = async () => {
      if (!id) return;
      try {
        const courseDoc = await getDoc(doc(db, 'courses', id));
        if (courseDoc.exists()) {
          setCourse({ id: courseDoc.id, ...courseDoc.data() });
          
          const lessonsRef = collection(db, 'lessons');
          const q = query(lessonsRef, where('courseId', '==', id));
          const snapshot = await getDocs(q);
          const lessonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setLessons(lessonsData);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndLessons();
  }, [id]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.info('المحتوى محمي. لا يمكن النقر بزر الفأرة الأيمن.');
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  if (loading) return <div className="p-12 text-center">جاري تحميل المحتوى...</div>;
  if (!course) return <div className="p-12 text-center text-red-500">الدورة غير موجودة</div>;

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="container mx-auto px-6 py-12" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-md overflow-hidden bg-white">
             <CardHeader className="bg-blue-600 text-white p-6">
                <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                <p className="text-blue-100 text-sm mt-1">{lessons.length} دروس</p>
             </CardHeader>
             <CardContent className="p-0">
               <div className="flex flex-col">
                 {lessons.map((lesson, idx) => (
                   <button
                     key={lesson.id}
                     onClick={() => { setCurrentLessonIndex(idx); setShowQuiz(false); }}
                     className={`flex items-center gap-4 p-4 text-right hover:bg-blue-50 transition-colors border-b border-gray-100 ${currentLessonIndex === idx ? 'bg-blue-50 border-r-4 border-r-blue-600' : ''}`}
                   >
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentLessonIndex === idx ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                       {idx + 1}
                     </div>
                     <span className={`font-medium ${currentLessonIndex === idx ? 'text-blue-600' : 'text-gray-700'}`}>
                       {lesson.title}
                     </span>
                   </button>
                 ))}
               </div>
             </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm bg-orange-50 text-orange-800 p-6 space-y-3">
            <div className="flex items-center gap-2 font-bold">
               <ShieldAlert className="w-5 h-5" />
               تنبيه أمني
            </div>
            <p className="text-sm">هذا المحتوى محمي بحقوق الملكية الفكرية.</p>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {currentLesson ? (
            <>
              {showQuiz ? (
                <div className="animate-in fade-in duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">اختبار الدرس: {currentLesson.title}</h2>
                    <Button variant="outline" onClick={() => setShowQuiz(false)}>
                      العودة للشرح
                    </Button>
                  </div>
                  <QuizSystem lessonId={currentLesson.id} onComplete={() => toast.success('أحسنت! تم إكمال الاختبار بنجاح')} />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute top-4 left-4 z-20 opacity-40">
                      <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white font-bold text-xl select-none">
                        Mr. Habib - {currentUser?.displayName || 'Student'}
                      </div>
                    </div>

                    <iframe
                      src={currentLesson.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                      title={currentLesson.title}
                    ></iframe>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold">{currentLesson.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowQuiz(true)}>
                        <BrainCircuit className="w-4 h-4 ml-2" />
                        ابدأ الاختبار
                      </Button>
                      <a href={currentLesson.pdfUrl} download target="_blank" rel="noreferrer">
                        <Button variant="outline" className="border-blue-600 text-blue-600">
                          <Download className="w-4 h-4 ml-2" />
                          تحميل الملزمة
                        </Button>
                      </a>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        ملاحظات الدرس
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-gray-700 leading-loose">
                      {currentLesson.content || 'لا توجد ملاحظات إضافية.'}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div className="flex justify-between pt-8 border-t">
                <Button 
                  variant="ghost" 
                  disabled={currentLessonIndex === 0}
                  onClick={() => setCurrentLessonIndex(idx => idx - 1)}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                  السابق
                </Button>
                <Button 
                  variant="ghost" 
                  disabled={currentLessonIndex === lessons.length - 1}
                  onClick={() => setCurrentLessonIndex(idx => idx + 1)}
                >
                  التالي
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </div>
            </>
          ) : (
            <div className="p-24 text-center bg-gray-50 rounded-3xl">
              <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600">اختر درساً للبدء</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonView;