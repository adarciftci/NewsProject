
//SIDEBAR 
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.menu-toggle');
    const closeBtn = document.getElementById('closePanel');
    const sidePanel = document.getElementById('sideCategoryPanel');
    const overlay = document.getElementById('overlay');
  
    // HEM tıklama hem üzerine gelince açılır
    toggleBtn.addEventListener('click', openSidePanel);
  
    function openSidePanel() {
      sidePanel.classList.add('open');
      overlay.classList.add('active');
    }
  
    closeBtn.addEventListener('click', closeSidePanel);
    overlay.addEventListener('click', closeSidePanel);
  
    function closeSidePanel() {
      sidePanel.classList.remove('open');
      overlay.classList.remove('active');
    }
  });
  



//SLIDER
let sliderIndex = 0;
let sliderData = [];

function loadSlider() {
  fetch("https://run.mocky.io/v3/c899df68-aa7c-441e-8556-4f06ba725243")
    .then(res => res.json())
    .then(data => {
      sliderData = data.slider_news;
      const container = document.getElementById("sliderContainer");

      sliderData.forEach(news => {
        const slide = document.createElement("div");
        slide.className = "slider-item";
        slide.innerHTML = `
          <a href="${news.newsLink}" target="_blank">
            <img src="${news.imageLink}" alt="News ${news.id}">
          </a>
        `;
        container.appendChild(slide);
      });

      startSlider();
    });
}

function startSlider() {
  const container = document.getElementById("sliderContainer");
  setInterval(() => {
    sliderIndex = (sliderIndex + 1) % sliderData.length;
    container.style.transform = `translateX(-${sliderIndex * 100}%)`;
  }, 7000); // 7 saniyede bir değişir

  // Butonlarla kontrol
  document.getElementById("prevBtn").addEventListener("click", () => {
    sliderIndex = (sliderIndex - 1 + sliderData.length) % sliderData.length;
    container.style.transform = `translateX(-${sliderIndex * 100}%)`;
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    sliderIndex = (sliderIndex + 1) % sliderData.length;
    container.style.transform = `translateX(-${sliderIndex * 100}%)`;
  });
}

// Sayfa yüklendiğinde slider’ı başlat
document.addEventListener("DOMContentLoaded", loadSlider);



//FINANCE BAR
function loadFinanceBar() {
    fetch("https://run.mocky.io/v3/6bd9c74c-4a89-4eac-8b9d-6b7e36c40f1b")
      .then(res => res.json())
      .then(data => {
        const financeBar = document.getElementById("financeBar");
  
        data.finance_bar.forEach(item => {
          const changeValue = parseFloat(item.change.replace('%',''));
          const isUp = item.change.includes('+') || changeValue > 0;
          const directionClass = isUp ? 'up' : 'down';
          const directionSymbol = isUp ? '▲' : '▼';
  
          const financeItem = document.createElement('div');
          financeItem.className = 'finance-item';
          financeItem.innerHTML = `
            <span class="finance-code">${item.code}</span>
            <span class="finance-rate">${item.rate}</span>
            <span class="finance-change ${directionClass}">${item.change} ${directionSymbol}</span>
          `;
          financeBar.appendChild(financeItem);
        });
      });
  }
  
  // Sayfa yüklendiğinde finans barı çalıştır
  document.addEventListener("DOMContentLoaded", loadFinanceBar);
  