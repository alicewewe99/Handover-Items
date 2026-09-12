import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { HandoverDateItem, HandoverGroup, ModalState } from './types';
import { getTodayString, formatDate, playHapticEffect } from './utils/date';
import { CaptureBoard } from './components/CaptureBoard';
import { DateList } from './components/DateList';
import { GroupList } from './components/GroupList';
import { CustomModal } from './components/CustomModal';
import { ImagePreviewModal } from './components/ImagePreviewModal';
import { HedgehogMascot } from './components/HedgehogMascot';
import { ClipboardCopy, Camera, Trash2, Sparkles, Store } from 'lucide-react';

const STORAGE_KEY_DATES = 'store_shift_dates';
const STORAGE_KEY_GROUPS = 'store_shift_groups';

export default function App() {
  const [dates, setDates] = useState<HandoverDateItem[]>([]);
  const [groups, setGroups] = useState<HandoverGroup[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    message: '',
    icon: 'hedgehog',
    type: 'alert',
  });

  const captureRef = useRef<HTMLDivElement>(null);
  const imageOutputRef = useRef<HTMLDivElement>(null);

  // Initialize data from localStorage or defaults
  useEffect(() => {
    let initialDates: HandoverDateItem[] = [];
    let initialGroups: HandoverGroup[] = [];

    try {
      const savedDates = localStorage.getItem(STORAGE_KEY_DATES);
      if (savedDates) {
        const parsed = JSON.parse(savedDates);
        if (Array.isArray(parsed) && parsed.length > 0) {
          initialDates = parsed.map((d: string, idx: number) => ({
            id: `date-${idx}-${Date.now()}`,
            date: d,
          }));
        }
      }
    } catch {
      // Fallback
    }

    if (initialDates.length === 0) {
      initialDates = [{ id: `date-${Date.now()}`, date: getTodayString() }];
    }

    try {
      const savedGroups = localStorage.getItem(STORAGE_KEY_GROUPS);
      if (savedGroups) {
        const parsed = JSON.parse(savedGroups);
        if (Array.isArray(parsed) && parsed.length > 0) {
          initialGroups = parsed.map(
            (g: { name: string; task: string }, idx: number) => ({
              id: `group-${idx}-${Date.now()}`,
              name: g.name || '',
              task: g.task || '',
            })
          );
        }
      }
    } catch {
      // Fallback
    }

    if (initialGroups.length === 0) {
      initialGroups = [
        {
          id: `group-${Date.now()}`,
          name: '',
          task: '',
        },
      ];
    }

    setDates(initialDates);
    setGroups(initialGroups);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (dates.length > 0) {
      const rawDates = dates.map((d) => d.date);
      localStorage.setItem(STORAGE_KEY_DATES, JSON.stringify(rawDates));
    }
  }, [dates]);

  useEffect(() => {
    if (groups.length > 0) {
      const rawGroups = groups.map((g) => ({ name: g.name, task: g.task }));
      localStorage.setItem(STORAGE_KEY_GROUPS, JSON.stringify(rawGroups));
    }
  }, [groups]);

  // Modal helpers
  const showAlert = (message: string, icon = 'hedgehog') => {
    playHapticEffect();
    setModal({
      isOpen: true,
      message,
      icon,
      type: 'alert',
    });
  };

  const showConfirm = (message: string, onConfirm: () => void, icon = '⚠️') => {
    playHapticEffect();
    setModal({
      isOpen: true,
      message,
      icon,
      type: 'confirm',
      onConfirm,
    });
  };

  const closeModal = () => {
    playHapticEffect();
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Date handlers
  const handleAddDate = (val = '') => {
    playHapticEffect();
    setDates((prev) => [...prev, { id: `date-${Date.now()}`, date: val }]);
  };

  const handleRemoveDate = (id: string) => {
    playHapticEffect();
    setDates((prev) => prev.filter((d) => d.id !== id));
  };

  const handleUpdateDate = (id: string, val: string) => {
    setDates((prev) =>
      prev.map((d) => (d.id === id ? { ...d, date: val } : d))
    );
  };

  const handleClearDates = () => {
    playHapticEffect();
    setDates([{ id: `date-${Date.now()}`, date: getTodayString() }]);
  };

  // Group handlers
  const handleAddGroup = (name = '', task = '') => {
    playHapticEffect();
    setGroups((prev) => [
      ...prev,
      { id: `group-${Date.now()}`, name, task },
    ]);
  };

  const handleRemoveGroup = (id: string) => {
    playHapticEffect();
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const handleUpdateGroup = (
    id: string,
    field: 'name' | 'task',
    value: string
  ) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  // Copy all content
  const copyAll = async () => {
    playHapticEffect();
    let datesText = '';
    dates.forEach((d) => {
      if (d.date.trim()) {
        datesText += `🗓️ ${formatDate(d.date)}\n`;
      }
    });

    let groupText = '';
    groups.forEach((g) => {
      const nameVal = g.name.trim();
      const taskVal = g.task.trim();
      if (nameVal || taskVal) {
        groupText += `🧑🍳 姓名：${nameVal || '未填'}\n📌 事項：\n${taskVal || '無'}\n\n`;
      }
    });

    const final = `🌟 交班事項 🌟\n日期：\n${datesText || '未填日期\n'}\n${groupText || '尚無交班事項'}`.trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(final);
        showAlert('📋 交班內容與可愛 Emoji 已成功複製到剪貼簿！', '🎉');
        return;
      }
    } catch {
      // Fallback
    }

    const ta = document.createElement('textarea');
    ta.value = final;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showAlert('📋 交班內容與可愛 Emoji 已成功複製到剪貼簿！', '🎉');
    } catch {
      showAlert('複製失敗，請手動選取文字複製。', '❌');
    }
    document.body.removeChild(ta);
  };

  // Generate Image via html2canvas
  const generateFinalImage = async () => {
    if (!captureRef.current) return;
    playHapticEffect();
    setIsCapturing(true);

    try {
      const canvas = await html2canvas(captureRef.current, {
        scale: 3,
        backgroundColor: '#fffdf9',
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      setGeneratedImage(dataUrl);

      setTimeout(() => {
        imageOutputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      showAlert('✨ 雜貨小舖交班圖片已順利生成！', '📸');
    } catch {
      showAlert('產生成品圖片失敗，請稍後再試。', '❌');
    } finally {
      setIsCapturing(false);
    }
  };

  // Reset all
  const resetAllData = () => {
    playHapticEffect();
    showConfirm(
      '確定要清空所有填寫內容嗎？此動作將還原為初始狀態。',
      () => {
        localStorage.removeItem(STORAGE_KEY_DATES);
        localStorage.removeItem(STORAGE_KEY_GROUPS);
        setDates([{ id: `date-${Date.now()}`, date: getTodayString() }]);
        setGroups([{ id: `group-${Date.now()}`, name: '', task: '' }]);
        setGeneratedImage(null);
        showAlert('🧹 已清空所有內容，重設為今日空白交班卡。', '✨');
      },
      '🧹'
    );
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-20 px-4 min-h-screen">
      {/* Top Header */}
      <header className="w-full max-w-md mb-4 text-center flex flex-col items-center">
        {/* Hedgehog Mascot holding chalkboard: 交班 */}
        <div className="mb-2 transition-transform hover:scale-105 drop-shadow-md">
          <HedgehogMascot size={78} showHalo={true} />
        </div>

        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#e07a5f]/10 text-[#d64045] text-xs font-bold mb-1.5">
          <Store className="w-3.5 h-3.5" />
          <span>雜貨小舖風格交班系統</span>
        </div>

        <h1
          id="app-title"
          className="text-2xl sm:text-3xl font-bold tracking-wider flex items-center justify-center gap-2"
          style={{ color: '#d64045' }}
        >
          <span>交班事項</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#8d6e63] mt-1 font-medium">
          溫馨繽紛雜貨店風格，即時預覽與輕鬆打包交班
        </p>
      </header>

      {/* Real-time Preview Bulletin Board Section */}
      <section id="preview-section" className="w-full max-w-md mb-5">
        <div className="flex items-center justify-between px-1 mb-1.5">
          <span className="text-xs font-bold text-[#8d6e63] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#f4a261]" />
            <span>即時交班黑板預覽：</span>
          </span>
          <span className="text-[11px] text-[#e07a5f] font-semibold">
            {isCapturing ? '📷 圖片生成中...' : '即時同步更新'}
          </span>
        </div>

        <CaptureBoard ref={captureRef} dates={dates} groups={groups} />

        {/* Generated Image Preview Area */}
        <div ref={imageOutputRef}>
          <ImagePreviewModal
            imageSrc={generatedImage}
            onClose={() => setGeneratedImage(null)}
            onShowAlert={showAlert}
          />
        </div>
      </section>

      {/* Editing Form Controls */}
      <main className="w-full max-w-md space-y-4">
        {/* Date Picker Section */}
        <DateList
          dates={dates}
          onAddDate={handleAddDate}
          onRemoveDate={handleRemoveDate}
          onUpdateDate={handleUpdateDate}
          onClearDates={handleClearDates}
          onShowAlert={showAlert}
        />

        {/* Handover Groups Section */}
        <GroupList
          groups={groups}
          onAddGroup={handleAddGroup}
          onRemoveGroup={handleRemoveGroup}
          onUpdateGroup={handleUpdateGroup}
          onShowAlert={showAlert}
        />

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            id="btn-copy-all"
            type="button"
            onClick={copyAll}
            className="btn-store text-white py-3 px-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <ClipboardCopy className="w-4 h-4" />
            <span>複製全部內容</span>
          </button>

          <button
            id="btn-generate-image"
            type="button"
            onClick={generateFinalImage}
            disabled={isCapturing}
            className="btn-store text-white py-3 px-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-75"
            style={{ backgroundColor: '#d64045', borderColor: '#f4a261' }}
          >
            <Camera className="w-4 h-4" />
            <span>{isCapturing ? '生成處理中...' : '產生圖片下載'}</span>
          </button>
        </div>

        {/* Reset All Data Button */}
        <button
          id="btn-reset-all"
          type="button"
          onClick={resetAllData}
          className="w-full bg-[#f4a261]/10 hover:bg-[#f4a261]/25 text-[#d64045] border border-[#f4a261]/40 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:border-[#e07a5f]"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>清空所有填寫內容</span>
        </button>

        <footer className="pt-4 text-center text-xs text-[#a08d81] select-none">
          溫馨雜貨小舖交班小工具 • 支援離線暫存與圖片產生
        </footer>
      </main>

      {/* Global Toast / Modal */}
      <CustomModal modal={modal} onClose={closeModal} />
    </div>
  );
}
