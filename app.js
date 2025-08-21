// 결과 카드 저장 - 개선된 버전
saveBtn.addEventListener("click", async ()=>{
  const node = document.querySelector("#result");
  const saveButton = document.querySelector("#saveCard");
  
  // 버튼 상태 변경
  saveButton.textContent = "저장 중...";
  saveButton.disabled = true;
  
  try{
    // html2canvas 사용 (더 안정적)
    const canvas = await html2canvas(node, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: node.offsetWidth,
      height: node.offsetHeight
    });
    
    // Canvas를 Blob으로 변환
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "elihigh-kids-result.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // 버튼 상태 복원
      saveButton.textContent = "결과 카드 저장(PNG)";
      saveButton.disabled = false;
    }, 'image/png', 1.0);
    
  }catch(e){
    console.error("저장 오류:", e);
    alert("이미지 저장 중 오류가 발생했어요.\n\n해결 방법:\n1. 로컬 서버로 실행해주세요 (Live Server 등)\n2. 또는 스크린샷을 직접 찍어주세요");
    
    // 버튼 상태 복원
    saveButton.textContent = "결과 카드 저장(PNG)";
    saveButton.disabled = false;
  }
});
