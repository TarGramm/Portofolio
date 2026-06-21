document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Generation Engine for Dynamic Crimson Red/Gold Particles
    const particleContainer = document.getElementById("particle-container");
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        
        const size = Math.random() * 90 + 30;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        
        particle.style.animationDuration = `${Math.random() * 18 + 12}s`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        
        particleContainer.appendChild(particle);
    }

    // 2. Navigation Mobile Overlay Switch Control
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const icon = menuToggle.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        });
    });

    // 3. Grid Categorization Filtering Engine
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            portfolioCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-cat") === filterValue) {
                    card.style.display = "flex";
                    setTimeout(() => { card.style.opacity = "1"; card.style.transform = "scale(1)"; }, 40);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.92)";
                    setTimeout(() => { card.style.display = "none"; }, 300);
                }
            });
        });
    });

    // 4. Smooth Counter Progressive Interval Engine
    const animateCounters = (element) => {
        const target = +element.getAttribute("data-target");
        let count = 0;
        const speed = target / 25; 

        const updateCount = () => {
            count += speed;
            if (count < target) {
                element.innerText = Math.floor(count) + "+";
                setTimeout(updateCount, 35);
            } else {
                element.innerText = target + "+";
            }
        };
        updateCount();
    };

    // 5. Intersection Observer API & Active Anchor Link Synchronization
    const revealElements = document.querySelectorAll("[data-reveal]");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.88;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                if (!el.classList.contains("revealed")) {
                    el.classList.add("revealed");
                    
                    // Activate Inner Elements
                    const progressBars = el.querySelectorAll(".progress");
                    progressBars.forEach(bar => {
                        bar.style.width = bar.style.getPropertyValue('--width');
                    });

                    const counters = el.querySelectorAll(".counter");
                    counters.forEach(counter => animateCounters(counter));
                }
            }
        });

        // Dynamic Navigation Tracker Logic
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Instant paint invocation lifecycle
});