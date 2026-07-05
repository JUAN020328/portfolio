/* ============================================================
   helpers.js — DOM 工具函数
   ============================================================ */

/* 防抖 */
export function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* 节流 */
export function throttle(fn, limit = 100) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/* 检测是否为移动端 */
export function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches;
}

/* 注入 HTML 到容器（安全的内置方式） */
export function render(container, html) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  if (container) {
    container.innerHTML = html;
  }
}

/* 创建元素 */
export function createEl(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'className') el.className = v;
    else if (k === 'dataset') Object.entries(v).forEach(([dk, dv]) => el.dataset[dk] = dv);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else el.setAttribute(k, v);
  });
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else if (child instanceof Node) el.appendChild(child);
  });
  return el;
}

/* 添加事件委托 */
export function delegate(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
  return () => parent.removeEventListener(eventType, handler);
}

/* 数字动画（计数增长） */
export function animateNumber(el, end, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out 缓出
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.value = current.toLocaleString();
    } else {
      el.textContent = current.toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* 格式化数字 */
export function formatNumber(num) {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

/* 涟漪效果 */
export function createRipple(e) {
  const el = e.currentTarget;
  if (!el.classList.contains('ripple-effect')) return;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';

  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

  el.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}
