import React from 'react';
import { Play, Pause, RotateCcw, Coffee, BookOpen } from 'lucide-react';
import { formatTime } from '../utils.js';

export default function TimerDisplay({ 
  timeLeft, 
  isActive, 
  isBreak, 
  progress,
  hasNotes,
  onToggle, 
  onReset 
}) {
  return (
    <div>
      {/* Status Badge */}
      <div className="flex justify-center mb-6">
        <div className={`px-6 py-2 rounded-full flex items-center gap-2 ${
          isBreak 
            ? 'bg-green-500/20 border border-green-400/30' 
            : 'bg-blue-500/20 border border-blue-400/30'
        }`}>
          {isBreak ? (
            <Coffee className="w-4 h-4 text-green-300" />
          ) : (
            <BookOpen className="w-4 h-4 text-blue-300" />
          )}
          <span className="text-white font-semibold">
            {isBreak ? 'Break Time - Quiz Time!' : 'Lets Study!'}
          </span>
        </div>
      </div>

      {/* Timer Circle */}
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* Circular Progress SVG */}
          <svg className="w-72 h-72 transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="144"
              cy="144"
              r="136"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="16"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="144"
              cy="144"
              r="136"
              stroke="url(#gradient)"
              strokeWidth="16"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 136}`}
              strokeDashoffset={`${2 * Math.PI * 136 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Time Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl font-bold text-white mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-white/60 text-lg">
                {Math.round(progress)}% complete
              </div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onToggle}
            className=" hover:bg-white/30 p-6 rounded-full backdrop-blur-sm border border-white/30 transition-all hover:scale-110"
          >
            {isActive ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </button>
          <button
            onClick={onReset}
            className="bg-white/10 hover:bg-white/20 p-6 rounded-full backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
          >
            <RotateCcw className="w-8 h-8" />
          </button>
        </div>

        {/* Helper Text */}
        {!isBreak && hasNotes && (
          <p className="mt-8 text-white/70 text-center">
            Stay focused! AI will quiz you during the break 🧠
          </p>
        )}
      </div>
    </div>
  );
}