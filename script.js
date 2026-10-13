const navbar = document.getElementById("navbar");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const changingWord = document.getElementById("changingWord");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < 30) {
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

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeIcon.textContent = "☀";
    } else {
        themeIcon.textContent = "☾";
    }

});

const words = [
    "data visualisation",
    "motion graphics",
    "visual journalism",
    "editorial design",
    "visual storytelling",
    "creative research"

];

const typingSpeed = 75;      // milliseconds per character
const deletingSpeed = 45;    // milliseconds per character
const pauseAfterTyping = 1800;
const pauseAfterDeleting = 400;

function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
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

async function typingLoop() {
    let currentWordIndex = 0;
    while (true) {
        const currentWord = words[currentWordIndex];
        await typeWord(currentWord);
        await wait(pauseAfterTyping);
        await deleteWord(currentWord);
        await wait(pauseAfterDeleting);
        currentWordIndex =
            (currentWordIndex + 1) % words.length;
    }
}
typingLoop();

// load more

const loadMoreButton = document.getElementById("loadMore");
const hiddenProjects = document.querySelectorAll(".hidden-project");

const projectsPerLoad = 9;
let visibleProjects = 9;

loadMoreButton.addEventListener("click", () => {
    const nextProjects = Array.from(hiddenProjects).slice(
        visibleProjects - 9,
        visibleProjects
    );

    nextProjects.forEach(project => {
        project.style.display = "block";
    });

    visibleProjects += projectsPerLoad;

    if (visibleProjects >= document.querySelectorAll(".project-card").length) {
        loadMoreButton.style.display = "none";
    }
});

// card animation
const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const cards = Array.from(
                    projectGrid.querySelectorAll(".project-card")
                );

                const index = cards.indexOf(card);

                card.style.transitionDelay =
                    `${(index % 3) * 220}ms`;

                card.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

projectCards.forEach((card) => {
    projectObserver.observe(card);
});



const aboutHero = document.querySelector(".about-hero");
const aboutText = document.getElementById("aboutText");

const aboutLines = [
    "from passion",
    "to profession"
];

let aboutAnimationId = 0;

function aboutWait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playAboutTypewriter() {
    const animationId = ++aboutAnimationId;

    aboutText.textContent = "";

    // Type the first line
    for (let i = 0; i < aboutLines[0].length; i++) {
        if (animationId !== aboutAnimationId) return;

        aboutText.textContent = aboutLines[0].slice(0, i + 1);
        await aboutWait(75);
    }

    if (animationId !== aboutAnimationId) return;

    // Create a real line break and a second text node
    const firstLine = document.createTextNode(aboutLines[0]);
    const lineBreak = document.createElement("br");
    const secondLine = document.createTextNode("");

    aboutText.replaceChildren(firstLine, lineBreak, secondLine);

    await aboutWait(300);

    // Type the second line
    for (let i = 0; i < aboutLines[1].length; i++) {
        if (animationId !== aboutAnimationId) return;

        secondLine.textContent = aboutLines[1].slice(0, i + 1);
        await aboutWait(75);
    }
}

if (aboutHero && aboutText) {
    const aboutObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    playAboutTypewriter();
                } else {
                    // Cancel any animation currently running
                    aboutAnimationId++;
                    aboutText.textContent = "";
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    aboutObserver.observe(aboutHero);
}


