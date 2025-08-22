// 질문 데이터
const QUESTIONS = [
{ q: "우리 아이는 어떤 친구 관계를 더 편안해하나요?",
a: "같은 아파트(동네) 친구들과 자주 만나 놀고, 함께 다니는 걸 좋아해요.",
b: "처음 만난 친구와도 금방 어울리고, 새로운 모임에도 잘 끼어요." },
{ q: "우리 아이는 어떤 방식의 칭찬을 더 좋아하나요?",
a: "칭찬스티커/도장처럼 '기준을 채우면 주는 보상'을 좋아해요.",
b: "'여기 이렇게 해서 좋았어'처럼 아이가 한 걸 자세히 봐주는 칭찬에 더 동기가 생겨요." },
{ q: "우리 아이는 시끌벅적한 자리에서 어떻게 반응하나요?",
a: "행사나 소리가 큰 곳에서는 쉽게 지치고, 조용한 곳을 찾으려 해요.",
b: "떠들썩해도 잠깐 쉬면 다시 잘 놀고 금방 적응해요." },
{ q: "우리 가족은 아이 교육에서 무엇을 더 우선하나요?",
a: "기본기부터 탄탄하게 쌓고, 체계적으로 학습하는 걸 더 중시해요.",
b: "협력·탐구·체험 같은 과정과 경험에서 배우는 성장을 더 중시해요." },
{ q: "우리 아이는 특별히 선호하는 특성화 활동이 있나요?",
a: "피아노/미술/체육/언어 같은 '특별 활동'에 깊은 관심과 선호가 있어요.",
b: "별히 선호하는 '특별 활동'이 있지는 않아요." },
{ q: "우리 아이는 언어·다문화 노출에 어떻게 반응하나요?",
a: "한국어 설명이 편하고, 영어는 노래 따라 부르기 정도면 충분해요.",
b: "간단한 영어 지시·놀이도 좋아하고, 다른 문화 이야기에도 호기심이 커요." },
{ q: "우리 가족은 기관(유치원)과의 소통에서 어떤 방식을 더 선호하나요?",
a: "알림장/가정통신문처럼 일정이 정리되어 오는 방식이면 충분해요.",
b: "사진·영상 공유, 설명회·행사 안내처럼 자주 소통해 주면 더 안심돼요." },
{ q: "우리 아이는 어떤 활동에서 더 몰입하나요?",
a: "따라 쓰기, 숫자 세기, 책 읽기처럼 ‘차근차근 따라하는 활동’에서 더 집중해요.",
b: "만들기, 실험, 발표·공연, 체험처럼 ‘자유롭게 표현하는 활동’에 더 성취감을 느껴요." },
{ q: "우리 가족은 학교 선택·지원 방식에 대해 어떻게 생각하나요?",
a: "배정된 학교로 가는 일반 절차가 마음이 편하고, 추가 지원은 부담돼요.",
b: "아이와 잘 맞는 학교를 찾기 위해 지원/면접 절차를 시간을 들여 알아보고, 고액의 학비도 부담할 의향이 있어요." },
{ q: "우리 가족은 통학·생활 방식에서 무엇을 더 중요하게 보나요?",
a: "통학 시간은 최대한 짧게, 안정적인 생활 환경을 가졌으면 해요.",
b: "좋은 학교라면 장거리 통학이나 기숙학교도 선택할 수 있어요." }
];

