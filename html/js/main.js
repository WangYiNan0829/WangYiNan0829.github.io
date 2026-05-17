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

    // Opening/closing menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');

        if (nav.classList.contains('active')) {
            html.classList.add('no-scroll');
            body.classList.add('no-scroll');
        } else {
            html.classList.remove('no-scroll');
            body.classList.remove('no-scroll');
        }
    });

    // Close menu when clicking on item
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            html.classList.remove('no-scroll');
            body.classList.remove('no-scroll');
        });
    });

    // Listen for scroll event
    window.addEventListener('scroll', handleScroll);

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