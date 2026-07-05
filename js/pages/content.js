/* ============================================================
   content.js — 内容详情页（公众号/小红书/视频号三平台参数化复用）
   ============================================================ */

import { render } from '../utils/helpers.js';
import { data } from '../data.js';

export class ContentPage {
  constructor(containerId, appData, params) {
    this.container = document.querySelector(containerId);
    this.data = appData;
    this.platformKey = params.type || 'wechat';
    this.activeTab = 0;
    this.currentImageIndex = 0;
    this._handlers = [];
  }

  get platformData() {
    return this.data.platforms[this.platformKey] || this.data.platforms.wechat;
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
    const plat = this.platformData;
    const ct = plat.content;

    const tabs = [
      { key: 'background', label: '内容背景', icon: '📋' },
      { key: 'strategy', label: '选题逻辑', icon: '💡' },
      { key: 'structure', label: '内容拆解', icon: '🔍' },
      { key: 'publish', label: '发布策略', icon: '🚀' },
      { key: 'results', label: '数据结果', icon: '📊' },
      { key: 'review', label: '复盘总结', icon: '🔄' }
    ];

    const tabButtons = tabs.map((t, i) => `
      <button class="content-tab ${i === 0 ? 'active' : ''}" data-tab="${i}">
        <span class="content-tab__icon">${t.icon}</span>
        <span class="content-tab__label">${t.label}</span>
      </button>
    `).join('');

    const imagesHTML = plat.images.map((img, i) => `
      <div class="content-image-wrapper ${i === 0 ? 'active' : ''}" data-image="${i}">
        <img src="${img}" alt="${plat.name} 作品 ${i+1}" class="content-image gallery-image"
             data-full="${img}" data-group="content-${this.platformKey}" loading="lazy">
      </div>
    `).join('');

    const resultsHTML = ct.results ? `
      <div class="results-grid">
        ${Object.entries(ct.results).map(([key, val]) => {
          const labels = {
            reads: '总阅读量', likes: '点赞数', saves: '收藏数', comments: '评论数',
            shares: '转发数', follows: '新增关注', engagementRate: '互动率',
            views: '播放量', avgWatchRate: '平均完播率', avgReadTime: '平均阅读时长'
          };
          const icons = {
            reads: '👁️', likes: '❤️', saves: '⭐', comments: '💬',
            shares: '🔄', follows: '👥', engagementRate: '📈',
            views: '👁️', avgWatchRate: '⏱️', avgReadTime: '⏱️'
          };
          const formattedVal = typeof val === 'number' ? val.toLocaleString() : val;
          return `
            <div class="result-card">
              <span class="result-card__icon">${icons[key] || '📊'}</span>
              <span class="result-card__value" data-count="${String(val).replace(/[^0-9.]/g,'')}">${formattedVal}</span>
              <span class="result-card__label">${labels[key] || key}</span>
            </div>
          `;
        }).join('')}
      </div>
    ` : '';

    const tagsHTML = plat.tags.map(t => `<span class="tag tag--${this.getTagTheme(t)}">${t}</span>`).join('');

    render(this.container, `
      <div class="page-container content-page">
        <!-- 顶部 -->
        <div class="content-hero">
          <span class="content-hero__icon">${plat.icon}</span>
          <div>
            <h1 class="content-hero__title">${plat.name}</h1>
            <p class="content-hero__subtitle">${plat.link}</p>
          </div>
        </div>

        <!-- 内容标签栏 -->
        <div class="content-tabs">
          ${tabButtons}
        </div>

        <!-- 内容面板 -->
        <div class="content-panels">
          <div class="content-panel active" id="panel-background">
            <div class="hud-panel">
              <h3 class="panel-title">📋 内容背景与定位</h3>
              <p class="panel-text">${ct.background}</p>
            </div>
          </div>
          <div class="content-panel" id="panel-strategy">
            <div class="hud-panel">
              <h3 class="panel-title">💡 选题逻辑与策略</h3>
              <p class="panel-text">${ct.strategy}</p>
            </div>
          </div>
          <div class="content-panel" id="panel-structure">
            <div class="hud-panel">
              <h3 class="panel-title">🔍 内容结构拆解</h3>
              <p class="panel-text">${ct.structure}</p>
            </div>
          </div>
          <div class="content-panel" id="panel-publish">
            <div class="hud-panel">
              <h3 class="panel-title">🚀 发布策略与分发</h3>
              <p class="panel-text">${ct.publish}</p>
            </div>
          </div>
          <div class="content-panel" id="panel-results">
            <div class="hud-panel">
              <h3 class="panel-title">📊 数据结果</h3>
              ${resultsHTML}
            </div>
          </div>
          <div class="content-panel" id="panel-review">
            <div class="hud-panel">
              <h3 class="panel-title">🔄 复盘总结</h3>
              <p class="panel-text">${ct.review}</p>
            </div>
          </div>
        </div>

        <!-- 作品图片轮播 -->
        <section class="content-gallery">
          <h3 class="section-title">作品图集</h3>
          <div class="content-image-carousel">
            <div class="content-image-main">
              ${imagesHTML}
            </div>
            <div class="content-image-thumbs">
              ${plat.images.map((img, i) => `
                <button class="content-thumb ${i === 0 ? 'active' : ''}" data-thumb="${i}">
                  <img src="${img}" alt="缩略图 ${i+1}" loading="lazy">
                </button>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- 标签 -->
        <div class="content-tags">
          ${tagsHTML}
        </div>

        <!-- 导航按钮 -->
        <div class="content-nav">
          <a href="#home" class="btn btn--ghost">← 返回首页</a>
          <a href="#data" class="btn btn--neon">查看数据分析 →</a>
        </div>
      </div>
    `);
  }

  getTagTheme(tag) {
    if (tag.includes('小红书')) return 'pink';
    if (tag.includes('视频号') || tag.includes('短视频') || tag.includes('直播')) return 'gold';
    if (tag.includes('数据') || tag.includes('分析') || tag.includes('SEO')) return 'cyan';
    return 'purple';
  }

  bindEvents() {
    // Tab 切换
    const tabs = this.container.querySelectorAll('.content-tab');
    tabs.forEach(tab => {
      const handler = () => {
        const idx = parseInt(tab.dataset.tab);
        this.switchTab(idx);
      };
      tab.addEventListener('click', handler);
      this._handlers.push(() => tab.removeEventListener('click', handler));
    });

    // 缩略图切换
    const thumbs = this.container.querySelectorAll('.content-thumb');
    thumbs.forEach(thumb => {
      const handler = () => {
        const idx = parseInt(thumb.dataset.thumb);
        this.switchImage(idx);
      };
      thumb.addEventListener('click', handler);
      this._handlers.push(() => thumb.removeEventListener('click', handler));
    });
  }

  switchTab(index) {
    this.activeTab = index;
    const tabs = this.container.querySelectorAll('.content-tab');
    const panels = this.container.querySelectorAll('.content-panel');
    tabs.forEach((t, i) => t.classList.toggle('active', i === index));
    panels.forEach((p, i) => p.classList.toggle('active', i === index));
  }

  switchImage(index) {
    this.currentImageIndex = index;
    const wrappers = this.container.querySelectorAll('.content-image-wrapper');
    const thumbs = this.container.querySelectorAll('.content-thumb');
    wrappers.forEach((w, i) => w.classList.toggle('active', i === index));
    thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
  }
}
