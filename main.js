function refreshPage() {
  location.reload(); // 페이지 새로고침
}

function calculateScores() {
  // 등급별 점수 변환
  const gradeToScore = {
    'A': 200,
    'B': 180,
    'C': 160,
    'D': 120,
    'E': 100
  };

  // 가중치
  const korWeight = 0.25;
  const matWeight = 0.5;
  const engWeight = 0.25;
  const semesterWeight = 0.25;

  // 학기별 성적 입력 필드 이름
  const semesterNames = [
    "2-1-kor", "2-1-mat", "2-1-eng",
    "2-2-kor", "2-2-mat", "2-2-eng",
    "3-1-kor", "3-1-mat", "3-1-eng",
    "3-2-kor", "3-2-mat", "3-2-eng"
  ];

  let allFieldsFilled = true;
  let allFieldsValid = true;

  for (const semesterName of semesterNames) {
    const gradeInput = document.getElementsByName(semesterName)[0];
    const grade = gradeInput.value.toUpperCase();
      
    if (grade === '') {
      allFieldsFilled = false;
      break;
    }

    if (!(grade in gradeToScore)) {
      allFieldsValid = false;
      alert(`올바르지 않은 등급이 입력되었습니다`);
      gradeInput.focus(); // 오류 발생한 입력 필드에 포커스
      break;
    }
  }

  if (!allFieldsFilled) {
    alert('모든 등급을 입력해야 합니다.');
    return;
  }

  if (!allFieldsValid) {
    return;
  }

  // 총점 계산
  let totalScore = 0;

  for (const semesterName of semesterNames) {
    const grade = document.getElementsByName(semesterName)[0].value.toUpperCase();
    const score = gradeToScore[grade] || 0; // 등급에 해당하는 점수를 가져오거나 0으로 처리
    totalScore += score * (semesterWeight * (semesterName.includes("kor") ? korWeight : (semesterName.includes("mat") ? matWeight : engWeight)));
  }

  // 총점 표시
  const totalScoreInput = document.getElementById("total-score-input");
  totalScoreInput.value = `${totalScore}`;
}

function copyTotalScore() {
  const totalScoreInput = document.getElementById("total-score-input");
  totalScoreInput.select(); // 입력란의 내용을 선택
  document.execCommand("copy"); // 선택한 내용을 복사
  alert("복사 완료!");
}