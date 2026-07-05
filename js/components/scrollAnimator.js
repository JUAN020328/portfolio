/* ============================================================
   scrollAnimator.js — IntersectionObserver 滚动动画
   ============================================================ */

export function initScrollAnimator() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // 触发进度条动画
          const progressBars = entry.target.querySelectorAll('.progress-bar__fill');
          progressBars.forEach(bar => {
            const targetWidth = bar.style.getPropertyValue('--target-width');
            if (targetWidth) {
              bar.style.width = targetWidth;
            }
          });

          // 触发数字计数动画
          const countEls = entry.target.querySelectorAll('[data-count]');
          countEls.forEach(el => {
            const end = parseInt(el.dataset.count, 10);
            if (end && !el.dataset.counted) {
              el.dataset.counted = 'true';
              animateCount(el, end);
            }
          });

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  // 观察所有带有动画标记的元素
  document.querySelectorAll('.anim-fade-up').forEach(el => {
    observer.observe(el);
  });

  // 返回用于后续动态内容的注册函数
  return {
    observe(el) {
      if (el) observer.observe(el);
    },
    observeAll(selector) {
      document.querySelectorAll(selector).forEach(el => observer.observe(el));
    },
    unobserve(el) {
      if (el) observer.unobserve(el);
    },
    disconnect() {
      observer.disconnect();
    }
  };
}

/* 数字递增动画 */
function animateCount(el, end, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);

    const formatter = el.dataset.countFormat;
    if (formatter === 'compact') {
      el.textContent = formatCompact(current);
    } else {
      el.textContent = current.toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function formatCompact(num) {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}
