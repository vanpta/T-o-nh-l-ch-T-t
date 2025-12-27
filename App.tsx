
import React, { useState, useRef, useMemo } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Download, 
  Settings2, 
  Image as ImageIcon,
  Loader2,
  Calendar as CalendarIcon,
  CheckCircle2,
  Layers,
  UserCircle,
  Flower2,
  Palette,
  Briefcase,
  Gem,
  Zap,
  Shirt
} from 'lucide-react';
import { 
  AspectRatio, 
  StylePreset, 
  Costume,
  CalendarMode,
  GenerationSettings, 
  GeneratedResult 
} from './types';
import { generateArtisticImage } from './services/geminiService';
import { applyCalendarOverlay } from './utils/canvasUtils';
import { VIETNAMESE_MONTHS } from './constants';

const App: React.FC = () => {
  const [settings, setSettings] = useState<GenerationSettings>({
    aspectRatio: AspectRatio.PORTRAIT,
    style: StylePreset.PEACH_MIST,
    costume: Costume.LUXURY_RED_VELVET,
    prompt: "",
    calendarMode: CalendarMode.SINGLE_MONTH,
    selectedMonth: new Date().getFullYear() === 2026 ? new Date().getMonth() : 0
  });
  
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApplyingCalendar, setIsApplyingCalendar] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [isCalendarApplied, setIsCalendarApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReferenceImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!referenceImage) {
      setError("Vui lòng tải lên ảnh chân dung rõ mặt.");
      return;
    }
    setIsGenerating(true);
    setError(null);
    setIsCalendarApplied(false);
    try {
      const aiImageUrl = await generateArtisticImage(
        referenceImage,
        settings.style,
        settings.costume,
        settings.prompt,
        settings.aspectRatio
      );
      setResult({ imageUrl: aiImageUrl, timestamp: new Date().toISOString() });
    } catch (err: any) {
      setError(err.message || "Lỗi tạo ảnh. Vui lòng kiểm tra API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddCalendar = async () => {
    if (!result || isCalendarApplied) return;
    setIsApplyingCalendar(true);
    try {
      const updatedImageUrl = await applyCalendarOverlay(result.imageUrl, settings.calendarMode, settings.selectedMonth);
      setResult({ ...result, imageUrl: updatedImageUrl });
      setIsCalendarApplied(true);
    } catch (err) {
      setError("Lỗi ghép lịch.");
    } finally {
      setIsApplyingCalendar(false);
    }
  };

  const groupedStyles = useMemo<Record<string, StylePreset[]>>(() => ({
    "Thiên nhiên": [StylePreset.PEACH_MIST, StylePreset.YELLOW_APRICOT, StylePreset.MUSTARD_FIELD],
    "Hoài niệm": [StylePreset.HANOI_OLD_STREET, StylePreset.ANCIENT_TEMPLE, StylePreset.HUE_IMPERIAL, StylePreset.NORTHERN_HOUSE],
    "Văn hóa": [StylePreset.CALLIGRAPHY_STREET, StylePreset.INCENSE_VILLAGE, StylePreset.LANTERN_STREET, StylePreset.BANH_CHUNG_KITCHEN],
    "Nghệ thuật": [StylePreset.MINIMAL_RED_STUDIO, StylePreset.ETHEREAL_SILK, StylePreset.RETRO_SAIGON, StylePreset.VINTAGE_TAILOR]
  }), []);

  const groupedCostumes = useMemo<Record<string, {items: Costume[], icon: any}>>(() => ({
    "Truyền Thống": {
      items: [Costume.LUXURY_RED_VELVET, Costume.PURE_WHITE_SILK, Costume.NHAT_BINH_ROYAL, Costume.AO_TAC_CLASSIC],
      icon: UserCircle
    },
    "Công Sở": {
      items: [Costume.OFFICE_SILK_SUIT, Costume.BLAZER_MINIMALIST, Costume.SILK_SHIRT_TROUSERS],
      icon: Briefcase
    },
    "Tiểu Thư": {
      items: [Costume.TWEED_LUXURY, Costume.DRAPED_SILK_GOWN, Costume.COQUETTE_LACE_DRESS, Costume.PARISIAN_CHIC],
      icon: Gem
    },
    "Cá Tính": {
      items: [Costume.CYBER_TET_TECHWEAR, Costume.LEATHER_JACKET_CHIC, Costume.AVANT_GARDE_FUSION, Costume.DENIM_RECONSTRUCTED],
      icon: Zap
    },
    "Streetwear": {
      items: [Costume.STREET_OVERSIZE_TET, Costume.BOMBER_TRADITIONAL, Costume.STREET_CARGO_CHIC, Costume.VINTAGE_STREET_HANOI],
      icon: Shirt
    },
    "Dân Gian & Khác": {
      items: [Costume.MODERN_PUFFY_SLEEVE, Costume.YEM_FOLK, Costume.MODERN_AO_BA_BA],
      icon: Palette
    }
  }), []);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row text-white font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-[420px] bg-[#111111] border-r border-white/5 p-6 overflow-y-auto max-h-screen custom-scrollbar flex flex-col gap-8 shadow-2xl">
        <header className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bính Ngọ Architect</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">L'Art de l'Intelligence Artificielle</p>
          </div>
        </header>

        <div className="space-y-8">
          {/* Aspect Ratio */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Settings2 size={14} /> Cấu hình khung hình
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(AspectRatio).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setSettings(s => ({...s, aspectRatio: ratio}))}
                  className={`py-2 text-xs rounded-lg border transition-all ${settings.aspectRatio === ratio ? 'bg-red-600 border-red-500 text-white shadow-md' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </section>

          {/* Costume Selection */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Shirt size={14} /> Tùy chọn Trang phục (30+)
            </h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {(Object.entries(groupedCostumes) as [string, {items: Costume[], icon: any}][]).map(([group, {items, icon: Icon}]) => (
                <div key={group} className="space-y-2">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase ml-1 flex items-center gap-1.5">
                    <Icon size={10} /> {group}
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {items.map(item => (
                      <button
                        key={item}
                        onClick={() => setSettings(s => ({...s, costume: item}))}
                        className={`text-left px-3 py-2 text-xs rounded-lg border flex items-center justify-between transition-all ${settings.costume === item ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                      >
                        <span className="truncate mr-2">{item}</span>
                        {settings.costume === item && <CheckCircle2 size={12} className="shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Style Selection */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Flower2 size={14} /> Bối cảnh mùa xuân
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {(Object.entries(groupedStyles) as [string, StylePreset[]][]).map(([group, items]) => (
                <div key={group} className="space-y-2">
                  <p className="text-[10px] font-bold text-zinc-600 uppercase ml-1">{group}</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {items.map(item => (
                      <button
                        key={item}
                        onClick={() => setSettings(s => ({...s, style: item}))}
                        className={`text-left px-3 py-2 text-xs rounded-lg border flex items-center justify-between transition-all ${settings.style === item ? 'bg-orange-600 border-orange-500 text-white shadow-lg' : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                      >
                        <span className="truncate mr-2">{item}</span>
                        {settings.style === item && <CheckCircle2 size={12} className="shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-auto pt-4 border-t border-white/5 text-center">
          <p className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
            <Layers size={10} /> Powered by Gemini Vision & Tet Architect
          </p>
        </footer>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <h2 className="text-5xl font-serif-luxury tracking-tight">Ký Ức Bính Ngọ</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-600/10 text-red-500 rounded-full text-[10px] font-black border border-red-500/20 uppercase tracking-wider">{settings.costume}</span>
                <span className="px-3 py-1 bg-orange-600/10 text-orange-500 rounded-full text-[10px] font-black border border-orange-500/20 uppercase tracking-wider">{settings.style}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-2xl border border-white/5 transition-all text-sm font-bold shadow-xl"
              >
                <Upload size={18} className="text-zinc-400" /> Tải chân dung
              </button>
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              
              <button 
                disabled={isGenerating || !referenceImage}
                onClick={handleGenerate}
                className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:from-zinc-800 disabled:to-zinc-900 px-8 py-3 rounded-2xl text-sm font-black shadow-2xl shadow-red-900/30 transition-all scale-100 hover:scale-[1.02] active:scale-95"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                {isGenerating ? "ĐANG KIẾN TẠO..." : "KHỞI TẠO NGHỆ THUẬT"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Input & Calendar Configuration */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#111111] rounded-[2.5rem] overflow-hidden aspect-square flex items-center justify-center border border-white/5 shadow-inner relative group">
                {referenceImage ? (
                  <img src={referenceImage} alt="Input" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-12 space-y-4">
                    <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto border border-white/5 shadow-lg">
                      <ImageIcon className="text-zinc-700" size={32} />
                    </div>
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest leading-relaxed">Identity Preservation Engine<br/>Cần ảnh rõ mặt</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <Camera size={40} className="text-white/20" />
                </div>
              </div>

              {/* Calendar Control Panel */}
              <div className="space-y-6 bg-[#111111] p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <CalendarIcon size={12} /> Chế độ lịch 2026
                  </label>
                  <div className="flex gap-2 p-1 bg-black/30 rounded-xl">
                    {Object.values(CalendarMode).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSettings(s => ({...s, calendarMode: mode}))}
                        className={`flex-1 py-2 text-[10px] rounded-lg font-bold transition-all ${settings.calendarMode === mode ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {settings.calendarMode === CalendarMode.SINGLE_MONTH && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Chọn tháng cụ thể</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {VIETNAMESE_MONTHS.map((monthName, index) => (
                        <button
                          key={monthName}
                          onClick={() => setSettings(s => ({...s, selectedMonth: index}))}
                          className={`py-2.5 text-[10px] font-black rounded-lg border transition-all ${settings.selectedMonth === index ? 'bg-red-600 border-red-500 text-white' : 'bg-black/20 border-white/5 text-zinc-500 hover:border-zinc-700'}`}
                        >
                          T.{index + 1}
                        </button>
                      ))}
                    </div>
                    <p className="text-[9px] text-center text-zinc-600 font-medium italic">Đang chọn: {VIETNAMESE_MONTHS[settings.selectedMonth]}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Ghi chú nghệ thuật (Tùy chọn)</label>
                <textarea 
                  value={settings.prompt}
                  onChange={(e) => setSettings(s => ({...s, prompt: e.target.value}))}
                  placeholder="Ví dụ: Ánh mắt sâu thẳm, nụ cười nhẹ nhàng, bối cảnh thêm mưa xuân nhè nhẹ..."
                  className="w-full bg-[#111111] border border-white/5 rounded-2xl p-5 text-sm focus:outline-none focus:border-red-500/30 transition-all h-24 resize-none shadow-2xl custom-scrollbar"
                />
              </div>
            </div>

            {/* Right: Output */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#111111] rounded-[2.5rem] overflow-hidden min-h-[600px] flex items-center justify-center border border-white/5 shadow-2xl relative">
                {isGenerating ? (
                  <div className="text-center space-y-8 animate-pulse">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full"></div>
                      <Sparkles className="w-16 h-16 text-red-600 mx-auto relative z-10 animate-bounce" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-3xl font-serif-luxury text-white">Đang vẽ nên mùa xuân...</p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Identity Preservation Engine Active</p>
                    </div>
                  </div>
                ) : result ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-black/20 p-4">
                    <img 
                      src={result.imageUrl} 
                      alt="Output" 
                      className="max-h-[80vh] w-auto rounded-xl shadow-2xl transition-all duration-1000 object-contain"
                    />
                    
                    <div className="absolute bottom-8 flex gap-4">
                      <button 
                        onClick={() => {
                          const a = document.createElement('a');
                          a.href = result.imageUrl;
                          a.download = `Tet-Binh-Ngo-${Date.now()}.png`;
                          a.click();
                        }}
                        className="bg-white text-black px-8 py-4 rounded-2xl flex items-center gap-3 font-black shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm"
                      >
                        <Download size={20} /> TẢI KIỆT TÁC
                      </button>
                      
                      {!isCalendarApplied && (
                        <button 
                          onClick={handleAddCalendar}
                          disabled={isApplyingCalendar}
                          className="bg-red-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm border border-red-400/20"
                        >
                          {isApplyingCalendar ? <Loader2 className="animate-spin" size={20} /> : <CalendarIcon size={20} />}
                          {isApplyingCalendar ? "ĐANG GHÉP..." : `IN LỊCH ${settings.calendarMode === CalendarMode.SINGLE_MONTH ? (settings.selectedMonth + 1) : '2026'}`}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-20 opacity-20 group">
                    <Palette className="w-24 h-24 text-zinc-600 mx-auto mb-8 group-hover:text-red-600 transition-colors duration-1000" />
                    <p className="font-serif-luxury text-3xl italic">Mùa Xuân Bính Ngọ đang chờ bạn kiến tạo</p>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl text-red-400 text-sm flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500 font-bold">!</div>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}</style>
    </div>
  );
};

export default App;
