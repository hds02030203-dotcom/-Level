/**
 * ShareSection Component
 * Action buttons for downloading PNG card, copying result URL, and restarting test.
 */
import { CardExporter } from './CardExporter.js';

export class ShareSectionComponent {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onRestart = options.onRestart || (() => {});
  }

  render(resultData) {
    if (!this.container || !resultData) return;

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
        <button class="btn-primary" id="downloadCardBtn">
          📥 결과 카드 이미지 저장 (PNG)
        </button>
        <button class="btn-secondary" id="copyUrlBtn">
          🔗 결과 링크 복사하기
        </button>
        <button class="btn-secondary" id="restartTestBtn" style="background: transparent; border-color: rgba(255,255,255,0.15);">
          🔄 테스트 다시하기
        </button>
      </div>
    `;

    this.bindEvents(resultData);
  }

  bindEvents(resultData) {
    const downloadBtn = this.container.querySelector('#downloadCardBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        CardExporter.exportCardAsPNG(resultData);
      });
    }

    const copyUrlBtn = this.container.querySelector('#copyUrlBtn');
    if (copyUrlBtn) {
      copyUrlBtn.addEventListener('click', () => {
        const dummyUrl = window.location.href;
        navigator.clipboard.writeText(dummyUrl).then(() => {
          alert('결과 페이지 링크가 클립보드에 복사되었습니다!');
        }).catch(() => {
          alert('클립보드 복사에 실패했습니다.');
        });
      });
    }

    const restartBtn = this.container.querySelector('#restartTestBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.onRestart();
      });
    }
  }
}
