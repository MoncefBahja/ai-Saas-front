import React, { useState } from 'react';
import { Sparkles, Loader2, Download, Image as ImageIcon, Zap } from 'lucide-react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'https://ai-saas-back.vercel.app/generate';

  const quickPrompts = [
    { label: '👕 تصميم قميص', prompt: 'Vector illustration of a cool Moroccan cat wearing sunglasses, t-shirt design, white background' },
    { label: '📰 صورة مقال', prompt: 'Futuristic Cyberpunk city with neon lights, highly detailed, 4k resolution' },
    { label: '🎨 لوحة زيتية', prompt: 'Oil painting of a traditional Moroccan souk in Marrakech, vibrant colors' },
    { label: '🛡️ شعار حديث', prompt: 'Minimalist modern logo for an AI startup, abstract brain shape, neon gradient' },
  ];

  const row1 = [
    { prompt: "Dark mystic forest with glowing mushrooms and cat", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80" },
    { prompt: "Cozy Halloween cafe street with pumpkin lanterns", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80" },
    { prompt: "Cinematic portrait of a bearded man with glasses", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80" },
    { prompt: "Cartoon football squirrel player", image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&auto=format&fit=crop&q=80" },
    { prompt: "Ice elemental warrior avatar blue flames", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80" },
  ];

  const row2 = [
    { prompt: "Dreamy clouds over mountains sunset HD", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80" },
    { prompt: "Fantasy castle with multiple full moons", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80" },
    { prompt: "Cyberpunk cityscape neon lights 4k", image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80" },
    { prompt: "Abstract glowing neon geometric art", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" },
    { prompt: "Vector illustration of a cool cat with sunglasses", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&auto=format&fit=crop&q=80" },
  ];

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
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased overflow-x-hidden" dir="rtl">

      {/* 🚀 Seamless Infinite Loop CSS (fixed) */}
      <style>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-row {
          display: flex;
          overflow: hidden;
          user-select: none;
          width: 100%;
        }
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: max-content;
          flex-shrink: 0;
        }
        .marquee-track-left {
          animation: scroll-left 40s linear infinite;
        }
        .marquee-track-right {
          animation: scroll-right 40s linear infinite;
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex justify-between items-center bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
            AI
          </div>
          <span className="font-bold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
             TextToImage
          </span>
        </div>

        
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
            تحويل الأفكار إلى صور بذكاء عالٍ
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            اكتب وصفك باللغة العربية أو الإنجليزية واحصل على صور فائقة الدقة خلال ثوانٍ معدودة.
          </p>
        </div>

        {/* Generator Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Form */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl space-y-5">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  وصف الصورة 
                </label>
                <textarea
                  rows="4"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="تاجر مغربي فـ سوق قديم، مليء بالألوان والتفاصيل الدقيقة..."
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
                />
              </div>

              {/* Quick Prompts */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-gray-400 block">جرب أفكار سريعة:</span>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPrompt(item.prompt)}
                      className="text-xs bg-gray-800/80 hover:bg-indigo-600/30 hover:border-indigo-500/50 border border-gray-700/60 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer disabled:cursor-not-allowed"
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
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between min-h-[380px]">
            <div className="flex-1 flex items-center justify-center border border-dashed border-gray-800 rounded-xl bg-gray-950/50 p-4 overflow-hidden">
              {isLoading ? (
                <div className="text-center space-y-3">
                  <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto" />
                  <p className="text-gray-400 text-sm">الذكاء الاصطناعي يرسم أفكارك فـ ثوانٍ...</p>
                </div>
              ) : imageUrl ? (
                <img src={imageUrl} alt="AI Result" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <div className="text-center text-gray-500 space-y-2">
                  <ImageIcon className="w-12 h-12 mx-auto opacity-30 text-indigo-400" />
                  <p className="text-sm">أدخل النص أو اختر إحدى الأفكار وابدأ التوليد</p>
                </div>
              )}
            </div>

            {imageUrl && !isLoading && (
              <div className="mt-4 flex gap-3">
                <a
                  href={imageUrl}
                  download="flux-ai-image.png"
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md shadow-indigo-600/30"
                >
                  <Download className="w-4 h-4" /> تحميل الصورة
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 🚀 Seamless Infinite Loop Showcase (fixed: single duplicated track, no gaps) */}
      <section className="py-12 border-t border-gray-800/60 space-y-6 overflow-hidden">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white">نماذج تم إنشاؤها بالذكاء الاصطناعي</h2>
          <p className="text-xs text-gray-400">انقر على أي تصويرة لاستخدام الوصف الخاص بها</p>
        </div>

        <div className="space-y-4" dir="ltr">

          {/* Row 1: Right to Left */}
          <div className="marquee-row">
            <div className="marquee-track marquee-track-left">
              {[...row1, ...row1].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setPrompt(item.prompt)}
                  className="w-48 sm:w-56 h-72 rounded-2xl overflow-hidden relative flex-shrink-0 cursor-pointer group border border-gray-800 hover:border-indigo-500 transition-all duration-300"
                >
                  <img src={item.image} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex items-end">
                    <p className="text-xs text-white line-clamp-3 font-mono" dir="ltr">{item.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Left to Right */}
          <div className="marquee-row">
            <div className="marquee-track marquee-track-right">
              {[...row2, ...row2].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setPrompt(item.prompt)}
                  className="w-48 sm:w-56 h-72 rounded-2xl overflow-hidden relative flex-shrink-0 cursor-pointer group border border-gray-800 hover:border-purple-500 transition-all duration-300"
                >
                  <img src={item.image} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex items-end">
                    <p className="text-xs text-white line-clamp-3 font-mono" dir="ltr">{item.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/60 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">
                AI
              </div>
              <span className="font-bold text-base tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                TextToImage
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              أداة ذكاء اصطناعي لتوليد صور فائقة الدقة انطلاقاً من وصف نصي بالعربية أو الإنجليزية.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-300">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-400 transition">الرئيسية</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">الأسعار</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">اتصل بنا</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-300">قانوني</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-400 transition">شروط الاستخدام</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">سياسة الخصوصية</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/60">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} AI TextToImage. جميع الحقوق محفوظة.</p>
            
          </div>
        </div>
      </footer>

    </div>
  );
}