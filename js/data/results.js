/**
 * 태권도 레벨 테스트 (Taekwondo Level Test) - Result Types Definition
 * Strictly mapped to official Kukkiwon (국기원) 国内, 海外 유품단자 현황 statistical data.
 */
export const RESULT_TYPES = {
  WHITE_BELT: {
    id: 'WHITE_BELT',
    type: '흰 띠',
    subTitle: '태권도 첫걸음',
    topPercent: '상위 100.0%',
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
    topPercent: '상위 88.0%',
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
    topPercent: '상위 78.0%',
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
    topPercent: '상위 65.0%',
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
    subTitle: '어린이 고수 1품',
    topPercent: '상위 54.4%',
    icon: '🏅',
    beltColor: '#DC2626',
    accentColor: '#18181B',
    description: '국기원 1품을 당당히 취득한 실력파 청소년/어린이 수련생입니다! (국기원 통계 3,350,302명 재적) 품새 1장부터 8장까지 마스터하고 예의를 아는 무도인입니다.',
    bestMatch: '단단한 무도인 1단',
    quote: '"예의로 시작하여 예의로 끝난다."'
  },
  POOM_2: {
    id: 'POOM_2',
    type: '유품자 (2품)',
    subTitle: '어린이 고수 2품',
    topPercent: '상위 35.3%',
    icon: '🏅',
    beltColor: '#DC2626',
    accentColor: '#18181B',
    description: '고려 품새와 연차발차기를 해내는 2품 고수입니다! (국기원 통계 2,168,467명 재적) 도장에서 후배들을 챙기며 흔들림 없는 기량을 선보입니다.',
    bestMatch: '단단한 무도인 2단',
    quote: '"꾸준함이 비범함을 만든다."'
  },
  POOM_3: {
    id: 'POOM_3',
    type: '유품자 (3품)',
    subTitle: '어린이 고수 3품',
    topPercent: '상위 17.8%',
    icon: '🏅',
    beltColor: '#DC2626',
    accentColor: '#18181B',
    description: '금강 품새의 웅장함을 자유자재로 표현하는 3품 고수입니다! (국기원 통계 970,206명 재적) 만 15세 미만 수련생 중 최상위권 기량을 품고 있습니다.',
    bestMatch: '솔선수범 리더 사범님',
    quote: '"금강의 단단함처럼 흔들리지 않는 내공."'
  },
  POOM_4: {
    id: 'POOM_4',
    type: '유품자 (4품)',
    subTitle: '어린이 고수 4품',
    topPercent: '상위 10.0%',
    icon: '🏅',
    beltColor: '#DC2626',
    accentColor: '#18181B',
    description: '만 15세 미만 어린이가 오를 수 있는 최고의 영예인 4품 보유자입니다! (국기원 통계 254,405명 재적) 3단과 동등한 무도 깊이를 자랑합니다.',
    bestMatch: '태권도 마스터 관장님',
    quote: '"어리지만 기상은 태산과 같다."'
  },
  DAN_1: {
    id: 'DAN_1',
    type: '유단자 (1단)',
    subTitle: '단단한 무도인 1단',
    topPercent: '상위 45.6%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '국기원 정식 검은 띠를 매고 진정한 무도인의 길에 들어선 1단 수련자입니다! (국기원 통계 4,197,095명 재적) 묵직한 발차기와 균형감을 갖추고 있습니다.',
    bestMatch: '어린이 고수 1품',
    quote: '"검은 띠는 포기하지 않은 흰 띠이다."'
  },
  DAN_2: {
    id: 'DAN_2',
    type: '유단자 (2단)',
    subTitle: '단단한 무도인 2단',
    topPercent: '상위 14.6%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '고려 품새의 정교함과 실전 타격을 이해하는 2단 무도인입니다. (국기원 통계 721,384명 재적) 수련의 깊이가 깊어져 동료들에게 든든한 버팀목이 됩니다.',
    bestMatch: '어린이 고수 2품',
    quote: '"무도는 자신을 이기는 기술이다."'
  },
  DAN_3: {
    id: 'DAN_3',
    type: '유단자 (3단)',
    subTitle: '단단한 무도인 3단',
    topPercent: '상위 8.8%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '태백 품새의 날카로움과 깊은 내공을 지닌 3단 고수입니다! (국기원 통계 442,078명 재적) 실기 능력과 이론, 무도 철학까지 겸비하고 있습니다.',
    bestMatch: '승부사의 기상 선수',
    quote: '"지혜와 기량이 비로소 일치하는 단계."'
  },
  DAN_4: {
    id: 'DAN_4',
    type: '유단자 (4단)',
    subTitle: '단단한 무도인 4단',
    topPercent: '상위 5.2%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '지도자 자격을 응시할 수 있는 고단자의 반열인 4단 보유자입니다! (국기원 통계 205,315명 재적) 타인을 가르칠 수 있는 명품 기량을 가집니다.',
    bestMatch: '솔선수범 리더 사범님',
    quote: '"가르침 속에서 더 큰 배움을 얻는다."'
  },
  DAN_5: {
    id: 'DAN_5',
    type: '유단자 (5단)',
    subTitle: '단단한 무도인 5단',
    topPercent: '상위 3.5%',
    icon: '🥋',
    beltColor: '#18181B',
    accentColor: '#F59E0B',
    description: '평생을 수련에 정진한 무도 마스터 5단입니다! (국기원 통계 57,299명 재적) 위기 상황에서도 흐트러지지 않는 태산 같은 중후함을 품고 있습니다.',
    bestMatch: '태권도 마스터 관장님',
    quote: '"수련의 끝은 없으며 오직 조화만이 존재한다."'
  },
  PLAYER: {
    id: 'PLAYER',
    type: '선수',
    subTitle: '승부사의 기상',
    topPercent: '상위 1.5%',
    icon: '🥊',
    beltColor: '#2563EB',
    accentColor: '#EF4444',
    description: '극강의 신체 능력과 스피드, 그리고 순발력을 갖춘 겨루기/품새 엘리트 선수입니다! 매일 치열한 훈련을 이겨내며 승부처에서 폭발적인 집중력을 발휘합니다.',
    bestMatch: '단단한 무도인 3단',
    quote: '"매트 위의 1초를 위해 1년의 피땀을 흘린다."'
  },
  SABEOM: {
    id: 'SABEOM',
    type: '사범님',
    subTitle: '솔선수범 리더',
    topPercent: '상위 0.7%',
    icon: '🥋',
    beltColor: '#0F172A',
    accentColor: '#10B981',
    description: '국기원 5단 이상 및 스포츠지도사 자격을 갖춘 지도자입니다! (국기원 통계 지도자 82,961명) 제자들에게 인내와 예의를 실천으로 보여줍니다.',
    bestMatch: '열정의 수련생 빨간 띠',
    quote: '"모범은 최고의 가르침이다."'
  },
  GWANJANG: {
    id: 'GWANJANG',
    type: '관장님',
    subTitle: '태권도 마스터',
    topPercent: '상위 0.01%',
    icon: '👑',
    beltColor: '#090D16',
    accentColor: '#F59E0B',
    description: '국기원 9단 최고 보도(1,612명) 및 사범/스포츠지도사 2개 자격을 모두 갖춘 총괄 마스터입니다! 태권도 정신을 널리 전파하는 거목입니다.',
    bestMatch: '솔선수범 리더 사범님',
    quote: '"백만 제자의 스승이자 무도의 등대."'
  }
};
