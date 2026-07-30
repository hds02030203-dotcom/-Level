# scratch/test_decision_matrix.py - End-to-End Simulation Test for Taekwondo Decision Matrix
import sys

sys.stdout.reconfigure(encoding='utf-8')

RESULT_TYPES = {
    'GWANJANG': '국기원 대사범 (태권 9단 & 최고관장님)',
    'SABEOM': '수련생들의 우상 (공인 4단 & 명품 사범님)',
    'PLAYER': '불꽃의 국가대표 (엘리트 겨루기/품새 선수)',
    'DAN_5': '무도의 거목 (공인 5단 고단자)',
    'DAN_4': '강호의 일인자 (공인 4단 유단자)',
    'DAN_3': '도장의 든든한 대들보 (공인 3단 유단자)',
    'DAN_2': '절도 있는 실력파 (공인 2단 유단자)',
    'DAN_1': '자랑스러운 검은 띠 (공인 1단 유단자)',
    'POOM_4': '청소년 품새 마스터 (공인 4품 보유자)',
    'POOM_3': '도장의 에이스 수련생 (공인 3품 보유자)',
    'POOM_2': '질풍노도의 테크니션 (공인 2품 보유자)',
    'POOM_1': '열정 폭발 꼬마 유단자 (공인 1품 보유자)',
    'RED_BELT': '승품/승단 심사 직전! (불타는 빨간 띠)',
    'BLUE_BELT': '실력이 쑥쑥 자라는 (푸른 파란 띠)',
    'YELLOW_BELT': '태권도의 재미에 빠진 (병아리 노란 띠)',
    'WHITE_BELT': '설레는 첫 걸음! (순백의 흰 띠)'
}

def simulate_test(profile_name, answers):
    q_targets = {
        1: ['SABEOM', 'DAN_3', 'RED_BELT', 'WHITE_BELT'],
        2: ['PLAYER', 'SABEOM', 'DAN_4', 'POOM_2'],
        3: ['PLAYER', 'DAN_5', 'RED_BELT', 'WHITE_BELT'],
        4: ['GWANJANG', 'DAN_3', 'BLUE_BELT', 'YELLOW_BELT'],
        5: ['SABEOM', 'RED_BELT', 'GWANJANG', 'POOM_1'],
        6: ['DAN_4', 'GWANJANG', 'POOM_4', 'DAN_1'],
        7: ['PLAYER', 'DAN_2', 'SABEOM', 'RED_BELT'],
        8: ['WHITE_BELT', 'YELLOW_BELT', 'BLUE_BELT', 'RED_BELT'],
        9: ['RED_BELT', 'POOM_1', 'DAN_1', 'SABEOM'],
        10: ['SABEOM', 'DAN_5', 'PLAYER', 'RED_BELT'],
        11: ['POOM_4', 'SABEOM', 'BLUE_BELT', 'YELLOW_BELT'],
        12: ['DAN_2', 'PLAYER', 'DAN_1', 'YELLOW_BELT'],
        13: ['DAN_1', 'DAN_2', 'DAN_3', 'DAN_4'],
        14: ['DAN_3', 'POOM_2', 'RED_BELT', 'BLUE_BELT'],
        15: ['PLAYER', 'PLAYER', 'DAN_3', 'YELLOW_BELT'],
        16: ['GWANJANG', 'SABEOM', 'DAN_1', 'YELLOW_BELT'],
        17: ['DAN_5', 'DAN_3', 'BLUE_BELT', 'WHITE_BELT'],
        18: ['GWANJANG', 'DAN_2', 'RED_BELT', 'WHITE_BELT'],
        19: ['GWANJANG', 'PLAYER', 'POOM_3', 'YELLOW_BELT'],
    }

    scores = {}
    for q_id, opt_idx in answers.items():
        is_core = q_id in [8, 9, 13, 15, 16, 17, 18, 19]
        weight = 3 if is_core else 1
        
        if q_id == 16:
            if opt_idx == 0:
                scores['GWANJANG'] = scores.get('GWANJANG', 0) + 5
                scores['SABEOM'] = scores.get('SABEOM', 0) + 5
            elif opt_idx == 1:
                scores['SABEOM'] = scores.get('SABEOM', 0) + 4
                scores['DAN_4'] = scores.get('DAN_4', 0) + 3
            elif opt_idx == 2:
                scores['DAN_1'] = scores.get('DAN_1', 0) + 3
            else:
                scores['YELLOW_BELT'] = scores.get('YELLOW_BELT', 0) + 1
        else:
            target = q_targets[q_id][opt_idx]
            scores[target] = scores.get(target, 0) + weight

    master_score = scores.get('GWANJANG', 0) + scores.get('SABEOM', 0)
    player_score = scores.get('PLAYER', 0)
    dan_score = sum([v for k, v in scores.items() if k.startswith('DAN_')])
    poom_score = sum([v for k, v in scores.items() if k.startswith('POOM_')])
    color_belt_score = sum([v for k, v in scores.items() if k in ['RED_BELT', 'BLUE_BELT', 'YELLOW_BELT', 'WHITE_BELT']])

    q9_ans = answers.get(9)
    q16_ans = answers.get(16)
    q17_ans = answers.get(17)
    q18_ans = answers.get(18)
    q19_ans = answers.get(19)

    top_category = 'WHITE_BELT'

    if q16_ans == 0 and (q19_ans == 0 or master_score >= 2 or q18_ans == 0):
        top_category = 'GWANJANG'
    elif (q16_ans == 0 or q16_ans == 1) and (master_score >= 2 or scores.get('SABEOM', 0) >= 1):
        top_category = 'SABEOM'
    elif player_score >= 3 or (q19_ans == 1 and player_score >= 2):
        top_category = 'PLAYER'
    elif q9_ans == 2 or (dan_score >= poom_score and dan_score >= color_belt_score and (dan_score >= 2 or q16_ans == 2 or q18_ans <= 1)):
        if q17_ans == 0 and q18_ans == 0:
            top_category = 'DAN_5'
        elif q17_ans == 0 or q18_ans == 0 or scores.get('DAN_4', 0) >= 2:
            top_category = 'DAN_4'
        elif q17_ans == 1 or q18_ans == 1 or scores.get('DAN_3', 0) >= 2:
            top_category = 'DAN_3'
        elif scores.get('DAN_2', 0) >= 2:
            top_category = 'DAN_2'
        else:
            top_category = 'DAN_1'
    elif q9_ans == 1 or (poom_score > dan_score and (poom_score >= color_belt_score or q9_ans == 1)):
        if scores.get('POOM_4', 0) >= 2 or (q17_ans == 1 and q19_ans == 2):
            top_category = 'POOM_4'
        elif scores.get('POOM_3', 0) >= 2 or q17_ans == 1 or q19_ans == 2:
            top_category = 'POOM_3'
        elif scores.get('POOM_2', 0) >= 2:
            top_category = 'POOM_2'
        else:
            top_category = 'POOM_1'
    else:
        red = scores.get('RED_BELT', 0)
        blue = scores.get('BLUE_BELT', 0)
        yellow = scores.get('YELLOW_BELT', 0)
        white = scores.get('WHITE_BELT', 0)

        if q18_ans == 2 or (red >= blue and red >= yellow and red >= white and red > 0):
            top_category = 'RED_BELT'
        elif q17_ans == 2 or (blue >= yellow and blue >= white and blue > 0):
            top_category = 'BLUE_BELT'
        elif yellow >= white and yellow > 0:
            top_category = 'YELLOW_BELT'
        else:
            top_category = 'WHITE_BELT'

    result_title = RESULT_TYPES.get(top_category, '미확인')
    print(f"[{profile_name}] -> 판정 카테고리: {top_category} | 결과 칭호: '{result_title}'")
    return top_category

