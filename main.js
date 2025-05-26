// Mobile Menu

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Scroll Reveal

const sr = ScrollReveal ({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
})

sr.reveal('.text', { delay: 200, origin: 'top'})
sr.reveal('.form-container form', { delay: 400, origin: 'left'})
sr.reveal('.heading', { delay: 400, origin: 'top'})
sr.reveal('.ride-container .box', { delay: 200, origin: 'top'})
sr.reveal('.services-container .box', { delay: 200, origin: 'top'})
sr.reveal('.about-container', { delay: 200, origin: 'top'})
sr.reveal('.reviews-container', { delay: 200, origin: 'top'})
sr.reveal('.newsletter .box', { delay: 400, origin: 'bottom'})

// Modal functionality for "Rent Now"
const rentBtns = document.querySelectorAll('.services .btn');
const modal = document.getElementById('rentModal');
const closeModal = document.getElementById('closeModal');
const rentForm = document.getElementById('rentForm');

// Open modal on "Rent Now" click
rentBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
  });
});

// Close modal on X click
closeModal.onclick = function() {
  modal.style.display = 'none';
};

// Close modal when clicking outside modal content
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Handle form submit
rentForm.onsubmit = function(e) {
  e.preventDefault();
  alert('Thank you for your request! We will contact you soon.');
  modal.style.display = 'none';
  rentForm.reset();
};

// "Learn More" button functionality with hide/show toggle
document.addEventListener('DOMContentLoaded', function() {
  const learnMoreBtn = document.querySelector('.learn-more-btn');
  const learnMoreSection = document.getElementById('learn-more-section');

  if (learnMoreBtn && learnMoreSection) {
    // Create a "Hide" button inside the learn more section if not present
    let hideBtn = learnMoreSection.querySelector('.hide-learn-more-btn');
    if (!hideBtn) {
      hideBtn = document.createElement('button');
      hideBtn.textContent = 'Hide';
      hideBtn.className = 'btn hide-learn-more-btn';
      hideBtn.style.marginTop = '20px';
      learnMoreSection.appendChild(hideBtn);
    } else {
      hideBtn.style.display = 'none';
    }

    learnMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      learnMoreSection.style.display = 'block';
      hideBtn.style.display = 'inline-block';
      learnMoreSection.scrollIntoView({ behavior: 'smooth' });
    });

    hideBtn.addEventListener('click', function() {
      learnMoreSection.style.display = 'none';
      hideBtn.style.display = 'none';
    });
  }
});

// Reviews slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.reviews-container');
  const boxes = document.querySelectorAll('.reviews-container .box');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  const visibleBoxes = 3; // Show 3 reviews at a time (adjust for mobile if needed)

  function updateSlider() {
    const boxWidth = boxes[0].offsetWidth + 20; // box + margin
    container.scrollTo({
      left: currentIndex * boxWidth,
      behavior: 'smooth'
    });
  }

  nextBtn.addEventListener('click', function() {
    if (currentIndex < boxes.length - visibleBoxes) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Optional: Reset slider on window resize
  window.addEventListener('resize', updateSlider);
});

document.addEventListener('DOMContentLoaded', function() {
  // Newsletter subscribe button functionality
  const subscribeBtn = document.getElementById('subscribe-btn');
  const newsletterEmail = document.getElementById('newsletter-email');
  if (subscribeBtn && newsletterEmail) {
    subscribeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (email === '') {
        alert('Please enter your email address.');
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
      } else {
        alert('Thank you for subscribing!');
        newsletterEmail.value = '';
      }
    });
  }
});

// Animate .ride-container and .ride-extra when Ride section is in view
document.addEventListener('DOMContentLoaded', function() {
  function animateRideSection() {
    const rideContainer = document.querySelector('.ride-container');
    const rideExtra = document.querySelector('.ride-extra');
    const rideSection = document.getElementById('ride');
    if (!rideContainer || !rideExtra || !rideSection) return;

    function onScroll() {
      const rect = rideSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        rideContainer.classList.add('animate-ride');
        rideExtra.classList.add('animate-ride-extra');
        window.removeEventListener('scroll', onScroll);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  }
  animateRideSection();
});

// Smooth scroll for navbar links (including Gallery)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 60, // adjust for fixed header if needed
                    behavior: 'smooth'
                });
            }
        });
    });
});

// --- REMOVE THIS BLOCK if you want to use only one animation method ---
// ScrollReveal animation for gallery images
// if (typeof ScrollReveal !== 'undefined') {
//   ScrollReveal().reveal('.gallery-img', {
//     distance: '40px',
//     duration: 900,
//     origin: 'bottom',
//     interval: 120,
//     opacity: 0,
//     easing: 'cubic-bezier(.4,0,.2,1)',
//     reset: false // Images stay visible after animation
//   });
// }
// --- END REMOVE ---

