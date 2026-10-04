const toggleBtn = document.getElementById("themeToggle");
const body = document.body; // declare body once

body.classList.add("theme-dark");

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("theme-dark");
  body.classList.toggle("theme-light");
});

let translations = [];
let currentLang = "en";

// Load JSON
fetch("csv/website.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    applyLanguage(currentLang);
    updateActiveLanguage(); // set default active button
  })
  .catch(err => console.error("Translation load error:", err));

// Apply language
function applyLanguage(lang) {
  translations.forEach(item => {
    const el = document.getElementById(item.key);
    if (!el) return;

    el.textContent = item[lang];
  });
}

// Update active button style
function updateActiveLanguage() {
  document.querySelectorAll(".language-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

// Language switch
function switchLanguage(lang) {
  currentLang = lang;
  applyLanguage(lang);
  updateActiveLanguage();
}


function drawWithD3(rows) {

  // Clear previous chart
  d3.select("#dailyChart").html("");

  // Dimensions
  const width = window.innerWidth * 0.9;
  const height = 300;

  const svg = d3.select("#dailyChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleBand()
    .domain(rows.map(d => d.date))
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(rows, d => +d.value)])
    .range([height, 0]);

  svg.selectAll("rect")
    .data(rows)
    .enter()
    .append("rect")
    .attr("x", d => x(d.date))
    .attr("y", d => y(+d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(+d.value));

  svg.selectAll("text")
    .data(rows)
    .enter()
    .append("text")
    .attr("x", d => x(d.date) + x.bandwidth() / 2)
    .attr("y", d => y(+d.value) - 10)
    .attr("text-anchor", "middle")
    .text(d => d.value);
}

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showSlide(index) {
  if(index < 0) index = slides.length - 1;
  if(index >= slides.length) index = 0;
  slider.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
}

prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