print("=== 태권도 레벨 테스트 결정 매트릭스 시뮬레이션 검증 ===")

# Test Case 1: Grandmaster (관장님)
simulate_test("프로필 1: 관장님/대사범님", {
    1:0, 2:1, 3:1, 4:0, 5:2, 6:1, 7:2, 8:3, 9:3, 10:0, 11:1, 12:0, 13:3, 14:0, 15:2, 16:0, 17:0, 18:0, 19:0
})

# Test Case 2: Certified Instructor (사범님)
simulate_test("프로필 2: 공인 사범님", {
    1:0, 2:1, 3:1, 4:1, 5:0, 6:0, 7:2, 8:3, 9:3, 10:0, 11:1, 12:0, 13:2, 14:0, 15:2, 16:1, 17:1, 18:1, 19:0
})

# Test Case 3: Elite Player (엘리트 선수)
simulate_test("프로필 3: 국가대표 겨루기/품새 선수", {
    1:0, 2:0, 3:0, 4:1, 5:0, 6:0, 7:0, 8:3, 9:2, 10:2, 11:0, 12:1, 13:2, 14:2, 15:0, 16:2, 17:1, 18:1, 19:1
})

# Test Case 4: Dan Holder 3-Dan (공인 3단 유단자)
simulate_test("프로필 4: 공인 3단 성인 유단자", {
    1:1, 2:2, 3:1, 4:1, 5:1, 6:3, 7:1, 8:3, 9:2, 10:1, 11:2, 12:0, 13:2, 14:0, 15:2, 16:2, 17:1, 18:1, 19:2
})

# Test Case 5: Junior Poom Holder 2-Poom (공인 2품 수련생)
simulate_test("프로필 5: 공인 2품 청소년 수련생", {
    1:2, 2:3, 3:2, 4:2, 5:3, 6:2, 7:3, 8:2, 9:1, 10:3, 11:0, 12:3, 13:1, 14:1, 15:3, 16:3, 17:2, 18:2, 19:2
})

# Test Case 6: Yellow Belt Beginner (입문 병아리 노란 띠)
simulate_test("프로필 6: 입문 3개월차 노란 띠 수련생", {
    1:3, 2:3, 3:3, 4:3, 5:3, 6:3, 7:3, 8:1, 9:0, 10:3, 11:3, 12:3, 13:0, 14:3, 15:3, 16:3, 17:3, 18:3, 19:3
})

print("==================================================")
