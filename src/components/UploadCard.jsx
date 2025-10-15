import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';

export default function UploadCard({ hasNotes, uploadedFile, onFileUpload }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-white" />
        <h2 className="text-xl font-bold text-white">Upload Notes</h2>
      </div>
      
      {!hasNotes ? (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:bg-white/5 transition-all">
          <Upload className="w-8 h-8 text-white/70 mb-2" />
          <span className="text-sm text-white/70">PDF or Image</span>
          <input 
            type="file" 
            className="hidden" 
            accept=".pdf,.jpg,.jpeg,.png" 
            onChange={onFileUpload} 
          />
        </label>
      ) : (
        <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium truncate">
              {uploadedFile?.name || 'Notes uploaded'}
            </span>
          </div>
          <p className="text-white/60 text-sm">
            Ready to quiz you! Start studying 📚
          </p>
        </div>
      )}
    </div>
  );
}