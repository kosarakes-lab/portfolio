const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showSlide(index) {
  if (!slider || slides.length === 0) return;
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  slider.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
}

// Aggiungiamo i controlli di sicurezza per evitare il crash se i bottoni non ci sono
if (prevBtn) {
  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
}
