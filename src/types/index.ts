export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  image?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoUrl: string;
  pdfUrl: string;
  content: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface UserProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  quizScore?: number;
}