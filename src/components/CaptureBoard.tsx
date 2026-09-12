import React, { forwardRef } from 'react';
import { HandoverDateItem, HandoverGroup } from '../types';
import { formatDate } from '../utils/date';
import { HedgehogMascot } from './HedgehogMascot';

interface CaptureBoardProps {
  dates: HandoverDateItem[];
  groups: HandoverGroup[];
}

export const CaptureBoard = forwardRef<HTMLDivElement, CaptureBoardProps>(
  ({ dates, groups }, ref) => {
    const validDates = dates.filter((d) => d.date.trim() !== '');
    const validGroups = groups.filter(
      (g) => g.name.trim() !== '' || g.task.trim() !== ''
    );

    return (
      <div
        id="capture-area"
        ref={ref}
        className="store-board w-full p-6 relative select-none"
        style={{
          backgroundColor: '#fffdf9',
          borderColor: '#e07a5f',
          boxSizing: 'border-box',
        }}
      >
        {/* Hedgehog Mascot holding chalkboard: 交班 */}
        <div
          className="absolute right-3.5 top-3.5 pointer-events-none select-none drop-shadow-sm transition-transform hover:scale-105"
          aria-hidden="true"
        >
          <HedgehogMascot size={58} showHalo={true} />
        </div>

        {/* Board Title */}
        <div className="pr-14 mb-4 pb-2 border-b-2 border-dashed border-[#f4a261]/50 flex items-center gap-2">
          <h2
            className="font-bold tracking-wider text-xl sm:text-2xl"
            style={{ color: '#d64045' }}
          >
            🌟 交班事項 🌟
          </h2>
        </div>

        {/* Dates Section */}
        <div
          className="text-sm sm:text-base mb-1 font-bold flex items-center gap-1"
          style={{ color: '#e07a5f' }}
        >
          <span>📅</span> 日期：
        </div>
        <div className="space-y-1 mb-4 pl-4 text-sm sm:text-base font-medium" style={{ color: '#3d405b' }}>
          {validDates.length > 0 ? (
            validDates.map((item) => (
              <div key={item.id} className="leading-relaxed flex items-center gap-1.5">
                <span>🗓️</span>
                <span>{formatDate(item.date)}</span>
              </div>
            ))
          ) : (
            <div className="text-stone-400 italic">🗓️ 尚未選擇日期</div>
          )}
        </div>

        {/* Handover Groups Section */}
        <div
          className="text-sm sm:text-base pt-3 mb-2 font-bold flex items-center gap-1"
          style={{
            color: '#e07a5f',
            borderTop: '1px solid rgba(244, 162, 97, 0.4)',
          }}
        >
          <span>📝</span> 交班內容：
        </div>

        <div className="space-y-3 mt-1 min-h-[50px]">
          {validGroups.length > 0 ? (
            validGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white p-3.5 rounded-xl border shadow-sm transition-all"
                style={{
                  borderColor: 'rgba(244, 162, 97, 0.45)',
                  backgroundColor: '#ffffff',
                }}
              >
                <div
                  className="font-bold text-base flex items-center gap-1.5"
                  style={{ color: '#d64045' }}
                >
                  <span>🧑🍳</span>
                  <span>{group.name.trim() || '未填姓名'}</span>
                </div>
                <div
                  className="pl-6 mt-1.5 text-sm whitespace-pre-wrap leading-relaxed break-words"
                  style={{ color: '#3d405b' }}
                >
                  <span className="font-semibold select-none text-[#e07a5f] mr-1">📌</span>
                  {group.task.trim() || '無事項'}
                </div>
              </div>
            ))
          ) : (
            <div className="text-stone-400 text-center py-5 italic text-sm">
              ✨ 尚無填寫交班內容...
            </div>
          )}
        </div>

        {/* Vintage grocer footer mark */}
        <div className="mt-4 pt-3 text-center text-xs border-t border-dashed border-[#f4a261]/30 text-[#8d6e63]">
          🧺 雜貨小舖溫馨交班筆記 🍯
        </div>
      </div>
    );
  }
);

CaptureBoard.displayName = 'CaptureBoard';
