/**
 * Taekwondo Level Test - Universal Standalone Bundle (js/bundle.js)
 * Works on both file:// protocol (double-clicking index.html) and http:// servers.
 */
(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. RESULT TYPES DEFINITION
  // --------------------------------------------------------------------------
  const RESULT_TYPES = {
  WHITE_BELT: {
    id: 'WHITE_BELT',
    type: '흰 띠',
    subTitle: '태권도 첫걸음',
    topPercent: '상위 100%',
    icon: '🤍',
    beltColor: '#F8FAFC',
    accentColor: '#E2E8F0',
    description: '이제 막 태권도의 매력을 발견한 파릇파릇한 입문자입니다! 도복을 입는 것만으로도 가슴이 웅장해지며, 앞으로 익혀나갈 도복 띠와 발차기에 대한 호기심과 열정이 최고조에 달해 있습니다.',
    bestMatch: '솔선수범 리더 사범님',
    quote: '"모든 장인은 한때 초보자였다."'
  },
  YELLOW_BELT: {
    id: 'YELLOW_BELT',
    type: '노란 띠',
    subTitle: '기초의 새싹',
    topPercent: '상위 90%',
    icon: '💛',
    beltColor: '#EAB308',
    accentColor: '#CA8A04',
    description: '기본 주춤서기와 올바른 주먹지르기, 그리고 힘찬 앞차기의 재미를 깨달은 기초의 새싹입니다! 도장에서 예의와 기본 자세를 하나씩 익히며 당차고 씩씩하게 성장하고 있습니다.',
    bestMatch: '솔선수범 리더 사범님',
    quote: '"뿌리 깊은 나무는 바람에 흔들리지 않는다."'
  },
  BLUE_BELT: {
    id: 'BLUE_BELT',
    type: '파란 띠',
    subTitle: '푸른 자신감',
    topPercent: '상위 80%',
    icon: '💙',
    beltColor: '#3B82F6',
    accentColor: '#1D4ED8',
    description: '태극 1~3장 품새와 정교한 돌려차기를 사범님 앞에서 선보일 수 있는 푸른 자신감의 소유자입니다! 동작에 절도가 생기고 다음 단계인 빨간 띠와 유품/유단 도전을 향해 자신 있게 정진합니다.',
    bestMatch: '단단한 무도인 1단',
    quote: '"자신감은 끊임없는 수련에서 나온다."'
  },
  RED_BELT: {
    id: 'RED_BELT',
    type: '빨간 띠',
    subTitle: '열정의 수련생',
    topPercent: '상위 70%',
    icon: '❤️',
    beltColor: '#EF4444',
    accentColor: '#DC2626',
    description: '기본 품새와 힘찬 발차기에 재미를 붙인 유망주입니다! 승급 시험과 유품/유단 도전을 향한 승부욕과 수련 의지가 매우 충만하며, 도장에서 가장 큰 목소리로 기합을 넣는 열정파입니다.',
    bestMatch: '어린이 고수 3품',
    quote: '"열정은 수련의 가장 강력한 무기이다."'
  },
  POOM_1: {
    id: 'POOM_1',
    type: '유품자 (1품)',
    subTitle: '어린이 고수',
    topPercent: '상위 45%',
    icon: '🏅',
    beltColor: '#DC2626',
    accentColor: '#18181B',
    description: '국기원 1품을 당당히 취득한 실력파 청소년/어린이 수련생입니다! 품새 1장부터 8장까지 완벽히 마스터하고, 예의와 절제를 아는 진짜 멋진 소년/소녀 무도인입니다.',
    bestMatch: '단단한 무도인 1단',
    worstMatch: '태권도 첫걸음 흰 띠',
    quote: '"예의로 시작하여 예의로 끝난다."'
  },
  POOM_2: {
    id: 'POOM_2',
    type: '유품자 (2품)',
    subTitle: '어린이 고수',
    topPercent: '상위 25%',
    icon: '🏅',
    beltColor: '#DC2626',
    accentColor: '#18181B',
    description: '고려 품새와 유연한 연차발차기를 척척 해내는 2품 고수입니다! 도장에서 후배 품자들을 다정하게 챙겨주며, 흔들림 없는 집중력과 기량을 선보입니다.',
    bestMatch: '단단한 무도인 2단',
    worstMatch: '열정의 수련생 빨간 띠',
    quote: '"꾸준함이 비범함을 만든다."'
  },
  POOM_3: {
    id: 'POOM_3',
    type: '유품자 (3품)',
    subTitle: '어린이 고수',
    topPercent: '상위 10%',
    icon: '🏅',
    beltColor: '#DC2626',
    accentColor: '#18181B',
    description: '금강 품새의 웅장함을 자유자재로 표현하는 3품 초고수입니다! 만 15세 미만 수련생 중 최상위권 기량과 강인한 무도인 정신을 품고 있습니다.',
    bestMatch: '솔선수범 리더 사범님',
    worstMatch: '태권도 첫걸음 흰 띠',
    quote: '"금강의 단단함처럼 흔들리지 않는 내공."'
  },
  POOM_4: {
    id: 'POOM_4',
    type: '유품자 (4품)',
    subTitle: '어린이 고수',
    topPercent: '상위 10%',
    icon: '🏅',
    beltColor: '#DC2626',
    accentColor: '#18181B',
    description: '만 15세 미만 어린이가 오를 수 있는 최고의 영예인 4품 보유자입니다! 3단과 동등한 무도 깊이를 가지며 장차 대한민국 태권도를 이끌어갈 보석입니다.',
    bestMatch: '태권도 마스터 관장님',
    worstMatch: '열정의 수련생 빨간 띠',
    quote: '"어리지만 기상은 태산과 같다."'
  },
  DAN_1: {
    id: 'DAN_1',
    type: '유단자 (1단)',
    subTitle: '단단한 무도인',
    topPercent: '상위 45%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '국기원 정식 검은 띠를 매고 진정한 무도인의 길에 들어선 1단 수련자입니다! 묵직한 발차기와 강인한 신체 정신 밸런스를 갖추고 있습니다.',
    bestMatch: '어린이 고수 1품',
    worstMatch: '태권도 첫걸음 흰 띠',
    quote: '"검은 띠는 포기하지 않은 흰 띠이다."'
  },
  DAN_2: {
    id: 'DAN_2',
    type: '유단자 (2단)',
    subTitle: '단단한 무도인',
    topPercent: '상위 25%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '고려 품새의 정교함과 실전 타격을 이해하는 단단한 2단 무도인입니다. 수련의 깊이가 깊어져 동료들에게 든든한 버팀목이 되어 줍니다.',
    bestMatch: '어린이 고수 2품',
    worstMatch: '열정의 수련생 빨간 띠',
    quote: '"무도는 자신을 이기는 기술이다."'
  },
  DAN_3: {
    id: 'DAN_3',
    type: '유단자 (3단)',
    subTitle: '단단한 무도인',
    topPercent: '상위 10%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '태백 품새의 날카로움과 깊은 내공을 지닌 3단 고수입니다! 태권도의 실기 능력뿐만 아니라 이론과 무도 철학까지 겸비하고 있습니다.',
    bestMatch: '승부사의 기상 선수',
    worstMatch: '태권도 첫걸음 흰 띠',
    quote: '"지혜와 기량이 비로소 일치하는 단계."'
  },
  DAN_4: {
    id: 'DAN_4',
    type: '유단자 (4단)',
    subTitle: '단단한 무도인',
    topPercent: '상위 5%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '지도자 자격을 응시할 수 있는 고단자의 반열인 4단 보유자입니다! 타인을 가르칠 수 있는 깊은 품성과 압도적인 기량을 가지고 있습니다.',
    bestMatch: '솔선수범 리더 사범님',
    worstMatch: '열정의 수련생 빨간 띠',
    quote: '"가르침 속에서 더 큰 배움을 얻는다."'
  },
  DAN_5: {
    id: 'DAN_5',
    type: '유단자 (5단)',
    subTitle: '단단한 무도인',
    topPercent: '상위 2%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '평생을 수련에 정진한 무도 마스터 5단입니다! 어떠한 위기 상황에서도 흐트러지지 않는 태산 같은 중후함과 절제미를 품고 있습니다.',
    bestMatch: '태권도 마스터 관장님',
    worstMatch: '태권도 첫걸음 흰 띠',
    quote: '"수련의 끝은 없으며 오직 조화만이 존재한다."'
  },
  PLAYER: {
    id: 'PLAYER',
    type: '선수',
    subTitle: '승부사의 기상',
    topPercent: '상위 1%',
    icon: '🥊',
    beltColor: '#2563EB',
    accentColor: '#EF4444',
    description: '극강의 신체 능력과 스피드, 그리고 순발력을 갖춘 겨루기/품새 엘리트 선수입니다! 매일 치열한 훈련을 이겨내며 승부처에서 폭발적인 집중력을 발휘합니다.',
    bestMatch: '단단한 무도인 3단',
    worstMatch: '태권도 첫걸음 흰 띠',
    quote: '"매트 위의 1초를 위해 1년의 피땀을 흘린다."'
  },
  SABEOM: {
    id: 'SABEOM',
    type: '사범님',
    subTitle: '솔선수범 리더',
    topPercent: '상위 0.1%',
    icon: '🥋',
    beltColor: '#0F172A',
    accentColor: '#10B981',
    description: '도장의 분위기를 밝고 활기차게 이끌며 수련생 한 명 한 명을 진심으로 보살피는 멘토형 지도자입니다! 제자들에게 인내와 예의를 실천으로 보여줍니다.',
    bestMatch: '열정의 수련생 빨간 띠',
    worstMatch: '땡땡이 흰 띠',
    quote: '"모범은 최고의 가르침이다."'
  },
  GWANJANG: {
    id: 'GWANJANG',
    type: '관장님',
    subTitle: '태권도 마스터',
    topPercent: '상위 0.001%',
    icon: '👑',
    beltColor: '#090D16',
    accentColor: '#F59E0B',
    description: '태권도의 깊은 경지와 도장 공동체를 책임지는 최종 총괄 마스터입니다! 수많은 제자를 양성하고 태권도 정신을 널리 전파하는 이 시대의 진정한 거목입니다.',
    bestMatch: '솔선수범 리더 사범님',
    worstMatch: '땡땡이 흰 띠',
    quote: '"백만 제자의 스승이자 무도의 등대."'
  }
};

  // --------------------------------------------------------------------------
  // 2. QUESTION DATA DEFINITION
  // --------------------------------------------------------------------------
  const QUESTIONS = [
  {
    id: 1,
    question: "도장 정문을 들어서서 마룻바닥을 밟을 때 당신이 가장 먼저 하는 행동은?",
    options: [
      { text: '우렁찬 기합과 함께 "태권!" 하고 신발부터 정갈하게 정리한다.', target: 'SABEOM' },
      { text: '도장 국기를 향해 절도 있게 사범님과 관장님께 도장 예의 절을 올린다.', target: 'DAN_3' },
      { text: '설레는 마음으로 도복을 정돈하고 동료 수련생과 반갑게 인사를 나눈다.', target: 'RED_BELT' },
      { text: '호기심 어린 눈으로 도장 샌드백과 수련 기구를 둘러본다.', target: 'WHITE_BELT' }
    ]
  },
  {
    id: 2,
    question: "체력 훈련 시간에 사범님이 '버피 테스트 50개 추가!'를 외쳤을 때 반응은?",
    options: [
      { text: '"내 한계를 시험할 기회다!" 최전선에서 호흡을 정돈하고 속도를 올린다.', target: 'PLAYER' },
      { text: '힘들어하는 수련생들 곁에서 "할 수 있다!" 구호를 외치며 함께 달린다.', target: 'SABEOM' },
      { text: '정해진 템포에 맞춰 동작 하나하나의 폼과 자세를 일관되게 유지한다.', target: 'DAN_4' },
      { text: '땀방울이 흘러내리고 숨이 차올라도 이를 악물고 끝까지 완주한다.', target: 'POOM_2' }
    ]
  },
  {
    id: 3,
    question: "겨루기 경기 중 상대방이 강한 미트 발차기 공격을 해올 때 순간적인 선택은?",
    options: [
      { text: '뒤로 스텝을 밟은 후 뒤후려차기로 카운터를 날린다.', target: 'PLAYER' },
      { text: '상대의 시선과 스텝을 읽고, 거리 조절과 가드로 상대 공격을 무력화한다.', target: 'DAN_5' },
      { text: '순간적으로 뒤로 스텝을 밟았지만 당차게 기합을 넣고 정면으로 나아간다.', target: 'RED_BELT' },
      { text: '상대의 빠르고 멋진 발차기 기술을 유심히 관찰하고 감탄한다.', target: 'WHITE_BELT' }
    ]
  },
  {
    id: 4,
    question: "품새를 연습할 때 당신이 가장 중요하게 생각하는 포인트는?",
    options: [
      { text: '시선 처리, 호흡 조절, 그리고 동작 끝의 폭발적인 절제미와 무게감.', target: 'GWANJANG' },
      { text: '동작의 정확한 선과 각도, 그리고 서기(주춤서기·앞굽이)의 바른 간격.', target: 'DAN_3' },
      { text: '태극 1~3장의 정확한 순서와 절차를 틀리지 않고 구사하는 것.', target: 'BLUE_BELT' },
      { text: '지도자의 시범에 맞춰 주먹지르기와 기본 발차기의 궤적을 익히는 것.', target: 'YELLOW_BELT' }
    ]
  },
  {
    id: 5,
    question: "도장 후배 수련생이 발차기 동작이 잘 안되어 속상해할 때 나는?",
    options: [
      { text: '따뜻한 미소로 시범을 보여주며 눈높이에 맞춰 동작을 조각조각 풀어서 가르쳐 준다.', target: 'SABEOM' },
      { text: '"나도 처음에 그랬어" 자신의 수련 경험을 전하며 용기와 자신감을 불어넣는다.', target: 'RED_BELT' },
      { text: '도장의 선배이자 지도자로서 마음가짐을 다독이고 끝까지 격려한다.', target: 'GWANJANG' },
      { text: '옆에서 함께 더 열심히 수련하며 솔선수범하는 진정성을 보여준다.', target: 'POOM_1' }
    ]
  },
  {
    id: 6,
    question: "길거리에서 불의를 목격하거나 위기 상황이 발생했을 때 무도인으로서 태도는?",
    options: [
      { text: '침착하게 감정을 컨트롤하며 약자를 보호하고 평화롭게 상황을 중재한다.', target: 'DAN_4' },
      { text: '폭력을 배제하고 오랜 무도로 다져진 압도적인 기세와 정중함으로 상대를 제압한다.', target: 'GWANJANG' },
      { text: '위험 상황을 올바르게 판단하고 정의로운 마음으로 수호하려 다가선다.', target: 'POOM_4' },
      { text: '태권도에서 배운 무도 정신(예의, 염치, 인내, 극기, 백절불굴)을 가슴 깊이 되새긴다.', target: 'DAN_1' }
    ]
  },
  {
    id: 7,
    question: "승급 및 승단 심사 당일 아침, 심사장으로 향하는 나의 마음가짐은?",
    options: [
      { text: '그동안 땀 흘린 시간을 믿고 흔들림 없는 최상의 기량을 선보인다.', target: 'PLAYER' },
      { text: '심사관 앞에서도 떨지 않고 평소 도장에서 배운 예의와 무도 태도를 표출한다.', target: 'DAN_2' },
      { text: '심사장에 모인 수련생들이 안전하고 당당하게 기량을 펼치도록 응원한다.', target: 'SABEOM' },
      { text: '새로운 띠를 매게 될 생각에 떨리고 설레는 마음으로 정성껏 임한다.', target: 'RED_BELT' }
    ]
  },
  {
    id: 8,
    question: "나에게 '태권도 도복'이란 어떤 의미인가?",
    options: [
      { text: '나의 신념과 인생 철학이 정갈하게 담긴 또 하나의 분신.', target: 'GWANJANG' },
      { text: '입는 순간 자신감이 샘솟고 무도인으로서 정직과 책임을 느끼게 하는 옷.', target: 'DAN_2' },
      { text: '땀 흘려 정진한 노력과 시간이 깃든 자랑스러운 열정의 훈장.', target: 'POOM_3' },
      { text: '입는 것만으로도 가슴 설레고 도장에 오고 싶어지는 순백의 무술복.', target: 'WHITE_BELT' }
    ]
  },
  {
    id: 9,
    question: "지친 하루를 마치고 푹 쉴 때 태권도 관련 콘텐츠가 나온다면 당신은?",
    options: [
      { text: '국가대표 겨루기/품새 경기를 시청하며 최신 경기 규칙과 기술 궤적을 분석한다.', target: 'PLAYER' },
      { text: '원로 무도인의 수련 가치관이나 도장 지도 철학 관련 강연을 깊이 있게 청강한다.', target: 'GWANJANG' },
      { text: '시범단의 화려한 고난도 격파 영상을 시청하며 고난도 기술에 동경을 품는다.', target: 'POOM_2' },
      { text: '도장 일상 영상이나 발차기 강좌를 보며 다음 수련을 즐겁게 기대한다.', target: 'BLUE_BELT' }
    ]
  },
  {
    id: 10,
    question: "당신이 추구하는 태권도 수련의 궁극적인 목표는?",
    options: [
      { text: '타인을 포용하고 올바른 인성을 갖춘 후학을 양성하여 사회에 이바지하는 것.', target: 'SABEOM' },
      { text: '강인한 신체와 인격을 정진하여 인생의 시련도 극복하는 백절불굴의 내공.', target: 'DAN_5' },
      { text: '세계무대에서 당당히 대한민국 태권도의 위상을 높이는 엘리트 무도인.', target: 'PLAYER' },
      { text: '즐겁고 건강하게 수련하며 끊임없이 새로운 띠와 목표에 도전하는 것.', target: 'RED_BELT' }
    ]
  },
  {
    id: 11,
    question: "도장 공개 시범 무대 기회가 주어졌을 때 당신의 반응과 역할은?",
    options: [
      { text: '화려한 고공 격파와 송판 깨기 등 핵심 시범 동작을 대담하게 수행한다.', target: 'POOM_4' },
      { text: '단원들의 대열과 동선을 체크하며 시범의 완성도를 총괄 지도한다.', target: 'SABEOM' },
      { text: '기본 품새와 발차기 시범을 절도 있고 정갈하게 보여준다.', target: 'BLUE_BELT' },
      { text: '처음 서보는 무대지만 우렁찬 기합과 함께 열정적으로 시범에 임한다.', target: 'YELLOW_BELT' }
    ]
  },
  {
    id: 12,
    question: "발차기 미트 훈련 시 가장 기분 좋은 쾌감을 느끼는 순간은?",
    options: [
      { text: '미트가 펑! 소리와 함께 묵직한 타격음이 도장에 가득 울릴 때.', target: 'DAN_2' },
      { text: '0.1초의 지체도 없이 연차발차기를 목표 미트에 꽂아 넣을 때.', target: 'PLAYER' },
      { text: '올바른 무릎 인상과 정석 궤적으로 깔끔하게 찼을 때.', target: 'DAN_1' },
      { text: '사범님의 "발차기 소리와 자세가 아주 좋다!"는 진심 어린 칭찬을 받을 때.', target: 'YELLOW_BELT' }
    ]
  },
  {
    id: 13,
    question: "수련하면서 띠의 색상이 점차 바뀌어갈 때 느끼는 보람은?",
    options: [
      { text: '흰 띠에서 노란 띠, 파란 띠로 묶는 띠의 색상이 바뀌어갈 때의 기쁨.', target: 'YELLOW_BELT' },
      { text: '땀과 노력이 결실을 맺어 검은 띠를 허리에 매는 감격스러운 순간.', target: 'DAN_1' },
      { text: '품새와 겨루기 실력이 몰라보게 성장한 나 자신을 체감할 때.', target: 'BLUE_BELT' },
      { text: '내가 격려하고 가르친 동료 수련생이 심사에 합격하여 기뻐할 때.', target: 'SABEOM' }
    ]
  },
  {
    id: 14,
    question: "도장 동료와 기술적인 동작 의견 차이가 생겼을 때 당신의 태도는?",
    options: [
      { text: '국기원 교범 표준 규정을 바탕으로 논리적이고 정중하게 설명해 준다.', target: 'DAN_3' },
      { text: '서로의 동작을 시범 보이며 수련자 대 수련자로서 겸손하게 의견을 나눈다.', target: 'POOM_2' },
      { text: '"직접 땀 흘리며 차보자!" 미트를 주고받으며 실전 수련으로 답을 찾는다.', target: 'RED_BELT' },
      { text: '겸손한 태도로 지도자나 관장님의 명확한 지도와 조언을 구한다.', target: 'BLUE_BELT' }
    ]
  },
  {
    id: 15,
    question: "도장 밖 일상생활에서 나도 모르게 나타나는 태권도 수련생의 습관은?",
    options: [
      { text: '문이 열리거나 사람을 마주할 때 나도 모르게 바르게 인사하는 자세가 나온다.', target: 'POOM_1' },
      { text: '정리가 안 된 신발이나 물건을 보면 정갈하게 각을 맞춰 정돈한다.', target: 'YELLOW_BELT' },
      { text: '높이 있는 버튼을 누르거나 움직일 때 가벼운 무도 스텝이 나온다.', target: 'RED_BELT' },
      { text: '길을 걸을 때도 바른 척추 자세와 깊은 호흡을 유지하며 서기를 의식한다.', target: 'DAN_4' }
    ]
  },
  {
    id: 16,
    question: "지도자 및 전문 자격증(국제태권도사범 자격증, 스포츠지도사 등) 보유 현황은?",
    options: [
      { text: '국제태권도사범 자격증과 스포츠지도사 자격증을 둘 다 소유하고 있다. (최고 가점)', target: 'GWANJANG' },
      { text: '국제태권도사범 자격증 또는 스포츠지도사 자격증 중 하나를 소유하고 있다. (높은 가점)', target: 'SABEOM' },
      { text: '국기원 품/단증을 소유하고 있으며 자격증 취득에 관심이 있다.', target: 'DAN_1' },
      { text: '아직 자격증은 없지만 도장에서 즐겁게 수련하며 배워가고 있다.', target: 'YELLOW_BELT' }
    ]
  },
  {
    id: 17,
    question: "당신이 자신 있게 숙지하고 수행할 수 있는 품새의 범위는 어디까지인가요?",
    options: [
      { text: '고려·금강·태백을 넘어 평원·지태·천권·일여 등 고단자 전문 품새를 완습했다.', target: 'DAN_5' },
      { text: '태극 1~8장은 물론, 고려·금강 품새의 절도 있는 동작과 선을 완벽히 구사한다.', target: 'DAN_3' },
      { text: '태극 1~8장 중 기본 품새(태극 1~4장 등)의 순서를 익히고 표현할 수 있다.', target: 'BLUE_BELT' },
      { text: '주춤서기, 기본 막기, 주먹지르기 및 기본 앞차기를 수련하는 단계이다.', target: 'WHITE_BELT' }
    ]
  },
  {
    id: 18,
    question: "지금까지 태권도를 수련해 온 누적 수련 기간은 어느 정도인가요?",
    options: [
      { text: '10년 이상 장기 수련하며 태권도를 인생의 일부분이자 삶의 철학으로 삼았다.', target: 'GWANJANG' },
      { text: '3년 이상 ~ 10년 미만 꾸준히 땀 흘리며 검은 띠/품증을 획득하고 수련해왔다.', target: 'DAN_2' },
      { text: '6개월 이상 ~ 3년 미만 수련하며 띠를 높여가고 기본기를 다졌다.', target: 'RED_BELT' },
      { text: '이제 막 입문했거나 6개월 미만으로 태권도의 재미를 알아가는 중이다.', target: 'WHITE_BELT' }
    ]
  },
  {
    id: 19,
    question: "도장 및 심사 현장에서 본인이 체감하는 종합적인 태권도 내공 레벨은?",
    options: [
      { text: '사범 자격 및 고단자 심사를 거쳐 제자를 양성하고 도장을 총괄하는 수준.', target: 'GWANJANG' },
      { text: '겨루기/시범 분야에서 고난도 기술과 실전을 연마한 엘리트 수준.', target: 'PLAYER' },
      { text: '유품자/유단자로서 품새와 발차기를 절도 있게 구사하는 숙련 무도인 수준.', target: 'POOM_3' },
      { text: '매일 승급 시험과 새 목표를 향해 정진하는 열정 수련생 수준.', target: 'YELLOW_BELT' }
    ]
  }
];

  // --------------------------------------------------------------------------
  // 3. CANVAS RESULT CARD EXPORTER
  // --------------------------------------------------------------------------
  class CardExporter {
    static renderCanvas(resultData) {
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
      if (resultData.userName && resultData.userDojang) {
        certTitle = `🥋 [ ${resultData.userDojang} ] ${resultData.userName} 님의 인증서`;
      } else if (resultData.userName) {
        certTitle = `🥋 ${resultData.userName} 님의 태권도 레벨 인증서`;
      } else if (resultData.userDojang) {
        certTitle = `🥋 [ ${resultData.userDojang} ] 수련생의 인증서`;
      }

      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 20px Pretendard, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(certTitle, 300, 80);

      // Top Percent Tag Pill
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(190, 110, 220, 36, 18);
      } else {
        ctx.rect(190, 110, 220, 36);
      }
      ctx.fill();

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 18px Pretendard, sans-serif';
      ctx.fillText(`🔥 ${resultData.topPercent}`, 300, 134);

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
      ctx.fillText(`[${resultData.subTitle}]`, 300, 355);

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
      ctx.fillText(`💖 환상의 짝꿍: ${resultData.bestMatch}`, 300, 672);

      // Footer Watermark
      ctx.fillStyle = '#64748B';
      ctx.font = '14px Pretendard, sans-serif';
      ctx.fillText('🥋 태권도 레벨 테스트 (Taekwondo Level Test)', 300, 750);

      return canvas;
    }

    static exportCardAsPNG(resultData) {
      const canvas = CardExporter.renderCanvas(resultData);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      const namePart = resultData.userName ? `_${resultData.userName}` : '';
      a.download = `태권도_레벨_인증서${namePart}_${resultData.type.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    static getCanvasBlob(resultData) {
      return new Promise((resolve) => {
        const canvas = CardExporter.renderCanvas(resultData);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      });
    }

    static wrapText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
    }
  }

  // --------------------------------------------------------------------------
  // 3.5 STARTSCREEN COMPONENT WITH USER INPUTS & LIVE COUNTER
  // --------------------------------------------------------------------------
  class StartScreenComponent {
    constructor(containerId, options = {}) {
      this.containerId = containerId;
      this._container = null;
      this.onStart = options.onStart || (() => {});
      this.liveTimer = null;
    }

    get container() {
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }

    set container(val) {
      this._container = val;
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
      const targetNode = this.container;
      if (!targetNode) return;

      if (this.liveTimer) {
        clearInterval(this.liveTimer);
        this.liveTimer = null;
      }

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
      const targetNode = this.container;
      if (!targetNode) return;
      const countEl = targetNode.querySelector('#participantCount');
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
        const targetNode = this.container;
        if (!targetNode) return;

        if (Math.random() < 0.45) {
          const inc = Math.random() < 0.8 ? 1 : 2;
          runningCount += inc;

          const badgeEl = targetNode.querySelector('#participantBadge');
          const countEl = targetNode.querySelector('#participantCount');

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
      const targetNode = this.container;
      if (!targetNode) return;

      const startBtn = targetNode.querySelector('#startTestBtn');
      if (startBtn) {
        startBtn.addEventListener('click', () => {
          if (this.liveTimer) {
            clearInterval(this.liveTimer);
            this.liveTimer = null;
          }

          const nameInput = targetNode.querySelector('#userNameInput');
          const dojangInput = targetNode.querySelector('#userDojangInput');

          const userName = nameInput ? nameInput.value.trim() : '';
          const userDojang = dojangInput ? dojangInput.value.trim() : '';

          this.onStart({ userName, userDojang });
        });
      }
    }
  }

  // --------------------------------------------------------------------------
  // 3.6 QUIZSCREEN COMPONENT
  // --------------------------------------------------------------------------
  class QuizScreenComponent {
    constructor(containerId, options = {}) {
      this.containerId = containerId;
      this._container = null;
      this.onSelectOption = options.onSelectOption || (() => {});
      this.onPrevStep = options.onPrevStep || (() => {});
    }

    get container() {
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }

    set container(val) {
      this._container = val;
    }

    render(questionData, currentStep, totalSteps, selectedOptionIndex = null) {
      const targetNode = this.container;
      if (!targetNode || !questionData) return;

      const progressContainer = document.getElementById('progressContainer');
      const percentage = Math.round((currentStep / totalSteps) * 100);

      if (progressContainer) {
        progressContainer.innerHTML = `
          <div class="progress-container">
            <div class="progress-header">
              <span>진행률</span>
              <span class="progress-counter">Q. ${String(currentStep).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${percentage}%;"></div>
            </div>
          </div>
        `;
      }

      const optionsHtml = questionData.options.map((opt, idx) => `
        <button class="option-card ${selectedOptionIndex === idx ? 'selected' : ''}" data-index="${idx}">
          <span class="option-index">${idx + 1}</span>
          <span class="option-text">${opt.text}</span>
        </button>
      `).join('');

      const backBtnHtml = currentStep > 1
        ? `<button class="btn-back" id="prevBtn">← 이전 질문으로</button>`
        : `<span></span>`;

      targetNode.innerHTML = `
        <div class="glass-card quiz-view">
          <h2 class="question-text">${questionData.question}</h2>
          <div class="options-group">
            ${optionsHtml}
          </div>
          <div class="nav-buttons">
            ${backBtnHtml}
          </div>
        </div>
      `;

      const optionBtns = targetNode.querySelectorAll('.option-card');
      optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          this.onSelectOption(questionData, idx);
        });
      });

      const prevBtn = targetNode.querySelector('#prevBtn');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          this.onPrevStep();
        });
      }
    }
  }

  // --------------------------------------------------------------------------
  // 3.7 LOADINGSCREEN COMPONENT
  // --------------------------------------------------------------------------
  class LoadingScreenComponent {
    constructor(containerId) {
      this.containerId = containerId;
      this._container = null;
    }

    get container() {
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }

    set container(val) {
      this._container = val;
    }

    render() {
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
    }
  }

  // --------------------------------------------------------------------------
  // 3.8 DISTRIBUTION CHART COMPONENT
  // --------------------------------------------------------------------------
  class DistributionChartComponent {
    constructor(containerId) {
      this.containerId = containerId;
      this._container = null;
    }

    get container() {
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }

    set container(val) {
      this._container = val;
    }

    render(userResult) {
      const targetNode = this.container;
      if (!targetNode || !userResult) return;

      const userCategoryId = userResult.id;

      const tierData = [
        { id: 'GWANJANG', icon: '👑', label: '관장님 (마스터)', pct: '0.001%', barWidth: '100%', color: '#F59E0B' },
        { id: 'SABEOM', icon: '🥋', label: '사범님 (솔선수범 리더)', pct: '0.1%', barWidth: '95%', color: '#10B981' },
        { id: 'PLAYER', icon: '🥊', label: '선수 (승부사의 기상)', pct: '1.0%', barWidth: '88%', color: '#2563EB' },
        { id: 'DAN', icon: '🥋', label: '유단자 (1~5단)', pct: '12.0%', barWidth: '72%', color: '#F59E0B', group: ['DAN_1', 'DAN_2', 'DAN_3', 'DAN_4', 'DAN_5'] },
        { id: 'POOM', icon: '🏅', label: '유품자 (1~4품)', pct: '25.0%', barWidth: '60%', color: '#EF4444', group: ['POOM_1', 'POOM_2', 'POOM_3', 'POOM_4'] },
        { id: 'RED_BELT', icon: '❤️', label: '빨간 띠 (열정의 수련생)', pct: '18.0%', barWidth: '50%', color: '#EF4444' },
        { id: 'BLUE_BELT', icon: '💙', label: '파란 띠 (푸른 자신감)', pct: '17.0%', barWidth: '42%', color: '#3B82F6' },
        { id: 'YELLOW_BELT', icon: '💛', label: '노란 띠 (기초의 새싹)', pct: '15.0%', barWidth: '35%', color: '#EAB308' },
        { id: 'WHITE_BELT', icon: '🤍', label: '흰 띠 (태권도 첫걸음)', pct: '11.9%', barWidth: '28%', color: '#E2E8F0' }
      ];

      const rowsHtml = tierData.map(tier => {
        const isUserTier = (tier.id === userCategoryId) || (tier.group && tier.group.includes(userCategoryId));
        const badgeHtml = isUserTier ? `<span style="background: var(--gold-accent); color: #0F172A; padding: 2px 6px; border-radius: 99px; font-size: 0.7rem; font-weight: 900; margin-left: 4px;">👈 내 위치</span>` : '';

        return `
          <div class="chart-row ${isUserTier ? 'is-user-tier' : ''}">
            <div class="chart-row-meta">
              <span class="chart-label">${tier.icon} ${tier.label} ${badgeHtml}</span>
              <span class="chart-val">${tier.pct}</span>
            </div>
            <div class="chart-bar-bg">
              <div class="chart-bar-fill" style="width: ${tier.barWidth}; background: ${tier.color};"></div>
            </div>
          </div>
        `;
      }).join('');

      targetNode.innerHTML = `
        <div class="chart-container-card">
          <div class="chart-header">
            <div class="chart-title">📊 전체 수련생 레벨 분포도</div>
            <div class="chart-subtag">국기원 실시간 집계</div>
          </div>
          <div class="chart-list">
            ${rowsHtml}
          </div>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 3.9 RESULTSCREEN COMPONENT
  // --------------------------------------------------------------------------
  class ResultScreenComponent {
    constructor(containerId, options = {}) {
      this.containerId = containerId;
      this._container = null;
      this.onRestart = options.onRestart || (() => {});
      this.distributionChart = new DistributionChartComponent('distributionChartContainer');
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

      let certTitle = '태권도 레벨 공식 인증서';
      if (resultData.userName && resultData.userDojang) {
        certTitle = `[ ${resultData.userDojang} ] ${resultData.userName} 님의 레벨 인증서`;
      } else if (resultData.userName) {
        certTitle = `${resultData.userName} 님의 태권도 레벨 인증서`;
      } else if (resultData.userDojang) {
        certTitle = `[ ${resultData.userDojang} ] 수련생의 레벨 인증서`;
      }

      targetNode.innerHTML = `
        <div class="result-view">
          <div class="certificate-card">
            <div style="font-size: 0.85rem; font-weight: 800; color: #94A3B8; margin-bottom: 8px; letter-spacing: -0.2px;">
              🥋 ${certTitle}
            </div>
            <div class="top-percent-tag">🔥 ${resultData.topPercent}</div>
            <div class="belt-badge-icon">${resultData.icon}</div>
            <h2 class="result-belt-title">${resultData.type}</h2>
            <div class="result-subtitle">부칭호: ${resultData.subTitle}</div>
            
            <p class="result-desc">${resultData.description}</p>
            <p style="font-style: italic; color: var(--gold-glow); font-size: 0.85rem; margin-bottom: 16px;">
              ${resultData.quote}
            </p>

            <div class="chemistry-box" style="grid-template-columns: 1fr;">
              <div class="chem-card chem-best">
                <div class="chem-title">💖 환상의 짝꿍</div>
                <div class="chem-value">${resultData.bestMatch}</div>
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

          <div id="distributionChartContainer"></div>
        </div>
      `;

      this.distributionChart.container = targetNode.querySelector('#distributionChartContainer');
      this.distributionChart.render(resultData);

      this.bindEvents(resultData);
    }

    bindEvents(resultData) {
      const targetNode = this.container;
      if (!targetNode) return;

      const downloadBtn = targetNode.querySelector('#downloadBtn');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
          CardExporter.exportCardAsPNG(resultData);
        });
      }

      const kakaoBtn = targetNode.querySelector('#kakaoShareBtn');
      if (kakaoBtn) {
        kakaoBtn.addEventListener('click', () => {
          this.shareKakao(resultData);
        });
      }

      const instaBtn = targetNode.querySelector('#instaShareBtn');
      if (instaBtn) {
        instaBtn.addEventListener('click', () => {
          this.shareInstagramStory(resultData);
        });
      }

      const copyUrlBtn = targetNode.querySelector('#copyUrlBtn');
      if (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(window.location.href);
          alert('테스트 주소가 클립보드에 복사되었습니다!');
        });
      }

      const restartBtn = targetNode.querySelector('#restartBtn');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => {
          this.onRestart();
        });
      }
    }

    async shareKakao(resultData) {
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

        const descText = `🔥 내공 레벨: [ ${resultData.type} ] (${resultData.topPercent})\n💖 환상의 짝꿍: ${resultData.bestMatch}\n\n👇 아래 링크를 터치해 당신의 레벨도 확인해보세요!`;

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
      } catch (e) {
        console.warn('Kakao share error:', e);
        navigator.clipboard.writeText(window.location.href);
        alert('카카오톡 공유 처리 중 오류가 발생했습니다. 테스트 링크가 클립보드에 복사되었습니다!');
      }
    }

    shareInstagramStory(resultData) {
      alert('📸 인스타그램 스토리 공유 안내\n\n1. 자동으로 결과 카드 이미지(PNG)가 다운로드됩니다.\n2. 사이트 주소가 클립보드에 복사됩니다.\n3. 인스타그램 앱 스토리 카메라로 이동합니다! (이미지 및 링크 첨부)');
      CardExporter.exportCardAsPNG(resultData);
      navigator.clipboard.writeText(window.location.href);

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        setTimeout(() => {
          window.location.href = 'instagram://story-camera';
        }, 1500);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 3.10 HEADER COMPONENT
  // --------------------------------------------------------------------------
  class HeaderComponent {
    constructor(containerId, options = {}) {
      this.containerId = containerId;
      this._container = null;
      this.onSoundToggle = options.onSoundToggle || (() => {});
      this.isMuted = true;
    }

    get container() {
      if (this._container) return this._container;
      return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
    }

    set container(val) {
      this._container = val;
    }

    render() {
      const targetNode = this.container;
      if (!targetNode) return;

      targetNode.innerHTML = `
        <header class="site-header">
          <a href="#" class="brand-logo" id="headerLogoBtn">
            <span>🥋 태권도 LEVEL</span>
            <span class="brand-badge">TEST</span>
          </a>
          <button class="sound-toggle-btn" id="soundToggleBtn" title="사운드">
            ${this.isMuted ? '🔇' : '🔊'}
          </button>
        </header>
      `;

      const logoBtn = targetNode.querySelector('#headerLogoBtn');
      if (logoBtn) {
        logoBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.reload();
        });
      }

      const soundBtn = targetNode.querySelector('#soundToggleBtn');
      if (soundBtn) {
        soundBtn.addEventListener('click', () => {
          this.isMuted = !this.isMuted;
          soundBtn.textContent = this.isMuted ? '🔇' : '🔊';
          this.onSoundToggle(this.isMuted);
        });
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. MAIN SPA APPLICATION CONTROLLER
  // --------------------------------------------------------------------------
  class TaekwondoApp {
    constructor() {
      this.state = 'START'; // 'START' | 'QUIZ' | 'LOADING' | 'RESULT'
      this.currentStep = 0;
      this.answers = [];
      this.scores = {};
      this.finalResult = null;
      this.userInfo = { userName: '', userDojang: '' };

      this.header = new HeaderComponent('headerContainer');
      this.startScreen = new StartScreenComponent('mainContainer', {
        onStart: (userInfo = {}) => {
          this.userInfo = userInfo;
          this.state = 'QUIZ';
          this.currentStep = 0;
          this.answers = [];
          this.scores = {};
          this.render();
        }
      });

      this.quizScreen = new QuizScreenComponent('mainContainer', {
        onSelectOption: (question, idx) => this.handleSelect(question, idx),
        onPrevStep: () => this.handlePrev()
      });

      this.loadingScreen = new LoadingScreenComponent('mainContainer');
      this.resultScreen = new ResultScreenComponent('mainContainer', {
        onRestart: () => this.handleRestart()
      });

      this.init();
    }

    init() {
      this.header.render();
      this.render();
    }

    render() {
      const mainContainer = document.getElementById('mainContainer');
      const progressContainer = document.getElementById('progressContainer');
      if (!mainContainer) return;

      if (this.state === 'START') {
        if (progressContainer) progressContainer.innerHTML = '';
        this.startScreen.container = mainContainer;
        this.startScreen.render();

      } else if (this.state === 'QUIZ') {
        const question = QUESTIONS[this.currentStep];
        const selectedOptionIndex = this.answers[this.currentStep] !== undefined
          ? this.answers[this.currentStep]
          : null;

        this.quizScreen.container = mainContainer;
        this.quizScreen.render(question, this.currentStep + 1, QUESTIONS.length, selectedOptionIndex);

      } else if (this.state === 'LOADING') {
        if (progressContainer) progressContainer.innerHTML = '';
        this.loadingScreen.container = mainContainer;
        this.loadingScreen.render();

        setTimeout(() => {
          this.calculateResult();
          this.state = 'RESULT';
          this.render();
        }, 1500);

      } else if (this.state === 'RESULT') {
        if (progressContainer) progressContainer.innerHTML = '';
        this.resultScreen.container = mainContainer;
        this.resultScreen.render(this.finalResult);
      }
    }

    handleSelect(question, optionIndex) {
      const selected = question.options[optionIndex];
      this.answers[this.currentStep] = optionIndex;

      // Special scoring for Q16 Certification Question
      if (question.id === 16) {
        if (optionIndex === 0) {
          // 2개 다 소유: 최고 가점 (+3)
          this.scores['GWANJANG'] = (this.scores['GWANJANG'] || 0) + 3;
          this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 3;
        } else if (optionIndex === 1) {
          // 둘 중 1개 소유: 높은 가점 (+2)
          this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 2;
          this.scores['DAN_4'] = (this.scores['DAN_4'] || 0) + 2;
        } else if (optionIndex === 2) {
          // 품/단증 보유: 기본 점수 (+1)
          this.scores['DAN_1'] = (this.scores['DAN_1'] || 0) + 1;
        } else {
          // 자격증 없음: 노란 띠 (+1)
          this.scores['YELLOW_BELT'] = (this.scores['YELLOW_BELT'] || 0) + 1;
        }
      } else {
        const target = selected.target;
        this.scores[target] = (this.scores[target] || 0) + 1;
      }

      if (this.currentStep < QUESTIONS.length - 1) {
        this.currentStep++;
        this.render();
      } else {
        this.state = 'LOADING';
        this.render();
      }
    }

    handlePrev() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.render();
      }
    }

    handleRestart() {
      this.state = 'START';
      this.currentStep = 0;
      this.answers = [];
      this.scores = {};
      this.finalResult = null;
      this.render();
    }

    calculateResult() {
      // Increment local participation count upon test completion!
      try {
        const currentExtra = parseInt(localStorage.getItem('tkd_extra_participants') || '0', 10);
        localStorage.setItem('tkd_extra_participants', (currentExtra + 1).toString());
      } catch (e) {
        console.warn('localStorage access warning:', e);
      }

      // Find maximum score category
      let topCategory = 'WHITE_BELT';
      let maxScore = -1;

      for (const [type, score] of Object.entries(this.scores)) {
        if (score > maxScore) {
          maxScore = score;
          topCategory = type;
        }
      }

      // Check Q16 Certification Answer (index for Q16)
      const q16Index = QUESTIONS.findIndex(q => q.id === 16);
      const q16AnswerIndex = q16Index !== -1 ? this.answers[q16Index] : undefined;

      const hasBothCerts = (q16AnswerIndex === 0);
      const hasOneCert = (q16AnswerIndex === 0 || q16AnswerIndex === 1);

      // Business Rule Enforcement:
      // 1. 관장님(GWANJANG): 반드시 2개 다 소유해야 가능! (미소유 시 사범님/5단으로 조정)
      if (topCategory === 'GWANJANG' && !hasBothCerts) {
        topCategory = hasOneCert ? 'SABEOM' : 'DAN_5';
      }

      // 2. 사범님(SABEOM): 자격증 1개 이상 소유 시 가능! (미소유 시 4단으로 조정)
      if (topCategory === 'SABEOM' && !hasOneCert) {
        topCategory = 'DAN_4';
      }

      this.finalResult = {
        ...(RESULT_TYPES[topCategory] || RESULT_TYPES.WHITE_BELT),
        userName: this.userInfo.userName || '',
        userDojang: this.userInfo.userDojang || ''
      };
    }
  }

  // Auto initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TaekwondoApp());
  } else {
    new TaekwondoApp();
  }
})();
