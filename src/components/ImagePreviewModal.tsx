import React from 'react';
import { Download, Copy, X } from 'lucide-react';
import { playHapticEffect } from '../utils/date';

interface ImagePreviewModalProps {
  imageSrc: string | null;
  onClose: () => void;
  onShowAlert: (msg: string, icon?: string) => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  imageSrc,
  onClose,
  onShowAlert,
}) => {
  if (!imageSrc) return null;

  const handleDownload = () => {
    playHapticEffect();
    const link = document.createElement('a');
    const today = new Date().toISOString().slice(0, 10);
    link.download = `交班事項_${today}.png`;
    link.href = imageSrc;
    link.click();
    onShowAlert('📥 圖片已開始下載儲存囉！', '🎉');
  };

  const handleCopyImage = async () => {
    playHapticEffect();
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        onShowAlert('📋 圖片已複製到您的剪貼簿！可直接貼上至 LINE 或通訊軟體', '✨');
      } else {
        handleDownload();
      }
    } catch {
      handleDownload();
    }
  };

  return (
    <div
      id="image-output-container"
      className="w-full max-w-md mt-4 transition-all duration-300"
    >
      <div
        className="border-2 p-4 rounded-2xl text-center shadow-lg transition-all"
        style={{
          backgroundColor: '#fff8f0',
          borderColor: '#f4a261',
        }}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#f4a261]/30">
          <span className="text-[#d64045] text-xs font-bold flex items-center gap-1">
            <span>✨</span> 成果圖片已生成
          </span>
          <button
            id="btn-close-image-top"
            type="button"
            onClick={() => {
              playHapticEffect();
              onClose();
            }}
            className="text-[#8d6e63] hover:text-[#d64045] p-1 rounded-lg hover:bg-[#f4a261]/20 transition-all"
            aria-label="關閉"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[#d64045] text-xs font-bold mb-3">
          👇 長按圖片(手機) 或 右鍵(電腦) 即可快速分享或儲存圖片
        </p>

        <div className="relative overflow-hidden rounded-xl border-2 border-[#e07a5f] shadow-lg mb-3 bg-[#fffdf9]">
          <img
            id="final-display-img"
            src={imageSrc}
            alt="交班事項"
            className="w-full block select-all cursor-pointer"
          />
        </div>

        {/* Action Buttons for Image */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            id="btn-download-image"
            type="button"
            onClick={handleDownload}
            className="btn-store text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>直接下載圖片</span>
          </button>
          <button
            id="btn-copy-image"
            type="button"
            onClick={handleCopyImage}
            className="btn-store text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            style={{ backgroundColor: '#81b29a', borderColor: '#a3c4bc' }}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>複製圖片檔案</span>
          </button>
        </div>

        <button
          id="btn-close-image-bottom"
          type="button"
          onClick={() => {
            playHapticEffect();
            onClose();
          }}
          className="w-full mt-1 text-xs text-[#5c4033] bg-[#f4a261]/20 hover:bg-[#f4a261]/35 px-3 py-2 rounded-xl border border-[#f4a261]/40 transition-all font-bold"
        >
          ✕ 關閉圖片預覽
        </button>
      </div>
    </div>
  );
};
