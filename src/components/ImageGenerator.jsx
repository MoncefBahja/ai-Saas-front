import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function ImageGenerator({ onGenerate, isLoading }) {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate({ prompt, aspectRatio });
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            وصف الصورة (Prompt)
          </label>
          <textarea
            rows="3"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="مثال: A futuristic cyberpunk city in Morocco, highly detailed, 8k..."
            className="w-full bg-gray-950 border border-gray-800 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Aspect Ratio Options */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            قياس الصورة (Aspect Ratio)
          </label>
          <div className="flex gap-3">
            {['1:1', '16:9', '9:16'].map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                  aspectRatio === ratio
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              جاري توليد الصورة...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              توليد الصورة
            </>
          )}
        </button>
      </form>
    </div>
  );
}