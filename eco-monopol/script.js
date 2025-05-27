const rollBtn = document.getElementById('rollBtn');
const diceImg = document.getElementById('dice');
const player = document.getElementById('player');
const questionBox = document.getElementById('question');
const choicesBox = document.getElementById('choices');
const resultBox = document.getElementById('result');
const audioRoll = document.getElementById('audio-roll');
const audioCorrect = document.getElementById('audio-correct');
const audioWrong = document.getElementById('audio-wrong');

let position = 0;
let diceRollValue = 1;

const positions = [
  { top: 0, left: 0 },
  { top: 0, left: 175 },
  { top: 0, left: 350 },
  { top: 175, left: 350 },
  { top: 350, left: 350 },
  { top: 350, left: 175 },
  { top: 350, left: 0 },
  { top: 175, left: 0 }
];

const questions = [
  {
    question: "塑膠袋應該怎麼處理？",
    choices: ["回收分類", "丟入馬桶", "一起燒掉"],
    answer: 0
  },
  {
    question: "下列哪一項屬於可回收物？",
    choices: ["寶特瓶", "剩飯", "樹葉"],
    answer: 0
  },
  {
    question: "關燈省電有助於什麼？",
    choices: ["減少碳排放", "變更聰明", "提高網速"],
    answer: 0
  },
  {
    question: "走路或騎腳踏車的好處？",
    choices: ["降低空汙", "提升肺活量", "兩者皆是"],
    answer: 2
  },
  {
    question: "下列哪個行為不環保？",
    choices: ["用環保袋", "買瓶裝水", "自備餐具"],
    answer: 1
  },
  {
    question: "電池應該怎麼處理？",
    choices: ["回收專區", "直接丟垃圾桶", "埋在土裡"],
    answer: 0
  },
  {
    question: "回收紙類時應注意？",
    choices: ["保持乾淨", "打包泡水", "黏上膠帶"],
    answer: 0
  },
  {
    question: "玻璃瓶可以？",
    choices: ["重複回收", "直接打碎", "放水中分解"],
    answer: 0
  }
];

function movePlayer() {
  const pos = positions[position];
  player.style.top = `${pos.top}px`;
  player.style.left = `${pos.left}px`;
}

function showQuestion(idx) {
  const q = questions[idx];
  questionBox.textContent = q.question;
  choicesBox.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      if (i === q.answer) {
        resultBox.textContent = `✅ 答對了！往前走 ${diceRollValue} 步`;
        audioCorrect.play();

        const nextPosition = position + diceRollValue;
        if (nextPosition >= 8) {
          position = 0;
          movePlayer();
          setTimeout(() => {
            alert("🎉 恭喜完成所有題目！");
          }, 500);
        } else {
          position = nextPosition;
          movePlayer();
        }

      } else {
        resultBox.textContent = "❌ 答錯了！退一步";
        audioWrong.play();
        position = (position - 1 + 8) % 8;
        movePlayer();
      }
    };
    choicesBox.appendChild(btn);
  });
}

rollBtn.addEventListener("click", () => {
  diceRollValue = Math.floor(Math.random() * 6) + 1;
  diceImg.src = `image/dice_${diceRollValue}.png`;
  audioRoll.play();

  const nextQ = (position + diceRollValue) % 8;
  showQuestion(nextQ);
});

// 初始化位置
movePlayer();
