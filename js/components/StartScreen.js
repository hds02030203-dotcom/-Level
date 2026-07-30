/**
 * StartScreen Component (js/components/StartScreen.js)
 * Renders the main landing screen based on prd.md Section 3.1 & design.md Section 4.1.
 */
export class StartScreenComponent {
  constructor(containerId, options = {}) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    this.onStart = options.onStart || (() => {});
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="glass-card landing-view">
        <div class="hero-emblem" aria-label="Taekwondo Belt Emblem">🥋</div>
        <h1 class="landing-title">내 태권도 내공은<br>몇 단일까?</h1>
        <p class="landing-desc">
          도장 수련 지식부터 실전 위기 상황 태도까지!<br>
          직관적인 상황별 질문을 통해 나의 진짜 태권도 레벨과 칭호를 측정해보세요.
        </p>
        <div class="participant-badge">
          🔥 현재까지 12,450명 참여 완료
        </div>
        <button class="btn-primary" id="startTestBtn" style="margin-top: 10px;">
          ⚡ 테스트 시작하기
        </button>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const startBtn = this.container.querySelector('#startTestBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.onStart();
      });
    }
  }
}
