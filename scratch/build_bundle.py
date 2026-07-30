import os

with open('js/data/results.js', 'r', encoding='utf-8') as f:
    results_code = f.read()

with open('js/data/questions.js', 'r', encoding='utf-8') as f:
    questions_code = f.read()

# Clean export statements
results_clean = results_code.replace("export const RESULT_TYPES = {", "const RESULT_TYPES = {").strip()
if results_clean.startswith("/**"):
    results_clean = results_clean[results_clean.find("*/") + 2:].strip()

questions_clean = questions_code.replace("export const QUESTIONS = [", "const QUESTIONS = [").strip()
if questions_clean.startswith("/**"):
    questions_clean = questions_clean[questions_clean.find("*/") + 2:].strip()

bundle_code = f"""/**
 * Taekwondo Level Test - Universal Standalone Bundle (js/bundle.js)
 * Works on both file:// protocol (double-clicking index.html) and http:// servers.
 */
(function () {{
  'use strict';

  // --------------------------------------------------------------------------
  // 1. RESULT TYPES DEFINITION
  // --------------------------------------------------------------------------
  {results_clean}

  // --------------------------------------------------------------------------
  // 2. QUESTION DATA DEFINITION
  // --------------------------------------------------------------------------
  {questions_clean}

  // --------------------------------------------------------------------------
  // 3. CANVAS RESULT CARD EXPORTER
  // --------------------------------------------------------------------------
  class CardExporter {{
    static renderCanvas(resultData) {{
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = 600;
      canvas.height = 800;

      // Background Gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, 800);
      bgGradient.addColorStop(0, '#0F172A');
      bgGradient.addColorStop(1, '#0B132B');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, 600, 800);

      // Frame Borders
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 6;
      ctx.strokeRect(20, 20, 560, 760);

      // Inner Line Frame
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, 540, 740);

      // Dynamic Linked Header Title (Name + Dojang)
      let certTitle = '🥋 태권도 레벨 공식 인증서';
      if (resultData.userName && resultData.userDojang) {{
        certTitle = `🥋 [ ${{resultData.userDojang}} ] ${{resultData.userName}} 님의 인증서`;
      }} else if (resultData.userName) {{
        certTitle = `🥋 ${{resultData.userName}} 님의 태권도 레벨 인증서`;
      }} else if (resultData.userDojang) {{
        certTitle = `🥋 [ ${{resultData.userDojang}} ] 수련생의 인증서`;
      }}

      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 20px Pretendard, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(certTitle, 300, 80);

      // Top Percent Tag Pill
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      if (ctx.roundRect) {{
        ctx.roundRect(190, 110, 220, 36, 18);
      }} else {{
        ctx.rect(190, 110, 220, 36);
      }}
      ctx.fill();

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 18px Pretendard, sans-serif';
      ctx.fillText(`🔥 ${{resultData.topPercent}}`, 300, 134);

      // Belt Icon
      ctx.font = '80px sans-serif';
      ctx.fillText(resultData.icon, 300, 240);

      // Result Level Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 38px Pretendard, sans-serif';
      ctx.fillText(resultData.type, 300, 310);

      // Subtitle
      ctx.fillStyle = '#FBBF24';
      ctx.font = 'bold 24px Pretendard, sans-serif';
      ctx.fillText(`[${{resultData.subTitle}}]`, 300, 355);

      // Description
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '16px Pretendard, sans-serif';
      CardExporter.wrapText(ctx, resultData.description, 300, 420, 480, 26);

      // Quote
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'italic 16px Pretendard, sans-serif';
      ctx.fillText(resultData.quote, 300, 580);

      // Chemistry Box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(60, 620, 480, 90);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillStyle = '#34D399';
      ctx.font = 'bold 18px Pretendard, sans-serif';
      ctx.fillText(`💖 환상의 짝꿍: ${{resultData.bestMatch}}`, 300, 672);

      // Footer Watermark
      ctx.fillStyle = '#64748B';
      ctx.font = '14px Pretendard, sans-serif';
      ctx.fillText('🥋 태권도 레벨 테스트 (Taekwondo Level Test)', 300, 750);

      return canvas;
    }}

    static exportCardAsPNG(resultData) {{
      const canvas = CardExporter.renderCanvas(resultData);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      const namePart = resultData.userName ? `_${{resultData.userName}}` : '';
      a.download = `태권도_레벨_인증서${{namePart}}_${{resultData.type.replace(/\\s+/g, '_')}}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }}

    static getCanvasBlob(resultData) {{
      return new Promise((resolve) => {{
        const canvas = CardExporter.renderCanvas(resultData);
        canvas.toBlob((blob) => {{
          resolve(blob);
        }}, 'image/png');
      }});
    }}

    static wrapText(ctx, text, x, y, maxWidth, lineHeight) {{
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {{
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {{
          ctx.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        }} else {{
          line = testLine;
        }}
      }}
      ctx.fillText(line, x, currentY);
    }}
  }}

  // --------------------------------------------------------------------------
  // 3.5 STARTSCREEN COMPONENT WITH USER INPUTS & LIVE COUNTER
  // --------------------------------------------------------------------------
  class StartScreenComponent {{
    constructor(containerId, options = {{}}) {{
      this.containerId = containerId;
      this._container = null;
      this.onStart = options.onStart || (() => {{}});
      this.liveTimer = null;
    }}

    get container() {{
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }}

    set container(val) {{
      this._container = val;
    }}

    static getBaseCount() {{
      const launchDate = new Date('2026-07-01T00:00:00Z').getTime();
      const now = Date.now();
      const elapsedMinutes = Math.max(0, (now - launchDate) / (1000 * 60));
      const timeBasedCount = Math.floor(elapsedMinutes * 0.4);
      const extraCount = parseInt(localStorage.getItem('tkd_extra_participants') || '0', 10);
      return 12840 + timeBasedCount + extraCount;
    }}

    render() {{
      const targetNode = this.container;
      if (!targetNode) return;

      if (this.liveTimer) {{
        clearInterval(this.liveTimer);
        this.liveTimer = null;
      }}

      const currentCount = StartScreenComponent.getBaseCount();

      targetNode.innerHTML = `
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
            🔥 현재까지 <span id="participantCount" style="font-weight: 800; font-family: var(--font-accent);">${{currentCount.toLocaleString()}}</span>명 참여 완료
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
    }}

    animateCounter(targetCount) {{
      const targetNode = this.container;
      if (!targetNode) return;
      const countEl = targetNode.querySelector('#participantCount');
      if (!countEl) return;

      const startCount = Math.max(0, targetCount - 35);
      const duration = 1000;
      const startTime = performance.now();

      const step = (currentTime) => {{
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startCount + (targetCount - startCount) * easeOut);
        
        countEl.textContent = current.toLocaleString();

        if (progress < 1) {{
          requestAnimationFrame(step);
        }} else {{
          countEl.textContent = targetCount.toLocaleString();
        }}
      }};

      requestAnimationFrame(step);
    }}

    startLiveTicker(initialCount) {{
      let runningCount = initialCount;

      this.liveTimer = setInterval(() => {{
        const targetNode = this.container;
        if (!targetNode) return;

        if (Math.random() < 0.45) {{
          const inc = Math.random() < 0.8 ? 1 : 2;
          runningCount += inc;

          const badgeEl = targetNode.querySelector('#participantBadge');
          const countEl = targetNode.querySelector('#participantCount');

          if (countEl && badgeEl) {{
            countEl.textContent = runningCount.toLocaleString();
            badgeEl.classList.remove('count-pulse');
            void badgeEl.offsetWidth;
            badgeEl.classList.add('count-pulse');
          }}
        }}
      }}, 4500);
    }}

    bindEvents() {{
      const targetNode = this.container;
      if (!targetNode) return;

      const startBtn = targetNode.querySelector('#startTestBtn');
      if (startBtn) {{
        startBtn.addEventListener('click', () => {{
          if (this.liveTimer) {{
            clearInterval(this.liveTimer);
            this.liveTimer = null;
          }}

          const nameInput = targetNode.querySelector('#userNameInput');
          const dojangInput = targetNode.querySelector('#userDojangInput');

          const userName = nameInput ? nameInput.value.trim() : '';
          const userDojang = dojangInput ? dojangInput.value.trim() : '';

          this.onStart({{ userName, userDojang }});
        }});
      }}
    }}
  }}

  // --------------------------------------------------------------------------
  // 3.6 QUIZSCREEN COMPONENT
  // --------------------------------------------------------------------------
  class QuizScreenComponent {{
    constructor(containerId, options = {{}}) {{
      this.containerId = containerId;
      this._container = null;
      this.onSelectOption = options.onSelectOption || (() => {{}});
      this.onPrevStep = options.onPrevStep || (() => {{}});
      this.lastDirection = 'next';
    }}

    get container() {{
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }}

    set container(val) {{
      this._container = val;
    }}

    render(questionData, currentStep, totalSteps, selectedOptionIndex = null) {{
      const targetNode = this.container;
      if (!targetNode || !questionData) return;

      const progressContainer = document.getElementById('progressContainer');
      const percentage = Math.round((currentStep / totalSteps) * 100);

      if (progressContainer) {{
        progressContainer.innerHTML = `
          <div class="progress-container">
            <div class="progress-header">
              <span>진행률</span>
              <span class="progress-counter">Q. ${{String(currentStep).padStart(2, '0')}} / ${{String(totalSteps).padStart(2, '0')}}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${{percentage}}%;"></div>
            </div>
          </div>
        `;
      }}

      const optionsHtml = questionData.options.map((opt, idx) => `
        <button class="option-card ${{selectedOptionIndex === idx ? 'selected' : ''}}" data-index="${{idx}}">
          <span class="option-index">${{idx + 1}}</span>
          <span class="option-text">${{opt.text}}</span>
        </button>
      `).join('');

      const backBtnHtml = currentStep > 1
        ? `<button class="btn-back" id="prevBtn">← 이전 질문으로</button>`
        : `<span></span>`;

      const animClass = this.lastDirection === 'prev' ? 'slide-in-left' : 'slide-in-right';

      targetNode.innerHTML = `
        <div class="glass-card quiz-view ${{animClass}}">
          <h2 class="question-text">${{questionData.question}}</h2>
          <div class="options-group">
            ${{optionsHtml}}
          </div>
          <div class="nav-buttons">
            ${{backBtnHtml}}
          </div>
        </div>
      `;

      const quizView = targetNode.querySelector('.quiz-view');
      const optionBtns = targetNode.querySelectorAll('.option-card');

      optionBtns.forEach(btn => {{
        btn.addEventListener('click', () => {{
          btn.classList.add('clicking');
          btn.classList.add('selected');

          const idx = parseInt(btn.getAttribute('data-index'), 10);
          this.lastDirection = 'next';

          if (quizView) {{
            quizView.classList.remove('slide-in-right', 'slide-in-left');
            quizView.classList.add('slide-out-left');
          }}

          setTimeout(() => {{
            this.onSelectOption(questionData, idx);
          }}, 180);
        }});
      }});

      const prevBtn = targetNode.querySelector('#prevBtn');
      if (prevBtn) {{
        prevBtn.addEventListener('click', () => {{
          this.lastDirection = 'prev';

          if (quizView) {{
            quizView.classList.remove('slide-in-right', 'slide-in-left');
            quizView.classList.add('slide-out-right');
          }}

          setTimeout(() => {{
            this.onPrevStep();
          }}, 180);
        }});
      }}
    }}
  }}

  // --------------------------------------------------------------------------
  // 3.7 LOADINGSCREEN COMPONENT
  // --------------------------------------------------------------------------
  class LoadingScreenComponent {{
    constructor(containerId) {{
      this.containerId = containerId;
      this._container = null;
    }}

    get container() {{
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }}

    set container(val) {{
      this._container = val;
    }}

    render() {{
      const targetNode = this.container;
      if (!targetNode) return;

      targetNode.innerHTML = `
        <div class="glass-card loading-view">
          <div class="spinner" aria-label="내공 측정 로더"></div>
          <h2 style="font-size: 1.35rem; font-weight: 800; color: #FFFFFF; margin-top: 10px;">
            내 태권도 내공 측정 중...
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-sub); line-height: 1.5;">
            국기원 품·단 통계 데이터 및 무도 정신 항목을<br>
            기준으로 종합 분석하고 있습니다.
          </p>
        </div>
      `;
    }}
  }}

  // --------------------------------------------------------------------------
  // 3.8 DISTRIBUTION CHART COMPONENT
  // --------------------------------------------------------------------------
  class DistributionChartComponent {{
    constructor(containerId) {{
      this.containerId = containerId;
      this._container = null;
    }}

    get container() {{
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }}

    set container(val) {{
      this._container = val;
    }}

    render(userResult) {{
      const targetNode = this.container;
      if (!targetNode || !userResult) return;

      const userCategoryId = userResult.id;

      const tierData = [
        {{ id: 'GWANJANG', icon: '👑', label: '관장님 (마스터)', pct: '0.001%', barWidth: '100%', color: '#F59E0B' }},
        {{ id: 'SABEOM', icon: '🥋', label: '사범님 (솔선수범 리더)', pct: '0.1%', barWidth: '95%', color: '#10B981' }},
        {{ id: 'PLAYER', icon: '🥊', label: '선수 (승부사의 기상)', pct: '1.0%', barWidth: '88%', color: '#2563EB' }},
        {{ id: 'DAN', icon: '🥋', label: '유단자 (1~5단)', pct: '12.0%', barWidth: '72%', color: '#F59E0B', group: ['DAN_1', 'DAN_2', 'DAN_3', 'DAN_4', 'DAN_5'] }},
        {{ id: 'POOM', icon: '🏅', label: '유품자 (1~4품)', pct: '25.0%', barWidth: '60%', color: '#EF4444', group: ['POOM_1', 'POOM_2', 'POOM_3', 'POOM_4'] }},
        {{ id: 'RED_BELT', icon: '❤️', label: '빨간 띠 (열정의 수련생)', pct: '18.0%', barWidth: '50%', color: '#EF4444' }},
        {{ id: 'BLUE_BELT', icon: '💙', label: '파란 띠 (푸른 자신감)', pct: '17.0%', barWidth: '42%', color: '#3B82F6' }},
        {{ id: 'YELLOW_BELT', icon: '💛', label: '노란 띠 (기초의 새싹)', pct: '15.0%', barWidth: '35%', color: '#EAB308' }},
        {{ id: 'WHITE_BELT', icon: '🤍', label: '흰 띠 (태권도 첫걸음)', pct: '11.9%', barWidth: '28%', color: '#E2E8F0' }}
      ];

      const rowsHtml = tierData.map(tier => {{
        const isUserTier = (tier.id === userCategoryId) || (tier.group && tier.group.includes(userCategoryId));
        const badgeHtml = isUserTier ? `<span style="background: var(--gold-accent); color: #0F172A; padding: 2px 6px; border-radius: 99px; font-size: 0.7rem; font-weight: 900; margin-left: 4px;">👈 내 위치</span>` : '';

        return `
          <div class="chart-row ${{isUserTier ? 'is-user-tier' : ''}}">
            <div class="chart-row-meta">
              <span class="chart-label">${{tier.icon}} ${{tier.label}} ${{badgeHtml}}</span>
              <span class="chart-val">${{tier.pct}}</span>
            </div>
            <div class="chart-bar-bg">
              <div class="chart-bar-fill" style="width: ${{tier.barWidth}}; background: ${{tier.color}};"></div>
            </div>
          </div>
        `;
      }}).join('');

      targetNode.innerHTML = `
        <div class="chart-container-card">
          <div class="chart-header">
            <div class="chart-title">📊 전체 수련생 레벨 분포도</div>
            <div class="chart-subtag">국기원 실시간 집계</div>
          </div>
          <div class="chart-list">
            ${{rowsHtml}}
          </div>
        </div>
      `;
    }}
  }}

  // --------------------------------------------------------------------------
  // 3.9 RESULTSCREEN COMPONENT
  // --------------------------------------------------------------------------
  class ResultScreenComponent {{
    constructor(containerId, options = {{}}) {{
      this.containerId = containerId;
      this._container = null;
      this.onRestart = options.onRestart || (() => {{}});
    }}

    get container() {{
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }}

    set container(val) {{
      this._container = val;
    }}

    render(resultData) {{
      const targetNode = this.container;
      if (!targetNode || !resultData) return;

      let certTitle = '태권도 레벨 공식 인증서';
      if (resultData.userName && resultData.userDojang) {{
        certTitle = `[ ${{resultData.userDojang}} ] ${{resultData.userName}} 님의 레벨 인증서`;
      }} else if (resultData.userName) {{
        certTitle = `${{resultData.userName}} 님의 태권도 레벨 인증서`;
      }} else if (resultData.userDojang) {{
        certTitle = `[ ${{resultData.userDojang}} ] 수련생의 레벨 인증서`;
      }}

      targetNode.innerHTML = `
        <div class="result-view">
          <div class="certificate-card">
            <div style="font-size: 0.85rem; font-weight: 800; color: #94A3B8; margin-bottom: 8px; letter-spacing: -0.2px;">
              🥋 ${{certTitle}}
            </div>
            <div class="top-percent-tag">🔥 ${{resultData.topPercent}}</div>
            <div class="belt-badge-icon">${{resultData.icon}}</div>
            <h2 class="result-belt-title">${{resultData.type}}</h2>
            <div class="result-subtitle">부칭호: ${{resultData.subTitle}}</div>
            
            <p class="result-desc">${{resultData.description}}</p>
            <p style="font-style: italic; color: var(--gold-glow); font-size: 0.85rem; margin-bottom: 16px;">
              ${{resultData.quote}}
            </p>

            <div class="chemistry-box" style="grid-template-columns: 1fr;">
              <div class="chem-card chem-best">
                <div class="chem-title">💖 환상의 짝꿍</div>
                <div class="chem-value">${{resultData.bestMatch}}</div>
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
            <button class="btn-primary" id="downloadBtn">
              📥 결과 카드 이미지 저장 (PNG)
            </button>
            <button class="btn-secondary" id="kakaoShareBtn" style="background: #FEE500; color: #191919; border: none; font-weight: 800;">
              💬 카카오톡으로 결과 공유하기
            </button>
            <button class="btn-secondary" id="instaShareBtn" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #FFFFFF; border: none; font-weight: 800;">
              📸 인스타그램 스토리에 공유하기
            </button>
            <button class="btn-secondary" id="copyUrlBtn">
              🔗 테스트 링크 복사하기
            </button>
            <button class="btn-back" id="restartBtn" style="margin-top: 8px;">
              🔄 테스트 다시 도전하기
            </button>
          </div>
        </div>
      `;

      this.bindEvents(resultData);
    }}

    bindEvents(resultData) {{
      const targetNode = this.container;
      if (!targetNode) return;

      const downloadBtn = targetNode.querySelector('#downloadBtn');
      if (downloadBtn) {{
        downloadBtn.addEventListener('click', () => {{
          CardExporter.exportCardAsPNG(resultData);
        }});
      }}

      const kakaoBtn = targetNode.querySelector('#kakaoShareBtn');
      if (kakaoBtn) {{
        kakaoBtn.addEventListener('click', () => {{
          this.shareKakao(resultData);
        }});
      }}

      const instaBtn = targetNode.querySelector('#instaShareBtn');
      if (instaBtn) {{
        instaBtn.addEventListener('click', () => {{
          this.shareInstagramStory(resultData);
        }});
      }}

      const copyUrlBtn = targetNode.querySelector('#copyUrlBtn');
      if (copyUrlBtn) {{
        copyUrlBtn.addEventListener('click', () => {{
          navigator.clipboard.writeText(window.location.href);
          alert('테스트 주소가 클립보드에 복사되었습니다!');
        }});
      }}

      const restartBtn = targetNode.querySelector('#restartBtn');
      if (restartBtn) {{
        restartBtn.addEventListener('click', () => {{
          this.onRestart();
        }});
      }}
    }}

    async shareKakao(resultData) {{
      const kakaoKey = window.ENV_KAKAO_JS_KEY || '033d0971022acb44ebc09ce26768cfe0';
      if (!window.Kakao) {{
        navigator.clipboard.writeText(window.location.href);
        alert('카카오 SDK를 로드할 수 없습니다. 테스트 링크가 복사되었습니다!');
        return;
      }}

      try {{
        if (!window.Kakao.isInitialized()) {{
          window.Kakao.init(kakaoKey);
        }}

        // 1. Render actual Canvas certificate image blob
        const imageBlob = await CardExporter.getCanvasBlob(resultData);
        const file = new File([imageBlob], 'certificate.png', {{ type: 'image/png' }});

        // 2. Upload image dynamically to Kakao CDN server
        let uploadedImageUrl = null;
        try {{
          const uploadRes = await window.Kakao.Share.uploadImage({{ file: [file] }});
          if (uploadRes && uploadRes.infos && uploadRes.infos.original) {{
            uploadedImageUrl = uploadRes.infos.original.url;
          }}
        }} catch (e) {{
          console.warn('Kakao image upload fallback:', e);
        }}

        const finalImageUrl = uploadedImageUrl || 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&auto=format&fit=crop&q=80';

        const testUrl = 'https://level-rouge-gamma.vercel.app';

        let certTitle = '🥋 태권도 레벨 공식 인증서';
        if (resultData.userName && resultData.userDojang) {{
          certTitle = `🥋 [${{resultData.userDojang}}] ${{resultData.userName}} 님의 레벨 인증서`;
        }} else if (resultData.userName) {{
          certTitle = `🥋 ${{resultData.userName}} 님의 태권도 레벨 인증서`;
        }} else if (resultData.userDojang) {{
          certTitle = `🥋 [${{resultData.userDojang}}] 수련생의 레벨 인증서`;
        }}

        const descText = `🔥 내공 레벨: [ ${{resultData.type}} ] (${{resultData.topPercent}})\\n💖 환상의 짝꿍: ${{resultData.bestMatch}}\\n\\n👉 바로가기: https://level-rouge-gamma.vercel.app`;

        window.Kakao.Share.sendDefault({{
          objectType: 'feed',
          content: {{
            title: certTitle,
            description: descText,
            imageUrl: finalImageUrl,
            imageWidth: 600,
            imageHeight: 800,
            link: {{
              mobileWebUrl: testUrl,
              webUrl: testUrl,
            }},
          }},
          buttons: [
            {{
              title: '⚡ 나도 레벨 테스트 하기',
              link: {{
                mobileWebUrl: testUrl,
                webUrl: testUrl,
              }},
            }}
          ],
        }});
      }} catch (e) {{
        console.warn('Kakao share error:', e);
        navigator.clipboard.writeText(window.location.href);
        alert('카카오톡 공유 처리 중 오류가 발생했습니다. 테스트 링크가 클립보드에 복사되었습니다!');
      }}
    }}

    shareInstagramStory(resultData) {{
      alert('📸 인스타그램 스토리 공유 안내\\n\\n1. 자동으로 결과 카드 이미지(PNG)가 다운로드됩니다.\\n2. 사이트 주소가 클립보드에 복사됩니다.\\n3. 인스타그램 앱 스토리 카메라로 이동합니다! (이미지 및 링크 첨부)');
      CardExporter.exportCardAsPNG(resultData);
      navigator.clipboard.writeText(window.location.href);

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {{
        setTimeout(() => {{
          window.location.href = 'instagram://story-camera';
        }}, 1500);
      }}
    }}
  }}

  // --------------------------------------------------------------------------
  // 3.10 HEADER COMPONENT
  // --------------------------------------------------------------------------
  class HeaderComponent {{
    constructor(containerId) {{
      this.containerId = containerId;
      this._container = null;
    }}

    get container() {{
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }}

    set container(val) {{
      this._container = val;
    }}

    render() {{
      const targetNode = this.container;
      if (!targetNode) return;

      targetNode.innerHTML = `
        <header class="site-header">
          <a href="#" class="brand-logo" id="headerLogoBtn">
            <span>🥋 태권도 LEVEL</span>
            <span class="brand-badge">TEST</span>
          </a>
        </header>
      `;

      const logoBtn = targetNode.querySelector('#headerLogoBtn');
      if (logoBtn) {{
        logoBtn.addEventListener('click', (e) => {{
          e.preventDefault();
          window.location.reload();
        }});
      }}
    }}
  }}

  // --------------------------------------------------------------------------
  // 4. MAIN SPA APPLICATION CONTROLLER
  // --------------------------------------------------------------------------
  class TaekwondoApp {{
    constructor() {{
      this.state = 'START'; // 'START' | 'QUIZ' | 'LOADING' | 'RESULT'
      this.currentStep = 0;
      this.answers = [];
      this.scores = {{}};
      this.finalResult = null;
      this.userInfo = {{ userName: '', userDojang: '' }};

      this.header = new HeaderComponent('headerContainer');
      this.startScreen = new StartScreenComponent('mainContainer', {{
        onStart: (userInfo = {{}}) => {{
          this.userInfo = userInfo;
          this.state = 'QUIZ';
          this.currentStep = 0;
          this.answers = [];
          this.scores = {{}};
          this.render();
        }}
      }});

      this.quizScreen = new QuizScreenComponent('mainContainer', {{
        onSelectOption: (question, idx) => this.handleSelect(question, idx),
        onPrevStep: () => this.handlePrev()
      }});

      this.loadingScreen = new LoadingScreenComponent('mainContainer');
      this.resultScreen = new ResultScreenComponent('mainContainer', {{
        onRestart: () => this.handleRestart()
      }});

      this.init();
    }}

    init() {{
      this.header.render();
      this.render();
    }}

    render() {{
      const mainContainer = document.getElementById('mainContainer');
      const progressContainer = document.getElementById('progressContainer');
      if (!mainContainer) return;

      if (this.state === 'START') {{
        if (progressContainer) progressContainer.innerHTML = '';
        this.startScreen.container = mainContainer;
        this.startScreen.render();

      }} else if (this.state === 'QUIZ') {{
        const question = QUESTIONS[this.currentStep];
        const selectedOptionIndex = this.answers[this.currentStep] !== undefined
          ? this.answers[this.currentStep]
          : null;

        this.quizScreen.container = mainContainer;
        this.quizScreen.render(question, this.currentStep + 1, QUESTIONS.length, selectedOptionIndex);

      }} else if (this.state === 'LOADING') {{
        if (progressContainer) progressContainer.innerHTML = '';
        this.loadingScreen.container = mainContainer;
        this.loadingScreen.render();

        setTimeout(() => {{
          this.calculateResult();
          this.state = 'RESULT';
          this.render();
        }}, 1500);

      }} else if (this.state === 'RESULT') {{
        if (progressContainer) progressContainer.innerHTML = '';
        this.resultScreen.container = mainContainer;
        this.resultScreen.render(this.finalResult);
      }}
    }}

    handleSelect(question, optionIndex) {{
      const selected = question.options[optionIndex];
      this.answers[this.currentStep] = optionIndex;

      // Special scoring for Q16 Certification Question
      if (question.id === 16) {{
        if (optionIndex === 0) {{
          // 2개 다 소유: 최고 가점 (+3)
          this.scores['GWANJANG'] = (this.scores['GWANJANG'] || 0) + 3;
          this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 3;
        }} else if (optionIndex === 1) {{
          // 둘 중 1개 소유: 높은 가점 (+2)
          this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 2;
          this.scores['DAN_4'] = (this.scores['DAN_4'] || 0) + 2;
        }} else if (optionIndex === 2) {{
          // 품/단증 보유: 기본 점수 (+1)
          this.scores['DAN_1'] = (this.scores['DAN_1'] || 0) + 1;
        }} else {{
          // 자격증 없음: 노란 띠 (+1)
          this.scores['YELLOW_BELT'] = (this.scores['YELLOW_BELT'] || 0) + 1;
        }}
      }} else {{
        const target = selected.target;
        this.scores[target] = (this.scores[target] || 0) + 1;
      }}

      if (this.currentStep < QUESTIONS.length - 1) {{
        this.currentStep++;
        this.render();
      }} else {{
        this.state = 'LOADING';
        this.render();
      }}
    }}

    handlePrev() {{
      if (this.currentStep > 0) {{
        this.currentStep--;
        this.render();
      }}
    }}

    handleRestart() {{
      this.state = 'START';
      this.currentStep = 0;
      this.answers = [];
      this.scores = {{}};
      this.finalResult = null;
      this.render();
    }}

    calculateResult() {{
      // Increment local participation count upon test completion!
      try {{
        const currentExtra = parseInt(localStorage.getItem('tkd_extra_participants') || '0', 10);
        localStorage.setItem('tkd_extra_participants', (currentExtra + 1).toString());
      }} catch (e) {{
        console.warn('localStorage access warning:', e);
      }}

      // Find maximum score category
      let topCategory = 'WHITE_BELT';
      let maxScore = -1;

      for (const [type, score] of Object.entries(this.scores)) {{
        if (score > maxScore) {{
          maxScore = score;
          topCategory = type;
        }}
      }}

      // Check Q16 Certification Answer (index for Q16)
      const q16Index = QUESTIONS.findIndex(q => q.id === 16);
      const q16AnswerIndex = q16Index !== -1 ? this.answers[q16Index] : undefined;

      const hasBothCerts = (q16AnswerIndex === 0);
      const hasOneCert = (q16AnswerIndex === 0 || q16AnswerIndex === 1);

      // Business Rule Enforcement:
      // 1. 관장님(GWANJANG): 반드시 2개 다 소유해야 가능! (미소유 시 사범님/5단으로 조정)
      if (topCategory === 'GWANJANG' && !hasBothCerts) {{
        topCategory = hasOneCert ? 'SABEOM' : 'DAN_5';
      }}

      // 2. 사범님(SABEOM): 자격증 1개 이상 소유 시 가능! (미소유 시 4단으로 조정)
      if (topCategory === 'SABEOM' && !hasOneCert) {{
        topCategory = 'DAN_4';
      }}

      this.finalResult = {{
        ...(RESULT_TYPES[topCategory] || RESULT_TYPES.WHITE_BELT),
        userName: this.userInfo.userName || '',
        userDojang: this.userInfo.userDojang || ''
      }};
    }}
  }}

  // Auto initialize on load
  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', () => new TaekwondoApp());
  }} else {{
    new TaekwondoApp();
  }}
}})();
"""

with open('js/bundle.js', 'w', encoding='utf-8') as f:
    f.write(bundle_code)

print("Generated clean js/bundle.js successfully!")
