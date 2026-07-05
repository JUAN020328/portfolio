/* ============================================================
   gallery.js — 作品画廊（海报+摄影）
   ============================================================ */

import { render } from '../utils/helpers.js';
import { data } from '../data.js';

export class GalleryPage {
  constructor(containerId, appData, params) {
    this.container = document.querySelector(containerId);
    this.data = appData;
    this.activeTab = params?.subType || 'posters';
    this._handlers = [];
  }

  mount() {
    this.render();
    this.bindEvents();
    return Promise.resolve();
  }

  unmount() {
    this._handlers.forEach(fn => fn());
    this._handlers = [];
  }

  render() {
    const { tabs } = this.data.gallery;
    const activeTabData = tabs.find(t => t.key === this.activeTab) || tabs[0];

    const tabButtons = tabs.map(t => `
      <button class="gallery-tab ${t.key === this.activeTab ? 'active' : ''}" data-tab="${t.key}">
        ${t.title}
      </button>
    `).join('');

    const imagesHTML = activeTabData.images.map((img, i) => `
      <div class="gallery-item anim-fade-up" style="animation-delay:${(i % 6) * 0.08}s">
        <img src="${img}" alt="${activeTabData.title} ${i+1}"
             class="gallery-image"
             data-full="${img}"
             data-group="gallery-${this.activeTab}"
             loading="lazy">
        <div class="gallery-item__overlay">
          <span class="gallery-item__icon">🔍</span>
        </div>
      </div>
    `).join('');

    render(this.container, `
      <div class="page-container gallery-page">

        <div class="gallery-hero">
          <h1 class="gallery-hero__title">🖼️ 创意作品集</h1>
          <p class="gallery-hero__subtitle">Creative Portfolio / ${activeTabData.subtitle}</p>
        </div>

        <!-- Tab 切换 -->
        <div class="gallery-tabs">
          ${tabButtons}
        </div>

        <!-- 作品网格 -->
        <div class="gallery-grid">
          ${imagesHTML}
        </div>

        <div class="content-nav">
          <a href="#home" class="btn btn--ghost">← 返回首页</a>
          <a href="#about" class="btn btn--neon">关于我 →</a>
        </div>
      </div>
    `);
  }

  bindEvents() {
    // Tab 切换
    const tabs = this.container.querySelectorAll('.gallery-tab');
    tabs.forEach(tab => {
      const handler = () => {
        const key = tab.dataset.tab;
        if (key !== this.activeTab) {
          location.hash = `#gallery/${key}`;
        }
      };
      tab.addEventListener('click', handler);
      this._handlers.push(() => tab.removeEventListener('click', handler));
    });
  }
}
