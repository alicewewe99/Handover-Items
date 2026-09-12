import React from 'react';
import { HandoverDateItem } from '../types';
import { getTodayString, playHapticEffect } from '../utils/date';
import { Calendar, Plus, Trash2, X } from 'lucide-react';

interface DateListProps {
  dates: HandoverDateItem[];
  onAddDate: (val?: string) => void;
  onRemoveDate: (id: string) => void;
  onUpdateDate: (id: string, val: string) => void;
  onClearDates: () => void;
  onShowAlert: (msg: string, icon?: string) => void;
}

export const DateList: React.FC<DateListProps> = ({
  dates,
  onAddDate,
  onRemoveDate,
  onUpdateDate,
  onClearDates,
  onShowAlert,
}) => {
  const handleRemove = (id: string) => {
    playHapticEffect();
    if (dates.length <= 1) {
      onShowAlert('至少需保留一個日期欄位唷！', '⚠️');
      return;
    }
    onRemoveDate(id);
  };

  const handleAddQuickDate = (daysAhead: number) => {
    playHapticEffect();
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    onAddDate(dateStr);
  };

  return (
    <div
      id="date-section-container"
      className="space-y-3 bg-white/90 p-4 rounded-2xl border-2 shadow-sm backdrop-blur-sm transition-all"
      style={{ borderColor: 'rgba(244, 162, 97, 0.45)' }}
    >
      <div className="flex justify-between items-center">
        <label
          htmlFor="primary-date-input"
          className="text-[#5c4033] text-sm font-bold flex items-center gap-1.5 cursor-default"
        >
          <Calendar className="w-4 h-4 text-[#e07a5f]" />
          <span>選擇日期 (可新增多個)</span>
        </label>
        <button
          id="btn-clear-dates"
          type="button"
          onClick={() => {
            playHapticEffect();
            onClearDates();
          }}
          className="text-xs text-[#8d6e63] hover:text-[#d64045] transition-colors font-bold px-2 py-1 rounded-lg hover:bg-red-50"
        >
          重設為今日
        </button>
      </div>

      {/* Date input items */}
      <div id="date-list" className="space-y-2.5">
        {dates.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <input
              id={index === 0 ? 'primary-date-input' : `date-input-${item.id}`}
              type="date"
              value={item.date}
              onChange={(e) => onUpdateDate(item.id, e.target.value)}
              className="input-box p-2.5 text-[#2b2d42] cursor-pointer"
            />
            <button
              id={`btn-remove-date-${item.id}`}
              type="button"
              onClick={() => handleRemove(item.id)}
              aria-label="刪除此日期"
              className="text-[#8d6e63] hover:text-[#d64045] p-2.5 text-xs bg-white rounded-xl border font-bold hover:bg-stone-50 transition-all shrink-0 flex items-center justify-center"
              style={{ borderColor: 'rgba(244, 162, 97, 0.4)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick selection chips & Add button */}
      <div className="flex gap-2 pt-1">
        <button
          id="btn-quick-today"
          type="button"
          onClick={() => {
            if (dates.length > 0) {
              onUpdateDate(dates[0].id, getTodayString());
              playHapticEffect();
            }
          }}
          className="text-xs px-2.5 py-1.5 bg-[#f4a261]/15 hover:bg-[#f4a261]/25 text-[#7c4d32] rounded-lg border border-[#f4a261]/30 font-medium transition-all"
        >
          設首項為今天
        </button>
        <button
          id="btn-quick-tomorrow"
          type="button"
          onClick={() => handleAddQuickDate(1)}
          className="text-xs px-2.5 py-1.5 bg-[#81b29a]/15 hover:bg-[#81b29a]/30 text-[#3c6652] rounded-lg border border-[#81b29a]/30 font-medium transition-all"
        >
          + 新增明天
        </button>
      </div>

      <button
        id="btn-add-date"
        type="button"
        onClick={() => {
          playHapticEffect();
          onAddDate('');
        }}
        className="w-full text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
        style={{
          backgroundColor: '#81b29a',
          borderColor: '#a3c4bc',
          borderWidth: '2px',
        }}
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>新增日期</span>
      </button>
    </div>
  );
};
