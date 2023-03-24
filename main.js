const timer = document.getElementById('timer');
const startTimerButton = document.getElementById('start-timer-button');
// ポイント入力フォームの要素を取得する
const form = document.querySelector('form');

startTimerButton.addEventListener('click', startTimer);



function startTimer() {
    let remainingTime = 300; // 5分間の残り時間を秒数で表す

    const intervalId = setInterval(() => {
      remainingTime--;
  
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
  
      timer.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
      if (remainingTime === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
}

function submitGoal() {
    var goal = document.getElementById("goal").value;
    alert("目標値は" + goal + "です。");
}

// フォーム変更時のイベントを処理する
form.addEventListener('change', function(event) {
    event.preventDefault(); // フォーム送信を中止する
  
    // 各チーム・各質問のポイントを取得する
    const teamA_q1 = document.querySelector('#teamA_q1').value;
    const teamB_q1 = document.querySelector('#teamB_q1').value;
    const teamA_q2 = document.querySelector('#teamA_q2').value;
    const teamB_q2 = document.querySelector('#teamB_q2').value;
    const teamA_q3 = document.querySelector('#teamA_q3').value;
    const teamB_q3 = document.querySelector('#teamB_q3').value;
  
    // TODO: ポイントを加算するなどの処理を行う
    const teamASumValue = Number(teamA_q1) + Number(teamA_q2) + Number(teamA_q3);
    updatePoints('a',teamASumValue);
    const teamBSumValue = Number(teamB_q1) + Number(teamB_q2) + Number(teamB_q3);
    updatePoints('b',teamBSumValue);

  });

  function updatePoints(team, points) {
    var pointsElement = document.querySelector('#team-' + team + '-points');
    pointsElement.textContent = points;
  }