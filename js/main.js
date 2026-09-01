document.addEventListener('DOMContentLoaded', () => {
    
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const html = document.documentElement;
    const body = document.body;

    // --- Navigation and scrolling logic ---

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    const navLinks = Array.from(nav.querySelectorAll('a'));

    const setMenuState = (isOpen, restoreFocus = false) => {
        nav.classList.toggle('active', isOpen);
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        html.classList.toggle('no-scroll', isOpen);
        body.classList.toggle('no-scroll', isOpen);

        if (isOpen) {
            window.requestAnimationFrame(() => navLinks[0]?.focus());
        } else if (restoreFocus) {
            menuToggle.focus();
        }
    };

    menuToggle.addEventListener('click', () => {
        setMenuState(!nav.classList.contains('active'));
    });

    // Close menu when clicking on item
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (!nav.classList.contains('active')) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            setMenuState(false, true);
            return;
        }

        if (event.key === 'Tab' && navLinks.length) {
            const firstLink = navLinks[0];
            const lastLink = navLinks[navLinks.length - 1];

            if (event.shiftKey && document.activeElement === menuToggle) {
                event.preventDefault();
                lastLink.focus();
            } else if (event.shiftKey && document.activeElement === firstLink) {
                event.preventDefault();
                menuToggle.focus();
            } else if (!event.shiftKey && document.activeElement === menuToggle) {
                event.preventDefault();
                firstLink.focus();
            } else if (!event.shiftKey && document.activeElement === lastLink) {
                event.preventDefault();
                menuToggle.focus();
            }
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            setMenuState(false);
        }
    });

    // Listen for scroll event
    window.addEventListener('scroll', handleScroll);

    // --- Documentary reading progress ---

    const documentaryProgress = document.querySelector('.documentary-reading-progress span');
    const chapterLinks = Array.from(document.querySelectorAll('.documentary-chapter-nav a'));

    if (documentaryProgress && chapterLinks.length) {
        const chapterSections = chapterLinks.map(link => document.querySelector(link.getAttribute('href')));
        let progressTicking = false;

        const updateDocumentaryProgress = () => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
            documentaryProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
            body.classList.toggle('documentary-story-started', window.scrollY >= window.innerHeight * 0.6);

            let activeChapter = 0;
            chapterSections.forEach((section, index) => {
                if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.45) {
                    activeChapter = index;
                }
            });

            chapterLinks.forEach((link, index) => {
                const isActive = index === activeChapter;
                link.classList.toggle('active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });

            progressTicking = false;
        };

        const requestProgressUpdate = () => {
            if (!progressTicking) {
                window.requestAnimationFrame(updateDocumentaryProgress);
                progressTicking = true;
            }
        };

        window.addEventListener('scroll', requestProgressUpdate, { passive: true });
        window.addEventListener('resize', requestProgressUpdate);
        updateDocumentaryProgress();
    }

    // --- Form Submission and Notification Logic ---

    const form = document.getElementById('contact-form');
    const successToast = document.getElementById('success-toast');
    const errorToast = document.getElementById('error-toast');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const submitButton = form.querySelector('.btn');
            submitButton.classList.add('loading'); 

            // Simulate a delay in sending to the server
            setTimeout(() => {
                submitButton.classList.remove('loading'); 
                
                const isSuccess = Math.random() > 0.2;

                if (isSuccess) {
                    showToast(successToast);
                    form.reset();
                } else {
                    showToast(errorToast);
                }
            }, 2000);
        });
    }

    // Function to show notification
    function showToast(toastElement) {
        toastElement.classList.remove('hidden');
        toastElement.classList.add('active');

        // Hide notification after 5 seconds
        setTimeout(() => {
            toastElement.classList.remove('active');
            // After the disappearing animation, hide the element
            setTimeout(() => {
                toastElement.classList.add('hidden');
            }, 600); // The timing should match the CSS transition.
        }, 5000);
    }
});
