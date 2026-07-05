/* ============================================================
   theme.js — 暗色/亮色模式切换
   ============================================================ */

const THEME_KEY = 'portfolio-theme';

export function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // 读取保存的主题
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);

  // 切换按钮
  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);

    // 通知其他模块主题变更
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  const iconSun = document.querySelector('.icon-sun');
  const iconMoon = document.querySelector('.icon-moon');
  if (iconSun && iconMoon) {
    iconSun.style.display = theme === 'dark' ? 'inline' : 'none';
    iconMoon.style.display = theme === 'dark' ? 'none' : 'inline';
  }
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}
