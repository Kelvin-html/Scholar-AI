import React from 'react';
import { Brain } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Brain className="w-10 h-10 text-blue-300" />
        <h1 className=" font-bold text-white">Scholar AI</h1>
      </div>
      <p className="text-white/90 text-lg">
        Upload notes. Study. Get quizzed.
      </p>
    </div>
  );
}