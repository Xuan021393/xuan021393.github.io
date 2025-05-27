let model, webcam;
let count = 0;
let unlocked = {};

const modelURL = "model/";
const imageMap = {
  "Paper": "paper.png",
  "Glass": "glass.png",
  "PET Bottles": "pet_bottles.png",
  "Aluminum Cans": "aluminum_cans.png",
  "Plastic": "plastic.png"
};

const encouragements = [
  "🌟 很棒喔！又分對一個了！",
  "💪 你是環保小尖兵！",
  "👏 太厲害了！繼續保持！",
  "🌱 地球謝謝你！",
  "🎉 做得好！你救了北極熊！",
  "🏆 分類高手再添一筆！",
  "🌍 小小舉動，大大改變！",
  "💚 你是地球守護者！",
  "😎 超強分類達人！",
  "🐢 海洋生物為你歡呼！"
];

async function init() {
  try {
    const modelURL_JSON = modelURL + "model.json";
    const metadataURL = modelURL + "metadata.json";

    model = await tmImage.load(modelURL_JSON, metadataURL);
    webcam = new tmImage.Webcam(300, 200, true);

    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
  } catch (err) {
    alert("⚠️ 鏡頭啟動失敗！請確認已允許權限，並使用 localhost 開啟頁面。\n\n錯誤資訊：" + err);
    console.error(err);
  }
}

async function loop() {
  webcam.update();
  window.requestAnimationFrame(loop);
}

async function predict() {
  try {
    document.getElementById("background-music").play().catch(() => {});

    const prediction = await model.predict(webcam.canvas);
    const highest = prediction.reduce((max, p) =>
      p.probability > max.probability ? p : max
    );

    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    document.getElementById("result").innerText = `${encouragement}（${highest.className}）`;

    count += 1;
    document.getElementById("count").innerText = `今日已分類：${count} 項`;

    document.getElementById("correct-sound").play();

    if (!unlocked[highest.className]) {
      unlocked[highest.className] = true;
      showCard(highest.className);
    }
  } catch (err) {
    console.error("分類失敗：", err);
  }
}

function showCard(className) {
  const container = document.getElementById("card-container");
  const card = document.createElement("div");
  card.className = "card";

  const imageFile = imageMap[className] || "default.png";

  card.innerHTML = `
    <img src="images/${imageFile}" onerror="this.src='images/default.png'; console.warn('圖片載入失敗：', this.src)" />
    <p>${className} 已解鎖！</p>
  `;
  container.appendChild(card);
}

init();
