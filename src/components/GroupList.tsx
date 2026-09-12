import React from 'react';
import { HandoverGroup } from '../types';
import { playHapticEffect } from '../utils/date';
import { Plus, Trash2, User, FileText, Sparkles } from 'lucide-react';

interface GroupListProps {
  groups: HandoverGroup[];
  onAddGroup: (name?: string, task?: string) => void;
  onRemoveGroup: (id: string) => void;
  onUpdateGroup: (id: string, field: 'name' | 'task', value: string) => void;
  onShowAlert: (msg: string, icon?: string) => void;
}

const QUICK_TAGS = [
  '早班交接完畢',
  '晚班收銀盤點',
  '冷凍庫溫度確認',
  '今日備料及叫貨',
  '店面環境清潔',
];

export const GroupList: React.FC<GroupListProps> = ({
  groups,
  onAddGroup,
  onRemoveGroup,
  onUpdateGroup,
  onShowAlert,
}) => {
  const handleRemove = (id: string) => {
    playHapticEffect();
    if (groups.length <= 1) {
      onShowAlert('至少需保留一組交班項目唷！', '⚠️');
      return;
    }
    onRemoveGroup(id);
  };

  const appendTagToTask = (groupId: string, currentTask: string, tag: string) => {
    playHapticEffect();
    const newText = currentTask.trim()
      ? `${currentTask.trim()}\n• ${tag}`
      : `• ${tag}`;
    onUpdateGroup(groupId, 'task', newText);
  };

  return (
    <div
      id="group-section-container"
      className="space-y-3 bg-white/90 p-4 rounded-2xl border-2 shadow-sm backdrop-blur-sm transition-all"
      style={{ borderColor: 'rgba(244, 162, 97, 0.45)' }}
    >
      <div className="flex justify-between items-center">
        <label className="text-[#5c4033] text-sm font-bold flex items-center gap-1.5 cursor-default">
          <User className="w-4 h-4 text-[#e07a5f]" />
          <span>姓名與交班事項</span>
        </label>
        <button
          id="btn-add-group-top"
          type="button"
          onClick={() => {
            playHapticEffect();
            onAddGroup('', '');
          }}
          className="text-xs text-[#e07a5f] hover:text-[#d64045] font-bold px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors"
        >
          + 新增一組
        </button>
      </div>

      {/* Group Items */}
      <div id="group-list" className="space-y-3">
        {groups.map((group, index) => (
          <div
            key={group.id}
            id={`group-item-${group.id}`}
            className="group-item p-3.5 rounded-xl border-2 space-y-2 relative transition-all shadow-sm"
            style={{
              backgroundColor: '#fdf8f2',
              borderColor: 'rgba(244, 162, 97, 0.35)',
            }}
          >
            {/* Remove button */}
            <button
              id={`btn-remove-group-${group.id}`}
              type="button"
              onClick={() => handleRemove(group.id)}
              className="absolute top-2.5 right-2.5 text-[#d64045] hover:text-red-700 text-xs bg-white px-2 py-1 rounded-lg border font-bold flex items-center gap-1 hover:bg-red-50 transition-all shadow-2xs"
              style={{ borderColor: 'rgba(244, 162, 97, 0.4)' }}
            >
              <Trash2 className="w-3 h-3" />
              <span>刪除</span>
            </button>

            {/* Name label & input */}
            <div className="space-y-1">
              <label
                htmlFor={`name-input-${group.id}`}
                className="text-xs text-[#8d6e63] font-semibold flex items-center gap-1"
              >
                <span>🧑🍳 填寫人 / 交接人員：</span>
              </label>
              <input
                id={`name-input-${group.id}`}
                type="text"
                value={group.name}
                onChange={(e) => onUpdateGroup(group.id, 'name', e.target.value)}
                placeholder="輸入姓名 (例如：小美、早班大華)"
                className="input-box p-2.5 text-sm placeholder-[#b0a8a0]"
              />
            </div>

            {/* Task label & textarea */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center">
                <label
                  htmlFor={`task-input-${group.id}`}
                  className="text-xs text-[#8d6e63] font-semibold flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5 text-[#e07a5f]" />
                  <span>交班事項說明：</span>
                </label>
              </div>
              <textarea
                id={`task-input-${group.id}`}
                rows={3}
                value={group.task}
                onChange={(e) => onUpdateGroup(group.id, 'task', e.target.value)}
                placeholder="輸入對應的交班事項、顧客交代、設備狀況或待辦..."
                className="input-box p-2.5 text-sm placeholder-[#b0a8a0] resize-none"
              />

              {/* Quick helper tag chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[11px] text-[#8d6e63] flex items-center gap-0.5 select-none">
                  <Sparkles className="w-3 h-3 text-[#f4a261]" /> 常用快捷：
                </span>
                {QUICK_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => appendTagToTask(group.id, group.task, tag)}
                    className="text-[11px] bg-white hover:bg-[#fff3e0] text-[#7c4d32] px-2 py-0.5 rounded-md border border-[#f4a261]/30 transition-all shadow-2xs hover:border-[#e07a5f]"
                  >
                    +{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Group Bottom Button */}
      <button
        id="btn-add-group-bottom"
        type="button"
        onClick={() => {
          playHapticEffect();
          onAddGroup('', '');
        }}
        className="w-full text-white py-2.5 rounded-xl text-sm font-bold btn-store flex items-center justify-center gap-1.5 shadow-sm"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>新增一組 姓名與交班事項</span>
      </button>
    </div>
  );
};
