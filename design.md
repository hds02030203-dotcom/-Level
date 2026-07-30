# [DESIGN] 태권도 레벨 테스트 UI/UX 디자인 시스템 가이드 (design.md)

본 문서는 **태권도 레벨 테스트 (Taekwondo Level Test)** 웹 애플리케이션의 UI/UX 디자인 시스템, 컬러 팔레트, 타이포그래피, 컴포넌트 사양 및 애니메이션 가이드를 정리한 전문 디자인 명세서입니다.

---

## 1. 디자인 컨셉 & 브랜드 아이덴티티 (Design Concept)

### 🎯 핵심 컨셉: *"Traditional Discipline Meets Modern Energy"*
* **도복의 단정함 (Martial Discipline)**: 깔끔한 백색(Dobok White)과 여백의 미를 활용하여 무도의 정갈함을 표현합니다.
* **역동적인 에너지 (Dynamic Energy)**: 태권도 발차기의 절도와 타격감을 묵직한 딥 블루(Deep Navy)와 비비드 크림슨 레드(Crimson Red), 그리고 골드 아우라 네온 글래스모피즘(Glassmorphism)으로 연출합니다.
* **친근한 게이미피케이션 (Gamified Immersion)**: 초보자부터 전문가까지 즐겁게 몰입할 수 있도록 귀엽고 매력적인 띠 뱃지 시각화와 생동감 넘치는 마이크로 애니메이션을 제공합니다.

---

## 2. 컬러 시스템 (Color System)

### 2.1 Primary & Neutral Palette (기본 컬러)

| 구분 | Color Name | Hex Code | RGB | 용도 및 설명 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Navy** | Dobok Deep Navy | `#0B132B` | `rgb(11, 19, 43)` | 주 배경색, 헤더, 강렬한 무도 감성 |
| **Primary Red** | Taekwondo Red | `#E63946` | `rgb(230, 57, 70)` | 메인 액션 버튼, 강조 포인트, 청·홍 콘트라스트 |
| **Secondary Blue**| Taekwondo Blue | `#1D4ED8` | `rgb(29, 78, 216)` | 겨루기 코트 블루, 액티브 포인트 |
| **Background Dark**| Night Dojang | `#0F172A` | `rgb(15, 23, 42)` | 다크 모드 카드 배경, 깊이감 부여 |
| **Surface Glass** | White Glass | `rgba(255, 255, 255, 0.08)` | - | 글래스모피즘 카드 배경 |
| **Text Primary** | Pure White | `#F8FAFC` | `rgb(248, 250, 252)` | 주 타이틀, 가독성 우수 텍스트 |
| **Text Muted** | Silver Muted | `#94A3B8` | `rgb(148, 163, 184)` | 부제목, 이전 질문 버튼, 캡션 |

---

### 2.2 Belt Level Colors (7가지 띠/레벨 테마 컬러)

| 레벨 유형 | 대표 띠 색상 | Accent Color | Hex / Gradient | Visual Effect |
| :--- | :--- | :--- | :--- | :--- |
| 🤍 **1. 흰 띠** | Pure White Belt | `#E2E8F0` | `linear-gradient(135deg, #FFFFFF, #E2E8F0)` | 은은한 순백색 펄 그라데이션 |
| 💛 **2. 노란 띠** | Bright Yellow Belt | `#EAB308` | `linear-gradient(135deg, #FDE047, #CA8A04)` | 화사한 비비드 옐로우 |
| 💙 **3. 파란 띠** | Confident Blue Belt | `#3B82F6` | `linear-gradient(135deg, #60A5FA, #1D4ED8)` | 청량하고 당찬 일렉트릭 블루 |
| ❤️ **4. 빨간 띠** | Passion Red Belt | `#EF4444` | `linear-gradient(135deg, #FF6B6B, #DC2626)` | 정열적인 비비드 레드 |
| 🏅 **5. 유품자 (1~4품)**| Red & Black Poom | `#DC2626` / `#18181B` | `linear-gradient(90deg, #DC2626 50%, #18181B 50%)` | 품 띠 특유의 흑/홍 2색 패턴 |
| 🥋 **6. 유단자 (1~5단)**| Black Belt Gold | `#18181B` / `#F59E0B` | `linear-gradient(135deg, #27272A, #090D16)` | 검은 띠 & 골드 자수 포인트 |
| 🥊 **7. 선수** | Competitor Mat | `#2563EB` / `#EF4444` | `linear-gradient(135deg, #1D4ED8, #DC2626)` | 강렬한 경기장 청/홍 조화 |
| 🥋 **8. 사범님** | Leader Navy Gold | `#0F172A` / `#10B981` | `linear-gradient(135deg, #1E293B, #0F172A)` | 중후한 리더쉽 네이비 & 에메랄드 |
| 👑 **9. 관장님** | Royal Gold Master | `#F59E0B` / `#D97706` | `linear-gradient(135deg, #F59E0B, #B45309)` | 럭셔리 골드 네온 림라이트 |

