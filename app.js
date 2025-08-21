// 문항 + 가중치(v1_재수정2)
const QUESTIONS = [
  {q:1, text:"우리 아이는 어떤 친구 관계를 더 편안해하나요?",
    A:{label:"A. 같은 아파트(동네) 친구들과 자주 만나 놀고, 함께 다니는 걸 좋아해요.",
       w:{공립:2, 국립:0, 사립:1, 대안:1, 외국인:0}},
    B:{label:"B. 처음 만난 친구와도 금방 어울리고, 새로운 모임에도 잘 끼어요.",
       w:{공립:0, 국립:1, 사립:0, 대안:0, 외국인:1}}
  },
  {q:2, text:"우리 아이는 어떤 방식의 칭찬을 더 좋아하나요?",
    A:{label:"A. 칭찬스티커/도장처럼 '기준을 채우면 주는 보상'을 좋아해요.",
       w:{공립:1, 국립:1, 사립:0, 대안:0, 외국인:0}},
    B:{label:"B. '여기 이렇게 해서 좋았어'처럼 아이가 한 걸 자세히 봐주는 칭찬에 더 동기가 생겨요.",
       w:{공립:0, 국립:1, 사립:2, 대안:2, 외국인:0}}
  },
  {q:3, text:"우리 아이는 시끌벅적한 자리에서 어떻게 반응하나요?",
    A:{label:"A. 행사나 소리가 큰 곳에서는 쉽게 지치고, 조용한 곳을 찾으려 해요.",
       w:{공립:1, 국립:0, 사립:0, 대안:2, 외국인:0}},
    B:{label:"B. 떠들썩해도 잠깐 쉬면 다시 잘 놀고 금방 적응해요.",
       w:{공립:0, 국립:1, 사립:1, 대안:0, 외국인:1}}
  },
  {q:4, text:"우리 가족은 아이 교육에서 무엇을 더 우선하나요?",
    A:{label:"A. 기본기부터 탄탄하게 쌓고, 체계적으로 학습하는 걸 더 중시해요.",
       w:{공립:2, 국립:1, 사립:1, 대안:0, 외국인:0}},
    B:{label:"B. 협력·탐구·체험 같은 과정과 경험에서 배우는 성장을 더 중시해요.",
       w:{공립:0, 국립:1, 사립:1, 대안:2, 외국인:0}}
  },
  {q:5, text:"우리 아이는 특별히 선호하는 특성화 활동이 있나요?",
    A:{label:"A. 피아노/미술/체육/언어 같은 '특별 활동'에 깊은 관심과 선호가 있어요.",
       w:{공립:0, 국립:1, 사립:2, 대안:0, 외국인:2}},
    B:{label:"B. 특별히 선호하는 '특별 활동'이 있지는 않아요.",
       w:{공립:2, 국립:0, 사립:0, 대안:0, 외국인:0}}
  },
  {q:6, text:"우리 아이는 언어·다문화 노출에 어떻게 반응하나요?",
    A:{label:"A. 한국어 설명이 편하고, 영어는 노래 따라 부르기 정도면 충분해요.",
       w:{공립:1, 국립:1, 사립:0, 대안:0, 외국인:0}},
    B:{label:"B. 간단한 영어 지시·놀이도 좋아하고, 다른 문화 이야기에도 호기심이 커요.",
       w:{공립:0, 국립:0, 사립:1, 대안:0, 외국인:2}}
  },
  {q:7, text:"우리 가족은 기관(유치원)과의 소통에서 어떤 방식을 더 선호하나요?",
    A:{label:"A. 알림장/가정통신문처럼 일정이 정리되어 오는 방식이면 충분해요.",
       w:{공립:2, 국립:0, 사립:0, 대안:0, 외국인:0}},
    B:{label:"B. 사진·영상 공유, 설명회·행사 안내처럼 자주 소통해 주면 더 안심돼요.",
       w:{공립:0, 국립:2, 사립:2, 대안:0, 외국인:0}}
  },
  {q:8, text:"우리 아이는 어떤 활동에서 더 몰입하나요?",
    A:{label:"A. 따라 쓰기, 숫자 세기, 책 읽기처럼 '차근차근 따라하는 활동'에서 더 집중해요.",
       w:{공립:2, 국립:1, 사립:0, 대안:0, 외국인:0}},
    B:{label:"B. 만들기, 실험, 발표·공연, 체험처럼 '자유롭게 표현하는 활동'에 더 성취감을 느껴요.",
       w:{공립:0, 국립:1, 사립:1, 대안:2, 외국인:1}}
  },
  {q:9, text:"우리 가족은 학교 선택·지원 방식에 대해 어떻게 생각하나요?",
    A:{label:"A. 배정된 학교로 가는 일반 절차가 마음이 편하고, 추가 지원은 부담돼요.",
       w:{공립:2, 국립:1, 사립:0, 대안:0, 외국인:0}},
    B:{label:"B. 아이와 잘 맞는 학교를 찾기 위해 지원/면접 절차를 시간을 들여 알아보고, 고액의 학비도 부담할 의향이 있어요.",
       w:{공립:0, 국립:1, 사립:1, 대안:1, 외국인:2}}
  },
  {q:10, text:"우리 가족은 통학·생활 방식에서 무엇을 더 중요하게 보나요?",
    A:{label:"A. 통학 시간은 최대한 짧게, 안정적인 생활 환경을 가졌으면 해요.",
       w:{공립:3, 국립:0, 사립:0, 대안:0, 외국인:0}},
    B:{label:"B. 좋은 학교라면 장거리 통학이나 기숙학교도 선택할 수 있어요.",
       w:{공립:0, 국립:1, 사립:1, 대안:1, 외국인:3}}
  }
];

