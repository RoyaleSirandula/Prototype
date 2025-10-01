const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const headerH1 = document.getElementById('highlightText');

headerH1.style.setProperty('--mouse-x', '100%');
headerH1.style.setProperty('--mouse-y', '100%');

headerH1.addEventListener('mousemove', (e) => {
  const rect = headerH1.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  headerH1.style.setProperty('--mouse-x', `${x}px`);
  headerH1.style.setProperty('--mouse-y', `${y}px`);
});

const slides = document.querySelectorAll('.feature__slide');
    const slidesContainer = document.querySelector('.feature__slides');
    const dotsContainer = document.querySelector('.feature__dots');
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoplayInterval;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('feature__dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.feature__dot');

    function goToSlide(index) {
      currentIndex = index;
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
      resetAutoplay();
    }

    function updateDots() {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      goToSlide(currentIndex);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 10000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    startAutoplay();

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container .section__subheader", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__container .btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// room container
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  interval: 500,
});

// feature container
ScrollReveal().reveal(".feature__card", {
  ...scrollRevealOption,
  interval: 500,
});

// news container
ScrollReveal().reveal(".news__card", {
  ...scrollRevealOption,
  interval: 500,
});

document.addEventListener('DOMContentLoaded', () => {
  const roomCards = document.querySelectorAll('.room__card');

  roomCards.forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      const roomId = card.getAttribute('data-room-id');
      if (roomId) {
        window.location.href = `room-details.html?id=${encodeURIComponent(roomId)}`;
      }
    });

    // For keyboard accessibility (Enter or Space key)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
});
