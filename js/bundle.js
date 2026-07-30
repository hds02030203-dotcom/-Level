/**
 * Taekwondo Level Test - Universal Standalone Bundle (js/bundle.js)
 * Works flawlessly on both file:// protocol (double-clicking index.html) and http:// servers.
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
        { text: '신나서 도복을 챙겨 입고 옆 친구와 겨루기 탭댄스 연습을 시작한다.', target: 'RED_BELT' },
        { text: '신기한 눈으로 도장 샌드백과 호구를 구경하며 어디 앉아야 할지 두리번거린다.', target: 'WHITE_BELT' }
      ]
    },
    {
      id: 2,
      question: "체력 훈련 시간에 사범님이 '버피 테스트 50개 추가!'를 외쳤을 때 반응은?",
      options: [
        { text: '"기회다!" 내 한계를 시험하기 위해 제일 앞줄에서 속도를 올린다.', target: 'PLAYER' },
        { text: '힘들어하는 어린 수련생들 곁으로 가서 "할 수 있어!" 구호를 외쳐준다.', target: 'SABEOM' },
        { text: '호흡을 정돈하고 일정한 템포로 단 한 개도 폼을 흩뜨리지 않고 해낸다.', target: 'DAN_4' },
        { text: '땀을 뻘뻘 흘리며 땀방울이 흘러내려도 이를 악물고 끝까지 완주한다.', target: 'POOM_2' }
      ]
    },
    {
      id: 3,
      question: "겨루기 경기 중 상대방이 강한 미트 발차기 공격을 해올 때 순간적인 선택은?",
      options: [
        { text: '찰나의 스텝으로 컷트 후 번개 같은 540도 뒤후려차기로 카운터를 날린다.', target: 'PLAYER' },
        { text: '상대의 동작을 침착하게 읽고 팔굽과 거리를 조절하며 가드를 견고히 한다.', target: 'DAN_5' },
        { text: '일단 엉겁결에 뒤로 물러섰지만 다시 씩씩하게 기합을 넣고 앞으로 나아간다.', target: 'RED_BELT' },
        { text: '"우와 발차기 엄청 빠르다!" 감탄하며 상대방의 멋진 발차기를 관찰한다.', target: 'WHITE_BELT' }
      ]
    },
    {
      id: 4,
      question: "품새를 연습할 때 당신이 가장 중요하게 생각하는 포인트는?",
      options: [
        { text: '시선 처리, 호흡의 조절, 그리고 동작 끝의 폭발적인 절제미와 시선 집중.', target: 'GWANJANG' },
        { text: '동작의 선과 각도, 그리고 주춤서기와 굽히기 서기의 정석적인 간격.', target: 'DAN_3' },
        { text: '태극 1~3장의 순서와 정교한 절차를 틀리지 않고 구사하는 것.', target: 'BLUE_BELT' },
        { text: '사범님이 시범 보이는 주먹지르기와 기본 발차기를 따라 해보려 노력한다.', target: 'YELLOW_BELT' }
      ]
    },
    {
      id: 5,
      question: "도장 후배 수련생이 발차기 동작이 잘 안되어 속상해할 때 나는?",
      options: [
        { text: '따뜻한 미소로 시범을 보여주며 눈높이에 맞춰 동작을 조각조각 풀어 설명해 준다.', target: 'SABEOM' },
        { text: '"나도 처음엔 그랬어!" 자신의 띠 변천사를 들려주며 용기와 자신감을 불어넣는다.', target: 'RED_BELT' },
        { text: '도장의 총괄 책임자로서 사범님과 함께 제자의 마음가짐을 다독여준다.', target: 'GWANJANG' },
        { text: '같이 옆에서 더 열심히 발차기를 연습하며 솔선수범하는 모습을 보여준다.', target: 'POOM_1' }
      ]
    },
    {
      id: 6,
      question: "길거리에서 불의를 목격하거나 위기 상황이 발생했을 때 무도인으로서 태도는?",
      options: [
        { text: '침착하게 감정을 컨트롤하며 약자를 보호하고 평화적으로 상황을 중재한다.', target: 'DAN_4' },
        { text: '폭력을 쓰기보다 무술로 다져진 압도적인 기세와 정중함으로 상대를 제압한다.', target: 'GWANJANG' },
        { text: '위험에 처한 이에게 재빨리 도움을 요청하고 정의로운 마음으로 수호하려 한다.', target: 'POOM_4' },
        { text: '태권도에서 배운 "무도 정신(예의, 염치, 인내, 극기, 백절불굴)"을 떠올린다.', target: 'DAN_1' }
      ]
    },
    {
      id: 7,
      question: "승급 및 승단 심사 당일 아침, 심사장으로 향하는 나의 마음가짐은?",
      options: [
        { text: '그동안 수련한 피와 땀의 시간을 믿으며 거침없는 최상의 기량을 선보이겠다.', target: 'PLAYER' },
        { text: '심사관 앞에서도 떨지 않고 평소 도장에서 배운 예의와 정신을 완벽히 표출하겠다.', target: 'DAN_2' },
        { text: '심사장에 모인 수련생들이 안전하게 기량을 펼칠 수 있도록 점검하고 응원한다.', target: 'SABEOM' },
        { text: '새로운 띠를 매게 될 생각에 밤잠을 설쳤지만 떨리는 마음으로 도전한다.', target: 'RED_BELT' }
      ]
    },
    {
      id: 8,
      question: "나에게 '태권도 도복'이란 어떤 의미인가?",
      options: [
        { text: '나의 신념과 인생 철학이 담긴 또 하나의 정갈한 분신.', target: 'GWANJANG' },
        { text: '입는 순간 자신감이 샘솟고 무도인으로서 책임을 느끼게 하는 옷.', target: 'DAN_2' },
        { text: '땀 흘려 수련한 흔적이 깃든 자랑스러운 열정의 훈장.', target: 'POOM_3' },
        { text: '하얗고 뼛속까지 시원한 멋진 무술복!', target: 'WHITE_BELT' }
      ]
    },
    {
      id: 9,
      question: "지친 하루를 마치고 푹 쉴 때 태권도 관련 콘텐츠가 나온다면 당신은?",
      options: [
        { text: '국가대표 겨루기/품새 하이라이트 영상을 보며 기술 분석을 하고 있다.', target: 'PLAYER' },
        { text: '유명 관장님의 도장 경영 철학이나 지도법 관련 강의를 몰입해서 본다.', target: 'GWANJANG' },
        { text: '태권도 숏폼 발차기 영상을 보면서 나도 모르게 허공에 스텝을 밟아본다.', target: 'BLUE_BELT' },
        { text: '새로 나온 태권도 시범단 곡예 격파 영상을 보며 입을 다물지 못한다.', target: 'POOM_1' }
      ]
    },
    {
      id: 10,
      question: "당신이 추구하는 태권도 수련의 궁극적인 목표는?",
      options: [
        { text: '타인을 포용하고 훌륭한 제자를 양성하여 올바른 사회 구성원으로 만드는 것.', target: 'SABEOM' },
        { text: '강한 신체와 인격을 정진하여 인생의 어떠한 시련도 극복하는 백절불굴의 내공.', target: 'DAN_5' },
        { text: '세계무대에서 당당히 대한민국 태권도의 매개체로 인정받는 엘리트 마스터.', target: 'PLAYER' },
        { text: '즐겁고 건강하게 수련하며 계속해서 새로운 띠와 단증에 도전하는 것.', target: 'RED_BELT' }
      ]
    },
    {
      id: 11,
      question: "도장 공개 시범 무대 기회가 주어졌을 때 당신의 반응과 역할은?",
      options: [
        { text: '화려한 공중 높이 차기 격파와 송판 깨기 시범을 대담하게 맡는다.', target: 'POOM_4' },
        { text: '단원들의 대열과 동선을 체크하며 시범의 완성도를 지휘한다.', target: 'SABEOM' },
        { text: '기본 발차기와 예의 시범을 당당하고 칼 같이 보여준다.', target: 'BLUE_BELT' },
        { text: '처음 서보는 무대지만 우렁차게 기합을 넣으며 열정적으로 임한다.', target: 'YELLOW_BELT' }
      ]
    },
    {
      id: 12,
      question: "발차기 미트 훈련 시 가장 기분 좋은 쾌감을 느끼는 순간은?",
      options: [
        { text: '미트가 펑! 소리와 함께 찢어질 듯한 강력한 타격음이 도장에 울릴 때.', target: 'DAN_2' },
        { text: '0.1초의 지체도 없이 연속 연차발차기를 목표 미트에 정확히 꽂아 넣을 때.', target: 'PLAYER' },
        { text: '올바른 무릎 인상과 정석 궤적으로 깔끔하게 발차기를 차낼 때.', target: 'DAN_1' },
        { text: '사범님이 "오~ 발차기 소리 좋은데!" 하고 칭찬해 주실 때.', target: 'YELLOW_BELT' }
      ]
    },
    {
      id: 13,
      question: "수련하면서 띠의 색상이 점차 바뀌어갈 때 느끼는 보람은?",
      options: [
        { text: '흰 띠에서 노란 띠, 파란 띠로 묶는 띠의 색깔이 올라갈 때의 기쁨.', target: 'YELLOW_BELT' },
        { text: '땀과 노력이 결실을 맺어 내 도복에 검은 띠가 매어지는 역사적 순간.', target: 'DAN_1' },
        { text: '품새와 겨루기 실력이 몰라보게 성장한 나 자신을 발견할 때.', target: 'BLUE_BELT' },
        { text: '내가 가르치고 격려한 후배 수련생이 심사에 합격해 기뻐할 때.', target: 'SABEOM' }
      ]
    },
    {
      id: 14,
      question: "도장 동료와 기술적인 동작 의견 차이가 생겼을 때 당신의 태도는?",
      options: [
        { text: '국기원 교범 표준 규정을 바탕으로 논리적이고 친절하게 설명해 준다.', target: 'DAN_3' },
        { text: '서로의 동작을 직접 시범 보이며 부드럽게 피드백을 주고받는다.', target: 'POOM_2' },
        { text: '"일단 직접 땀 흘리며 차보자!" 미트를 주고받으며 실전으로 답을 찾는다.', target: 'RED_BELT' },
        { text: '겸손하게 사범님이나 관장님의 명확한 지도와 판단을 구한다.', target: 'BLUE_BELT' }
      ]
    },
    {
      id: 15,
      question: "도장 밖 일상생활에서 나도 모르게 나타나는 태권도 수련생의 습관은?",
      options: [
        { text: '엘리베이터나 자동문이 열릴 때 나도 모르게 인사 자세를 취한다.', target: 'POOM_1' },
        { text: '정리가 안 된 신발이나 물건을 보면 칼 같이 각을 맞춰 정돈한다.', target: 'YELLOW_BELT' },
        { text: '순간적으로 높은 곳의 버튼을 누를 때 가벼운 발차기 스텝이 나온다.', target: 'RED_BELT' },
        { text: '길을 걸을 때도 바른 자세와 깊은 호흡을 유지하며 서기를 의식한다.', target: 'DAN_4' }
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // 3. CANVAS RESULT CARD EXPORTER
  // --------------------------------------------------------------------------
  class CardExporter {
    static exportCardAsPNG(resultData) {
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

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, 540, 740);

      // Title
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 20px Pretendard, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🥋 태권도 Level-test 공식 인증서', 300, 80);

      // Top % Tag Pill
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
      ctx.fillText(`🔥 국기원 통계 ${resultData.topPercent}`, 300, 134);

      // Belt Icon
      ctx.font = '80px sans-serif';
      ctx.fillText(resultData.icon, 300, 240);

      // Level Title
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

      // Download trigger
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `태권도_레벨_인증서_${resultData.type.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
  // 3.5 STARTSCREEN COMPONENT
  // --------------------------------------------------------------------------
  class StartScreenComponent {
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

      const startBtn = this.container.querySelector('#startTestBtn');
      if (startBtn) {
        startBtn.addEventListener('click', () => {
          this.onStart();
        });
      }
    }
  }

  // --------------------------------------------------------------------------
  // 3.6 QUIZSCREEN COMPONENT
  // --------------------------------------------------------------------------
  class QuizScreenComponent {
    constructor(containerId, options = {}) {
      this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      this.onSelectOption = options.onSelectOption || (() => {});
      this.onPrevStep = options.onPrevStep || (() => {});
    }

    render(questionData, currentStep, totalSteps, selectedOptionIndex = null) {
      if (!this.container || !questionData) return;

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

      this.container.innerHTML = `
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

      const optionBtns = this.container.querySelectorAll('.option-card');
      optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          this.onSelectOption(questionData, idx);
        });
      });

      const prevBtn = this.container.querySelector('#prevBtn');
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
      this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    }

    render() {
      if (!this.container) return;

      this.container.innerHTML = `
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
  // 3.8 RESULTSCREEN COMPONENT
  // --------------------------------------------------------------------------
  class ResultScreenComponent {
    constructor(containerId, options = {}) {
      this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      this.onRestart = options.onRestart || (() => {});
    }

    render(resultData) {
      if (!this.container || !resultData) return;

      this.container.innerHTML = `
        <div class="result-view">
          <div class="certificate-card">
            <div class="top-percent-tag">🔥 국기원 통계 ${resultData.topPercent}</div>
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
            <button class="btn-secondary" id="copyBtn">
              🔗 결과 링크 복사하기
            </button>
            <button class="btn-secondary" id="restartBtn" style="background: transparent; border-color: rgba(255,255,255,0.15);">
              🔄 테스트 다시하기
            </button>
          </div>
        </div>
      `;

      const downloadBtn = this.container.querySelector('#downloadBtn');
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

      const copyBtn = this.container.querySelector('#copyBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(window.location.href).then(() => {
            alert('결과 페이지 링크가 클립보드에 복사되었습니다!');
          }).catch(() => {
            alert('링크가 복사되었습니다.');
          });
        });
      }

      const restartBtn = this.container.querySelector('#restartBtn');
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

  // --------------------------------------------------------------------------
  // 4. MAIN APP CONTROLLER
  // --------------------------------------------------------------------------
  class TaekwondoApp {
    constructor() {
      this.state = 'START';
      this.currentStep = 0;
      this.answers = [];
      this.scores = {};
      this.finalResult = null;

      this.startScreen = new StartScreenComponent('mainContainer', {
        onStart: () => {
          this.state = 'QUIZ';
          this.currentStep = 0;
          this.answers = [];
          this.scores = {};
          this.render();
        }
      });

      this.quizScreen = new QuizScreenComponent('mainContainer', {
        onSelectOption: (question, optionIndex) => this.handleSelect(question, optionIndex),
        onPrevStep: () => this.handlePrev()
      });

      this.loadingScreen = new LoadingScreenComponent('mainContainer');

      this.resultScreen = new ResultScreenComponent('mainContainer', {
        onRestart: () => this.handleRestart()
      });

      this.init();
    }

    init() {
      this.renderHeader();
      this.render();
    }

    renderHeader() {
      const headerContainer = document.getElementById('headerContainer');
      if (!headerContainer) return;

      headerContainer.innerHTML = `
        <header class="site-header">
          <a href="#" class="brand-logo" id="headerLogoBtn">
            <span>🥋 태권도 Level-test</span>
          </a>
          <button class="sound-toggle-btn" id="soundToggleBtn" title="사운드">🔇</button>
        </header>
      `;

      const logoBtn = headerContainer.querySelector('#headerLogoBtn');
      if (logoBtn) {
        logoBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleRestart();
        });
      }
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

      const target = selected.target;
      this.scores[target] = (this.scores[target] || 0) + 1;

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
      let topCategory = 'WHITE_BELT';
      let maxScore = -1;

      for (const [type, score] of Object.entries(this.scores)) {
        if (score > maxScore) {
          maxScore = score;
          topCategory = type;
        }
      }

      this.finalResult = RESULT_TYPES[topCategory] || RESULT_TYPES.WHITE_BELT;
    }
  }

  // Auto initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TaekwondoApp());
  } else {
    new TaekwondoApp();
  }
})();
