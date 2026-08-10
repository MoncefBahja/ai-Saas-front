import React, { useState } from 'react';
import { Sparkles, Loader2, Download, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔗 رابط الـ API ديالك فـ Vercel
  const API_URL = 'https://ai-saas-back.vercel.app/generate';

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setImageUrl(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, aspect_ratio: aspectRatio }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Server Error');
      }

      const data = await response.json();
      setImageUrl(data.image_url);
    } catch (error) {
      console.error('Error:', error);
      alert(`وقع خطأ: ${error.message || 'تعذر التواصل مع السيرفر'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased" dir="rtl">
      {/* Header */}
      <header className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg">
            AI
          </div>
          <span className="font-bold text-xl tracking-wide">ImageSaaS</span>
        </div>
        <div className="text-sm text-gray-400 bg-gray-900 border border-gray-800 px-4 py-1.5 rounded-full">
          الرصيد: <span className="text-indigo-400 font-bold">50 Credit</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            تحويل الأفكار إلى صور بذكاء عالٍ
          </h1>
          <p className="text-gray-400 text-sm">
            اكتب وصفك بالدارجة المغربية أو الإنجليزية واحصل على صور فائقة الدقة خلال ثوانٍ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  وصف الصورة (Prompt)
                </label>
                <textarea
                  rows="4"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="تاجر مغربي فـ سوق قديم، مليء بالألوان والتفاصيل الدقيقة..."
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  قياس الصورة (Aspect Ratio)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['1:1', '16:9', '9:16'].map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-2 px-3 rounded-xl text-sm font-semibold border transition ${
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

              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري الترجمة والتوليد...
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

          {/* Result Preview */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between min-h-[350px]">
            <div className="flex-1 flex items-center justify-center border border-dashed border-gray-800 rounded-xl bg-gray-950/50 p-4 overflow-hidden">
              {isLoading ? (
                <div className="text-center space-y-3">
                  <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto" />
                  <p className="text-gray-400 text-sm">الذكاء الاصطناعي يترجم ويرسم الآن...</p>
                </div>
              ) : imageUrl ? (
                <img src={imageUrl} alt="Result" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <div className="text-center text-gray-500 space-y-2">
                  <ImageIcon className="w-12 h-12 mx-auto opacity-40" />
                  <p className="text-sm">أدخل النص وقم بتوليد أول صورة لك</p>
                </div>
              )}
            </div>

            {imageUrl && !isLoading && (
              <div className="mt-4 flex gap-3">
                <a
                  href={imageUrl}
                  download="darija-ai-image.png"
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  <Download className="w-4 h-4" /> تحميل الصورة
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}