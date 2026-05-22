document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', () => mainNav.classList.toggle('open'));
    }

    // Active nav link highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-list a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Scroll animations (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Newsletter signup UI
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            alert(`Thank you for subscribing! (Demo) Updates would be sent to ${emailInput.value}`);
            newsletterForm.reset();
        });
    }

    // Donate modals + placeholder links
    const paypalModal = document.getElementById('paypalModal');
    const stripeModal = document.getElementById('stripeModal');
    if (paypalModal && stripeModal) {
        const modalTriggers = document.querySelectorAll('.btn-give-modal');
        modalTriggers.forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-modal');
                if (modalId === 'paypalModal') paypalModal.style.display = 'flex';
                if (modalId === 'stripeModal') stripeModal.style.display = 'flex';
            });
        });
        const closeModals = document.querySelectorAll('.close-modal');
        closeModals.forEach(close => {
            close.addEventListener('click', () => {
                paypalModal.style.display = 'none';
                stripeModal.style.display = 'none';
            });
        });
        window.addEventListener('click', (e) => {
            if (e.target === paypalModal) paypalModal.style.display = 'none';
            if (e.target === stripeModal) stripeModal.style.display = 'none';
        });

        // EDIT: Replace these placeholder links with your actual PayPal and Stripe URLs
        const paypalLink = document.getElementById('paypalPlaceholderLink');
        const stripeLink = document.getElementById('stripePlaceholderLink');
        if (paypalLink) paypalLink.href = 'https://www.paypal.com/donate?hosted_button_id=YOUR_BUTTON_ID';
        if (stripeLink) stripeLink.href = 'https://buy.stripe.com/your-test-link';
    }

    // Copy bank details button
    const copyBankBtn = document.getElementById('copyBankBtn');
    if (copyBankBtn) {
        copyBankBtn.addEventListener('click', () => {
            const bankTextElem = document.querySelector('.bank-details');
            if (bankTextElem) {
                const text = bankTextElem.innerText;
                navigator.clipboard.writeText(text).then(() => alert('Bank details copied to clipboard!'));
            }
        });
    }

    // Sermons filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sermonCards = document.querySelectorAll('.sermon-card');
    if (filterBtns.length && sermonCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');
                sermonCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Contact form demo alert
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! This is a UI demo. Your message would be sent to the church team.');
            contactForm.reset();
        });
    }
});