// Animated gallery on scroll (vanilla JS, matches FAQ animation style)
document.addEventListener('DOMContentLoaded', function() {
    function animateGallery() {
        const galleryImgs = document.querySelectorAll('.gallery-img');
        const triggerBottom = window.innerHeight * 0.92;
        galleryImgs.forEach((img, i) => {
            const imgTop = img.getBoundingClientRect().top;
            if (imgTop < triggerBottom) {
                // Only add visible if not already added (prevents repeated setTimeouts)
                if (!img.classList.contains('visible')) {
                    setTimeout(() => img.classList.add('visible'), i * 120); // staggered
                }
            }
        });
    }
    window.addEventListener('scroll', animateGallery);
    animateGallery();
});

// Animated FAQ on scroll and toggle
document.addEventListener('DOMContentLoaded', function() {
    // Animate FAQ items on scroll
    function animateFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        const triggerBottom = window.innerHeight * 0.92;
        faqItems.forEach((item, i) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                setTimeout(() => item.classList.add('visible'), i * 120);
            }
        });
    }
    window.addEventListener('scroll', animateFAQ);
    animateFAQ();

    // FAQ accordion toggle
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
        });
    });
});

// Profile dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileBtn = document.getElementById('profileDropdownBtn');
    const profileMenu = document.getElementById('profileMenu');
    const profileDropdown = profileBtn?.parentElement;

    if (profileBtn && profileMenu && profileDropdown) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('open');
        });
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('open');
            }
        });
    }
});

 
            document.addEventListener("DOMContentLoaded", function () {
                // FAQ toggle
                document.querySelectorAll('.faq-question').forEach(function (q) {
                    q.addEventListener('click', function () {
                        const item = q.parentElement;
                        item.classList.toggle('open');
                        document.querySelectorAll('.faq-item').forEach(function (other) {
                            if (other !== item) other.classList.remove('open');
                        });
                    });
                });

                // Animate .scroll-animate sections on scroll
                const elements = document.querySelectorAll('.scroll-animate');
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 });

                elements.forEach(el => {
                    observer.observe(el);
                });

                // Sign Up / Sign In modal functionality
                const signUpModal = document.getElementById('signUpModal');
                const signInModal = document.getElementById('signInModal');
                document.getElementById('openSignUp').onclick = function (e) {
                    e.preventDefault();
                    signUpModal.style.display = 'block';
                };
                document.getElementById('openSignIn').onclick = function (e) {
                    e.preventDefault();
                    signInModal.style.display = 'block';
                };
                document.getElementById('closeSignUp').onclick = function () {
                    signUpModal.style.display = 'none';
                };
                document.getElementById('closeSignIn').onclick = function () {
                    signInModal.style.display = 'none';
                };
                window.onclick = function (event) {
                    if (event.target === signUpModal) signUpModal.style.display = 'none';
                    if (event.target === signInModal) signInModal.style.display = 'none';
                };

                // Contact Us modal functionality
                const contactModal = document.getElementById('contactModal');
                const openContact = document.getElementById('openContact');
                const closeContact = document.getElementById('closeContact');
                if (openContact && contactModal && closeContact) {
                    openContact.onclick = function (e) {
                        e.preventDefault();
                        contactModal.style.display = 'block';
                    };
                    closeContact.onclick = function () {
                        contactModal.style.display = 'none';
                    };
                    window.addEventListener('click', function (event) {
                        if (event.target === contactModal) contactModal.style.display = 'none';
                    });
                    document.getElementById('contactForm').onsubmit = function (e) {
                        e.preventDefault();
                        alert('Thank you for contacting us!');
                        contactModal.style.display = 'none';
                        this.reset();
                    };
                }

                // Optional: Handle form submit (demo only)
                document.getElementById('signUpForm').onsubmit = function (e) {
                    e.preventDefault();
                    alert('Sign Up successful!');
                    signUpModal.style.display = 'none';
                    this.reset();
                };
                document.getElementById('signInForm').onsubmit = function (e) {
                    e.preventDefault();
                    alert('Sign In successful!');
                    signInModal.style.display = 'none';
                    this.reset();
                };
            });

            // Smooth scroll for navbar links
            document.querySelectorAll('.navbar a').forEach(link => {
                link.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });

            // Newsletter subscribe functionality
            document.getElementById('subscribeBtn').addEventListener('click', function (e) {
                e.preventDefault();
                const emailInput = document.getElementById('newsletterEmail');
                const email = emailInput.value.trim();
                if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    alert('Thank you for subscribing!');
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            }); 