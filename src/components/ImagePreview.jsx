import React from 'react';
import { Download, Copy, Image as ImageIcon } from 'lucide-react';

export default function ImagePreview({ imageUrl, isLoading, prompt }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    link.click();
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full min-h-[400px]">
      <div className="relative flex-1 flex items-center justify-center border border-dashed border-gray-800 rounded-xl overflow-hidden bg-gray-950/50">
        {isLoading ? (
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 text-sm">الذكاء الاصطناعي يرسم الآن...</p>
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={prompt}
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="text-center text-gray-600">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>أدخل النص وقم بتوليد أول صورة لك</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {imageUrl && !isLoading && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl text-sm transition"
          >
            <Download className="w-4 h-4" /> تحميل
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(imageUrl)}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm transition"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}