/* ============================================================
   data.js — 数据复盘页
   ============================================================ */

import { render } from '../utils/helpers.js';
import { createMonthlyTrendChart, createPlatformBarChart, destroyAllCharts } from '../components/charts.js';
import { data } from '../data.js';

export class DataPage {
  constructor(containerId, appData) {
    this.container = document.querySelector(containerId);
    this.data = appData;
    this._handlers = [];
  }

  mount() {
    this.render();
    // 延迟初始化图表（确保 Canvas 已被渲染）
    requestAnimationFrame(() => {
      this.initCharts();
    });
    return Promise.resolve();
  }

  unmount() {
    destroyAllCharts();
    this._handlers.forEach(fn => fn());
    this._handlers = [];
  }

  render() {
    const kpi = this.data.analytics.kpiSummary;
    const comparison = this.data.analytics.platformComparison;
    const patterns = this.data.analytics.viralPatterns;

    const comparisonHTML = comparison.map(cp => `
      <div class="platform-card hud-panel">
        <h3 class="platform-card__name">${cp.platform}</h3>
        <div class="platform-card__stats">
          <div class="data-point">
            <span class="data-point__value">${(cp.totalReads/10000).toFixed(1)}w</span>
            <span class="data-point__label">总阅读量</span>
          </div>
          <div class="data-point">
            <span class="data-point__value">${cp.engagement}</span>
            <span class="data-point__label">互动率</span>
          </div>
          <div class="data-point">
            <span class="data-point__value">${cp.followers.toLocaleString()}</span>
            <span class="data-point__label">粉丝</span>
          </div>
        </div>
        <div class="platform-card__top">
          <span class="platform-card__top-label">🔥 爆款内容</span>
          <p class="platform-card__top-text">${cp.topContent}</p>
          <span class="platform-card__top-reads">阅读 ${(cp.topReads/10000).toFixed(1)}w</span>
        </div>
      </div>
    `).join('');

    const patternsHTML = patterns.map((p, i) => `
      <div class="pattern-card anim-fade-up anim-delay-${Math.min(i+1, 5)}">
        <div class="pattern-card__header">
          <span class="pattern-card__index">0${i+1}</span>
          <span class="pattern-card__rate">成功率 ${p.successRate}%</span>
        </div>
        <p class="pattern-card__pattern">${p.pattern}</p>
        <p class="pattern-card__desc">${p.description}</p>
      </div>
    `).join('');

    render(this.container, `
      <div class="page-container data-page">

        <!-- 标题 -->
        <div class="data-hero">
          <h1 class="data-hero__title">📊 内容增长数据分析</h1>
          <p class="data-hero__subtitle">Content Growth Analytics Dashboard</p>
        </div>

        <!-- KPI 摘要 -->
        <section class="kpi-section anim-fade-up">
          <div class="kpi-grid">
            <div class="kpi-card hud-panel">
              <span class="data-point__value" data-count="${kpi.totalReads}" data-count-format="compact">${(kpi.totalReads/10000).toFixed(0)}w</span>
              <span class="data-point__label">累计总阅读量</span>
            </div>
            <div class="kpi-card hud-panel">
              <span class="data-point__value">${kpi.totalEngagement}</span>
              <span class="data-point__label">平均互动率</span>
            </div>
            <div class="kpi-card hud-panel">
              <span class="data-point__value">${(kpi.totalFollowers/10000).toFixed(2)}w</span>
              <span class="data-point__label">累计粉丝</span>
            </div>
            <div class="kpi-card hud-panel">
              <span class="data-point__value">${kpi.totalContent}+</span>
              <span class="data-point__label">内容产出</span>
            </div>
          </div>
        </section>

        <!-- 月度趋势折线图 -->
        <section class="chart-section anim-fade-up">
          <div class="hud-panel chart-panel">
            <h2 class="chart-panel__title">📈 月度阅读趋势</h2>
            <div class="chart-container">
              <canvas id="chart-monthly-trends"></canvas>
            </div>
          </div>
        </section>

        <!-- 平台对比 -->
        <section class="chart-section anim-fade-up">
          <div class="hud-panel chart-panel">
            <h2 class="chart-panel__title">📊 三平台数据对比</h2>
            <div class="chart-container chart-container--bar">
              <canvas id="chart-platform-bar"></canvas>
            </div>
          </div>
        </section>

        <!-- 平台详情卡片 -->
        <section class="platform-cards-section">
          <h2 class="section-title">平台运营概览</h2>
          <div class="platform-cards-grid">
            ${comparisonHTML}
          </div>
        </section>

        <!-- 爆款规律分析 -->
        <section class="patterns-section">
          <h2 class="section-title">爆款内容规律分析</h2>
          <span class="section-subtitle">Viral Content Pattern Analysis</span>
          <div class="patterns-grid">
            ${patternsHTML}
          </div>
        </section>

        <div class="content-nav">
          <a href="#home" class="btn btn--ghost">← 返回首页</a>
          <a href="#content/wechat" class="btn btn--neon">查看内容详情 →</a>
        </div>
      </div>
    `);
  }

  initCharts() {
    const { analytics } = this.data;

    // 月度趋势图
    createMonthlyTrendChart('chart-monthly-trends', analytics.monthlyTrends);

    // 平台对比柱状图
    createPlatformBarChart('chart-platform-bar', analytics.platformComparison);

    // 监听主题切换来重建图表
    const themeHandler = () => {
      destroyAllCharts();
      requestAnimationFrame(() => {
        createMonthlyTrendChart('chart-monthly-trends', analytics.monthlyTrends);
        createPlatformBarChart('chart-platform-bar', analytics.platformComparison);
      });
    };
    window.addEventListener('themechange', themeHandler);
    this._handlers.push(() => window.removeEventListener('themechange', themeHandler));
  }
}
