import React, { useState } from 'react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { playHapticEffect } from '../utils/date';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running inside standalone PWA mode, show subtle badge or hide
  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#81b29a] bg-[#81b29a]/15 px-2.5 py-1 rounded-full border border-[#81b29a]/30">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>已安裝為桌面應用程式</span>
      </div>
    );
  }

  // Chromium / Android / Desktop PWA installation flow
  if (isInstallable) {
    return (
      <button
        id="btn-pwa-install"
        type="button"
        onClick={() => {
          playHapticEffect();
          install();
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-white transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
        style={{
          backgroundColor: '#e07a5f',
          borderColor: '#f4a261',
          borderWidth: '2px',
        }}
      >
        <img
          src="/hedgehog-handover.svg"
          alt="刺蝟"
          className="w-4 h-4 object-contain"
        />
        <span>安裝到桌面</span>
        <Download className="w-3.5 h-3.5" />
      </button>
    );
  }

  // iOS Safari flow (guided manual add to home screen)
  if (isIOS) {
    return (
      <>
        <button
          id="btn-pwa-ios-guide"
          type="button"
          onClick={() => {
            playHapticEffect();
            setShowIOSGuide(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#7c4d32] bg-[#f4a261]/20 hover:bg-[#f4a261]/30 border border-[#f4a261]/40 transition-all cursor-pointer"
        >
          <img
            src="/hedgehog-handover.svg"
            alt="刺蝟"
            className="w-4 h-4 object-contain"
          />
          <span>加到 iPhone 桌面</span>
          <Smartphone className="w-3 h-3 text-[#e07a5f]" />
        </button>

        {showIOSGuide && (
          <div
            id="ios-pwa-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-xs rounded-3xl bg-[#fffdf9] p-5 shadow-2xl border-4 text-center space-y-3.5 animate-in fade-in zoom-in duration-200"
              style={{ borderColor: '#e07a5f' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center">
                <img
                  src="/pwa-192x192.png"
                  alt="刺蝟拿著看板：交班"
                  className="w-16 h-16 rounded-2xl shadow-md border-2 border-[#f4a261]"
                />
              </div>

              <h3 className="text-base font-bold text-[#d64045]">
                將交班小幫手加到桌面
              </h3>

              <div className="bg-[#fff8f0] p-3 rounded-xl border border-[#f4a261]/40 text-xs text-[#5c4033] text-left space-y-2 leading-relaxed font-medium">
                <p className="flex items-start gap-1.5">
                  <span className="font-bold text-[#e07a5f]">1.</span>
                  <span>
                    點擊 Safari 底部工具列的<strong>「分享」按鈕</strong>（帶箭頭的正方形圖示）。
                  </span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="font-bold text-[#e07a5f]">2.</span>
                  <span>
                    在選單中向下捲動，點擊<strong>「加入主畫面」</strong>。
                  </span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="font-bold text-[#e07a5f]">3.</span>
                  <span>
                    右上角點擊<strong>「新增」</strong>，即可在手機桌面上擁有專屬的刺蝟交班圖示囉！
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  playHapticEffect();
                  setShowIOSGuide(false);
                }}
                className="w-full btn-store text-white py-2 rounded-xl text-xs font-bold"
              >
                我知道了！
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Generic desktop / browser fallback button to show icon & prompt
  return (
    <button
      id="btn-pwa-preview-icon"
      type="button"
      onClick={() => {
        playHapticEffect();
        setShowIOSGuide(true);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#7c4d32] bg-[#f4a261]/20 hover:bg-[#f4a261]/30 border border-[#f4a261]/40 transition-all cursor-pointer"
    >
      <img
        src="/pwa-192x192.png"
        alt="刺蝟拿看板交班"
        className="w-4 h-4 rounded-md object-contain"
      />
      <span>桌面 PWA 圖示</span>
    </button>
  );
};
