document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader logic
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 800);
        }
    });

    // Fallback if load event already fired or fails
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && preloader.style.opacity !== '0') {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    }, 2000);

    // 2. Custom Cursor
    const cursor = document.getElementById("cursor");
    const cursorDot = document.getElementById("cursor-dot");
    const hoverTargets = document.querySelectorAll(".hover-target, a, button");

    document.addEventListener("mousemove", (e) => {
        if (cursorDot) {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        }

        if (cursor) {
            cursor.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 100, fill: "forwards" });
        }
    });

    hoverTargets.forEach(target => {
        target.addEventListener("mouseenter", () => {
            if (cursor) cursor.classList.add("hovering");
            if (cursorDot) cursorDot.classList.add("hovering");
        });
        target.addEventListener("mouseleave", () => {
            if (cursor) cursor.classList.remove("hovering");
            if (cursorDot) cursorDot.classList.remove("hovering");
        });
    });

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll(".reveal-up");

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on index if they appear together
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Work Item Image Preview
    const workItems = document.querySelectorAll(".work-item[data-preview]");
    const workPreview = document.getElementById("work-preview");
    const previewImage = document.getElementById("preview-image");

    if (workPreview && previewImage) {
        workItems.forEach(item => {
            item.addEventListener("mouseenter", (e) => {
                const imgSrc = item.getAttribute("data-preview");
                if (imgSrc) {
                    previewImage.src = imgSrc;
                    workPreview.classList.add("active");
                }
            });

            item.addEventListener("mousemove", (e) => {
                // Slight parallax follow effect for the preview box relative to center of viewport
                const x = (e.clientX / window.innerWidth - 0.5) * 50;
                const y = (e.clientY / window.innerHeight - 0.5) * 50;

                workPreview.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
            });

            item.addEventListener("mouseleave", () => {
                workPreview.classList.remove("active");
                workPreview.style.transform = `translate(-50%, -50%) scale(0.8)`;
            });
        });
    }
});
