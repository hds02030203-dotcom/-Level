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
        <button class="btn-secondary" id="instaShareBtn" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #FFFFFF; border: none; font-weight: 800;">
          📸 인스타그램 스토리에 공유하기
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

    const instaShareBtn = this.container.querySelector('#instaShareBtn');
    if (instaShareBtn) {
      instaShareBtn.addEventListener('click', () => {
        this.shareInstagramStory(resultData);
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

  shareInstagramStory(resultData) {
    // 1. 결과 카드 이미지 다운로드
    CardExporter.exportCardAsPNG(resultData);

    // 2. 접속 URL 클립보드 복사
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }

    // 3. 디바이스 탐지 및 인스타그램 스토리카메라 딥링크 이동
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(userAgent);

    if (isIOS || isAndroid) {
      alert('📸 결과 카드 이미지가 다운로드되었고, 링크가 클립보드에 복사되었습니다!\n\n인스타그램 스토리가 열리면 갤러리에서 저장된 인증서 이미지를 선택하고, [링크 스티커]에 복사된 주소를 붙여넣어 공유해 보세요!');

      setTimeout(() => {
        if (isIOS) {
          window.location.href = 'instagram://story-camera';
        } else if (isAndroid) {
          window.location.href = 'intent://story-camera/#Intent;scheme=instagram;package=com.instagram.android;end';
        }
      }, 800);
    } else {
      alert('📸 결과 카드 이미지가 저장되었으며, 테스트 링크가 클립보드에 복사되었습니다!\n(인스타그램 앱 자동 실행은 모바일 기기에서만 지원됩니다.)');
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
          title: `🥋 태권도 레벨 테스트 결과: ${resultData.type} (${resultData.subTitle})`,
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
