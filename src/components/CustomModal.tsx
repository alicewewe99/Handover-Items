import React from 'react';
import { ModalState } from '../types';
import { playHapticEffect } from '../utils/date';

interface CustomModalProps {
  modal: ModalState;
  onClose: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({ modal, onClose }) => {
  if (!modal.isOpen) return null;

  const handleConfirm = () => {
    playHapticEffect();
    if (modal.onConfirm) {
      modal.onConfirm();
    }
    onClose();
  };

  const handleCancel = () => {
    playHapticEffect();
    onClose();
  };

  return (
    <div
      id="custom-modal"
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-200"
      onClick={modal.type === 'confirm' ? undefined : handleCancel}
    >
      <div
        id="modal-box"
        className="bg-[#fffdf9] border-4 p-6 rounded-3xl max-w-xs w-full text-center shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200"
        style={{ borderColor: '#e07a5f' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div id="modal-icon" className="text-4xl animate-bounce">
          {modal.icon || '🍓'}
        </div>
        <div
          id="modal-message"
          className="text-[#2b2d42] text-base font-bold whitespace-pre-wrap leading-relaxed"
        >
          {modal.message}
        </div>

        {modal.type === 'confirm' ? (
          <div className="flex gap-2.5 pt-1">
            <button
              id="btn-modal-cancel"
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-stone-100 hover:bg-stone-200 text-[#5c4033] border border-stone-300 transition-all"
            >
              取消
            </button>
            <button
              id="btn-modal-confirm"
              type="button"
              onClick={handleConfirm}
              className="flex-1 btn-store text-white py-2.5 rounded-xl text-sm font-bold bg-[#d64045] hover:bg-[#b73236]"
              style={{ backgroundColor: '#d64045' }}
            >
              確定執行
            </button>
          </div>
        ) : (
          <button
            id="btn-modal-ok"
            type="button"
            onClick={handleCancel}
            className="w-full btn-store text-white py-2.5 rounded-xl text-sm font-bold"
          >
            確定好囉！
          </button>
        )}
      </div>
    </div>
  );
};
