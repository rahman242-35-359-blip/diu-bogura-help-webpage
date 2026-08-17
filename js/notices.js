document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".notice-card");
    const searchInput = document.getElementById("searchInput");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const closeModal = document.querySelector(".close-modal");

    // 1. Scroll reveal effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    // 2. Filter & Search logic
    function filterCards() {
        const query = searchInput.value.toLowerCase().trim();
        const activeCategory = document.querySelector(".filter-btn.active").getAttribute("data-category");

        cards.forEach(card => {
            const title = card.querySelector("h2").innerText.toLowerCase();
            const bodyText = card.querySelector("p").innerText.toLowerCase();
            const categoryAttr = card.getAttribute("data-category");

            const matchesSearch = title.includes(query) || bodyText.includes(query);
            const matchesCategory = activeCategory === "all" || categoryAttr === activeCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = "flex";
                setTimeout(() => card.classList.add("visible"), 50);
            } else {
                card.style.display = "none";
                card.classList.remove("visible");
            }
        });
    }

    // Filter Buttons Click Event
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterCards();
        });
    });

    // Search Input Keyup Event
    if (searchInput) {
        searchInput.addEventListener("input", filterCards);
    }

    // 3. Image Modal View (Popup)
    document.querySelectorAll(".event-image img").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
        });
    });

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});