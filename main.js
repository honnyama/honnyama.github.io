const goalInput = document.getElementById('goal');
const submitButton  = document.getElementById('goal-button');
const goalDisplay = document.getElementById('goal-display');
const timer = document.getElementById('timer');
const startTimerButton = document.getElementById('start-timer-button');
const table = document.querySelector('table');

let remainingTime = 300; // 5分間の残り時間を秒数で表す
let isRunning = false; 
let intervalId = null; // タイマーIDを初期値nullで宣言

startTimerButton.addEventListener('click', toggleTimer);

function toggleTimer() {
  if (isRunning === false && intervalId === null) {
    startTimer();
  } else if(isRunning === true && intervalId !== null){
    pauseTimer();
  } else if(isRunning === true && intervalId === null){
    resumeTimer();
  }
}

function startTimer() {
  isRunning = true; // タイマーが生成されたことを示すフラグを立てる
  startTimerButton.innerText = '一時停止'; // ボタンのラベルを変更する
  
  intervalId = setInterval(() => {
    remainingTime--;

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timer.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (remainingTime === 0) {
      clearInterval(intervalId);
      intervalId = null;
      playSound();
      isRunning = false; // タイマーが停止していることを示すフラグを立てる
      startTimerButton.innerText = '開始'; // ボタンのラベルを変更する
      remainingTime = 300;
      timer.innerText = '05:00';
    }
  }, 1000);
}

function pauseTimer() {
  startTimerButton.innerText = '再開'; // ボタンのラベルを変更する
  clearInterval(intervalId);
  intervalId = null;
}

function resumeTimer(){
  startTimerButton.innerText = '一時停止';
  intervalId = setInterval(() => {
    remainingTime--;

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timer.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (remainingTime === 0) {
      clearInterval(intervalId);
      intervalId = null;
      playsSOund();
      isRunning = false; // タイマーが停止していることを示すフラグを立てる
      startTimerButton.innerText = '開始'; // ボタンのラベルを変更する
      remainingTime = 300;
      timer.innerText = '05:00';
    }
  }, 1000);
}

function submitGoal() {
  var goal = goalInput.value;
  goalDisplay.textContent = goal;
  goalInput.style.display = 'none';
  goalDisplay.style.display = 'block';
  submitButton.style.display = 'none';
}

// フォーム変更時のイベントを処理する
table.addEventListener('change', function(event) {
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

  function playSound() {
    const audio = new Audio('目覚まし時計のアラーム音.mp3');
    audio.play();
  }
  