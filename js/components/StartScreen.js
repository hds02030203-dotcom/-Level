/**
 * StartScreen Component (js/components/StartScreen.js)
 * Renders the main landing screen with optional user info inputs and dynamic live participant counter.
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

        <div class="user-info-inputs">
          <div class="input-group">
            <label for="userNameInput">👤 수련생 / 지도자 이름 (선택)</label>
            <input type="text" id="userNameInput" placeholder="예: 홍길동" maxlength="12" autocomplete="off" />
          </div>
          <div class="input-group">
            <label for="userDojangInput">🥋 소속 도장 이름 (선택)</label>
            <input type="text" id="userDojangInput" placeholder="예: 용인대 태권도장" maxlength="16" autocomplete="off" />
          </div>
        </div>

        <div class="participant-badge" id="participantBadge">
          🔥 현재까지 <span id="participantCount" style="font-weight: 800; font-family: var(--font-accent);">${currentCount.toLocaleString()}</span>명 참여 완료
        </div>
        <button class="btn-primary" id="startTestBtn" style="margin-top: 10px;">
          ⚡ 테스트 시작하기
        </button>
        <p style="font-size: 0.75rem; color: #64748B; margin-top: 14px; text-align: center; line-height: 1.4;">
          🔒 입력한 이름과 도장 정보는 서버에 수집·저장되지 않으며 인증서 출력용으로만 일시 사용됩니다.
        </p>
      </div>
    `;

    this.animateCounter(currentCount);
    this.startLiveTicker(currentCount);
    this.bindEvents();
  }

  animateCounter(targetCount) {
    const countEl = this.container.querySelector('#participantCount');
    if (!countEl) return;

    const startCount = Math.max(0, targetCount - 35);
    const duration = 1000;
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
      if (Math.random() < 0.45) {
        const inc = Math.random() < 0.8 ? 1 : 2;
        runningCount += inc;

        const badgeEl = this.container.querySelector('#participantBadge');
        const countEl = this.container.querySelector('#participantCount');

        if (countEl && badgeEl) {
          countEl.textContent = runningCount.toLocaleString();
          badgeEl.classList.remove('count-pulse');
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

        const nameInput = this.container.querySelector('#userNameInput');
        const dojangInput = this.container.querySelector('#userDojangInput');

        const userName = nameInput ? nameInput.value.trim() : '';
        const userDojang = dojangInput ? dojangInput.value.trim() : '';

        this.onStart({ userName, userDojang });
      });
    }
  }
}