const TYPES = ["공립","국립","사립","대안","외국인"];

// 결과 이미지 매핑(사전 준비된 이미지 자동 노출)
const RESULT_IMAGES = {
  "공립": "public.png",
  "국립": "national.png",
  "사립": "private.png",
  "대안": "alternative.png",
  "외국인": "international.png"
};

// 타이브레이커: 10 -> 1 -> 4
const TIE_PRIOR = {
  "10A":["공립","국립","사립","대안","외국인"],
  "10B":["외국인","사립","국립","대안","공립"],
  "1A":["공립","대안","국립","사립","외국인"],
  "1B":["국립","사립","외국인","공립","대안"],
  "4A":["공립","국립","사립","대안","외국인"],
  "4B":["대안","국립","사립","공립","외국인"],
};

const el = s=>document.querySelector(s);
const startBtn = el("#startBtn");
const intro = el("#intro");
const quiz = el("#quiz");
const result = el("#result");
const qText = el("#qText");
const optA = el("#optA");
const optB = el("#optB");
const nextBtn = el("#nextBtn");
const prevBtn = el("#prevBtn");
const idxSpan = el("#qIndex");
const barFill = el("#barFill");

const topTypeEl = el("#topType");
const topWhyEl = el("#topWhy");
const signalsEl = el("#signals");
const resultImg = el("#resultImg");

const shareBtn = el("#shareTest");
const retryBtn = el("#retry");

let answers = Array(QUESTIONS.length).fill(null);
let pointer = 0;

function renderQuestion(){
  const q = QUESTIONS[pointer];
  qText.textContent = q.text;
  optA.textContent = q.A.label;
  optB.textContent = q.B.label;
  [optA,optB].forEach(b=>b.classList.remove("selected"));
  if(answers[pointer]==="A") optA.classList.add("selected");
  if(answers[pointer]==="B") optB.classList.add("selected");

  idxSpan.textContent = (pointer+1);
  barFill.style.width = ((pointer)/QUESTIONS.length*100)+"%";
  prevBtn.disabled = pointer===0;
  nextBtn.disabled = answers[pointer]==null;
  nextBtn.textContent = pointer===QUESTIONS.length-1 ? "결과 보기" : "다음";
}

function choose(opt){
  answers[pointer] = opt;
  nextBtn.disabled = false;
  renderQuestion();
}

function tally(){
  const total = {"공립":0,"국립":0,"사립":0,"대안":0,"외국인":0};
  QUESTIONS.forEach((q,i)=>{
    const opt = answers[i];
    const map = q[opt].w;
    TYPES.forEach(t=> total[t]+= (map[t]||0) );
  });
  return total;
}

function tieBreak(candidates){
  const key10 = "10"+answers[9];
  const pri10 = TIE_PRIOR[key10] || [];
  const first = candidates.find(t=>pri10.includes(t));
  if(first) return first;

  const key1 = "1"+answers[0];
  const pri1 = TIE_PRIOR[key1] || [];
  const second = candidates.find(t=>pri1.includes(t));
  if(second) return second;

  const key4 = "4"+answers[3];
  const pri4 = TIE_PRIOR[key4] || [];
  const third = candidates.find(t=>pri4.includes(t));
  if(third) return third;

  return candidates[0];
}

