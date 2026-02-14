const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.carousel-track .card');
const prevBtn = document.querySelector('.arrow.left');
const nextBtn = document.querySelector('.arrow.right');

let currentIndex = 0;

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 30; // 30 = gap
    track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

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

updateCarousel();
