// =======================
//  Aesthetic Slideshow
// =======================

const slideImgs = document.querySelectorAll(".slide-item");
const dotsContainer = document.getElementById("dots");

let current = 0;
let autoSlide;

// Generate dots
slideImgs.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

// Show slide function
function showSlide(i) {
    slideImgs[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = (i + slideImgs.length) % slideImgs.length;

    slideImgs[current].classList.add("active");
    dots[current].classList.add("active");
}

// Buttons
document.getElementById("prev").addEventListener("click", () => {
    showSlide(current - 1);
});

document.getElementById("next").addEventListener("click", () => {
    showSlide(current + 1);
});

// Auto slide
function startAuto() {
    autoSlide = setInterval(() => {
        showSlide(current + 1);
    }, 3000);
}

function stopAuto() {
    clearInterval(autoSlide);
}

startAuto();

// Pause on hover
const slideshow = document.getElementById("slideshow");
slideshow.addEventListener("mouseenter", stopAuto);
slideshow.addEventListener("mouseleave", startAuto);
console.log("Jumlah gambar ditemukan:", slideImgs.length);
slideImgs.forEach(img => console.log("Gambar:", img.src));