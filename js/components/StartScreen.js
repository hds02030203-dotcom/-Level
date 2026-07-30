/**
 * StartScreen Component (js/components/StartScreen.js)
 * Renders the main landing screen with live dynamic participant counter.
 */
export class StartScreenComponent {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.onStart = options.onStart || (() => {});
    this.liveTimer = null;
  }

  get container() {
    return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
  }

  static getBaseCount() {
    const launchDate = new Date('2026-07-01T00:00:00Z').getTime();
    const now = Date.now();
    const elapsedMinutes = Math.max(0, (now - launchDate) / (1000 * 60));
    const timeBasedCount = Math.floor(elapsedMinutes * 0.4);
    const extraCount = parseInt(localStorage.getItem('tkd_extra_participants') || '0', 10);
    return 12840 + timeBasedCount + extraCount;
  }

  render() {
    if (!this.container) return;

    if (this.liveTimer) {
      clearInterval(this.liveTimer);
      this.liveTimer = null;
    }

    const currentCount = StartScreenComponent.getBaseCount();

    this.container.innerHTML = `
      <div class="glass-card landing-view">
        <div class="hero-emblem" aria-label="Taekwondo Belt Emblem">🥋</div>
        <h1 class="landing-title">내 태권도 내공은<br>몇 단일까?</h1>
        <p class="landing-desc">
          도장 수련 지식부터 실전 위기 상황 태도까지!<br>
          직관적인 상황별 질문을 통해 나의 진짜 태권도 레벨과 칭호를 측정해보세요.
        </p>
        <div class="participant-badge" id="participantBadge">
          🔥 현재까지 <span id="participantCount" style="font-weight: 800; font-family: var(--font-accent);">${currentCount.toLocaleString()}</span>명 참여 완료
        </div>
        <button class="btn-primary" id="startTestBtn" style="margin-top: 10px;">
          ⚡ 테스트 시작하기
        </button>
      </div>
    `;

    this.animateCounter(currentCount);
    this.startLiveTicker(currentCount);
    this.bindEvents();
  }

  animateCounter(targetCount) {
    const countEl = this.container.querySelector('#participantCount');
    if (!countEl) return;

    const startCount = targetCount - 35;
    const duration = 1000; // 1s
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startCount + (targetCount - startCount) * easeOut);
      
      countEl.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        countEl.textContent = targetCount.toLocaleString();
      }
    };

    requestAnimationFrame(step);
  }

  startLiveTicker(initialCount) {
    let runningCount = initialCount;

    this.liveTimer = setInterval(() => {
      // 30% chance to increment by 1 or 2 every 4.5 seconds to simulate live traffic
      if (Math.random() < 0.45) {
        const inc = Math.random() < 0.8 ? 1 : 2;
        runningCount += inc;

        const badgeEl = this.container.querySelector('#participantBadge');
        const countEl = this.container.querySelector('#participantCount');

        if (countEl && badgeEl) {
          countEl.textContent = runningCount.toLocaleString();
          badgeEl.classList.remove('count-pulse');
          // Trigger reflow to restart CSS animation
          void badgeEl.offsetWidth;
          badgeEl.classList.add('count-pulse');
        }
      }
    }, 4500);
  }

  bindEvents() {
    const startBtn = this.container.querySelector('#startTestBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (this.liveTimer) {
          clearInterval(this.liveTimer);
          this.liveTimer = null;
        }
        this.onStart();
      });
    }
  }
}
