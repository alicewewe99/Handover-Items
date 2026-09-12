export function getTodayString(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    const d = new Date(year, month - 1, day);
    if (!isNaN(d.getTime())) {
      const weeks = ['日', '一', '二', '三', '四', '五', '六'];
      return `${month}/${day} (${weeks[d.getDay()]})`;
    }
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];
  return `${d.getMonth() + 1}/${d.getDate()} (${weeks[d.getDay()]})`;
}

export function playHapticEffect(): void {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }
  } catch {
    // Ignore if not permitted
  }
}
