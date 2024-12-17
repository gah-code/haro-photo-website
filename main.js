document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.scroll-reveal');

  // Function to initialize Intersection Observer with optional delay
  const createObserver = (elements, delay = false) => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Apply delay for cards if needed
            if (delay) {
              entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
            // Add the animation class dynamically
            entry.target.classList.add('animated');
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    elements.forEach((el) => observer.observe(el));
  };

  // Initialize observers
  createObserver(sections, true); // Cards or elements with delay
});

document.addEventListener('DOMContentLoaded', () => {
  // Define A/B Test Conditions
  const timeCondition = checkTimeCondition(); // e.g., before or after 12 PM
  const locationCondition = 'unknown';

  // Geolocation Check
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const userLocation = getLocationName(latitude, longitude);

      // Apply A/B Test Logic Based on Time and Location
      applyABTest(timeCondition, userLocation);
    },
    () => {
      console.log(
        'Geolocation not available or denied. Serving default content.'
      );
      applyABTest(timeCondition, locationCondition);
    }
  );

  // Function to Check Time-Based Condition
  function checkTimeCondition() {
    const currentHour = new Date().getHours();
    return currentHour < 12 ? 'morning' : 'afternoon';
  }

  // Mock Function to Get Location Name (Simplified for Example)
  function getLocationName(lat, lon) {
    // Normally use a reverse geocoding API (like OpenCage or Google Maps)
    if (lat > 36 && lon < -120) return 'California';
    return 'Other';
  }

  // Apply A/B Test Content
  function applyABTest(time, location) {
    const testContainer = document.querySelector('#ab-test-section');
    if (!testContainer) return;

    let contentA = `
      <div class="ab-content-a">
        <h2>Morning Special</h2>
        <p>Book your session early and save 10%!</p>
      </div>
    `;

    let contentB = `
      <div class="ab-content-b">
        <h2>Afternoon Exclusive</h2>
        <p>Enjoy a serene sunset session with us.</p>
      </div>
    `;

    let locationContent = `
      <div class="ab-content-location">
        <h2>Exclusive for ${location}</h2>
        <p>Capture your family memories in ${location}!</p>
      </div>
    `;

    // Serve content based on conditions
    if (location === 'California') {
      testContainer.innerHTML = locationContent;
    } else if (time === 'morning') {
      testContainer.innerHTML = contentA;
    } else {
      testContainer.innerHTML = contentB;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const aboutTitle = document.getElementById('about-title');
  const aboutDescription = document.getElementById('about-description');
  const ctaButton = document.getElementById('cta-button');
  const aboutImage = document.getElementById('about-image');

  // Determine the current hour
  const currentHour = new Date().getHours();

  // Content variations based on time of day
  if (currentHour >= 5 && currentHour < 12) {
    // Morning content
    aboutTitle.textContent = 'Good Morning! Start Your Day with a Smile';
    aboutDescription.textContent =
      'Capture precious moments with a morning family session. The light is perfect, and smiles are brightest in the morning!';
    ctaButton.textContent = 'Book a Morning Session';
    // aboutImage.src = '/morning-session.png'; // Update image dynamically
    aboutImage.src = '/hero.png';
    aboutImage.alt = 'Morning family photography session';
  } else if (currentHour >= 12 && currentHour < 18) {
    // Afternoon content
    aboutTitle.textContent = 'Good Afternoon! Make Memories Last Forever';
    aboutDescription.textContent =
      "Afternoon light offers a beautiful backdrop for your family's portraits. Let us capture your afternoon joy!";
    ctaButton.textContent = 'Book an Afternoon Session';
    // aboutImage.src = '/afternoon-session.png';
    aboutImage.src = '/hero.png';

    aboutImage.alt = 'Afternoon family photography session';
  } else {
    // Evening content
    aboutTitle.textContent = 'Good Evening! Preserve the Golden Hour';
    aboutDescription.textContent =
      'The golden hour provides a magical setting for your family photos. Schedule an evening session now!';
    ctaButton.textContent = 'Book an Evening Session';
    aboutImage.src = '/evening-session.png';
    aboutImage.alt = 'Evening golden hour family session';
  }
});
