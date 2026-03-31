import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { CheckCircle2, XCircle, Trophy, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizSystemProps {
  lessonId: string;
  onComplete?: (score: number) => void;
}

const QuizSystem: React.FC<QuizSystemProps> = ({ lessonId, onComplete }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const quizzesRef = collection(db, 'quizzes');
        const q = query(quizzesRef, where('lessonId', '==', lessonId));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setQuestions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          // Mock some questions if none found
          setQuestions([
            {
              question: "What is the past simple of 'Go'?",
              options: ["Goed", "Went", "Gone", "Going"],
              correctAnswer: 1
            },
            {
              question: "Which of these is a modal verb?",
              options: ["Eat", "Can", "Running", "Table"],
              correctAnswer: 1
            },
            {
              question: "Complete: She ____ tea every morning.",
              options: ["drink", "drinks", "drinking", "drank"],
              correctAnswer: 1
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [lessonId]);

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      onComplete?.(score);
    }
  };

  if (loading) return <div className="text-center p-10">جاري تحميل الاختبار...</div>;
  if (questions.length === 0) return <div className="text-center p-10">لا توجد أسئلة لهذا الدرس.</div>;

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="max-w-2xl mx-auto border-none shadow-xl text-center py-12 px-8 overflow-hidden relative">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10">
          <Trophy className={`w-24 h-24 mx-auto mb-6 ${percentage >= 50 ? 'text-yellow-500' : 'text-gray-400'}`} />
          <h2 className="text-3xl font-bold mb-2">أحسنت!</h2>
          <p className="text-gray-600 mb-8">لقد أكملت الاختبار بنجاح</p>
          
          <div className="text-6xl font-black text-blue-600 mb-2">{percentage}%</div>
          <div className="text-xl font-medium text-gray-700 mb-8">{score} من إجمالي {questions.length} أسئلة صحيحة</div>
          
          <div className="flex gap-4 justify-center">
             <Button onClick={() => window.location.reload()} variant="outline">إعادة الاختبار</Button>
             <Button className="bg-blue-600" onClick={() => window.history.back()}>العودة للدروس</Button>
          </div>
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="bg-blue-600 w-full h-full blur-[100px] rounded-full"></div>
        </div>
      </Card>
    );
  }

  const q = questions[currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto border-none shadow-xl overflow-hidden" dir="ltr">
      <CardHeader className="bg-gray-50 border-b border-gray-100 flex flex-row items-center justify-between p-6">
        <div className="space-y-1">
          <CardTitle className="text-blue-600 font-bold">Question {currentQuestion + 1}</CardTitle>
          <p className="text-xs text-gray-500">Total: {questions.length}</p>
        </div>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
           <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">{q.question}</h3>
        
        <RadioGroup value={selectedOption?.toString()} onValueChange={(val) => !isAnswered && setSelectedOption(parseInt(val))} className="space-y-4">
          {q.options.map((option: string, idx: number) => (
            <div key={idx} className={`relative`}>
              <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} className="peer hidden" />
              <Label
                htmlFor={`opt-${idx}`}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer font-medium
                  ${selectedOption === idx ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 hover:border-gray-200 bg-white'}
                  ${isAnswered && idx === q.correctAnswer ? 'border-green-500 bg-green-50 text-green-700' : ''}
                  ${isAnswered && selectedOption === idx && idx !== q.correctAnswer ? 'border-red-500 bg-red-50 text-red-700' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center border ${selectedOption === idx ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-200'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </div>
                {isAnswered && idx === q.correctAnswer && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                {isAnswered && selectedOption === idx && idx !== q.correctAnswer && <XCircle className="w-6 h-6 text-red-600" />}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>

      <CardFooter className="bg-gray-50 p-6 flex justify-between border-t border-gray-100">
        {!isAnswered ? (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold" 
            disabled={selectedOption === null}
            onClick={handleAnswerSubmit}
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold" 
            onClick={nextQuestion}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizSystem;