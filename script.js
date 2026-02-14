const track = document.querySelector('.carousel-track');
let cards = document.querySelectorAll('.carousel-track .card');
const prevBtn = document.querySelector('.arrow.left');
const nextBtn = document.querySelector('.arrow.right');

const gap = 30;
let currentIndex = 1;

// Clone first and last
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

cards = document.querySelectorAll('.carousel-track .card');

function updateCarousel(animate = true) {
    const container = document.querySelector('.carousel-container');
    const containerWidth = container.offsetWidth;
    const cardWidth = cards[0].offsetWidth;

    const offset = (containerWidth / 2) - (cardWidth / 2);

    if (!animate) {
        track.style.transition = "none";
    } else {
        track.style.transition = "transform 0.6s ease";
    }

    track.style.transform =
        `translateX(${offset - (currentIndex * (cardWidth + gap))}px)`;

    cards.forEach(card => card.classList.remove('active'));
    cards[currentIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
});

track.addEventListener('transitionend', () => {
    if (currentIndex === cards.length - 1) {
        currentIndex = 1;
        updateCarousel(false);
    }

    if (currentIndex === 0) {
        currentIndex = cards.length - 2;
        updateCarousel(false);
    }
});

window.addEventListener('resize', updateCarousel);

updateCarousel();