function explainTop(top, scores){
  const hints = [];
  if(top==="공립"){
    if(answers[0]==="A") hints.push("동네 친구/생활권 선호");
    if(answers[9]==="A") hints.push("짧은 통학·안정 생활");
    if(answers[8]==="A") hints.push("기본기/루틴 집중");
  }else if(top==="국립"){
    if(answers[7]==="B") hints.push("학교-가정 소통 잦음 선호");
    if(answers[3]==="A"||answers[3]==="B") hints.push("체계적 수업/프로젝트 균형");
  }else if(top==="사립"){
    if(answers[4]==="A") hints.push("특성화 프로그램 선호");
    if(answers[8]==="B") hints.push("체험/발표 몰입");
  }else if(top==="대안"){
    if(answers[2]==="A") hints.push("저자극·소규모 선호");
    if(answers[8]==="B") hints.push("프로젝트·만들기 선호");
  }else if(top==="외국인"){
    if(answers[5]==="B") hints.push("영어/다문화 흥미");
    if(answers[9]==="B") hints.push("장거리/보딩 검토 가능");
  }
  signalsEl.innerHTML = hints.map(h=>`<li>${h}</li>`).join("") || "<li>응답 신호 요약을 확인하세요.</li>";

  const why = {
    "공립":"집과 가깝고 루틴이 분명한 환경에서 안정적으로 성장하는 패턴이에요.",
    "국립":"기본기는 탄탄하게, 수업·소통은 조금 더 체계적으로 맞는 편이에요.",
    "사립":"특성화와 다양한 경험이 동기부여를 키우는 유형이에요.",
    "대안":"작은 공동체와 체험 중심 수업에서 집중력이 살아나요.",
    "외국인":"영어·프로젝트 중심 수업과 다문화 환경에서 에너지가 납니다."
  }[top];
  topWhyEl.textContent = why || "";

  // 결과 이미지 자동 노출
  resultImg.src = RESULT_IMAGES[top];
  resultImg.alt = `${top} 결과 이미지`;
}

function computeResult(){
  const scores = tally();
  const max = Math.max(...Object.values(scores));
  const candidates = TYPES.filter(t=>scores[t]===max);
  const top = candidates.length===1 ? candidates[0] : tieBreak(candidates);

  topTypeEl.textContent = `${top}학교 추천`;
  explainTop(top, scores);
}

function reset(){
  answers = Array(QUESTIONS.length).fill(null);
  pointer = 0;
  [intro,quiz,result].forEach(s=>s.classList.add("hidden"));
  intro.classList.remove("hidden");
  // 결과 이미지 초기화(빈 상태 유지)
  resultImg.removeAttribute("src");
  resultImg.alt = "결과 이미지";
}

startBtn.addEventListener("click", ()=>{
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  renderQuestion();
});

optA.addEventListener("click", ()=>choose("A"));
optB.addEventListener("click", ()=>choose("B"));

prevBtn.addEventListener("click", ()=>{
  if(pointer>0){ pointer--; renderQuestion(); }
});
nextBtn.addEventListener("click", ()=>{
  if(answers[pointer]==null) return;
  if(pointer<QUESTIONS.length-1){
    pointer++;
    renderQuestion();
  }else{
    // 완료
    barFill.style.width = "100%";
    quiz.classList.add("hidden");
    result.classList.remove("hidden");
    computeResult();
  }
});

// 테스트 공유하기
shareBtn.addEventListener("click", ()=>{
  const url = window.location.href;
  const text = "우리 아이 학교 유형 테스트 - 엘리하이 키즈\n\n10문항으로 알아보는 우리 아이에게 맞는 초등학교 유형!\n\n#엘리하이키즈 #초등입학 #초등학교유형테스트";
  
  if (navigator.share) {
    // 모바일 네이티브 공유
    navigator.share({
      title: "우리 아이 학교 유형 테스트",
      text: text,
      url: url
    }).catch(err => console.log('공유 취소:', err));
  } else {
    // 데스크톱 - URL 복사
    navigator.clipboard.writeText(url + "\n\n" + text).then(() => {
      alert("테스트 링크가 복사되었습니다!\n카카오톡, 인스타그램 등에 붙여넣기 해주세요.");
    }).catch(() => {
      // 복사 실패 시 대체 방법
      const textArea = document.createElement("textarea");
      textArea.value = url + "\n\n" + text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert("테스트 링크가 복사되었습니다!\n카카오톡, 인스타그램 등에 붙여넣기 해주세요.");
    });
  }
});

retryBtn.addEventListener("click", reset);

// 초기화
reset();
