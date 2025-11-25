import React, { useState } from 'react';
import { quizzes } from '../data';
import { CheckCircle, AlertCircle, Play, ArrowRight } from 'lucide-react';

const QuizComponent: React.FC = () => {
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const activeQuiz = quizzes.find(q => q.id === activeQuizId);

  const handleStartQuiz = (id: string) => {
    setActiveQuizId(id);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(optionIndex);
    
    if (activeQuiz && optionIndex === activeQuiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (!activeQuiz) return;
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReset = () => {
    setActiveQuizId(null);
    setQuizCompleted(false);
  };

  if (activeQuiz) {
    const question = activeQuiz.questions[currentQuestionIndex];
    
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
           {!quizCompleted ? (
             <>
               <div className="flex justify-between items-center mb-8">
                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{activeQuiz.title}</h3>
                 <span className="text-sm font-medium text-slate-500">
                   Question {currentQuestionIndex + 1} / {activeQuiz.questions.length}
                 </span>
               </div>
               
               <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
                 <div 
                   className="bg-bible-500 h-full transition-all duration-300"
                   style={{ width: `${((currentQuestionIndex) / activeQuiz.questions.length) * 100}%` }}
                 />
               </div>

               <h4 className="text-2xl font-serif text-slate-800 dark:text-slate-100 mb-8">
                 {question.question}
               </h4>

               <div className="space-y-4 mb-8">
                 {question.options.map((option, idx) => {
                   const isSelected = selectedAnswer === idx;
                   const isCorrect = idx === question.correctAnswer;
                   const showResult = selectedAnswer !== null;

                   let btnClass = "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800";
                   if (showResult) {
                     if (isCorrect) btnClass = "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-300";
                     else if (isSelected) btnClass = "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-300";
                     else btnClass = "opacity-50 border-slate-200 dark:border-slate-700";
                   } else if (isSelected) {
                     btnClass = "border-bible-500 bg-bible-50 text-bible-900";
                   }

                   return (
                     <button
                       key={idx}
                       onClick={() => handleAnswer(idx)}
                       disabled={showResult}
                       className={`w-full p-4 text-left rounded-xl border-2 transition-all font-medium ${btnClass}`}
                     >
                       <div className="flex items-center justify-between">
                         <span>{option}</span>
                         {showResult && isCorrect && <CheckCircle size={20} className="text-green-600" />}
                         {showResult && isSelected && !isCorrect && <AlertCircle size={20} className="text-red-600" />}
                       </div>
                     </button>
                   );
                 })}
               </div>

               <div className="flex justify-end">
                 <button 
                   onClick={handleNext}
                   disabled={selectedAnswer === null}
                   className="bg-bible-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-bible-700 transition-colors"
                 >
                   {currentQuestionIndex === activeQuiz.questions.length - 1 ? 'Terminer' : 'Suivant'}
                   <ArrowRight size={20} />
                 </button>
               </div>
             </>
           ) : (
             <div className="text-center py-8">
               <div className="w-24 h-24 bg-bible-100 dark:bg-bible-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-bible-600 dark:text-bible-400">
                 <CheckCircle size={48} />
               </div>
               <h3 className="text-3xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-2">Quiz Terminé !</h3>
               <p className="text-slate-600 dark:text-slate-400 mb-8">
                 Vous avez obtenu un score de <span className="font-bold text-bible-600 text-xl">{score} / {activeQuiz.questions.length}</span>
               </p>
               <button 
                 onClick={handleReset}
                 className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
               >
                 Retour aux Quiz
               </button>
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">Testez vos Connaissances</h2>
            <p className="text-slate-600 dark:text-slate-400">Des mini-quiz pour renforcer votre apprentissage.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-bible-400 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <AlertCircle size={80} className="text-bible-500" />
             </div>
             
             <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                 <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                   quiz.completed ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                 }`}>
                   {quiz.completed ? 'Complété' : 'Nouveau'}
                 </span>
                 {quiz.score !== undefined && (
                   <span className="font-bold text-green-600">{quiz.score}%</span>
                 )}
               </div>
               
               <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{quiz.title}</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{quiz.questions.length} Questions</p>
               
               <button 
                 onClick={() => handleStartQuiz(quiz.id)}
                 className="w-full bg-bible-50 dark:bg-bible-900/20 text-bible-700 dark:text-bible-300 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 group-hover:bg-bible-600 group-hover:text-white transition-all"
               >
                 <Play size={18} className="fill-current" />
                 Commencer
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizComponent;
