const puzzleData = {
  paper: {
    prefix: "paper_",
    audio: "audio/paper.wav"
  },
  plastic: {
    prefix: "plastic_",
    audio: "audio/plastic.wav"
  },
  glass: {
    prefix: "glass_",
    audio: "audio/glass.wav"
  },
  aluminum: {
    prefix: "aluminum_",
    audio: "audio/aluminum.wav"
  }
};

let currentCategory = "";

function startGame(category) {
  currentCategory = category;
  document.getElementById("category-select").classList.add("hidden");
  document.getElementById("puzzle-game").classList.remove("hidden");

  const piecesContainer = document.getElementById("pieces-container");
  const puzzleBoard = document.getElementById("puzzle-board");
  const explanationImg = document.getElementById("explanation-img");
  explanationImg.src = `image/${category}.jpg`;

  piecesContainer.innerHTML = "";
  puzzleBoard.innerHTML = "";

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);

  for (const num of numbers) {
    const img = document.createElement("img");
    img.src = `pieces/${puzzleData[category].prefix}${num}.jpg`;
    img.className = "puzzle-piece";
    img.draggable = true;
    img.id = `piece-${num}`;
    img.addEventListener("dragstart", dragStart);
    piecesContainer.appendChild(img);
  }

  for (let i = 1; i <= 9; i++) {
    const slot = document.createElement("div");
    slot.className = "puzzle-slot";
    slot.dataset.index = i;
    slot.addEventListener("dragover", dragOver);
    slot.addEventListener("drop", drop);
    puzzleBoard.appendChild(slot);
  }

  document.getElementById("explanation").classList.add("hidden");
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const pieceId = event.dataTransfer.getData("text/plain");
  const piece = document.getElementById(pieceId);

  // 僅允許每格放一張圖片
  if (event.target.classList.contains("puzzle-slot") && event.target.children.length === 0) {
    event.target.appendChild(piece);
  }
}

function checkPuzzle() {
  const slots = document.querySelectorAll(".puzzle-slot");
  let isCorrect = true;

  slots.forEach((slot, index) => {
    const img = slot.querySelector("img");
    if (!img || !img.id.endsWith(`-${index + 1}`)) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    playAudio("audio/correct.mp3");
    document.getElementById("explanation").classList.remove("hidden");
  } else {
    alert("還沒完成喔～再檢查一下！");
  }
}

function playExplanationAudio() {
  const audioFile = puzzleData[currentCategory].audio;
  playAudio(audioFile);
}

function playAudio(src) {
  const player = document.getElementById("audio-player");
  player.src = src;
  player.play();
}

function restartGame() {
  document.getElementById("puzzle-game").classList.add("hidden");
  document.getElementById("category-select").classList.remove("hidden");
  const bgm = document.getElementById("background-music");
  bgm.play(); // 確保背景音繼續播放
}
