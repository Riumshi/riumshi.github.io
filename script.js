const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.carousel-track .card');
const prevBtn = document.querySelector('.arrow.left');
const nextBtn = document.querySelector('.arrow.right');

let currentIndex = 0;

function updateCarousel() {
    const container = document.querySelector('.carousel-container');
    const containerWidth = container.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const gap = 30; // must match CSS gap

    // Calculate how much space to center the active card
    const offset = (containerWidth / 2) - (cardWidth / 2);

    track.style.transform =
        `translateX(${offset - (currentIndex * (cardWidth + gap))}px)`;

    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentIndex) {
            card.classList.add('active');
        }
    });
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Recalculate when window resizes
window.addEventListener('resize', updateCarousel);

updateCarousel();
