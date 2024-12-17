document.addEventListener('DOMContentLoaded', () => {
  // Initialize all functionalities
  initializeScrollReveal();
  initializeABTesting();
  personalizeAboutSection();
});

/* ---------------------------------------------
 * 1. SCROLL REVEAL ANIMATIONS
 * ------------------------------------------- */
function initializeScrollReveal() {
  const sections = document.querySelectorAll('.scroll-reveal');

  const createObserver = (elements, delay = false) => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            if (delay) {
              entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  };

  createObserver(sections, true);
}

/* ---------------------------------------------
 * 2. A/B TESTING LOGIC (TIME & LOCATION BASED)
 * ------------------------------------------- */
function initializeABTesting() {
  const timeCondition = checkTimeCondition(); // Determine time
  const locationCondition = 'unknown';

  // Check user location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const userLocation = getLocationName(latitude, longitude);
      applyABTest(timeCondition, userLocation);
    },
    () => {
      console.log('Geolocation not available. Serving default content.');
      applyABTest(timeCondition, locationCondition);
    }
  );

  function checkTimeCondition() {
    const currentHour = new Date().getHours();
    return currentHour < 12 ? 'morning' : 'afternoon';
  }

  function getLocationName(lat, lon) {
    // Mocked location logic
    if (lat > 36 && lon < -120) return 'California';
    return 'Other';
  }

  function applyABTest(time, location) {
    const testContainer = document.querySelector('#ab-test-section');
    if (!testContainer) return;

    const contentA = `
      <div class="ab-content-a">
        <h2>Morning Special</h2>
        <p>Book your session early and save 10%!</p>
      </div>
    `;
    const contentB = `
      <div class="ab-content-b">
        <h2>Afternoon Exclusive</h2>
        <p>Enjoy a serene sunset session with us.</p>
      </div>
    `;
    const locationContent = `
      <div class="ab-content-location">
        <h2>Exclusive for ${location}</h2>
        <p>Capture your family memories in ${location}!</p>
      </div>
    `;

    if (location === 'California') {
      testContainer.innerHTML = locationContent;
    } else if (time === 'morning') {
      testContainer.innerHTML = contentA;
    } else {
      testContainer.innerHTML = contentB;
    }
  }
}

/* ---------------------------------------------
 * 3. PERSONALIZE "ABOUT" SECTION BASED ON TIME
 * ------------------------------------------- */
function personalizeAboutSection() {
  const aboutTitle = document.getElementById('about-title');
  const aboutDescription = document.getElementById('about-description');
  const ctaButton = document.getElementById('cta-button');
  const aboutImage = document.getElementById('about-image');

  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    updateAboutSection(
      'Good Morning! Start Your Day with a Smile',
      'Capture precious moments with a morning family session. The light is perfect, and smiles are brightest in the morning!',
      'Book a Morning Session',
      '/hero.png',
      'Morning family photography session'
    );
  } else if (currentHour >= 12 && currentHour < 18) {
    updateAboutSection(
      'Good Afternoon! Make Memories Last Forever',
      "Afternoon light offers a beautiful backdrop for your family's portraits. Let us capture your afternoon joy!",
      'Book an Afternoon Session',
      '/hero.png',
      'Afternoon family photography session'
    );
  } else {
    updateAboutSection(
      'Good Evening! Preserve the Golden Hour',
      'The golden hour provides a magical setting for your family photos. Schedule an evening session now!',
      'Book an Evening Session',
      '/hero.png',
      'Evening golden hour family session'
    );
  }

  function updateAboutSection(title, description, ctaText, imageSrc, imageAlt) {
    aboutTitle.textContent = title;
    aboutDescription.textContent = description;
    ctaButton.textContent = ctaText;
    aboutImage.src = imageSrc;
    aboutImage.alt = imageAlt;
  }
}
