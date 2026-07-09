// Lightweight global toast helper (mirrors the old portal's toast()).
let container: HTMLElement | null = null;

function ensureContainer() {
  if (container) return container;
  container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed bottom-4 right-4 z-[200] flex flex-col gap-2 items-end';
  document.body.appendChild(container);
  return container;
}

export function toast(message: string, variant: 'success' | 'error' | 'info' = 'success') {
  const colors: Record<string, string> = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-600 text-white',
  };
  const el = document.createElement('div');
  el.className = `px-4 py-2 rounded-lg shadow-lg text-sm font-medium ${colors[variant]} animate-[fadeIn_0.2s_ease-out]`;
  el.textContent = message;
  ensureContainer().appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    el.style.transition = 'all 0.25s ease';
    setTimeout(() => el.remove(), 250);
  }, 2800);
}
