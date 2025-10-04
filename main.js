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
  interval: 100,
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

document.querySelectorAll('.hostel-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('expanded');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('expanded');
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".bg-photo-section h2");
  const paragraphs = document.querySelectorAll(".bg-photo-section p");

  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  headings.forEach(el => observer.observe(el));
  paragraphs.forEach(el => observer.observe(el));
});

// Initialize Google map (replace with actual API call & key)
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -1.2692, lng: 36.8148 }, // Coordinates near Westlands Nairobi
    zoom: 15,
    styles: [
      {
        "featureType": "water",
        "stylers": [{ "color": "#245401" }]
      },
      {
        "featureType": "landscape",
        "stylers": [{ "color": "#f6ac0f" }]
      },
      {
        "featureType": "road",
        "stylers": [{ "color": "#357d01" }]
      }
    ],
  });
}
