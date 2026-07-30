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
    CardExporter.exportCardAsPNG(resultData);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }

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
    const kakaoKey = window.ENV_KAKAO_JS_KEY || '033d0971022acb44ebc09ce26768cfe0';

    if (window.Kakao) {
      try {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoKey);
        }

        let mainTitle = `🥋 나의 태권도 내공 레벨: [ ${resultData.type} ]`;
        if (resultData.userName && resultData.userDojang) {
          mainTitle = `🥋 [${resultData.userDojang}] ${resultData.userName} 님의 내공 레벨: [ ${resultData.type} ]`;
        } else if (resultData.userName) {
          mainTitle = `🥋 ${resultData.userName} 님의 내공 레벨: [ ${resultData.type} ]`;
        } else if (resultData.userDojang) {
          mainTitle = `🥋 [${resultData.userDojang}] 수련생의 내공 레벨: [ ${resultData.type} ]`;
        }

        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: mainTitle,
            description: `부칭호: ${resultData.subTitle} (${resultData.topPercent})\n"${resultData.quote}"\n\n🔥 당신의 진짜 태권도 레벨과 칭호도 지금 테스트해보세요!`,
            imageUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&auto=format&fit=crop&q=80',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
          itemContent: {
            profileText: '🥋 태권도 레벨 테스트 공식 인증',
            items: [
              { item: '내공 레벨', itemOp: resultData.type },
              { item: '국기원 비율', itemOp: resultData.topPercent },
              { item: '환상의 짝꿍', itemOp: resultData.bestMatch }
            ]
          },
          buttons: [
            {
              title: '⚡ 나도 레벨 테스트 하기',
              link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
              },
            },
            {
              title: '🥋 결과 확인 및 도전',
              link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
              },
            }
          ],
        });
      } catch (err) {
        console.warn('Kakao Share error:', err);
        navigator.clipboard.writeText(window.location.href);
        alert('카카오톡 공유 도메인이 등록되지 않았거나 카카오 SDK 오류가 발생했습니다.\n(카카오 디벨로퍼스 내 플랫폼 도메인 등록 필요)\n테스트 링크가 클립보드에 복사되었습니다!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('카카오 SDK를 로드할 수 없습니다. 테스트 링크가 복사되었습니다!');
    }
  }
}
