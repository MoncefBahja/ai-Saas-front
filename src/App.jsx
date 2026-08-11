import React, { useState } from 'react';
import { Sparkles, Loader2, Download, Image as ImageIcon, Wand2 } from 'lucide-react';

// ---- Design tokens (zellige-inspired: cobalt night, gold leaf, clay) ----
const colors = {
  bg: '#0A1220',
  bgSoft: '#0D1A2E',
  card: '#0F1F38',
  cardSoft: '#122444',
  border: 'rgba(212,168,87,0.16)',
  borderStrong: 'rgba(212,168,87,0.4)',
  gold: '#D4A857',
  goldLight: '#EFD79E',
  teal: '#33BFA6',
  terracotta: '#C96B4A',
  text: '#F3EEE0',
  textMuted: '#93A0BE',
  textFaint: '#5D6C8C',
};

// Classic Moroccan 8-point star tessellation, used as a faint repeating watermark
const zelligeTile = (opacity = 0.35, stroke = colors.gold) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>
      <g fill='none' stroke='${stroke}' stroke-width='1' opacity='${opacity}'>
        <rect x='10' y='10' width='44' height='44' />
        <rect x='10' y='10' width='44' height='44' transform='rotate(45 32 32)' />
      </g>
    </svg>`
  )}`;

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
    { prompt: "Dark mystic forest with glowing mushrooms and cat", image: "https://www.texttoimage.org/cdn/2024/week44/an-enchanted-forest-clearing-on-halloween-night-ba-672359bdc4a75-img1.webp" },
    { prompt: "Cozy Halloween cafe street with pumpkin lanterns", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80" },
    { prompt: "Cinematic portrait of a bearded man with glasses", image: "https://www.texttoimage.org/cdn/2024/week44/a-cozy-candle-lit-caf-on-halloween-night-tucked-aw-6723597e59dd5-img1.webp" },
    { prompt: "Cartoon football squirrel player", image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&auto=format&fit=crop&q=80" },
    { prompt: "Ice elemental warrior avatar blue flames", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80" },
  ];

  const row2 = [
    { prompt: "Dreamy clouds over mountains sunset HD", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80" },
    { prompt: "Fantasy castle with multiple full moons", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80" },
    { prompt: "Cyberpunk cityscape neon lights 4k", image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80" },
    { prompt: "Abstract glowing neon geometric art", image: "https://www.texttoimage.org/cdn/2024/week48/an-endless-field-of-glass-stretches-beneath-a-sky--674b69eb50b70-img1.webp" },
    { prompt: "Vector illustration of a cool cat with sunglasses", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=80" },
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
    <div
      className="min-h-screen font-sans antialiased overflow-x-hidden"
      dir="rtl"
      style={{ backgroundColor: colors.bg, color: colors.text, fontFamily: "'Tajawal', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&family=Tajawal:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .font-display { font-family: 'Cairo', sans-serif; }
        .font-mono-en { font-family: 'IBM Plex Mono', monospace; }

        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee-row { display: flex; overflow: hidden; user-select: none; width: 100%; }
        .marquee-track { display: flex; align-items: center; gap: 1.1rem; width: max-content; flex-shrink: 0; }
        .marquee-track-left { animation: scroll-left 48s linear infinite; }
        .marquee-track-right { animation: scroll-right 48s linear infinite; }
        .marquee-row:hover .marquee-track { animation-play-state: paused; }

        .gold-focus:focus { outline: none; box-shadow: 0 0 0 2px ${colors.gold}55, 0 0 0 4px ${colors.bg}; border-color: ${colors.gold} !important; }

        ::selection { background: ${colors.gold}44; }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track-left, .marquee-track-right { animation: none; }
        }
      `}</style>

      {/* Header */}
      <header
        className="px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md"
        style={{ borderBottom: `1px solid ${colors.border}`, backgroundColor: `${colors.bg}CC` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-lg"
            style={{
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.terracotta})`,
              color: colors.bg,
              boxShadow: `0 4px 20px ${colors.gold}33`,
            }}
          >
            AI
          </div>
          <span className="font-display font-extrabold text-lg tracking-wide" style={{ color: colors.text }}>
            TextToImage
          </span>
        </div>
        
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url("${zelligeTile(0.35)}")`, backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% -10%, ${colors.gold}14, transparent 70%)` }}
        />
        <main className="relative max-w-6xl mx-auto px-6 pt-14 pb-10 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full font-mono-en"
              style={{ color: colors.goldLight, border: `1px solid ${colors.borderStrong}`, backgroundColor: `${colors.gold}0F` }}
            >
              <Wand2 className="w-3.5 h-3.5" /> FLUX ENGINE
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight" style={{ color: colors.text }}>
              تحويل الأفكار إلى{' '}
              <span
                style={{
                  background: `linear-gradient(90deg, ${colors.gold}, ${colors.terracotta})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                صور بذكاء عالٍ
              </span>
            </h1>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: colors.textMuted }}>
              اكتب وصفك باللغة العربية أو الإنجليزية واحصل على صور فائقة الدقة خلال ثوانٍ معدودة.
            </p>
          </div>

          {/* Generator Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Form */}
            <div
              className="p-6 sm:p-7 rounded-2xl space-y-5"
              style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, boxShadow: '0 20px 50px -20px rgba(0,0,0,0.5)' }}
            >
              <form onSubmit={handleGenerate} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.textMuted }}>
                    وصف الصورة
                  </label>
                  <textarea
                    rows="4"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="تاجر مغربي فـ سوق قديم، مليء بالألوان والتفاصيل الدقيقة..."
                    className="w-full rounded-xl p-3.5 text-sm transition gold-focus"
                    style={{
                      backgroundColor: colors.bg,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                  />
                </div>

                {/* Quick Prompts */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold block" style={{ color: colors.textFaint }}>جرب أفكار سريعة:</span>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setPrompt(item.prompt)}
                        className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer font-medium"
                        style={{
                          backgroundColor: colors.cardSoft,
                          border: `1px solid ${colors.border}`,
                          color: colors.textMuted,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = colors.gold;
                          e.currentTarget.style.color = colors.goldLight;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = colors.border;
                          e.currentTarget.style.color = colors.textMuted;
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full mt-1 font-display font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    background: `linear-gradient(90deg, ${colors.gold}, ${colors.terracotta})`,
                    color: colors.bg,
                    boxShadow: `0 12px 30px -10px ${colors.gold}55`,
                  }}
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
            <div
              className="p-6 sm:p-7 rounded-2xl flex flex-col justify-between min-h-[440px]"
              style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, boxShadow: '0 20px 50px -20px rgba(0,0,0,0.5)' }}
            >
              <div
                className="flex-1 flex items-center justify-center rounded-xl p-4 overflow-hidden"
                style={{ border: `1px dashed ${colors.border}`, backgroundColor: colors.bg }}
              >
                {isLoading ? (
                  <div className="text-center space-y-3">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto" style={{ color: colors.gold }} />
                    <p className="text-sm" style={{ color: colors.textMuted }}>الذكاء الاصطناعي يرسم أفكارك فـ ثوانٍ...</p>
                  </div>
                ) : imageUrl ? (
                  <img src={imageUrl} alt="AI Result" className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <div className="text-center space-y-2">
                    <ImageIcon className="w-12 h-12 mx-auto opacity-40" style={{ color: colors.gold }} />
                    <p className="text-sm" style={{ color: colors.textFaint }}>أدخل النص أو اختر إحدى الأفكار وابدأ التوليد</p>
                  </div>
                )}
              </div>

              {imageUrl && !isLoading && (
                <div className="mt-4 flex gap-3">
                  <a
                    href={imageUrl}
                    download="flux-ai-image.png"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition"
                    style={{ backgroundColor: colors.teal, color: colors.bg }}
                  >
                    <Download className="w-4 h-4" /> تحميل الصورة
                  </a>
                </div>
              )}
            </div>
          </div>
        </main>
      </section>

      {/* Gallery Showcase */}
      <section className="py-14 space-y-8 overflow-hidden" style={{ borderTop: `1px solid ${colors.border}` }}>
        <div className="text-center space-y-2 px-6">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold" style={{ color: colors.text }}>
            نماذج تم إنشاؤها بالذكاء الاصطناعي
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px" style={{ backgroundColor: colors.borderStrong }} />
            <p className="text-xs" style={{ color: colors.textFaint }}>انقر على أي تصويرة لاستخدام الوصف الخاص بها</p>
            <span className="w-8 h-px" style={{ backgroundColor: colors.borderStrong }} />
          </div>
        </div>

        <div className="space-y-5" dir="ltr">
          {/* Row 1 */}
          <div className="marquee-row">
            <div className="marquee-track marquee-track-left">
              {[...row1, ...row1].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setPrompt(item.prompt)}
                  className="w-64 sm:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden relative flex-shrink-0 cursor-pointer group transition-all duration-300"
                  style={{ border: `1px solid ${colors.border}` }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.gold)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border)}
                >
                  <img src={item.image} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end"
                    style={{ background: `linear-gradient(to top, ${colors.bg}F2, transparent 60%)` }}
                  >
                    <p className="text-xs line-clamp-3 font-mono-en" style={{ color: colors.goldLight }}>{item.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="marquee-row">
            <div className="marquee-track marquee-track-right">
              {[...row2, ...row2].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setPrompt(item.prompt)}
                  className="w-64 sm:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden relative flex-shrink-0 cursor-pointer group transition-all duration-300"
                  style={{ border: `1px solid ${colors.border}` }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.terracotta)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border)}
                >
                  <img src={item.image} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end"
                    style={{ background: `linear-gradient(to top, ${colors.bg}F2, transparent 60%)` }}
                  >
                    <p className="text-xs line-clamp-3 font-mono-en" style={{ color: colors.goldLight }}>{item.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${colors.border}`, backgroundColor: colors.bgSoft }}>
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-base"
                style={{ background: `linear-gradient(135deg, ${colors.gold}, ${colors.terracotta})`, color: colors.bg }}
              >
                AI
              </div>
              <span className="font-display font-extrabold text-base" style={{ color: colors.text }}>
                TextToImage
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: colors.textFaint }}>
              أداة ذكاء اصطناعي لتوليد صور فائقة الدقة انطلاقاً من وصف نصي بالعربية أو الإنجليزية.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold" style={{ color: colors.textMuted }}>روابط سريعة</h3>
            <ul className="space-y-2 text-sm" style={{ color: colors.textFaint }}>
              <li><a href="#" className="hover:underline transition" style={{ color: 'inherit' }}>الرئيسية</a></li>
              <li><a href="#" className="hover:underline transition" style={{ color: 'inherit' }}>الأسعار</a></li>
              <li><a href="#" className="hover:underline transition" style={{ color: 'inherit' }}>الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:underline transition" style={{ color: 'inherit' }}>اتصل بنا</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold" style={{ color: colors.textMuted }}>قانوني</h3>
            <ul className="space-y-2 text-sm" style={{ color: colors.textFaint }}>
              <li><a href="#" className="hover:underline transition" style={{ color: 'inherit' }}>شروط الاستخدام</a></li>
              <li><a href="#" className="hover:underline transition" style={{ color: 'inherit' }}>سياسة الخصوصية</a></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${colors.border}` }}>
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: colors.textFaint }}>
            <p>© {new Date().getFullYear()} AI TextToImage. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}