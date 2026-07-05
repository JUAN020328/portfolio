/* ============================================================
   app.js — 应用入口（初始化路由、BGM、主题、滚动动画）
   ============================================================ */

import { Router } from './router.js';
import { data } from './data.js';
import { initBGM } from './components/bgm.js';
import { initModal } from './components/modal.js';
import { initScrollAnimator } from './components/scrollAnimator.js';
import { initTheme } from './utils/theme.js';
import { isMobile } from './utils/helpers.js';

import { HomePage } from './pages/home.js';
import { ContentPage } from './pages/content.js';
import { DataPage } from './pages/data.js';
import { GalleryPage } from './pages/gallery.js';
import { AboutPage } from './pages/about.js';

document.addEventListener('DOMContentLoaded', () => {
  /* ---- 初始化路由器 ---- */
  const router = new Router(data);

  router.register('home',    () => new HomePage('#view-home', data));
  router.register('content', (params) => new ContentPage('#view-content', data, params));
  router.register('data',    () => new DataPage('#view-data', data));
  router.register('gallery', (params) => new GalleryPage('#view-gallery', data, params));
  router.register('about',   () => new AboutPage('#view-about', data));

  router.start();

  /* ---- 初始化模块 ---- */
  initTheme();
  initBGM();
  const lightbox = initModal();
  const scrollAnim = initScrollAnimator();

  /* ---- 导航点击事件（桌面 + 移动）---- */
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      // 让 hash 链接正常工作
    });
  });

  /* ---- 移动端菜单按钮 ---- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const navLinks = document.getElementById('desktop-nav-links');
      if (navLinks) {
        navLinks.classList.toggle('show');
      }
    });
  }

  /* ---- 卡片涟漪效果（移动端）---- */
  if (isMobile()) {
    document.getElementById('app').addEventListener('click', (e) => {
      const rippleTarget = e.target.closest('.card, .btn, .module-card');
      if (!rippleTarget) return;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = rippleTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      if (!rippleTarget.classList.contains('ripple-effect')) {
        rippleTarget.classList.add('ripple-effect');
      }
      rippleTarget.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  /* ---- 隐藏加载画面 ---- */
  setTimeout(() => {
    const loader = document.getElementById('app-loader');
    if (loader) {
      loader.classList.add('hidden');
    }
  }, 800);

  /* ---- 全局变量（给控制台调试用）---- */
  window.__portfolio = {
    router,
    data,
    lightbox,
    scrollAnim
  };
});
