/* SCROLL ANIMATION */
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{ threshold:0.2 });

sections.forEach(sec=>{
  observer.observe(sec);
});

/* TABS */
const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

buttons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    buttons.forEach(b=>b.classList.remove("active"));
    contents.forEach(c=>c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById("tab"+btn.dataset.tab).classList.add("active");
  });
});



const slides = document.getElementById("slides");
const slideCount = document.querySelectorAll(".slide").length;
const dotsContainer = document.getElementById("dots");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

let index = 0;
let interval;

/* ===== CREATE DOTS ===== */
for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    index = i;
    updateSlide();
    resetInterval();
  });

  dotsContainer.appendChild(dot);
}

function updateSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));
  document.querySelectorAll(".dot")[index].classList.add("active");
}

function autoSlide() {
  index++;
  if (index >= slideCount) index = 0;
  updateSlide();
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(autoSlide, 3000);
}

interval = setInterval(autoSlide, 3000);

/* ===== LIGHTBOX ===== */
document.querySelectorAll(".slide img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});
