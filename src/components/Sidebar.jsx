import React, { useState } from 'react';
import ImageGenerator from './ImageGenerator';
import ImagePreview from './ImagePreview';

export default function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  // الربط مع الـ Backend
  const handleGenerate = async ({ prompt, aspectRatio }) => {
    setIsLoading(true);
    setCurrentPrompt(prompt);

    try {
      // بدّل هاد الـ URL بـ رابط الـ Backend ديالك (مثلاً FastAPI)
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, aspect_ratio: aspectRatio }),
      });

      const data = await response.json();
      setImageUrl(data.image_url); // أو Base64 String
    } catch (error) {
      console.error('Error generating image:', error);
      alert('حدث خطأ أثناء التوليد، يرجى المحاولة لاحقاً');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased">
      {/* Header */}
      <header className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg">
            AI
          </div>
          <span className="font-bold text-xl tracking-wide">ImageSaaS</span>
        </div>
        <div className="text-sm text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full">
          الرصيد: <span className="text-indigo-400 font-bold">50 Credit</span>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            حويل الأفكار إلى صور بذكاء عالٍ
          </h1>
          <p className="text-gray-400 text-sm">
            اكتب وصفك باللغة الإنجليزية واحصل على صور فائقة الدقة خلال ثوانٍ.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImageGenerator onGenerate={handleGenerate} isLoading={isLoading} />
          <ImagePreview imageUrl={imageUrl} isLoading={isLoading} prompt={currentPrompt} />
        </div>
      </main>
    </div>
  );
}