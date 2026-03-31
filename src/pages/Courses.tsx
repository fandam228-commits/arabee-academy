import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { BookOpen, Search, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'all');

  const levels = [
    { label: 'الكل', value: 'all' },
    { label: '1st Prep', value: '1st Prep' },
    { label: '2nd Prep', value: '2nd Prep' },
    { label: '3rd Prep', value: '3rd Prep' },
    { label: '1st Secondary', value: '1st Secondary' },
    { label: '2nd Secondary', value: '2nd Secondary' },
    { label: '3rd Secondary', value: '3rd Secondary' },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const coursesRef = collection(db, 'courses');
        let q = query(coursesRef);
        
        if (selectedLevel !== 'all') {
          q = query(coursesRef, where('level', '==', selectedLevel));
        }

        const querySnapshot = await getDocs(q);
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedLevel]);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-12" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
          <BookOpen className="text-blue-600 w-10 h-10" />
          الدورات الدراسية
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="ابحث عن دورة..." 
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {levels.map((lvl) => (
              <Button
                key={lvl.value}
                variant={selectedLevel === lvl.value ? 'default' : 'outline'}
                size="sm"
                className={selectedLevel === lvl.value ? 'bg-blue-600' : ''}
                onClick={() => setSelectedLevel(lvl.value)}
              >
                {lvl.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all border-none bg-white overflow-hidden flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop"} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={course.title}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                  {course.level}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0 pb-6">
                <Link to={`/lesson/${course.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">دخول الدورة</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-600">لا توجد دورات حالياً</h3>
          <p className="text-gray-500 mt-2">جرب البحث بكلمات أخرى أو اختر مستوى آخر.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;