---

## 3. 타이포그래피 (Typography System)

웹 성능과 한글 가독성을 위하여 **Pretendard** 및 **Noto Sans KR**을 메인 폰트로 사용하고, 숫자 및 강조 타이틀에는 **Outfit** 또는 **Montserrat**을 적용합니다.

```css
/* 글로벌 타이포그래피 설정 예시 */
body {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Noto Sans KR', sans-serif;
  word-break: keep-all;
  -webkit-font-smoothing: antialiased;
}
```

### 3.1 Type Hierarchy Scale

| Level | Size (Mobile / Desktop) | Weight | Line Height | Letter Spacing | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Header** | `32px` / `44px` | `800 (ExtraBold)`| `1.2` | `-0.02em` | 메인 헤드라인 ("내 태권도 내공은?") |
| **Title H1** | `24px` / `32px` | `700 (Bold)` | `1.3` | `-0.01em` | 퀴즈 질문 ("도장에 들어설 때...") |
| **Title H2** | `20px` / `26px` | `700 (Bold)` | `1.35` | `0` | 결과 레벨 명칭 ("사범님") |
| **Subtitle B1** | `16px` / `18px` | `600 (SemiBold)`| `1.4` | `0` | 서브 칭호 ("솔선수범 리더") |
| **Body Text** | `14px` / `16px` | `400 (Regular)` | `1.6` | `0` | 선택지 문항, 상세 설명글 |
| **Badge & Tag** | `12px` / `14px` | `700 (Bold)` | `1.2` | `0.05em` | **상위 % 태그** ("상위 0.1%"), 띠 뱃지 |

---

## 4. UI 컴포넌트 명세 (Component Specification)

### 4.1 메인 랜딩 화면 (Landing Screen)
* **Hero Visual**: 정갈한 태권도 도복 띠 3D 뱃지 일러스트레이션 (글래스모피즘 라이팅)
* **Title Header**: "🥋 내 태권도 내공은 몇 단일까?" 네온 그라데이션 타이틀
* **Start Button**: 크림슨 레드 & 골드 호버 펄스 애니메이션 버튼
* **Participant Counter Badge**: `"현재 12,450명이 내공을 진단했습니다"` 은은한 수치 칩

### 4.2 퀴즈 진행 화면 (Quiz Screen)
* **Progress Bar**:
  * 높이 `8px`, 둥근 모서리 `4px`
  * 채워지는 바: `linear-gradient(90deg, #E63946, #FFD700)`
  * 현재 단계 표시: `Q. 04 / 10`
* **Question Card**:
  * 배경: Semi-transparent Dark Glass (`background: rgba(30, 41, 59, 0.7)`, `backdrop-filter: blur(12px)`)
  * 모서리: `border-radius: 20px`, 테두리 `border: 1px solid rgba(255, 255, 255, 0.1)`
* **Option Choice Buttons**:
  * 한 줄 또는 2x2 카드형 배치
  * Hover: `transform: translateY(-2px)`, `border-color: #E63946`, `box-shadow: 0 8px 20px rgba(230, 57, 70, 0.25)`

