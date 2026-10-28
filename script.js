const navbar = document.getElementById("navbar");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const changingWord = document.getElementById("changingWord");
const previewImage = document.getElementById("previewImage");
const previewVideo = document.getElementById("previewVideo");

// Scroll behavior
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < 100) {
        navbar.classList.remove("nav-hidden");
        lastScrollY = currentScrollY;
        return;
    }
    if (currentScrollY > lastScrollY) {
        navbar.classList.add("nav-hidden");
    }
    lastScrollY = currentScrollY;
});

window.addEventListener("mousemove", (event) => {
    if (event.clientY < 80) {
        navbar.classList.remove("nav-hidden");
    }
});

// Dark/Light Theme toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeIcon.textContent = document.body.classList.contains("dark") ? "◔" : "◕";
});

//about section

document.addEventListener("DOMContentLoaded", () => {
    // 1. "ABOUT" button -> Smooth scroll to the about section
    const aboutLink = document.querySelector('.nav-right a[href="#about"]');
    if (aboutLink) {
        aboutLink.addEventListener("click", (e) => {
            e.preventDefault(); // Prevents adding "#about" to the URL

            // Replace with your about section ID or class (e.g., #about or .about-wrapper)
            const target = document.querySelector("#about") || document.querySelector(".about-wrapper");

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    // 2. "KOSARA KESKINOVA" button -> Smooth scroll back to the top
    const homeLink = document.querySelector('.nav-left a[href="#"]');
    if (homeLink) {
        homeLink.addEventListener("click", (e) => {
            e.preventDefault(); // Prevents jumping or adding "#" to URL

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

// Word + Image Data Pairs
const items = [
    {
        text: "data visualisation",
        type: "image",
        src: "images/about/data-viz.png"
    },
    {
        text: "motion graphics",
        type: "video",
        src: "videos/motion-graphics.mp4"
    },
    {
        text: "editorial design",
        type: "video",
        src: "videos/editorial-design.mp4"
    }
];

const typingSpeed = 75;
const deletingSpeed = 40;
const pauseAfterTyping = 2000;
const pauseAfterDeleting = 300;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWord(word) {
    for (let i = 0; i <= word.length; i++) {
        changingWord.textContent = word.slice(0, i);
        await wait(typingSpeed);
    }
}

async function deleteWord(word) {
    for (let i = word.length; i >= 0; i--) {
        changingWord.textContent = word.slice(0, i);
        await wait(deletingSpeed);
    }
}

// Switch between image and video
async function showMedia(item) {
    // Hide both before switching
    previewImage.classList.remove("visible");
    previewVideo.classList.remove("visible");

    previewVideo.pause();

    if (item.type === "video") {
        previewImage.removeAttribute("src");

        previewVideo.src = item.src;
        previewVideo.load();

        try {
            await previewVideo.play();
            previewVideo.classList.add("visible");
        } catch (error) {
            console.warn("Video could not autoplay:", error);
        }
    } else {
        previewVideo.removeAttribute("src");
        previewVideo.load();

        previewImage.src = item.src;

        if (previewImage.complete && previewImage.naturalWidth > 0) {
            previewImage.classList.add("visible");
        } else {
            previewImage.onload = () => {
                previewImage.classList.add("visible");
            };
        }
    }
}

// Typewriter loop
async function typingLoop() {
    let index = 0;

    while (true) {
        const currentItem = items[index];

        // Display the corresponding media
        showMedia(currentItem);

        // Type the text
        await typeWord(currentItem.text);
        await wait(pauseAfterTyping);

        // Fade out media
        previewImage.classList.remove("visible");
        previewVideo.classList.remove("visible");

        await wait(500);
        previewVideo.pause();

        // Delete the text
        await deleteWord(currentItem.text);
        await wait(pauseAfterDeleting);

        index = (index + 1) % items.length;
    }
}

typingLoop();

// project-grid

document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects");
    const loadMoreBtn = document.getElementById("loadMore");
    const modal = document.getElementById("projectModal");
    const modalBody = document.getElementById("projectModalBody");
    const modalClose = document.getElementById("projectModalClose");

    let allProjects = [];
    let displayedCount = 0;
    const PROJECTS_PER_PAGE = 5;
    const carouselIntervals = new Map();

    // 1. Fetch Projects JSON
    fetch("projects.json")
        .then(res => res.json())
        .then(data => {
            allProjects = data;
            renderNextBatch();
        })
        .catch(err => console.error("Error loading projects.json:", err));

    // 2. Render 6 projects at a time
    function renderNextBatch() {
        const nextBatch = allProjects.slice(displayedCount, displayedCount + PROJECTS_PER_PAGE);
        nextBatch.forEach(project => {
            const card = createProjectCard(project);
            projectsContainer.appendChild(card);
            initCarousel(card, project.media);
        });

        displayedCount += nextBatch.length;

        // Toggle Load More button
        if (displayedCount < allProjects.length) {
            loadMoreBtn.hidden = false;
        } else {
            loadMoreBtn.hidden = true;
        }
    }

    loadMoreBtn.addEventListener("click", renderNextBatch);

    // 3. Card Template Builder
    function createProjectCard(project) {
        const card = document.createElement("article");
        card.className = "project-card";
        card.id = `project-${project.id}`;

        // 1. Top Header Table
        const header = document.createElement("div");
        header.className = "project-header";
        header.innerHTML = `
        <h1>${project.h1 || "Project"}</h1>
        <div class="project-row" role="button" tabindex="0" aria-label="Open details for ${project.what}">
            <div class="project-when">${project.when || ""}</div>
            <div class="project-what">${project.what || ""}</div>
            <div class="project-detail">${project.detail || ""}</div>
        </div>
    `;

        // 2. Middle Media Carousel (70% height)
        const carousel = document.createElement("div");
        carousel.className = "project-carousel";

        project.media.forEach((item, index) => {
            const slide = document.createElement("div");
            slide.className = `carousel-slide ${index === 0 ? "active" : ""}`;

            if (item.type === "video") {
                const vid = document.createElement("video");
                vid.src = item.src;
                vid.autoplay = true;
                vid.loop = true;
                vid.muted = true;
                vid.playsInline = true;
                slide.appendChild(vid);
            } else {
                const img = document.createElement("img");
                img.src = item.src;
                img.alt = item.alt || project.what || "";
                img.loading = "lazy";
                slide.appendChild(img);
            }
            carousel.appendChild(slide);
        });

        // Left/Right click zones
        const leftZone = document.createElement("div");
        leftZone.className = "carousel-zone zone-left";
        const rightZone = document.createElement("div");
        rightZone.className = "carousel-zone zone-right";
        carousel.appendChild(leftZone);
        carousel.appendChild(rightZone);

        // 3. Bottom Footer
        const footer = document.createElement("div");
        footer.className = "project-footer";
        footer.innerHTML = `
        <button type="button" class="project-more-btn" aria-label="Open details for ${project.what}">
        </button>
    `;

        // Assemble the card
        card.appendChild(header);
        card.appendChild(carousel);
        card.appendChild(footer);

        // Click event for the row
        const projectRow = header.querySelector(".project-row");
        projectRow.addEventListener("click", () => {
            openProjectModal(project);
        });

        // Accessibility: Allow opening via 'Enter' or 'Space' key when focused
        projectRow.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openProjectModal(project);
            }
        });

        // Click event for the 'more' button
        footer.querySelector(".project-more-btn").addEventListener("click", () => {
            openProjectModal(project);
        });

        return card;
    }
    // 4. Carousel Controller (Auto-timer + Swipe + Edge Clicks)
    function initCarousel(cardElement, mediaList) {
        if (!mediaList || mediaList.length <= 1) return;

        const slides = cardElement.querySelectorAll(".carousel-slide");
        let activeIndex = 0;
        let timer = null;

        function goToSlide(newIndex) {
            slides[activeIndex].classList.remove("active");
            activeIndex = (newIndex + slides.length) % slides.length;
            slides[activeIndex].classList.add("active");
        }

        function nextSlide() {
            goToSlide(activeIndex + 1);
        }

        function prevSlide() {
            goToSlide(activeIndex - 1);
        }

        function startAutoPlay() {
            stopAutoPlay();
            timer = setInterval(nextSlide, 10000); // changes every 3.5s
        }

        function stopAutoPlay() {
            if (timer) clearInterval(timer);
        }

        startAutoPlay();

        // Edge clicks
        const leftZone = cardElement.querySelector(".zone-left");
        const rightZone = cardElement.querySelector(".zone-right");

        leftZone.addEventListener("click", (e) => {
            e.stopPropagation();
            prevSlide();
            startAutoPlay();
        });

        rightZone.addEventListener("click", (e) => {
            e.stopPropagation();
            nextSlide();
            startAutoPlay();
        });

        // Touch swipe support (left/right)
        let touchStartX = 0;
        const carousel = cardElement.querySelector(".project-carousel");

        carousel.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        carousel.addEventListener("touchend", (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (diff > 40) {
                prevSlide();
            } else if (diff < -40) {
                nextSlide();
            }
            startAutoPlay();
        }, { passive: true });
    }

    // 5. Open Project Modal
    function openProjectModal(project) {
        const mediaList = project.media || [];
        const textList = project.text || [];

        // Helper to generate media HTML (Image or Video)
        function renderMediaItem(item) {
            if (!item) return '';
            if (item.type === 'video') {
                return `
                <div class="modal-media-block">
                    <video src="${item.src}" controls autoplay loop muted playsinline></video>
                </div>
            `;
            }
            return `
            <div class="modal-media-block">
                <img src="${item.src}" alt="${item.alt || ''}">
            </div>
        `;
        }

        // Helper to generate a text block
        function renderTextBlock(sec) {
            if (!sec) return '';
            return `
            <div class="modal-section">
                <h2>${sec.title || ''}</h2>
                <p>${sec.text || ''}</p>
            </div>
        `;
        }

        // 1. Top Header Table (identical to the row structure)
        const headerHtml = `
        <div class="modal-header-table">
            <h1>${project.h1 || 'Project'}</h1>
            <div class="modal-row">
                <div class="modal-when">${project.when || ''}</div>
                <div class="modal-what">${project.what || ''}</div>
                <div class="modal-detail">${project.detail || ''}</div>
            </div>
        </div>
    `;

        // 2. First image / media item
        const firstMediaHtml = mediaList.length > 0 ? renderMediaItem(mediaList[0]) : '';

        // 3. Main project description
        const descHtml = project.description ? `<div class="modal-description">${project.description}</div>` : '';

        // 4. Alternating remaining text blocks and media items
        // (Text[0] -> Media[1] -> Text[1] -> Media[2] -> ...)
        let alternatingHtml = '';
        const remainingMedia = mediaList.slice(1);
        const maxIterations = Math.max(textList.length, remainingMedia.length);

        for (let i = 0; i < maxIterations; i++) {
            if (i < textList.length) {
                alternatingHtml += renderTextBlock(textList[i]);
            }
            if (i < remainingMedia.length) {
                alternatingHtml += renderMediaItem(remainingMedia[i]);
            }
        }

        // Inject everything into modal
        modalBody.innerHTML = `
        ${headerHtml}
        ${firstMediaHtml}
        ${descHtml}
        <div class="modal-alternating-flow">
            ${alternatingHtml}
        </div>
    `;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Lock background scroll
    }

    // Close Modal
    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        modalBody.innerHTML = ""; // Free memory
    }

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});


//test

