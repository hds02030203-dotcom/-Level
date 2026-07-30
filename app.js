/**
 * Main Application Entry Point & State Machine (app.js)
 * Modular component orchestration for Taekwondo Level Test.
 */
import { QUESTIONS } from './js/data/questions.js';
import { RESULT_TYPES } from './js/data/results.js';

import { HeaderComponent } from './js/components/Header.js';
import { StartScreenComponent } from './js/components/StartScreen.js';
import { QuizScreenComponent } from './js/components/QuizScreen.js';
import { LoadingScreenComponent } from './js/components/LoadingScreen.js';
import { ResultScreenComponent } from './js/components/ResultScreen.js';

class App {
  constructor() {
    this.state = 'START'; // 'START' | 'QUIZ' | 'LOADING' | 'RESULT'
    this.currentStep = 0;
    this.answers = [];
    this.scores = {};
    this.finalResult = null;

    this.initComponents();
    this.render();
  }

  initComponents() {
    this.header = new HeaderComponent('headerContainer');

    this.userInfo = { userName: '', userDojang: '' };

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
      onSelectOption: (question, optionIndex) => this.handleOptionSelect(question, optionIndex),
      onPrevStep: () => this.handlePrevStep()
    });

    this.loadingScreen = new LoadingScreenComponent('mainContainer');

    this.resultScreen = new ResultScreenComponent('mainContainer', {
      onRestart: () => this.handleRestart()
    });
  }

  render() {
    this.header.render();

    const mainContainer = document.getElementById('mainContainer');

    if (this.state === 'START') {
      document.getElementById('progressContainer').innerHTML = '';
      this.startScreen.container = mainContainer;
      this.startScreen.render();

    } else if (this.state === 'QUIZ') {
      const question = QUESTIONS[this.currentStep];
      const previousSelectedIndex = this.answers[this.currentStep] !== undefined 
        ? this.answers[this.currentStep] 
        : null;

      this.quizScreen.container = mainContainer;
      this.quizScreen.render(question, this.currentStep + 1, QUESTIONS.length, previousSelectedIndex);

    } else if (this.state === 'LOADING') {
      document.getElementById('progressContainer').innerHTML = '';
      this.loadingScreen.container = mainContainer;
      this.loadingScreen.render();

      setTimeout(() => {
        this.calculateResult();
        this.state = 'RESULT';
        this.render();
      }, 1500);

    } else if (this.state === 'RESULT') {
      document.getElementById('progressContainer').innerHTML = '';
      this.resultScreen.container = mainContainer;
      this.resultScreen.render(this.finalResult);
    }
  }

  handleOptionSelect(question, optionIndex) {
    const selectedOption = question.options[optionIndex];
    this.answers[this.currentStep] = optionIndex;

    // Diagnostic Weight Multipliers: Q8, Q9, Q13, Q15, Q16, Q17, Q18, Q19 get 3x weight multiplier (+3 pts)!
    const isCoreDiagnostic = [8, 9, 13, 15, 16, 17, 18, 19].includes(question.id);
    const weight = isCoreDiagnostic ? 3 : 1;

    if (question.id === 16) {
      if (optionIndex === 0) {
        // 2개 다 소유: 최고 가점 (+5)
        this.scores['GWANJANG'] = (this.scores['GWANJANG'] || 0) + 5;
        this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 5;
      } else if (optionIndex === 1) {
        // 둘 중 1개 소유: 높은 가점 (+4)
        this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 4;
        this.scores['DAN_4'] = (this.scores['DAN_4'] || 0) + 3;
      } else if (optionIndex === 2) {
        // 품/단증 보유: 유단자 가점 (+3)
        this.scores['DAN_1'] = (this.scores['DAN_1'] || 0) + 3;
      } else {
        // 자격증 없음: 노란 띠 (+1)
        this.scores['YELLOW_BELT'] = (this.scores['YELLOW_BELT'] || 0) + 1;
      }
    } else {
      const targetType = selectedOption.target;
      this.scores[targetType] = (this.scores[targetType] || 0) + weight;
    }

    if (this.currentStep < QUESTIONS.length - 1) {
      this.currentStep++;
      this.render();
    } else {
      this.state = 'LOADING';
      this.render();
    }
  }

  handlePrevStep() {
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
    // 0. Increment Central Serverless DB Count & Local Cache
    try {
      const currentExtra = parseInt(localStorage.getItem('tkd_extra_participants') || '0', 10);
      localStorage.setItem('tkd_extra_participants', (currentExtra + 1).toString());
      fetch('/api/count', { method: 'POST' }).catch(() => {});
    } catch (e) {}

    // 1. Group Score Aggregation
    let masterScore = 0;
    let playerScore = 0;
    let danScore = 0;
    let poomScore = 0;
    let colorBeltScore = 0;

    const categoryScores = { ...this.scores };

    for (const [target, points] of Object.entries(this.scores)) {
      if (['GWANJANG', 'SABEOM'].includes(target)) {
        masterScore += points;
      } else if (target === 'PLAYER') {
        playerScore += points;
      } else if (target.startsWith('DAN_')) {
        danScore += points;
      } else if (target.startsWith('POOM_')) {
        poomScore += points;
      } else if (['RED_BELT', 'BLUE_BELT', 'YELLOW_BELT', 'WHITE_BELT'].includes(target)) {
        colorBeltScore += points;
      }
    }

    const q9Idx = QUESTIONS.findIndex(q => q.id === 9);
    const q16Idx = QUESTIONS.findIndex(q => q.id === 16);
    const q17Idx = QUESTIONS.findIndex(q => q.id === 17);
    const q18Idx = QUESTIONS.findIndex(q => q.id === 18);
    const q19Idx = QUESTIONS.findIndex(q => q.id === 19);

    const q9Ans = q9Idx !== -1 ? this.answers[q9Idx] : undefined;   // 0: red/below, 1: poom, 2: dan, 3: master
    const q16Ans = q16Idx !== -1 ? this.answers[q16Idx] : undefined; // 0: 2certs, 1: 1cert, 2: dan, 3: none
    const q17Ans = q17Idx !== -1 ? this.answers[q17Idx] : undefined; // 0: high Dan, 1: mid Dan, 2: basic, 3: stance
    const q18Ans = q18Idx !== -1 ? this.answers[q18Idx] : undefined; // 0: 10y+, 1: 3-10y, 2: 6m-3y, 3: <6m
    const q19Ans = q19Idx !== -1 ? this.answers[q19Idx] : undefined; // 0: master, 1: player, 2: poom/dan, 3: yellow

    let topCategory = 'WHITE_BELT';

    // 3. Hierarchical Classification Rules
    // RULE 1: MASTER TIER (관장님 / 사범님)
    if (q16Ans === 0 && (q19Ans === 0 || masterScore >= 2 || q18Ans === 0)) {
      topCategory = 'GWANJANG';
    } else if ((q16Ans === 0 || q16Ans === 1) && (masterScore >= 2 || (categoryScores['SABEOM'] || 0) >= 1)) {
      topCategory = 'SABEOM';
    }
    // RULE 2: ELITE ATHLETE (선수)
    else if (playerScore >= 3 || (q19Ans === 1 && playerScore >= 2)) {
      topCategory = 'PLAYER';
    }
    // RULE 3: BLACK BELT DAN TIER (1단 ~ 5단)
    else if (q9Ans === 2 || (danScore >= poomScore && danScore >= colorBeltScore && (danScore >= 2 || q16Ans === 2 || q18Ans <= 1))) {
      if (q17Ans === 0 && q18Ans === 0) {
        topCategory = 'DAN_5';
      } else if (q13Ans === 3 || q17Ans === 0) {
        topCategory = 'DAN_4';
      } else if (q13Ans === 2) {
        topCategory = 'DAN_3';
      } else if (q13Ans === 1) {
        topCategory = 'DAN_2';
      } else {
        topCategory = 'DAN_1';
      }
    }
    // RULE 4: POOM TIER (1품 ~ 4품)
    else if (q9Ans === 1 || (poomScore > danScore && (poomScore >= colorBeltScore || q9Ans === 1))) {
      if (q13Ans === 3 || q17Ans === 0) {
        topCategory = 'POOM_4';
      } else if (q13Ans === 2) {
        topCategory = 'POOM_3';
      } else if (q13Ans === 1) {
        topCategory = 'POOM_2';
      } else {
        topCategory = 'POOM_1';
      }
    }
    // RULE 5: COLOR BELT TIER (흰 띠, 노란 띠, 파란 띠, 빨간 띠)
    else {
      const red = categoryScores['RED_BELT'] || 0;
      const blue = categoryScores['BLUE_BELT'] || 0;
      const yellow = categoryScores['YELLOW_BELT'] || 0;
      const white = categoryScores['WHITE_BELT'] || 0;

      const q8Ans = q8Idx !== -1 ? this.answers[q8Idx] : undefined;

      if (q8Ans === 3 || (red > blue && red > yellow && red > white)) {
        topCategory = 'RED_BELT';
      } else if (q8Ans === 2 || (blue > yellow && blue > white)) {
        topCategory = 'BLUE_BELT';
      } else if (q8Ans === 1 || (yellow > white)) {
        topCategory = 'YELLOW_BELT';
      } else {
        topCategory = 'WHITE_BELT';
      }
    }

    this.finalResult = {
      ...(RESULT_TYPES[topCategory] || RESULT_TYPES.WHITE_BELT),
      userName: this.userInfo.userName || '',
      userDojang: this.userInfo.userDojang || ''
    };
  }
}

// Initialize application on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
