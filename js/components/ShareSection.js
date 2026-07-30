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
        <button class="btn-secondary" id="kakaoShareBtn" style="background: #FEE500; color: #191919; border: none; font-weight: 800;">
          💬 카카오톡으로 결과 공유하기
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

    const kakaoShareBtn = this.container.querySelector('#kakaoShareBtn');
    if (kakaoShareBtn) {
      kakaoShareBtn.addEventListener('click', () => {
        this.shareKakaoTalk(resultData);
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

  shareKakaoTalk(resultData) {
    const kakaoKey = window.ENV_KAKAO_JS_KEY || (typeof process !== 'undefined' && process.env ? (process.env.KAKAO_JS_KEY || process.env.NEXT_PUBLIC_KAKAO_JS_KEY) : null);

    if (!kakaoKey) {
      alert('카카오톡 공유를 위한 환경변수(KAKAO_JS_KEY)가 설정되지 않았습니다.\nVercel 프로젝트 설정의 Environment Variables에 KAKAO_JS_KEY를 추가해주세요.');
      return;
    }

    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoKey);
      }

      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `🥋 태권도 Level-test 결과: ${resultData.type} (${resultData.subTitle})`,
          description: `나의 태권도 내공은 국기원 통계 ${resultData.topPercent}! 지금 당신의 레벨을 측정해보세요.`,
          imageUrl: 'https://developers.kakao.com/assets/img/about/logos/kakaotalk/kakaotalk_sharing_btn_medium.png',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '내 레벨 테스트하기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert('카카오 SDK를 로드하는 중 오류가 발생했습니다.');
    }
  }
}
