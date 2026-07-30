/**
 * ShareSection Component
 * Action buttons for downloading PNG card, copying result URL, and restarting test.
 */
import { CardExporter } from './CardExporter.js';

export class ShareSectionComponent {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this._container = null;
    this.onRestart = options.onRestart || (() => {});
  }

  get container() {
    if (this._container) return this._container;
    return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
  }

  set container(val) {
    this._container = val;
  }

  render(resultData) {
    const targetNode = this.container;
    if (!targetNode || !resultData) return;

    targetNode.innerHTML = `
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
    const targetNode = this.container;
    if (!targetNode) return;

    const downloadBtn = targetNode.querySelector('#downloadCardBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        CardExporter.exportCardAsPNG(resultData);
      });
    }

    const kakaoShareBtn = targetNode.querySelector('#kakaoShareBtn');
    if (kakaoShareBtn) {
      kakaoShareBtn.addEventListener('click', () => {
        this.shareKakaoTalk(resultData);
      });
    }

    const instaShareBtn = targetNode.querySelector('#instaShareBtn');
    if (instaShareBtn) {
      instaShareBtn.addEventListener('click', () => {
        this.shareInstagramStory(resultData);
      });
    }

    const copyUrlBtn = targetNode.querySelector('#copyUrlBtn');
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

    const restartBtn = targetNode.querySelector('#restartTestBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.onRestart();
      });
    }
  }

  shareInstagramStory(resultData) {
    // 1. Trigger PNG download first
    CardExporter.exportInstaStoryPNG(resultData);

    // 2. Copy URL to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(userAgent);

    if (isIOS || isAndroid) {
      // Alert dialog pauses execution until user taps [OK], giving mobile browser plenty of time to save the file
      alert('📸 9:16 인스타그램 스토리 인증서가 다운로드되었고, 테스트 링크가 복사되었습니다!\n\n[확인]을 누르면 인스타그램 스토리 카메라로 이동합니다.\n(스토리 갤러리에서 저장된 이미지를 선택하고 링크 스티커를 붙여보세요!)');

      if (isIOS) {
        window.location.href = 'instagram://story-camera';
      } else if (isAndroid) {
        window.location.href = 'intent://story-camera/#Intent;scheme=instagram;package=com.instagram.android;end';
      }
    } else {
      alert('📸 9:16 인스타그램 스토리 인증서 이미지가 다운로드되었으며, 테스트 링크가 클립보드에 복사되었습니다!\n(인스타그램 앱 자동 이동은 모바일 기기에서 지원됩니다.)');
    }
  }

  async shareKakaoTalk(resultData) {
    const kakaoKey = window.ENV_KAKAO_JS_KEY || '033d0971022acb44ebc09ce26768cfe0';

    if (!window.Kakao) {
      navigator.clipboard.writeText(window.location.href);
      alert('카카오 SDK를 로드할 수 없습니다. 테스트 링크가 복사되었습니다!');
      return;
    }

    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoKey);
      }

      // 1. Render actual Canvas certificate image blob
      const imageBlob = await CardExporter.getCanvasBlob(resultData);
      const file = new File([imageBlob], 'certificate.png', { type: 'image/png' });

      // 2. Upload image dynamically to Kakao CDN server
      let uploadedImageUrl = null;
      try {
        const uploadRes = await window.Kakao.Share.uploadImage({ file: [file] });
        if (uploadRes && uploadRes.infos && uploadRes.infos.original) {
          uploadedImageUrl = uploadRes.infos.original.url;
        }
      } catch (e) {
        console.warn('Kakao image upload fallback:', e);
      }

      const finalImageUrl = uploadedImageUrl || 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&auto=format&fit=crop&q=80';

      const testUrl = 'https://level-rouge-gamma.vercel.app';

      let certTitle = '🥋 태권도 레벨 공식 인증서';
      if (resultData.userName && resultData.userDojang) {
        certTitle = `🥋 [${resultData.userDojang}] ${resultData.userName} 님의 레벨 인증서`;
      } else if (resultData.userName) {
        certTitle = `🥋 ${resultData.userName} 님의 태권도 레벨 인증서`;
      } else if (resultData.userDojang) {
        certTitle = `🥋 [${resultData.userDojang}] 수련생의 레벨 인증서`;
      }

      const descText = `🔥 내공 레벨: [ ${resultData.type} ] (${resultData.topPercent})\n💖 환상의 짝꿍: ${resultData.bestMatch}\n\n👉 바로가기: https://level-rouge-gamma.vercel.app`;

      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: certTitle,
          description: descText,
          imageUrl: finalImageUrl,
          imageWidth: 600,
          imageHeight: 800,
          link: {
            mobileWebUrl: testUrl,
            webUrl: testUrl,
          },
        },
        buttons: [
          {
            title: '⚡ 나도 레벨 테스트 하기',
            link: {
              mobileWebUrl: testUrl,
              webUrl: testUrl,
            },
          }
        ],
      });
    } catch (err) {
      console.warn('Kakao Share error:', err);
      navigator.clipboard.writeText(window.location.href);
      alert('카카오톡 공유 처리 중 오류가 발생했습니다. (도메인 등록 상태를 확인해주세요)\n테스트 링크가 클립보드에 복사되었습니다!');
    }
  }
}