### 4.3 결과 화면 (Result Screen & Certificate Card)
* **Official Level Badge**:
  * 띠 색상에 따른 커스텀 엠블럼 (예: 관장님 -> 골드 마스터 뱃지 + 9단 골드 띠)
* **Top % Highlight Pill Tag**:
  * `background: rgba(245, 158, 11, 0.2)`, `color: #FBBF24`, `border: 1px solid #F59E0B`
  * 텍스트: `🔥 국기원 통계 상위 0.1%`
* **Sub-title Badge**:
  * `[사범님]` -> **솔선수범 리더**
* **Chemistry Match Card**:
  * 💖 **최고의 궁합**: `열정의 빨간 띠` (카드 하단 미니 칩)
  * 💔 **최악의 궁합**: `땡땡이 흰 띠` (카드 하단 미니 칩)
* **Action Button Group**:
  * 📥 **[결과 카드 이미지 다운로드 (PNG)]**: 메인 하이라이트 버튼 (골드/레드 라인)
  * 🔗 **[결과 링크 복사]**: 세컨더리 아웃라인 버튼
  * 🔄 **[테스트 다시하기]**: 텍스트 아이콘 버튼

---

## 5. 버튼 & 인터랙션 가이드 (Button Guide & States)

### 5.1 Primary Action Button (결과 카드 다운로드 / 테스트 시작)
```css
.btn-primary {
  background: linear-gradient(135deg, #E63946 0%, #B91C1C 100%);
  color: #FFFFFF;
  font-weight: 700;
  font-size: 18px;
  padding: 16px 32px;
  border-radius: 14px;
  border: none;
  box-shadow: 0 4px 15px rgba(230, 57, 70, 0.4);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(230, 57, 70, 0.6);
  background: linear-gradient(135deg, #FF4D5A 0%, #DC2626 100%);
}

.btn-primary:active {
  transform: translateY(1px) scale(0.98);
}
```

### 5.2 Option Card Button (선택지 버튼)
```css
.option-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #F8FAFC;
  padding: 16px 20px;
  border-radius: 16px;
  font-size: 15px;
  text-align: left;
  transition: all 0.2s ease;
}

.option-btn:hover {
  background: rgba(230, 57, 70, 0.15);
  border-color: #E63946;
  color: #FFFFFF;
}
```

---

## 6. 애니메이션 & 전환 효과 명세 (Motion Guidelines)

1. **Card Transition (질문 넘어갈 때)**:
   - 이전 질문이 좌측으로 슬라이드 아웃 (`translateX(-30px)`, `opacity: 0`)
   - 새 질문이 우측에서 부드럽게 등장 (`translateX(30px)` -> `0`, `opacity: 1`, `duration: 300ms`)
2. **Result Unveil Animation (최종 결과 공개)**:
   - 결과 판정 중 1.5초간 "내공 측정 중..." 태권도 띠 회전 로더 연출
   - 결과 카드 등장 시 폭죽(Confetti) 파티클 애니메이션 팝업
3. **Belt Pulse Glow (결과 뱃지 빛남)**:
   - 결과 카드 엠블럼 둘레에 3초 주기의 은은한 빛(Glow Pulse) 시각 효과 적용

---

## 7. 반응형 레이아웃 가이드 (Responsive Breakpoints)

* **Mobile First Layout (기본 375px ~ 430px)**:
  * 컨테이너 최대 너비 `480px`로 제한하여 모바일 앱 느낌의 극대화된 몰입감 선사.
* **Tablet & Desktop (768px 이상)**:
  * 화면 중앙에 모바일 프레임 모듈 형태로 연출하여 PC 화면에서도 완벽한 밸런스 유지.

---

본 디자인 가이드는 [prd.md](file:///c:/Users/황동수/OneDrive/Desktop/태권도%20level/prd.md)의 모든 요구사항을 완벽하게 만족하도록 설계되었습니다.