// 학교 유형별 가중치 (A선택지, B선택지 분리)
const WEIGHTS = {
  "공립": {
    A: [2, 1, 1, 2, 0, 1, 2, 2, 2, 3],
    B: [0, 0, 0, 0, 2, 0, 0, 0, 0, 0]
  },
  "국립": {
    A: [0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    B: [1, 1, 1, 1, 0, 0, 2, 1, 1, 1]
  },
  "사립": {
    A: [1, 0, 0, 1, 2, 0, 0, 0, 0, 0],
    B: [0, 2, 1, 1, 0, 1, 2, 1, 1, 1]
  },
  "대안": {
    A: [1, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    B: [0, 2, 0, 2, 0, 0, 0, 2, 1, 1]
  },
  "외국인": {
    A: [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    B: [1, 0, 1, 0, 0, 2, 0, 1, 2, 3]
  }
};

// 결과 계산 함수 수정
function showResult() {
  const scores = {};
  
  for (const type in WEIGHTS) {
    scores[type] = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === 'A') {
        scores[type] += WEIGHTS[type].A[i];
      } else if (answers[i] === 'B') {
        scores[type] += WEIGHTS[type].B[i];
      }
    }
  }
  
  // 최고 점수 찾기 (동점 시 타이브레이커 적용)
  let topSchools = [];
  let maxScore = Math.max(...Object.values(scores));
  
  for (const type in scores) {
    if (scores[type] === maxScore) {
      topSchools.push(type);
    }
  }
  
  // 타이브레이커 적용
  let finalSchool = topSchools[0];
  if (topSchools.length > 1) {
    finalSchool = applyTiebreaker(topSchools, answers);
  }
  
  // 결과 표시
  topType.textContent = SCHOOL_RESULTS[finalSchool];
  if (SCHOOL_IMAGES[finalSchool]) {
    resultImg.src = SCHOOL_IMAGES[finalSchool];
    resultImg.alt = SCHOOL_RESULTS[finalSchool] + ' 결과 이미지';
  }
  
  quiz.classList.add('hidden');
  result.classList.remove('hidden');
}

// 타이브레이커 함수 추가
function applyTiebreaker(tiedSchools, answers) {
  const questionsToCheck = [9, 0, 5, 3, 2]; // Q10, Q1, Q6, Q4, Q3 (0-based index)

  for (const qIndex of questionsToCheck) {
    const key = (qIndex + 1) + answers[qIndex]; // ex: "10A", "1B"
    const priorityList = TIE_PRIOR[key];
    if (!priorityList) continue;

    for (const school of priorityList) {
      if (tiedSchools.includes(school)) {
        return school;
      }
    }
  }

  // 기본 우선순위
  const defaultPriority = ['공립', '국립', '사립', '대안', '외국인'];
  for (const school of defaultPriority) {
    if (tiedSchools.includes(school)) return school;
  }

  return tiedSchools[0];
}

// 학교 유형별 이미지 파일명
const SCHOOL_IMAGES = {
"공립": "public.png",
"사립": "private.png",
"국립": "national.png",
"외국인": "international.png",
"대안": "alternative.png"
};

// 학교 유형별 결과 텍스트
const SCHOOL_RESULTS = {
"공립": "공립초등학교",
"사립": "사립초등학교",
"국립": "국립초등학교",
"외국인": "국제학교⋅외국인학교",
"대안": "대안학교"
};

// 전역 상태
let currentQ = 0;
let answers = [];

// DOM
const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const result = document.getElementById('result');
const startBtn = document.getElementById('startBtn');
const qText = document.getElementById('qText');
const optA = document.getElementById('optA');
const optB = document.getElementById('optB');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const qIndex = document.getElementById('qIndex');
const barFill = document.getElementById('barFill');
const topType = document.getElementById('topType');
const resultImg = document.getElementById('resultImg');
const shareBtn = document.getElementById('shareTest');
const retryBtn = document.getElementById('retry');

// 이벤트
startBtn.addEventListener('click', startQuiz);
optA.addEventListener('click', () => selectOption('A'));
optB.addEventListener('click', () => selectOption('B'));
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
shareBtn.addEventListener('click', shareTest);
retryBtn.addEventListener('click', restart);

// 시작
function startQuiz() {
intro.classList.add('hidden');
quiz.classList.remove('hidden');
showQuestion();
}

// 질문 표시
function showQuestion() {
const q = QUESTIONS[currentQ];
qText.textContent = q.q;
optA.textContent = q.a;
optB.textContent = q.b;

qIndex.textContent = currentQ + 1;
barFill.style.width = ((currentQ + 1) / QUESTIONS.length * 100) + '%';

optA.classList.remove('selected');
optB.classList.remove('selected');
nextBtn.disabled = true;

if (answers[currentQ]) {
(answers[currentQ] === 'A' ? optA : optB).classList.add('selected');
nextBtn.disabled = false;
}

prevBtn.disabled = currentQ === 0;
}

// 선택
function selectOption(option) {
optA.classList.remove('selected');
optB.classList.remove('selected');
(option === 'A' ? optA : optB).classList.add('selected');

answers[currentQ] = option;
nextBtn.disabled = false;
}

// 네비게이션
function prevQuestion() {
if (currentQ > 0) {
currentQ--;
showQuestion();
}
}

function nextQuestion() {
if (currentQ < QUESTIONS.length - 1) {
currentQ++;
showQuestion();
} else {
showResult();
}
}

// 결과
function showResult() {
const scores = {};

for (const type in WEIGHTS) {
scores[type] = 0;
for (let i = 0; i < answers.length; i++) {
if (answers[i] === 'A') {
scores[type] += WEIGHTS[type][i];
} else if (answers[i] === 'B') {
// B에 대한 별도 가중치가 없다면 0 처리
scores[type] += WEIGHTS[type][i * 2 + 1] || 0;
}
}
}

// 최고 점수
let topTypeKey = '';
let maxScore = -1;
for (const type in scores) {
if (scores[type] > maxScore) {
maxScore = scores[type];
topTypeKey = type;
}
}

// 결과 바인딩
topType.textContent = SCHOOL_RESULTS[topTypeKey] || '추천 결과';
if (SCHOOL_IMAGES[topTypeKey]) {
resultImg.src = SCHOOL_IMAGES[topTypeKey];
resultImg.alt = (SCHOOL_RESULTS[topTypeKey] || '') + ' 결과 이미지';
} else {
resultImg.removeAttribute('src'); // 잘못된 경로일 때 브로큰 이미지 방지
}

quiz.classList.add('hidden');
result.classList.remove('hidden');
}

// 공유하기
function shareTest() {
  const url = window.location.href;
  const text = '우리 아이 학교 유형 테스트 - 엘리하이 키즈';
  
  // Web Share API 지원 확인 (모바일)
  if (navigator.share) {
    navigator.share({
      title: text,
      text: '우리 아이에게 맞는 학교 유형을 찾아보세요!',
      url: url
    }).catch(err => console.log('공유 실패:', err));
  } 
  // 클립보드 복사 (데스크톱)
  else if (navigator.clipboard) {
    navigator.clipboard.writeText(`${text}\n${url}`)
      .then(() => alert('링크가 클립보드에 복사되었습니다!'))
      .catch(() => fallbackCopy(url));
  }
  // 폴백 방법
  else {
    fallbackCopy(url);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    alert('링크가 클립보드에 복사되었습니다!');
  } catch (err) {
    alert('링크 복사에 실패했습니다. 수동으로 복사해주세요:\n' + text);
  }
  document.body.removeChild(textarea);
}

// 다시하기
function restart() {
currentQ = 0;
answers = [];
result.classList.add('hidden');
intro.classList.remove('hidden');
}
