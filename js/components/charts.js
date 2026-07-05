/* ============================================================
   charts.js — Chart.js 图表封装
   ============================================================ */

// 全局存储所有图表实例，方便销毁
const chartInstances = new Map();

/* 获取当前主题的颜色配置 */
function getThemeColors() {
  const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
  return {
    textPrimary: isDark ? '#94a3b8' : '#475569',
    textMuted: isDark ? '#64748b' : '#94a3b8',
    grid: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
    cyan: isDark ? '#00f5ff' : '#0891b2',
    purple: isDark ? '#a855f7' : '#7c3aed',
    gold: isDark ? '#f59e0b' : '#d97706',
    cyanAlpha: isDark ? 'rgba(0,245,255,0.15)' : 'rgba(8,145,178,0.12)',
    purpleAlpha: isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.12)',
    goldAlpha: isDark ? 'rgba(245,158,11,0.15)' : 'rgba(217,119,6,0.12)',
  };
}

/* 创建折线图 — 月度阅读趋势 */
export function createMonthlyTrendChart(canvasId, data) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const colors = getThemeColors();
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: '公众号',
          data: data.wechat,
          borderColor: colors.gold,
          backgroundColor: colors.goldAlpha,
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          fill: true
        },
        {
          label: '小红书',
          data: data.xhs,
          borderColor: colors.pink || '#ec4899',
          backgroundColor: 'rgba(236,72,153,0.12)',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          fill: true
        },
        {
          label: '视频号',
          data: data.video,
          borderColor: colors.cyan,
          backgroundColor: colors.cyanAlpha,
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: colors.textPrimary,
            font: { size: 12, family: "'PingFang SC','Microsoft YaHei',sans-serif" },
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(26,31,46,0.95)',
          titleColor: colors.cyan,
          bodyColor: colors.textPrimary,
          borderColor: 'rgba(0,245,255,0.2)',
          borderWidth: 1,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { color: colors.grid },
          ticks: { color: colors.textMuted, font: { size: 11 } }
        },
        y: {
          grid: { color: colors.grid },
          ticks: {
            color: colors.textMuted,
            font: { size: 11 },
            callback: (v) => v >= 10000 ? (v/10000).toFixed(1)+'w' : v >= 1000 ? (v/1000).toFixed(1)+'k' : v
          }
        }
      }
    }
  });

  chartInstances.set(canvasId, chart);
  return chart;
}

/* 创建柱状图 — 平台数据对比 */
export function createPlatformBarChart(canvasId, data) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const colors = getThemeColors();
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.platform),
      datasets: [
        {
          label: '总阅读量',
          data: data.map(d => d.totalReads),
          backgroundColor: [colors.gold, colors.pink || '#ec4899', colors.cyan],
          borderRadius: 6,
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(26,31,46,0.95)',
          titleColor: colors.cyan,
          bodyColor: colors.textPrimary,
          borderColor: 'rgba(0,245,255,0.2)',
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => '阅读量: ' + ctx.raw.toLocaleString()
          }
        }
      },
      scales: {
        x: {
          grid: { color: colors.grid },
          ticks: {
            color: colors.textMuted,
            callback: (v) => v >= 10000 ? (v/10000).toFixed(1)+'w' : v.toLocaleString()
          }
        },
        y: {
          grid: { display: false },
          ticks: {
            color: colors.textPrimary,
            font: { size: 13, weight: '600' }
          }
        }
      }
    }
  });

  chartInstances.set(canvasId, chart);
  return chart;
}

/* 销毁指定图表 */
export function destroyChart(canvasId) {
  const chart = chartInstances.get(canvasId);
  if (chart) {
    chart.destroy();
    chartInstances.delete(canvasId);
  }
}

/* 销毁所有图表 */
export function destroyAllCharts() {
  chartInstances.forEach((chart, key) => {
    chart.destroy();
  });
  chartInstances.clear();
}
