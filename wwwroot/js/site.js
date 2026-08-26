document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const navigationLinks = document.querySelectorAll(
        '.main-nav a[href^="#"], ' +
        '.btn-text[href^="#"], ' +
        '.btn-primary[href^="#"], ' +
        '.nav-cta[href^="#"]'
    );

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        '.main-nav a[href^="#"]'
    );


    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".intro-content, " +
            ".about-copy, " +
            ".skill-card, " +
            ".experience-item, " +
            ".project-card, " +
            ".learning-list > div, " +
            ".contact-content, " +
            ".contact-side"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    }
    else {

        revealElements.forEach(element => {

            element.classList.add(
                "reveal-visible"
            );

        });

    }


    /* =====================================================
       PROJECT HOVER
       ===================================================== */

    const projects =
        document.querySelectorAll(".project-card");

    projects.forEach(project => {

        project.addEventListener(
            "mouseenter",
            () => {

                project.classList.add(
                    "project-hover"
                );

            }
        );


        project.addEventListener(
            "mouseleave",
            () => {

                project.classList.remove(
                    "project-hover"
                );

            }
        );

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElement =
        document.querySelector(".footer-right");

    if (yearElement) {

        yearElement.textContent =
            `© ${new Date().getFullYear()}`;

    }

});