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
    this.header = new HeaderComponent('headerContainer', {
      onSoundToggle: (isMuted) => {
        console.log('Sound toggled. Muted:', isMuted);
      }
    });

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

    // Special scoring for Q16 Certification Question
    if (question.id === 16) {
      if (optionIndex === 0) {
        // 둘 다 소유: 관장님 +3, 사범님 +2.5
        this.scores['GWANJANG'] = (this.scores['GWANJANG'] || 0) + 3;
        this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 2.5;
      } else if (optionIndex === 1) {
        // 생활스포츠지도사 (가점 높음 +2.5): 사범님 +2.5, 4단 +2
        this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 2.5;
        this.scores['DAN_4'] = (this.scores['DAN_4'] || 0) + 2;
      } else if (optionIndex === 2) {
        // 국제태권도사범 자격증 (+1.5): 사범님 +1.5, 3단 +1
        this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 1.5;
        this.scores['DAN_3'] = (this.scores['DAN_3'] || 0) + 1;
      } else {
        // 자격증 없음: 1단 +1
        this.scores['DAN_1'] = (this.scores['DAN_1'] || 0) + 1;
      }
    } else {
      const targetType = selectedOption.target;
      this.scores[targetType] = (this.scores[targetType] || 0) + 1;
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
    const hasSportsLeader = (q16AnswerIndex === 0 || q16AnswerIndex === 1);
    const hasMasterCert = (q16AnswerIndex === 0 || q16AnswerIndex === 2);

    // Business Rule Enforcement:
    // 1. 관장님(GWANJANG): 반드시 국제태권도사범 자격증과 생활스포츠지도사 둘 다 소유해야 가능!
    if (topCategory === 'GWANJANG' && !hasBothCerts) {
      topCategory = hasMasterCert ? 'SABEOM' : 'DAN_5';
    }

    // 2. 사범님(SABEOM): 국제태권도사범 자격증만 갖고 있거나 둘 다 소유해야 가능!
    if (topCategory === 'SABEOM' && (!hasMasterCert && !hasBothCerts)) {
      topCategory = hasSportsLeader ? 'DAN_5' : 'DAN_4';
    }

    this.finalResult = RESULT_TYPES[topCategory] || RESULT_TYPES.WHITE_BELT;
  }
}

// Initialize application on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
