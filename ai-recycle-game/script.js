const trashArea = document.getElementById("trash-area");
const bins = document.querySelectorAll(".bin");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

let score = 0;
let timeLeft = 30;
let gameInterval;
let gameOver = false;

// 垃圾資料
const trashItems = [
  { type: "aluminum_can", src: "image/aluminum_can_1.png" },
  { type: "aluminum_can", src: "image/aluminum_can_2.png" },
  { type: "aluminum_can", src: "image/aluminum_can_3.png" },
  { type: "aluminum_can", src: "image/aluminum_can_4.png" },
  { type: "aluminum_can", src: "image/aluminum_can_5.png" },
  { type: "bottle", src: "image/bottle_1.png" },
  { type: "bottle", src: "image/bottle_2.png" },
  { type: "bottle", src: "image/bottle_3.png" },
  { type: "bottle", src: "image/bottle_4.png" },
  { type: "bottle", src: "image/bottle_5.png" },
  { type: "bottle", src: "image/bottle_6.png" },
  { type: "carton", src: "image/carton_1.png" },
  { type: "carton", src: "image/carton_2.png" },
  { type: "carton", src: "image/carton_3.png" },
  { type: "carton", src: "image/carton_4.png" },
  { type: "carton", src: "image/carton_5.png" },
  { type: "glass", src: "image/glass_1.png" },
  { type: "glass", src: "image/glass_2.png" },
  { type: "glass", src: "image/glass_3.png" },
  { type: "glass", src: "image/glass_4.png" },
  { type: "glass", src: "image/glass_5.png" },
  { type: "glass", src: "image/glass_6.png" }
];

// 建立單個垃圾
function createTrash() {
  const item = trashItems[Math.floor(Math.random() * trashItems.length)];
  const img = document.createElement("img");
  img.src = item.src;
  img.className = "trash";
  img.dataset.type = item.type;
  img.id = `id_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  img.style.top = `${Math.random() * 60 + 20}%`;
  img.style.left = `${Math.random() * 80 + 10}%`;

  img.draggable = true;
  img.ondragstart = e => {
    e.dataTransfer.setData("type", img.dataset.type);
    e.dataTransfer.setData("id", img.id);
  };

  trashArea.appendChild(img);
}

// 一次產生 5 個垃圾
function spawnTrash(count = 5) {
  for (let i = 0; i < count; i++) {
    createTrash();
  }
}

// 拖曳事件設定
bins.forEach(bin => {
  bin.ondragover = e => e.preventDefault();
  bin.ondrop = e => {
    if (gameOver) return;

    e.preventDefault();
    const draggedId = e.dataTransfer.getData("id");
    const draggedType = e.dataTransfer.getData("type");
    const expectedType = bin.dataset.type;

    const draggedElement = document.getElementById(draggedId);
    if (!draggedElement) return;

    if (draggedType === expectedType) {
      score++;
      correctSound.currentTime = 0;
      correctSound.play();
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }

    draggedElement.remove();
    scoreDisplay.textContent = `分數：${score}`;

    if (!gameOver && document.querySelectorAll(".trash").length < 5) {
      createTrash();
    }
  };
});

// 倒數與重設
function startTimer() {
  clearInterval(gameInterval);
  trashArea.innerHTML = "";
  score = 0;
  timeLeft = 30;
  gameOver = false;
  scoreDisplay.textContent = "分數：0";
  timerDisplay.textContent = "倒數：30 秒";
  spawnTrash();

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `倒數：${timeLeft} 秒`;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      gameOver = true;
      alert(`時間到！你得到 ${score} 分！`);
    }
  }, 1000);
}

function restartGame() {
  startTimer();
}

window.onload = () => {
  startTimer();
  document.getElementById("bg-music").volume = 0.3;
};
