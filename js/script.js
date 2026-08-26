document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       1. Hamburger Menu
    ------------------------------*/
    const menuBtn = document.querySelector(".menu-btn");
    const navbar = document.querySelector(".navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
            menuBtn.classList.toggle("open");
        });

        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuBtn.classList.remove("open");
            });
        });
    }



    /* -----------------------------
       3. Scroll Progress Bar
    ------------------------------*/
    const progressBar = document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {
        const scroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percent = (scroll / height) * 100;

        if (progressBar) {
            progressBar.style.width = percent + "%";
        }
    });

    /* -----------------------------
       4. Back To Top
    ------------------------------*/
    const backBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (!backBtn) return;
        if (window.scrollY > 400) {
            backBtn.style.opacity = "1";
            backBtn.style.visibility = "visible";
        } else {
            backBtn.style.opacity = "0";
            backBtn.style.visibility = "hidden";
        }
    });

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* -----------------------------
       5. Sticky Header Shadow
    ------------------------------*/
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* -----------------------------
       6. Counter Animation
    ------------------------------*/
    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let count = 0;
            const speed = target / 120;

            const update = () => {
                count += speed;
                if (count < target) {
                    counter.textContent = Math.floor(count);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + "+";
                }
            };

            update();
            counterObserver.unobserve(counter);
        });
    }, { threshold: 0.4 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* -----------------------------
       7. Typing Effect
    ------------------------------*/
    const typing = document.getElementById("typing-text");

    if (typing) {
        const words = [
            "DCA",
            "PGDCA",
            "AI Tools",
            "Advanced Excel",
            "Web Development",
            "Graphic Design"
        ];

        let word = 0;
        let char = 0;
        let deleting = false;

        function type() {
            const current = words[word];
            typing.textContent = current.substring(0, char);

            if (!deleting) {
                char++;
                if (char > current.length) {
                    deleting = true;
                    setTimeout(type, 1200);
                    return;
                }
            } else {
                char--;
                if (char === 0) {
                    deleting = false;
                    word = (word + 1) % words.length;
                }
            }

            setTimeout(type, deleting ? 60 : 100);
        }

        type();
    }

    /* -----------------------------
       8. FAQ Accordion (Universal)
    ------------------------------*/
    /* -----------------------------
    8. FAQ Accordion (Universal)
 ------------------------------*/
    document.addEventListener("DOMContentLoaded", () => {
        const faqQuestions = document.querySelectorAll(".faq-question");

        faqQuestions.forEach(question => {
            question.addEventListener("click", () => {
                const item = question.closest(".faq-item");
                const answer = item.querySelector(".faq-answer");
                const isOpen = item.classList.contains("open");

                // Dusre sabhi open FAQs ko close karein (Single open accordion behavior)
                document.querySelectorAll(".faq-item.open").forEach(openFaq => {
                    if (openFaq !== item) {
                        openFaq.classList.remove("open");
                        const openAnswer = openFaq.querySelector(".faq-answer");
                        if (openAnswer) openAnswer.style.maxHeight = null;
                    }
                });

                // Clicked item ko toggle karein
                if (!isOpen) {
                    item.classList.add("open");
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    item.classList.remove("open");
                    answer.style.maxHeight = null;
                }
            });
        });
    });
});