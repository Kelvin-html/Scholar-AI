import React from 'react';
import { TrendingUp, Zap, Brain, BookOpen } from 'lucide-react';

export default function StatsPanel({ 
  sessionsCompleted, 
  accuracy, 
  correctAnswers, 
  totalQuestions,
  questionsAsked 
}) {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-white" />
        <h2 className="text-xl font-bold text-white">Your Progress</h2>
      </div>
      
      <div className="space-y-4">
        {/* Sessions Completed */}
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/70 text-sm">Sessions Today</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">{sessionsCompleted}</p>
        </div>

        {/* Quiz Accuracy */}
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/70 text-sm">Quiz Accuracy</span>
            <Brain className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{accuracy}%</p>
          <p className="text-white/60 text-xs mt-1">
            {correctAnswers}/{totalQuestions} correct
          </p>
        </div>

        {/* Questions Asked */}
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/70 text-sm">Questions Asked</span>
            <BookOpen className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-3xl font-bold text-white">{questionsAsked}</p>
        </div>
      </div>
    </div>
  );
}