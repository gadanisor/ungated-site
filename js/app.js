// Mobile nav
const menuBtn = document.getElementById('menu');
const mobile = document.getElementById('mobileNav');
menuBtn?.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!open));
  mobile.hidden = open;
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (flat backgrounds only)
const toggle = document.getElementById('themeToggle');
const applyTheme = (t) => {
  const isLight = t === 'light';
  document.documentElement.style.colorScheme = isLight ? 'light' : 'dark';
  localStorage.setItem('theme', t);
  document.body.style.background = isLight ? 'var(--bg-l)' : 'var(--bg)';
};
const saved = localStorage.getItem('theme');
if (saved) applyTheme(saved);
toggle?.addEventListener('click', () => {
  const current = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

// OS auto-highlight on download buttons
const osMap = { Win: 'win', Mac: 'mac', Linux: 'linux' };
const user = navigator.platform || '';
const match = Object.entries(osMap).find(([k]) => user.includes(k));
if (match) document.querySelector(`a[data-os="${match[1]}"]`)?.classList.add('primary');
