let randomNumber;
let selectedNumber = null;
let remaining = 5;

const buttonsDiv = document.getElementById('buttons');
const feedbackDiv = document.getElementById('feedback');
const guessDisplay = document.getElementById('guess');
const historyList = document.getElementById('history-list');
const attemptCount = document.getElementById('attempt-count');
const checkBtn = document.getElementById('check');
const newGameBtn = document.getElementById('new-game');

// 分组函数
function getGroup(num) {
  return Math.ceil(num / 10);
}

// 初始化游戏
function initGame() {
  randomNumber = Math.floor(Math.random() * 40) + 1;
  console.log("答案:", randomNumber);

  selectedNumber = null;
  remaining = 5;

  // ✅ 这里改了（不再显示 -）
  guessDisplay.textContent = "";

  feedbackDiv.textContent = "数字を選んでください";
  attemptCount.textContent = remaining;

  historyList.innerHTML = "";
  buttonsDiv.innerHTML = "";

  checkBtn.disabled = false;

  createButtons();
}

// 创建数字按钮
function createButtons() {
  for (let i = 1; i <= 40; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;

    btn.addEventListener('click', () => {
      selectedNumber = i;
      guessDisplay.textContent = i;
    });

    buttonsDiv.appendChild(btn);
  }
}

// 点击检查
checkBtn.addEventListener('click', () => {
  if (selectedNumber === null) {
    feedbackDiv.textContent = "先に数字を選んでください！";
    return;
  }

  if (remaining <= 0) return;

  remaining--;
  attemptCount.textContent = remaining;

  checkGuess(selectedNumber);

  // 最后一条命提示
  if (remaining === 1) {
    feedbackDiv.textContent += "（ラストチャンス！）";
  }

  // 用完次数
  if (remaining <= 0 && selectedNumber !== randomNumber) {
    endGame("ゲームオーバー！正解は " + randomNumber);
  }
});

// 判断逻辑
function checkGuess(guess) {
  const answerGroup = getGroup(randomNumber);
  const guessGroup = getGroup(guess);

  if (guess === randomNumber) {
    feedbackDiv.textContent = "正解！数字が一致しました！";
    endGame("クリア！");
  } else if (guessGroup === answerGroup) {
    feedbackDiv.textContent =
      guess > randomNumber ? "惜しい！少し高い！" : "惜しい！少し低い！";
  } else {
    feedbackDiv.textContent =
      guess > randomNumber ? "高すぎ！" : "低すぎ！";
  }

  addHistory(guess);
}

// 履歴
function addHistory(guess) {
  const li = document.createElement('li');
  const btn = document.createElement('button');

  btn.textContent = guess;

  li.appendChild(btn);
  historyList.appendChild(li);
}

// 游戏结束
function endGame(message) {
  feedbackDiv.textContent = message;

  document.querySelectorAll('#buttons button').forEach(btn => {
    btn.disabled = true;
    btn.classList.add('disabled');
  });

  checkBtn.disabled = true;
}

// 新游戏
newGameBtn.addEventListener('click', initGame);

// 启动
initGame();