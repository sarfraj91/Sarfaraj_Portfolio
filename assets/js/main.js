(function attachPortfolioSiteInit(global) {
    function toggleMenu(show) {
        var navMenu = document.getElementById("nav-menu");

        if (!navMenu) {
            return;
        }

        navMenu.classList.toggle("show-menu", show);
    }

    function initMenu() {
        var navToggle = document.getElementById("nav-toggle");
        var navClose = document.getElementById("nav-close");
        var navLinks = document.querySelectorAll(".nav__link");

        if (navToggle) {
            navToggle.addEventListener("click", function () {
                toggleMenu(true);
            });
        }

        if (navClose) {
            navClose.addEventListener("click", function () {
                toggleMenu(false);
            });
        }

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                toggleMenu(false);
            });
        });
    }

    function initSkillsAccordion() {
        var skillSections = document.querySelectorAll(".skills__content");

        skillSections.forEach(function (section) {
            var header = section.querySelector(".skills__header");

            if (!header) {
                return;
            }

            header.addEventListener("click", function () {
                var isOpen = section.classList.contains("skills__open");

                skillSections.forEach(function (item) {
                    item.classList.remove("skills__open");
                    item.classList.add("skills__close");
                    var toggle = item.querySelector(".skills__toggle");
                    if (toggle) {
                        toggle.textContent = "Open";
                    }
                });

                if (!isOpen) {
                    section.classList.remove("skills__close");
                    section.classList.add("skills__open");
                    var sectionToggle = section.querySelector(".skills__toggle");
                    if (sectionToggle) {
                        sectionToggle.textContent = "Close";
                    }
                }
            });
        });
    }

    function initQualificationTabs() {
        var tabs = document.querySelectorAll("[data-target]");
        var tabContents = document.querySelectorAll("[data-content]");

        tabs.forEach(function (tab) {
            tab.addEventListener("click", function () {
                var target = document.querySelector(tab.dataset.target);

                tabContents.forEach(function (content) {
                    content.classList.remove("qualification__active");
                });

                tabs.forEach(function (item) {
                    item.classList.remove("qualification__active");
                });

                if (target) {
                    target.classList.add("qualification__active");
                }

                tab.classList.add("qualification__active");
            });
        });
    }

    function initServiceModals() {
        var modalButtons = document.querySelectorAll(".services__button");
        var modals = document.querySelectorAll(".services__modal");
        var closeButtons = document.querySelectorAll(".services__modal-close");

        modalButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var modalIndex = Number(button.dataset.modal);
                var targetModal = modals[modalIndex];

                if (targetModal) {
                    targetModal.classList.add("active-modal");
                }
            });
        });

        closeButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var modal = button.closest(".services__modal");
                if (modal) {
                    modal.classList.remove("active-modal");
                }
            });
        });

        modals.forEach(function (modal) {
            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    modal.classList.remove("active-modal");
                }
            });
        });
    }

    function initSwipers() {
        if (typeof global.Swiper !== "function") {
            return;
        }

        if (document.querySelector(".portfolio__container")) {
            new global.Swiper(".portfolio__container", {
                cssMode: false,
                loop: true,
                grabCursor: true,
                spaceBetween: 24,
                autoplay: {
                    delay: 3200,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: ".portfolio__button-next",
                    prevEl: ".portfolio__button-prev"
                },
                pagination: {
                    el: ".portfolio .swiper-pagination",
                    clickable: true
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 1
                    }
                }
            });
        }

        if (document.querySelector(".testimonial__container")) {
            new global.Swiper(".testimonial__container", {
                loop: true,
                grabCursor: true,
                spaceBetween: 24,
                autoplay: {
                    delay: 3600,
                    disableOnInteraction: false
                },
                pagination: {
                    el: ".testimonial__pagination",
                    clickable: true
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    }
                }
            });
        }
    }

    function initRevealAnimations() {
        var revealElements = document.querySelectorAll(
            ".section__subtitle, .section__title, .home__social a, .home__visual, .home__data, .about__image-wrap, .about__data, .skills__content, .qualification__item, .services__card, .portfolio__content, .project__data, .project__image-wrap, .testimonial__card, .contact__card, .contact__form, .footer__container"
        );

        revealElements.forEach(function (element, index) {
            if (!element.classList.contains("reveal")) {
                element.classList.add("reveal");
            }

            element.style.setProperty("--reveal-delay", String((index % 6) * 0.08) + "s");
        });

        if (!("IntersectionObserver" in global)) {
            revealElements.forEach(function (element) {
                element.classList.add("is-visible");
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    }

    function updateActiveLink() {
        var scrollY = global.pageYOffset;
        var sections = document.querySelectorAll("section[id]");

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 120;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute("id");
            var navLink = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');

            if (!navLink) {
                return;
            }

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active-link");
            } else {
                navLink.classList.remove("active-link");
            }
        });
    }

    function updateHeaderBackground() {
        var header = document.getElementById("header");

        if (!header) {
            return;
        }

        header.classList.toggle("scroll-header", global.scrollY >= 40);
    }

    function updateScrollUp() {
        var scrollUp = document.getElementById("scroll-up");

        if (!scrollUp) {
            return;
        }

        scrollUp.classList.toggle("show-scroll", global.scrollY >= 420);
    }

    function setThemeLabel(isDark) {
        var themeButton = document.getElementById("theme-button");

        if (themeButton) {
            themeButton.textContent = isDark ? "Light mode" : "Dark mode";
        }
    }

    function initTheme() {
        var themeButton = document.getElementById("theme-button");
        var darkTheme = "dark-theme";
        var selectedTheme = localStorage.getItem("selected-theme");

        if (selectedTheme === "dark") {
            document.body.classList.add(darkTheme);
        }

        setThemeLabel(document.body.classList.contains(darkTheme));

        if (!themeButton) {
            return;
        }

        themeButton.addEventListener("click", function () {
            document.body.classList.toggle(darkTheme);
            var isDark = document.body.classList.contains(darkTheme);

            localStorage.setItem("selected-theme", isDark ? "dark" : "light");
            setThemeLabel(isDark);
        });
    }

    function initScrollHandlers() {
        var runScrollUi = function () {
            updateActiveLink();
            updateHeaderBackground();
            updateScrollUp();
        };

        global.addEventListener("scroll", runScrollUi);
        runScrollUi();
    }

    function initPortfolioSite() {
        if (document.body.dataset.portfolioInitialized === "true") {
            return;
        }

        document.body.dataset.portfolioInitialized = "true";

        initMenu();
        initSkillsAccordion();
        initQualificationTabs();
        initServiceModals();
        initSwipers();
        initTheme();
        initRevealAnimations();
        initScrollHandlers();
    }

    global.initPortfolioSite = initPortfolioSite;
})(window);
