/**
 * 태권도 레벨 테스트 (Taekwondo Level Test) - Question Data & Scoring Matrix
 * All-Age Universal Validated 19 Questions for White Belt ~ Grandmaster Level Differentiation.
 */
export const QUESTIONS = [
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
