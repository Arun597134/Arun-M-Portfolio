/* YEAR IN FOOTER */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* NAV ACTIVE LINK ON SCROLL */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* SMOOTH SCROLL */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* FULL-SCREEN SLIDER */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  let currentSlide = 0;
  let slideInterval = null;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 6000);
  }

  function resetSlider() {
    clearInterval(slideInterval);
    startSlider();
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      goToSlide(idx);
      resetSlider();
    });
  });

  if (slides.length > 1) {
    startSlider();
  }

  /* PARALLAX EFFECT + MOVING BACKGROUND */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      el.style.transform = `translateY(${scrollTop * speed}px)`;
    });

    // move global background slightly with scroll
    document.documentElement.style.setProperty(
      "--bg-offset",
      `${scrollTop * 0.1}px`
    );
  });

  /* REVEAL ON SCROLL */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* TILT EFFECT ON CARDS (MICRO ANIMATION) */
  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y - rect.height / 2) / rect.height) * 12;
      const rotateY = ((x - rect.width / 2) / rect.width) * -12;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* SIMPLE FORM HANDLER */
  /* SEND FORM DATA TO EMAIL USING FORMSPREE (NO BACKEND) */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // your Formspree endpoint
    const FORMSPREE_URL = "https://formspree.io/f/xanrajpv";  // <-- replace with your URL

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        alert("Message sent successfully! I'll contact you soon.");
        contactForm.reset();
      } else {
        alert("Failed to send. Please try again later.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  });
}

});
