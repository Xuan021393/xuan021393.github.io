// 切換深色模式
document.getElementById('modeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = document.querySelector('#modeToggle i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// 載入外拍作品
document.addEventListener("DOMContentLoaded", () => {
  const outdoorWrap = document.getElementById("outdoor-wrap");

  const outdoorData = [
    { title: "秋紅谷外拍", imgs: ["img1.jpg", "img2.jpg", "img3.jpg"] },
    { title: "生日主題外拍", imgs: ["img6.jpg", "img7.jpg", "img8.jpg"] },
    { title: "舊兒童樂園外拍", imgs: ["img11.jpg", "img12.jpg", "img13.jpg"] },
    { title: "松山文創園區外拍", imgs: ["img16.jpg", "img17.jpg", "img18.jpg"] },
    { title: "婚紗模特外拍", imgs: ["img21.jpg", "img22.jpg"] },
    { title: "兒童公園外拍", imgs: ["img23.jpg", "img24.jpg", "img25.jpg"] }
  ];

  outdoorData.forEach((set, i) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card h-100 shadow";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title text-center";
    title.innerText = set.title;

    const carouselId = `carousel-${i}`;
    const carousel = document.createElement("div");
    carousel.id = carouselId;
    carousel.className = "carousel slide";
    carousel.setAttribute("data-bs-ride", "carousel");

    const inner = document.createElement("div");
    inner.className = "carousel-inner";

    set.imgs.forEach((img, index) => {
      const item = document.createElement("div");
      item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
      const image = document.createElement("img");
      image.src = `assets/images/${img}`;
      image.className = "d-block w-100 outdoor-img";
      image.alt = set.title;
      item.appendChild(image);
      inner.appendChild(item);
    });

    const prev = document.createElement("button");
    prev.className = "carousel-control-prev";
    prev.type = "button";
    prev.setAttribute("data-bs-target", `#${carouselId}`);
    prev.setAttribute("data-bs-slide", "prev");
    prev.innerHTML = `<span class="carousel-control-prev-icon"></span>`;

    const next = document.createElement("button");
    next.className = "carousel-control-next";
    next.type = "button";
    next.setAttribute("data-bs-target", `#${carouselId}`);
    next.setAttribute("data-bs-slide", "next");
    next.innerHTML = `<span class="carousel-control-next-icon"></span>`;

    carousel.appendChild(inner);
    if (set.imgs.length > 1) {
      carousel.appendChild(prev);
      carousel.appendChild(next);
    }

    cardBody.appendChild(title);
    cardBody.appendChild(carousel);
    card.appendChild(cardBody);
    col.appendChild(card);
    outdoorWrap.appendChild(col);
  });
});