document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("projectGrid");
    const loadMoreButton = document.getElementById("loadMore");

    const modal = document.getElementById("projectModal");
    const closeButton = document.getElementById("modalClose");
    const prevButton = document.getElementById("modalPrev");
    const nextButton = document.getElementById("modalNext");

    const titleElement = document.getElementById("modalTitle");
    const categoryElement = document.getElementById("modalCategory");

    const counterElement = document.getElementById("modalCounter");
    const gallery = document.getElementById("modalGallery");
    const descriptionElement =
        document.getElementById("modalDescription");

    if (!grid || !modal) return;

    const INITIAL_PROJECTS = 9;

    let projects = [];
    let currentIndex = 0;
    let previouslyFocused = null;
    let previousBodyOverflow = "";

    // ----------------------------------------
    // LOAD PROJECT DATA
    // ----------------------------------------

    try {
        const response = await fetch("projects.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        projects = await response.json();

        if (!Array.isArray(projects)) {
            throw new Error("projects.json must contain an array.");
        }

        renderProjects();
    } catch (error) {
        console.error("Could not load projects:", error);

        grid.textContent =
            "Projects could not be loaded. Please try again later.";
    }

    // ----------------------------------------
    // GENERATE PROJECT CARDS
    // ----------------------------------------

    function renderProjects() {
        grid.replaceChildren();

        projects.forEach((project, index) => {
            const card = document.createElement("article");

            card.className = "project-card";
            card.dataset.project = index;
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute(
                "aria-label",
                `View ${project.title}`
            );


            const imageContainer = document.createElement("div");
            imageContainer.className = "project-image";

            const image = document.createElement("img");
            image.src = project.cover;
            image.alt = project.alt || project.title;
            image.loading = index < INITIAL_PROJECTS ? "eager" : "lazy";
            image.decoding = "async";

            const overlay = document.createElement("div");
            overlay.className = "project-overlay";

            const info = document.createElement("div");
            info.className = "project-info";

            const title = document.createElement("h3");
            title.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description || "";

            const viewLabel = document.createElement("span");
            viewLabel.className = "project-view";
            // viewLabel.textContent = "VIEW PROJECT ↗";

            info.append(title, description, viewLabel);
            overlay.appendChild(info);
            imageContainer.append(image, overlay);
            card.appendChild(imageContainer);
            grid.appendChild(card);

        });

        updateLoadMoreButton();
    }

    function updateLoadMoreButton() {
        if (!loadMoreButton) return;

        const hasMore = grid.querySelector(".hidden-project");

        loadMoreButton.hidden = !hasMore;
    }

    // ----------------------------------------
    // SEE MORE
    // ----------------------------------------

    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", () => {
            const hiddenCards = grid.querySelectorAll(
                ".project-card.hidden-project"
            );

            hiddenCards.forEach((card, index) => {
                card.classList.remove("hidden-project");

                // Ensure the browser registers the initial state.
                requestAnimationFrame(() => {
                    card.classList.add("visible");
                });
            });

            updateLoadMoreButton();
        });
    }

    // ----------------------------------------
    // OPEN PROJECT MODAL
    // ----------------------------------------



    function openProject(index, shouldFocus = true) {
        const project = projects[index];

        if (!project) return;

        currentIndex = index;

        if (!modal.classList.contains("is-open")) {
            previouslyFocused = document.activeElement;
            previousBodyOverflow = document.body.style.overflow;
        }

        titleElement.textContent = project.title || "";


        const headingMeta = document.getElementById("modalHeadingMeta");

        if (headingMeta) {
            headingMeta.replaceChildren();

            const metaItems = [project.client, project.category].filter(Boolean);

            metaItems.forEach((value, index) => {
                if (index > 0) {
                    const separator = document.createElement("span");
                    separator.className = "modal-meta-separator";
                    separator.textContent = "☼";
                    headingMeta.appendChild(separator);
                }

                const item = document.createElement("span");
                item.textContent = value;
                headingMeta.appendChild(item);
            });
        }

        const descriptionElement = document.getElementById("modalDescription");

        if (descriptionElement) {
            descriptionElement.textContent = project.description || "";
            descriptionElement.hidden = !project.description;
        }


        // Build the new project content.
        gallery.replaceChildren();

        // New format: media objects.
        // Legacy format: images array of strings.
        let mediaItems;

        if (Array.isArray(project.media)) {
            mediaItems = project.media;
        } else if (Array.isArray(project.images)) {
            mediaItems = project.images.map((src, i) => ({
                type: "image",
                src,
                alt: i === 0
                    ? (project.alt || project.title)
                    : `${project.title} — image ${i + 1}`
            }));
        } else {
            mediaItems = project.cover
                ? [{
                    type: "image",
                    src: project.cover,
                    alt: project.alt || project.title
                }]
                : [];
        }

        function createMedia(item, index) {
            let element;


            if (item.type === "video") {
                element = document.createElement("video");

                element.autoplay = true;
                element.loop = true;
                element.muted = true;
                element.playsInline = true;
                element.controls = false;
                element.preload = "auto";

                if (item.poster) {
                    element.poster = item.poster;
                }


                const source = document.createElement("source");
                source.src = item.src;
                source.type = "video/mp4";
                element.appendChild(source);
            } else {
                element = document.createElement("img");
                element.src = item.src;
                element.alt = item.alt ||
                    `${project.title} — image ${index + 1}`;
                element.loading = index === 0 ? "eager" : "lazy";
                element.decoding = "async";
            }

            element.classList.add("project-media");

            element.addEventListener("error", () => {
                const wrapper = element.closest(".project-media-item");
                if (wrapper) wrapper.remove();
            }, { once: true });

            return element;
        }

        function createMediaItem(item, index) {
            const wrapper = document.createElement("div");
            wrapper.className = "project-media-item";

            wrapper.appendChild(createMedia(item, index));

            if (item.description) {
                const paragraph = document.createElement("p");
                paragraph.className = "project-media-description";
                paragraph.textContent = item.description;
                wrapper.appendChild(paragraph);
            }

            return wrapper;
        }

        const hero = document.getElementById("modalHero");
        hero.replaceChildren();
        gallery.replaceChildren();

        if (mediaItems.length > 0) {
            // First media item becomes the large opening visual.
            hero.appendChild(createMedia(mediaItems[0], 0));

            // Any description for the hero sits directly beneath it.
            if (mediaItems[0].description) {
                const paragraph = document.createElement("p");
                paragraph.className = "project-media-description";
                paragraph.textContent = mediaItems[0].description;
                hero.appendChild(paragraph);
            }

            // Remaining media items appear in the narrower centered column.
            mediaItems.slice(1).forEach((item, i) => {
                gallery.appendChild(createMediaItem(item, i + 1));
            });
        }

        // Open modal.
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        const content = modal.querySelector(".modal-content");
        if (content) content.scrollTop = 0;

        if (shouldFocus) {
            closeButton.focus();
        }
    }


    // ----------------------------------------
    // CLOSE PROJECT MODAL
    // ----------------------------------------

    function closeProject() {
        if (!modal.classList.contains("is-open")) return;

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = previousBodyOverflow;

        if (previouslyFocused?.isConnected) {
            previouslyFocused.focus();
        }
    }

    // ----------------------------------------
    // CARD INTERACTIONS
    // ----------------------------------------

    grid.addEventListener("click", (event) => {
        const card = event.target.closest(".project-card");

        if (!card || !grid.contains(card)) return;

        openProject(Number(card.dataset.project));
    });

    grid.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;

        const card = event.target.closest(".project-card");

        if (!card || !grid.contains(card)) return;

        event.preventDefault();
        openProject(Number(card.dataset.project));
    });

    // ----------------------------------------
    // MODAL INTERACTIONS
    // ----------------------------------------

    closeButton.addEventListener("click", closeProject);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeProject();
        }
    });


    prevButton.addEventListener("click", () => {
        if (!projects.length) return;

        const previousIndex =
            (currentIndex - 1 + projects.length) % projects.length;

        openProject(previousIndex, false);
    });

    nextButton.addEventListener("click", () => {
        if (!projects.length) return;

        const nextIndex =
            (currentIndex + 1) % projects.length;

        openProject(nextIndex, false);
    });

    document.addEventListener("keydown", (event) => {
        if (!modal.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeProject();
        }

        if (event.key === "ArrowLeft") {
            prevButton.click();
        }

        if (event.key === "ArrowRight") {
            nextButton.click();
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const heroTitle = document.querySelector(".hero-title");
    const projectGrid = document.querySelector("#projectGrid");

    // ----------------------------------------
    // HERO FADE
    // ----------------------------------------

    // Adjust these values to control the fade.
    const heroFadeDistance = 0.75; // viewport heights
    const heroFadeLift = 25;       // pixels

    let ticking = false;

    function updateHeroFade() {
        if (!hero || !heroTitle) return;

        const distance =
            window.innerHeight * heroFadeDistance;

        const progress = Math.min(
            Math.max(window.scrollY / distance, 0),
            1
        );

        heroTitle.style.opacity = 1 - progress;

        heroTitle.style.transform =
            `translateY(${-progress * heroFadeLift}px)`;

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (ticking) return;

        ticking = true;
        requestAnimationFrame(updateHeroFade);
    }, { passive: true });

    window.addEventListener("resize", updateHeroFade);

    updateHeroFade();

    // ----------------------------------------
    // PROJECT CARD REVEAL
    // ----------------------------------------

    if (!projectGrid) return;

    const rootStyles = getComputedStyle(document.documentElement);

    const stagger = 320;


    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const card = entry.target;

                if (entry.isIntersecting) {
                    // Pop into view
                    card.classList.add("visible");
                } else {
                    // Reset when scrolling away
                    card.classList.remove("visible");
                    card.style.transitionDelay = "0ms";
                }
            });
        },

        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    function observeCards() {
        projectGrid
            .querySelectorAll(".project-card:not([data-reveal-observed])")
            .forEach((card) => {
                card.dataset.revealObserved = "true";
                cardObserver.observe(card);
            });
    }

    observeCards();

    const mutationObserver = new MutationObserver(observeCards);

    mutationObserver.observe(projectGrid, {
        childList: true,
        subtree: true
    });
});
