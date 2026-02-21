// ==================================================
// SELECTORS (Safe for multi-page use)
// ==================================================
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.arrow.left');
const nextBtn = document.querySelector('.arrow.right');

const copyBtn = document.getElementById('copy-btn');
const upiText = document.getElementById('upi-id');
const feedback = document.getElementById('copy-feedback');

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');


// ==================================================
// CAROUSEL (Only runs if carousel exists)
// ==================================================
if (track && prevBtn && nextBtn) {

    const gap = 30;
    let cards = Array.from(document.querySelectorAll('.carousel-track .card'));
    const originalCount = cards.length;
    const cloneCount = 3;

    // ===== CLONE BUFFER =====
    for (let i = 0; i < cloneCount; i++) {
        const firstClone = cards[i].cloneNode(true);
        const lastClone = cards[originalCount - 1 - i].cloneNode(true);

        track.appendChild(firstClone);
        track.insertBefore(lastClone, track.firstChild);
    }

    cards = Array.from(track.children);

    let currentIndex = cloneCount;

    // ===== POSITIONING =====
    function updateCarousel(animate = true) {
        const container = document.querySelector('.carousel-container');
        const containerWidth = container.offsetWidth;
        const cardWidth = cards[0].offsetWidth;

        const offset = (containerWidth / 2) - (cardWidth / 2);

        track.style.transition = animate ? "transform 0.5s ease" : "none";
        track.style.transform =
            `translateX(${offset - (currentIndex * (cardWidth + gap))}px)`;

        cards.forEach(card => card.classList.remove('active'));
        if (cards[currentIndex]) {
            cards[currentIndex].classList.add('active');
        }
    }

    // ===== ARROWS =====
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    // ===== INFINITE RESET =====
    track.addEventListener('transitionend', () => {

        if (currentIndex >= originalCount + cloneCount) {
            currentIndex = cloneCount;
            updateCarousel(false);
        }

        if (currentIndex < cloneCount) {
            currentIndex = originalCount + cloneCount - 1;
            updateCarousel(false);
        }
    });

    // ===== LOAD CENTER =====
    window.addEventListener('load', () => {
        updateCarousel(false);
    });

    // ===== AUTOPLAY =====
    let autoPlay;
    const autoDelay = 4500;

    function startAutoPlay() {
        stopAutoPlay();
        autoPlay = setInterval(() => {
            currentIndex++;
            updateCarousel();
        }, autoDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlay);
    }

    startAutoPlay();

    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // ===== DRAG =====
    let isDragging = false;
    let startX = 0;

    track.addEventListener('mousedown', startDrag);
    track.addEventListener('touchstart', startDrag);

    track.addEventListener('mousemove', drag);
    track.addEventListener('touchmove', drag);

    track.addEventListener('mouseup', endDrag);
    track.addEventListener('mouseleave', endDrag);
    track.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        startX = getPositionX(e);
        stopAutoPlay();
        track.style.transition = "none";
    }

    function drag(e) {
        if (!isDragging) return;

        const currentX = getPositionX(e);
        const moveX = currentX - startX;

        const container = document.querySelector('.carousel-container');
        const containerWidth = container.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const offset = (containerWidth / 2) - (cardWidth / 2);

        track.style.transform =
            `translateX(${offset - (currentIndex * (cardWidth + gap)) + moveX}px)`;
    }

    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;

        const endX = getPositionX(e);
        const movedBy = endX - startX;

        if (movedBy < -60) currentIndex++;
        if (movedBy > 60) currentIndex--;

        updateCarousel();
        startAutoPlay();
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
}


// ==================================================
// UPI COPY BUTTON (Wishlist page only)
// ==================================================
if (copyBtn && upiText && feedback) {

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(upiText.textContent).then(() => {
            feedback.style.opacity = 1;

            setTimeout(() => {
                feedback.style.opacity = 0;
            }, 1500);
        });
    });

}


// ==================================================
// SIDEBAR (Works on ALL pages)
// ==================================================
if (menuToggle && sidebar && sidebarOverlay) {

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        }
    });

}
