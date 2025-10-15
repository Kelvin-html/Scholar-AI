import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { formatTime } from '../utils.js';

export default function QuizInterface({ 
  question,
  userAnswer,
  showResult,
  isCorrect,
  timeLeft,
  onAnswerChange,
  onSubmit,
  onSkip,
  onNext
}) {
  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          Quick Knowledge Check!
        </h3>
        <p className="text-white/70">
          Answer based on what you just studied
        </p>
      </div>

      {/* Question Card */}
      <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
        <p className="text-xl text-white font-medium mb-6">
          {question.q}
        </p>

        {!showResult ? (
          // Answer Input Phase
          <div className="space-y-4">
            <textarea
              value={userAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
              rows="3"
              autoFocus
            />
            
            <div className="flex gap-3">
              <button
                onClick={onSubmit}
                disabled={!userAnswer.trim()}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl font-semibold transition-all border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
              <button
                onClick={onSkip}
                className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-semibold transition-all border border-white/20"
              >
                Skip
              </button>
            </div>
          </div>
        ) : (
          // Result Display Phase
          <div className="space-y-4">
            {/* Result Banner */}
            <div className={`flex items-center gap-3 p-4 rounded-xl ${
              isCorrect 
                ? 'bg-green-500/20 border border-green-400/30' 
                : 'bg-red-500/20 border border-red-400/30'
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">
                      Correct! Excellent work! 🎉
                    </p>
                    <p className="text-white/70 text-sm">
                      You're reinforcing your memory effectively
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Not quite right</p>
                    <p className="text-white/70 text-sm">
                      Correct answer:{' '}
                      <span className="text-white font-medium">
                        {question.a}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Study Tip */}
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <p className="text-white/70 text-sm mb-2">💡 Study Tip:</p>
              <p className="text-white text-sm">{question.hints[0]}</p>
            </div>

            {/* Next Button */}
            <button
              onClick={onNext}
              className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl font-semibold transition-all border border-white/30"
            >
              Next Question
            </button>
          </div>
        )}
      </div>

      {/* Time Remaining */}
      <div className="text-center">
        <p className="text-white/60 text-sm">
          Break time remaining:{' '}
          <span className="text-white font-semibold">
            {formatTime(timeLeft)}
          </span>
        </p>
      </div>
    </div>
  );
}