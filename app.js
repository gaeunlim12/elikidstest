// 질문 데이터
const QUESTIONS = [
{ q: "우리 아이는 어떤 친구 관계를 더 편안해하나요?",
a: "같은 아파트(동네) 친구들과 자주 만나 놀고, 함께 다니는 걸 좋아해요.",
b: "처음 만난 친구와도 금방 어울리고, 새로운 모임에도 잘 끼어요." },
{ q: "우리 아이는 어떤 방식의 칭찬을 더 좋아하나요?",
a: "칭찬스티커/도장처럼 '기준을 채우면 주는 보상'을 좋아해요.",
b: "'여기 이렇게 해서 좋았어'처럼 아이가 한 걸 자세히 봐주는 칭찬에 더 동기가 생겨요." },
{ q: "우리 아이는 시끌벅적한 자리에서 어떻게 반응하나요?",
a: "처음엔 조용히 있다가 익숙해지면 적극적으로 참여해요.",
b: "바로 분위기에 맞춰 활발하게 참여해요." },
{ q: "우리 아이가 새로운 것을 배울 때 어떤 방식을 선호하나요?",
a: "차근차근 단계별로 배우는 걸 좋아해요.",
b: "전체적인 그림을 보고 자유롭게 탐색하며 배우는 걸 좋아해요." },
{ q: "우리 아이는 규칙에 대해 어떤 태도를 보이나요?",
a: "정해진 규칙을 잘 따르고, 규칙이 있으면 안정감을 느껴요.",
b: "규칙보다는 상황에 맞게 유연하게 행동하는 편이에요." },
{ q: "우리 아이는 어떤 활동을 더 좋아하나요?",
a: "책 읽기, 그리기, 만들기 같은 조용한 활동을 좋아해요.",
b: "몸을 움직이는 활동이나 여러 친구들과 함께 하는 활동을 좋아해요." },
{ q: "우리 아이는 문제 상황에서 어떻게 반응하나요?",
a: "어른에게 도움을 요청하거나 정해진 방법을 찾으려 해요.",
b: "스스로 여러 방법을 시도해보며 해결하려 해요." },
{ q: "우리 아이는 어떤 환경에서 더 집중을 잘하나요?",
a: "조용하고 정돈된 환경에서 집중을 잘해요.",
b: "약간의 소음이나 변화가 있어도 잘 적응하며 집중해요." },
{ q: "우리 아이의 학습 스타일은 어떤가요?",
a: "반복 학습을 통해 확실히 익히는 걸 좋아해요.",
b: "다양한 방법으로 창의적으로 접근하는 걸 좋아해요." },
{ q: "우리 가족이 중요하게 생각하는 교육 가치는 무엇인가요?",
a: "기초 학력과 올바른 인성을 탄탄히 기르는 것",
b: "아이의 개성과 창의성을 최대한 발휘하는 것" }
];

// 학교 유형별 가중치
const WEIGHTS = {
"공립": [2, 1, 1, 1, 2, 1, 1, 1, 1, 2],
"국립": [0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
"사립": [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
"대안": [1, 2, 0, 2, 0, 2, 2, 1, 2, 0],
"외국인": [0, 0, 1, 1, 0, 1, 1, 1, 1, 0]
};

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
"공립": "공립학교",
"사립": "사립학교",
"국립": "국립학교",
"외국인": "외국인학교",
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
const retryBtn = document.getElementById('retry');

// 이벤트
startBtn.addEventListener('click', startQuiz);
optA.addEventListener('click', () => selectOption('A'));
optB.addEventListener('click', () => selectOption('B'));
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
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

// 다시하기
function restart() {
currentQ = 0;
answers = [];
result.classList.add('hidden');
intro.classList.remove('hidden');
}
