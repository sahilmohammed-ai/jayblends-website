/**
 * JayBlends Website - Main JavaScript
 * Handles mobile navigation, scroll animations, forms, filtering, and FAQ accordion
 */

document.addEventListener('DOMContentLoaded', function() {
    // ====================================
    // Mobile Navigation
    // ====================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');

    // Move mobile menu out of nav to escape backdrop-filter stacking context
    if (mobileMenu) {
        document.body.appendChild(mobileMenu);
        mobileMenu.style.cssText = 'position:fixed;top:0;right:0;height:100%;width:16rem;background:#ffffff;z-index:200;box-shadow:-4px 0 20px rgba(0,0,0,0.15);transform:translateX(100%);transition:transform 0.3s ease-in-out;';
    }

    // Create backdrop overlay
    const backdrop = document.createElement('div');
    backdrop.id = 'menu-backdrop';
    backdrop.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:190;display:none;';
    document.body.appendChild(backdrop);

    function openMenu() {
        mobileMenu.style.transform = 'translateX(0)';
        mobileMenu.querySelectorAll('a').forEach(a => a.style.color = '#dc2626');
        backdrop.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.style.transform = 'translateX(100%)';
        backdrop.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', openMenu);
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    backdrop.addEventListener('click', closeMenu);

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ====================================
    // Scroll Animations
    // ====================================
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollAnimateElements.forEach(element => {
        observer.observe(element);
    });

    // ====================================
    // Navigation Scroll Effect
    // ====================================
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ====================================
    // Booking Form (services.html)
    // ====================================
    const bookingForm = document.getElementById('booking-form');
    const bookingSuccess = document.getElementById('booking-success');
    const dateInput = document.getElementById('date');

    // Set minimum date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call delay
            setTimeout(function() {
                bookingForm.style.display = 'none';
                bookingSuccess.classList.remove('hidden');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Reset booking form function (attached to window for inline onclick)
    window.resetBookingForm = function() {
        if (bookingForm && bookingSuccess) {
            bookingForm.reset();
            bookingForm.style.display = 'block';
            bookingSuccess.classList.add('hidden');
        }
    };

    // ====================================
    // Contact Form (contact.html)
    // ====================================
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(function() {
                contactForm.style.display = 'none';
                contactSuccess.classList.remove('hidden');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Reset contact form function
    window.resetContactForm = function() {
        if (contactForm && contactSuccess) {
            contactForm.reset();
            contactForm.style.display = 'block';
            contactSuccess.classList.add('hidden');
        }
    };

    // ====================================
    // Shop Filtering (shop.html)
    // ====================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const sortSelect = document.getElementById('sort-select');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.backgroundColor = '';
                    b.style.color = '';
                });
                this.classList.add('active');

                // Filter products
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        // Re-trigger animation
                        card.classList.remove('visible');
                        setTimeout(() => card.classList.add('visible'), 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Sort functionality
    if (sortSelect && productCards.length > 0) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const productGrid = document.getElementById('product-grid');
            const cardsArray = Array.from(productCards);

            cardsArray.sort((a, b) => {
                const priceA = parseInt(a.getAttribute('data-price'));
                const priceB = parseInt(b.getAttribute('data-price'));

                if (sortValue === 'price-low') {
                    return priceA - priceB;
                } else if (sortValue === 'price-high') {
                    return priceB - priceA;
                }
                // Default: newest (maintain original order)
                return 0;
            });

            // Re-append sorted cards
            cardsArray.forEach(card => {
                productGrid.appendChild(card);
            });
        });
    }

    // ====================================
    // FAQ Accordion (contact.html)
    // ====================================
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('svg');

            // Close all other FAQs
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherContent = otherToggle.nextElementSibling;
                    const otherIcon = otherToggle.querySelector('svg');
                    otherContent.classList.add('hidden');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current FAQ
            content.classList.toggle('hidden');

            if (content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // ====================================
    // Smooth Scroll for Anchor Links
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }

                    // Scroll to target
                    const navHeight = nav ? nav.offsetHeight : 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ====================================
    // Image Lazy Loading Placeholder
    // ====================================
    // This is a placeholder for when real images are added
    // You can implement lazy loading with Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');

    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ====================================
    // Product View Button Click Handler
    // ====================================
    const viewButtons = document.querySelectorAll('.product-card button');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real implementation, this would open a product modal or navigate to product page
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;

            alert(`Product details for "${productName}" would be shown here.\n\nIn a full implementation, this would open a modal or navigate to a product detail page.`);
        });
    });

    // ====================================
    // Load More Button (shop.html)
    // ====================================
    const loadMoreBtn = document.querySelector('.bg-accent.text-primary.px-8.py-4.rounded-full');

    if (loadMoreBtn && loadMoreBtn.textContent.includes('Load More')) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, this would fetch more products
            alert('In a full implementation, this would load more products from the server.\n\nFor this demo, all products are already displayed.');
        });
    }

    // ====================================
    // Console Welcome Message
    // ====================================
    console.log('%c JayyBl3nz ', 'background: #1e3a5f; color: #dc2626; font-size: 24px; font-weight: bold; padding: 10px 20px;');
    console.log('%c Fresh Cuts. Fresh Style. ', 'color: #374151; font-size: 14px;');
});
