export interface HandoverGroup {
  id: string;
  name: string;
  task: string;
}

export interface HandoverDateItem {
  id: string;
  date: string;
}

export interface ModalState {
  isOpen: boolean;
  message: string;
  icon: string;
  type?: 'alert' | 'confirm';
  onConfirm?: () => void;
}
