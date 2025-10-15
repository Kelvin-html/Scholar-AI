import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import UploadCard from './components/UploadCard';
import StatsPanel from './components/StatsPanel';
import TimerDisplay from './components/TimerDisplay';
import QuizInterface from './components/QuizInterface';
import { 
  WORK_TIME, 
  BREAK_TIME, 
  generateQuestion, 
  getSampleExtractedText,
  checkAnswer 
} from './utils';

export default function App() {
  // ===== TIMER STATE =====
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  
  // ===== CONTENT STATE =====
  const [uploadedFile, setUploadedFile] = useState(null);
  const [hasNotes, setHasNotes] = useState(false);
  
  // ===== QUIZ STATE =====
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizResults, setQuizResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);

  const audioRef = useRef(null);

  // ===== TIMER LOGIC =====
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    // Play completion sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    if (!isBreak) {
      // Work session complete → Start break
      setIsBreak(true);
      setTimeLeft(BREAK_TIME);
      setSessionsCompleted(prev => prev + 1);
      
      // Generate quiz question if notes uploaded
      if (hasNotes) {
        const question = generateQuestion();
        setCurrentQuestion(question);
        setQuestionsAsked(prev => prev + 1);
      }
    } else {
      // Break complete → Back to work
      setIsBreak(false);
      setTimeLeft(WORK_TIME);
      setCurrentQuestion(null);
      setUserAnswer('');
      setShowResult(false);
    }
    setIsActive(false);
  };

  const toggleTimer = () => {
    if (!hasNotes && !isActive) {
      alert('Please upload your study notes first! 📚');
      return;
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
    setCurrentQuestion(null);
    setUserAnswer('');
    setShowResult(false);
  };

  // ===== FILE UPLOAD HANDLER =====
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    
    // In production: Use OCR API or PDF parser
    // For demo: Get sample text
    getSampleExtractedText(); // Extract text (not storing for now)
    setHasNotes(true);
  };

  // ===== QUIZ HANDLERS =====
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;

    const correct = checkAnswer(userAnswer, currentQuestion.a);
    setIsCorrect(correct);
    setShowResult(true);
    setQuizResults(prev => [...prev, { 
      correct, 
      question: currentQuestion.q 
    }]);
  };

  const handleSkipQuestion = () => {
    setShowResult(true);
    setIsCorrect(false);
    setQuizResults(prev => [...prev, { 
      correct: false, 
      question: currentQuestion.q 
    }]);
  };

  const handleNextQuestion = () => {
    const newQuestion = generateQuestion();
    setCurrentQuestion(newQuestion);
    setUserAnswer('');
    setShowResult(false);
    setQuestionsAsked(prev => prev + 1);
  };

  // ===== CALCULATED VALUES =====
  const progress = isBreak 
    ? ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100 
    : ((WORK_TIME - timeLeft) / WORK_TIME) * 100;

  const correctAnswers = quizResults.filter(r => r.correct).length;
  const accuracy = quizResults.length > 0 
    ? Math.round((correctAnswers / quizResults.length) * 100) 
    : 0;

  // ===== RENDER =====
  return (
    <div className='flex justify-center items-center w-screen '>
    <div className=" bg-black/90 p-4 sm:p-8 flex items-center justify-center w-screen md:px-25 ">
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSt+zPLTgjMGHm7A7+OZURE" 
      />
      
      <div className="w-full">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-8 gap-6">
          {/*Upload & Stats */}
           {/* Timer or Quiz */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              {!isBreak || !currentQuestion ? (
               
                <TimerDisplay
                  timeLeft={timeLeft}
                  isActive={isActive}
                  isBreak={isBreak}
                  progress={progress}
                  hasNotes={hasNotes}
                  onToggle={toggleTimer}
                  onReset={resetTimer}
                />
              ) : (
               
                <QuizInterface
                  question={currentQuestion}
                  userAnswer={userAnswer}
                  showResult={showResult}
                  isCorrect={isCorrect}
                  timeLeft={timeLeft}
                  onAnswerChange={setUserAnswer}
                  onSubmit={handleSubmitAnswer}
                  onSkip={handleSkipQuestion}
                  onNext={handleNextQuestion}
                />
              )}
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <UploadCard
              hasNotes={hasNotes}
              uploadedFile={uploadedFile}
              onFileUpload={handleFileUpload}
            />

            <StatsPanel
              sessionsCompleted={sessionsCompleted}
              accuracy={accuracy}
              correctAnswers={correctAnswers}
              totalQuestions={quizResults.length}
              questionsAsked={questionsAsked}
            />
          </div>

         
        </div>
      </div>
    </div>
    </div>
  );
}