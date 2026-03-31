export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  pdfUrl: string;
  notes: string;
  duration: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  lessons: Lesson[];
  quizzes: Record<string, QuizQuestion[]>;
}

export const COURSES: Course[] = [
  {
    id: "prep1",
    title: "الصف الأول الإعدادي",
    description: "شرح كامل للمنهج بأسلوب مبسط وشيق مع مراجعات دورية.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/31fe2809-6ce3-41f1-84b5-2be2c81e13c3/prep-1-course-e7234155-1774994266561.webp",
    level: "Prep",
    lessons: [
      { id: "l1", title: "Unit 1: My Family and Me", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", pdfUrl: "#", notes: "ملاحظات هامة على كلمات الوحدة الأولى", duration: "15:00" },
      { id: "l2", title: "Unit 2: School Life", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", pdfUrl: "#", notes: "شرح قواعد المضارع البسيط", duration: "20:00" }
    ],
    quizzes: {
      "l1": [
        { id: "q1", question: "What is the opposite of 'Big'?", options: ["Small", "Large", "Huge", "Tall"], correctAnswer: 0 },
        { id: "q2", question: "He ____ playing football.", options: ["like", "likes", "liking", "liked"], correctAnswer: 1 }
      ]
    }
  },
  {
    id: "prep2",
    title: "الصف الثاني الإعدادي",
    description: "تأسيس قوي في القواعد والكلمات لضمان التفوق الدراسي.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400",
    level: "Prep",
    lessons: [],
    quizzes: {}
  },
  {
    id: "prep3",
    title: "الصف الثالث الإعدادي",
    description: "مراجعات نهائية وتدريبات على أهم أسئلة الامتحانات.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400",
    level: "Prep",
    lessons: [],
    quizzes: {}
  },
  {
    id: "sec1",
    title: "الصف الأول الثانوي",
    description: "بداية الرحلة نحو التميز في الثانوية العامة.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400",
    level: "Secondary",
    lessons: [],
    quizzes: {}
  },
  {
    id: "sec2",
    title: "الصف الثاني الثانوي",
    description: "تعمق في المنهج وتحضير شامل لكل أجزاء الامتحان.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
    level: "Secondary",
    lessons: [],
    quizzes: {}
  },
  {
    id: "sec3",
    title: "الصف الثالث الثانوي",
    description: "خطة مراجعة شاملة للثانوية العامة مع مستر حبيب.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/31fe2809-6ce3-41f1-84b5-2be2c81e13c3/secondary-course-new-cf3a5c8c-1774994277776.webp",
    level: "Secondary",
    lessons: [],
    quizzes: {}
  }
];

export const TESTIMONIALS = [
  { name: "أحمد علي", text: "شرح مستر حبيب غير حياتي في الإنجليزي!", role: "طالب ثانوي" },
  { name: "سارة محمود", text: "المنصة سهلة جداً والامتحانات مفيدة للغاية.", role: "طالبة إعدادي" },
  { name: "محمد حسن", text: "أفضل مدرس إنجليزي في مصر بلا منازع.", role: "ولي أمر" }
];