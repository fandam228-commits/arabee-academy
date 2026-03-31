import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, GraduationCap, Users, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';

const Home = () => {
  const levels = [
    { title: 'الصف الأول الإعدادي', description: 'أساسيات اللغة الإنجليزية', icon: <BookOpen />, level: '1st Prep' },
    { title: 'الصف الثاني الإعدادي', description: 'تطوير المهارات اللغوية', icon: <BookOpen />, level: '2nd Prep' },
    { title: 'الصف الثالث الإعدادي', description: 'التحضير للشهادة الإعدادية', icon: <BookOpen />, level: '3rd Prep' },
    { title: 'الصف الأول الثانوي', description: 'بداية المرحلة الثانوية', icon: <GraduationCap />, level: '1st Secondary' },
    { title: 'الصف الثاني الثانوي', description: 'تعمق في القواعد والمفردات', icon: <GraduationCap />, level: '2nd Secondary' },
    { title: 'الثانوية العامة', description: 'الطريق نحو القمة والجامعة', icon: <GraduationCap />, level: '3rd Secondary' },
  ];

  const features = [
    { title: 'شرح مبسط', description: 'أسلوب شرح يناسب جميع المستويات مع التركيز على أهم النقاط.', icon: <Zap className="text-blue-600" /> },
    { title: 'محتوى محمي', description: 'فيديوهات وملفات PDF محمية لضمان حقوق الطلاب والمنصة.', icon: <ShieldCheck className="text-blue-600" /> },
    { title: 'ذكاء اصطناعي', description: 'مساعد ذكي متاح 24/7 للإجابة على جميع أسئلتك اللغوية.', icon: <Users className="text-blue-600" /> },
  ];

  return (
    <div className="flex flex-col gap-12" dir="rtl">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              تعلم الإنجليزية <span className="text-blue-600">بذكاء</span> مع مستر حبيب
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              منصة تعليمية متكاملة لطلاب المراحل الإعدادية والثانوية في مصر. دروس فيديو، ملازم PDF، واختبارات تفاعلية.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-10 h-14 text-lg">ابدأ الآن</Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-10 h-14 text-lg">تسجيل الدخول</Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
              alt="Education" 
              className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 -mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'طالب مشترك', value: '+10,000' },
            { label: 'درس مسجل', value: '+500' },
            { label: 'اختبار تفاعلي', value: '+1,200' },
            { label: 'ساعة شرح', value: '+2,000' },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-white/80 backdrop-blur-sm shadow-xl hover:translate-y-[-5px] transition-transform">
              <CardContent className="p-6 text-center">
                <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Levels Section */}
      <section id="levels" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">المراحل التعليمية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">نغطي جميع المراحل الدراسية من الصف الأول الإعدادي وحتى الثانوية العامة.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {levels.map((lvl, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow overflow-hidden group border-none bg-white">
                <CardHeader className="bg-blue-50 p-6 flex flex-row items-center justify-between">
                  <div className="p-3 bg-white rounded-xl text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                    {lvl.icon}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-blue-600 text-white rounded-full">{lvl.level}</span>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <CardTitle className="text-xl">{lvl.title}</CardTitle>
                  <CardDescription className="text-gray-600">{lvl.description}</CardDescription>
                  <Link to={`/courses?level=${lvl.level}`}>
                    <Button variant="ghost" className="w-full mt-4 flex items-center justify-between group-hover:bg-blue-50">
                      استكشف الدروس
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-600 py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">لماذا تختار منصة مستر حبيب؟</h2>
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="bg-white p-3 rounded-xl">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{f.title}</h4>
                    <p className="text-blue-100">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
              alt="Dashboard" 
              className="rounded-3xl shadow-2xl border-4 border-white/30"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;