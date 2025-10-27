// GitHub Copilot

// Toggle mobile menu button and icon
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  // open/close nav and swap the icon class
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

// Close nav when a link inside nav is clicked (mobile behavior)
navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Highlight effect on header H1 that follows the mouse via CSS variables
const headerH1 = document.getElementById('highlightText');

// Initialize CSS vars to a safe default
headerH1.style.setProperty('--mouse-x', '100%');
headerH1.style.setProperty('--mouse-y', '100%');

headerH1.addEventListener('mousemove', (e) => {
  // Calculate mouse position relative to element and set CSS vars
  const rect = headerH1.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  headerH1.style.setProperty('--mouse-x', `${x}px`);
  headerH1.style.setProperty('--mouse-y', `${y}px`);
});


// Feature slides (carousel) with dots and autoplay
const slides = document.querySelectorAll('.feature__slide');
const slidesContainer = document.querySelector('.feature__slides');
const dotsContainer = document.querySelector('.feature__dots');
let currentIndex = 0;
const slideCount = slides.length;
let autoplayInterval;

// Create dot controls dynamically and wire click handlers
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('feature__dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.feature__dot');

function goToSlide(index) {
  // Move slides container to show the requested slide
  currentIndex = index;
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
  resetAutoplay();
}

function updateDots() {
  // Update active state on dots
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function nextSlide() {
  // Advance to next slide (wrap around)
  currentIndex = (currentIndex + 1) % slideCount;
  goToSlide(currentIndex);
}

function startAutoplay() {
  // Start automatic slide advance every 10s
  autoplayInterval = setInterval(nextSlide, 10000);
}

function resetAutoplay() {
  // Restart autoplay (useful after manual navigation)
  clearInterval(autoplayInterval);
  startAutoplay();
}

startAutoplay();


// ScrollReveal configuration and usage for entrance animations
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// Reveal header container elements
ScrollReveal().reveal(".header__container .section__subheader", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".about-label", {
  ...scrollRevealOption,
  delay: 200,
  viewFactor: 0.01, // start when a tiny portion enters viewport
  mobile: true,
  reset: false,
});

ScrollReveal().reveal(".about-summary", {
  ...scrollRevealOption,
  delay: 400,
  viewFactor: 0.01,
  mobile: true,
  reset: false,
});

ScrollReveal().reveal(".about-stats", {
  ...scrollRevealOption,
  delay: 600,
  viewFactor: 0.01,
  mobile: true,
  reset: false,
});

ScrollReveal().reveal(".header__container .btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// Reveal lists of cards with an interval between each
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".feature__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".news__card", {
  ...scrollRevealOption,
  interval: 100,
});


// Make room cards clickable and keyboard-accessible
document.addEventListener('DOMContentLoaded', () => {
  const roomCards = document.querySelectorAll('.room__card');

  roomCards.forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      // Read data-room-id and navigate to details page
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

// Expand hostel cards on hover
document.querySelectorAll('.hostel-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('expanded');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('expanded');
  });
});

// IntersectionObserver to animate headings/paragraphs in .bg-photo-section as they enter viewport
document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".bg-photo-section h2");
  const paragraphs = document.querySelectorAll(".bg-photo-section p");

  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class and stop observing that element
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  headings.forEach(el => observer.observe(el));
  paragraphs.forEach(el => observer.observe(el));
});

// Initialize Google map (replace with actual API call & key)
// This function is intended to be used as the callback for the Google Maps API script
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

// Intersection Observer to fade in overlay text on scroll into view for the intro section
const introSection = document.getElementById('introSection');
const overlay = document.getElementById('overlayContent');
const video = document.getElementById('introVideo');
const toggleBtn = document.getElementById('toggleBtn');

const options = {
  root: null,
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // When intro section is at least 50% visible, show overlay text
      introSection.classList.add('show');
    } else {
      // If not intersecting and video isn't active, hide overlay
      if(!introSection.classList.contains('video-active')) {
        introSection.classList.remove('show');
      }
    }
  });
}, options);

observer.observe(introSection);

let playing = false;

// Toggle play/pause of intro video and adjust overlay classes
toggleBtn.addEventListener('click', () => {
  if (!playing) {
    introSection.classList.add('video-active');
    introSection.classList.remove('show');
    video.play();
    playing = true;
  } else {
    video.pause();
    introSection.classList.remove('video-active');
    introSection.classList.add('show');
    playing = false;
  }
});

// Ensure video starts paused and possibly blurred/overlaid
video.pause(); // Start paused and blurred
