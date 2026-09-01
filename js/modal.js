const imageMetadata = {
    './images/Everyday Spaces/2025-10-07 230614-optimized.jpg': {
        index: '#001',
        title: 'Glass Room Café',
        description: `Light pours in through the big glass window.`
    },
    './images/Everyday Spaces/2025-10-07 230702-optimized.jpg': {
        index: '#002',
        title: 'Leisure by the Courtyard Fountain',
        description: `A slow afternoon by the fountain.`
    },
    './images/Everyday Spaces/2025-10-07 230908-optimized.jpg': {
        index: '#003',
        title: 'A Quiet Moment by the River',
        description: `One drink, soft light, and a quiet moment alone.`
    },
    './images/Everyday Spaces/2025-10-07 231235-optimized.jpg': {
        index: '#004',
        title: 'Half a Day at a Street Café',
        description: `Half a day slips by at the corner café.`
    },
    './images/Everyday Spaces/2025-10-07 234458.jpg': {
        index: '#005',
        title: 'Countryside Through the Window',
        description: `A quiet, faraway view past the window frame.`
    },
    './images/Everyday Spaces/2025-10-07 234712.jpg': {
        index: '#006',
        title: 'Green Shade and a White Umbrella',
        description: `Green trees and white umbrellas frame the summer.`
    },
    './images/Light, Travel & Memory/2025-10-07 230949.jpg': {
        index: '#007',
        title: 'Reading by the River',
        description: `Reading a book while the river flows by.`
    },
    './images/Light, Travel & Memory/2025-10-07 233236.jpg': {
        index: '#008',
        title: 'A Couple Watching the Sunset',
        description: `Two people, one sunset by the sea.`
    },
    './images/Light, Travel & Memory/2025-10-07 233714.jpg': {
        index: '#009',
        title: 'Clouds and Fog Over the River',
        description: `Soft clouds and fog drift over the water.`
    },
    './images/Light, Travel & Memory/2025-10-07 235628.jpg': {
        index: '#010',
        title: 'Day Cruise Across Victoria Harbour',
        description: `A daytime ride across the harbor.`
    },
    './images/Light, Travel & Memory/2025-10-08 000100.jpg': {
        index: '#011',
        title: 'Dusk Over the Sea',
        description: `The sky slowly fades over the sea.`
    },
    './images/Light, Travel & Memory/2026-02-24 174744.jpg': {
        index: '#012',
        title: 'Sunset Between the Balcony Windows',
        description: `The sunset waits between the balcony windows.`
    },
    './images/Light, Travel & Memory/2025-10-08 133506.jpg': {
        index: '#013',
        title: 'City Notes: Hong Kong',
        location: 'Hong Kong',
        date: 'October 2025',
        description: `The first time traveling with my father since I grew up.

He waited with me while I took this shot.
There were so many people.
He didn't understand why I wanted this photo.
But he stayed.

Our relationship has always been complicated.
This trip was different.
This photo reminds me of that.`
    },
    './images/Objects & Quiet Narratives/2025-10-07 232356.jpg': {
        index: '#014',
        title: 'Desserts and Small Dolls',
        description: `Sweets and little dolls, a small happy moment.`
    },
    './images/Objects & Quiet Narratives/2025-10-07 234318.jpg': {
        index: '#015',
        title: 'A Quiet Coffee Shop',
        description: `A quiet café where time slows down.`
    },
    './images/Objects & Quiet Narratives/2025-10-07 234351.jpg': {
        index: '#016',
        title: 'Afternoon Tea on a Busy Day',
        description: `A little tea break from a busy day.`
    },
    './images/Objects & Quiet Narratives/2025-12-25 154300.jpg': {
        index: '#017',
        title: 'A Table Full of Dolls',
        description: `A whole table of colorful dolls.`
    },
    './images/Objects & Quiet Narratives/20260517114630.jpg': {
        index: '#018',
        title: 'A Small Table in Autumn Light',
        description: `A small table under the autumn light.`
    },
    './images/Objects & Quiet Narratives/20260517114637.jpg': {
        index: '#019',
        title: 'Coffee and Layer Cake',
        description: `One coffee and one slice of layer cake, just right.`
    },
    './images/Objects & Quiet Narratives/20260517114641.jpg': {
        index: '#020',
        title: 'Still Life',
        description: `Quiet narratives in everyday objects.`
    }
};

function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 6) return 'Good night.';
    if (hour < 12) return 'Good morning.';
    if (hour < 18) return 'Good afternoon.';
    if (hour < 22) return 'Good evening.';
    return 'Good night.';
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('editorialModal');
    const modalImage = modal.querySelector('.modal-image');
    const modalImageSection = modal.querySelector('.modal-image-section');
    const modalIndex = modal.querySelector('.modal-index');
    const modalCounter = modal.querySelector('.modal-counter');
    const modalTitle = modal.querySelector('.modal-title');
    const modalMeta = modal.querySelector('.modal-meta');
    const modalDescription = modal.querySelector('.modal-description');
    const modalClose = modal.querySelector('.modal-close');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const html = document.documentElement;
    const body = document.body;

    const galleryItems = Array.from(document.querySelectorAll('.gallery-grid .gallery-item'));
    let lastFocusedElement = null;
    let currentItemIndex = 0;
    let touchStartX = null;

    function setModalContent(index) {
        currentItemIndex = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentItemIndex];
        const img = item.querySelector('img');
        const imgSrc = img.getAttribute('src');
        const metadata = imageMetadata[imgSrc] || {
            index: '#000',
            title: item.querySelector('.gallery-title')?.textContent?.trim() || 'Untitled',
            description: getTimeBasedGreeting()
        };

        modalImage.src = imgSrc;
        modalImage.alt = img.alt || metadata.title;
        modalIndex.textContent = metadata.index;
        modalCounter.textContent = `${String(currentItemIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
        modalTitle.textContent = metadata.title;
        modalMeta.textContent = '';
        modalDescription.textContent = metadata.description;
    }

    function openModal(item) {
        lastFocusedElement = item;
        setModalContent(galleryItems.indexOf(item));
        modal.setAttribute('aria-hidden', 'false');
        html.classList.add('no-scroll');
        body.classList.add('no-scroll');
        modal.classList.add('active');

        window.setTimeout(() => modalClose.focus(), 80);
    }

    function showPreviousImage() {
        setModalContent(currentItemIndex - 1);
    }

    function showNextImage() {
        setModalContent(currentItemIndex + 1);
    }

    galleryItems.forEach(item => {
        const title = item.querySelector('.gallery-title')?.textContent?.trim() || 'View photograph';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `Open photograph: ${title}`);
        item.addEventListener('click', () => openModal(item));
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(item);
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        window.setTimeout(() => {
            html.classList.remove('no-scroll');
            body.classList.remove('no-scroll');
            lastFocusedElement?.focus();
        }, 350);
    }

    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPreviousImage);
    modalNext.addEventListener('click', showNextImage);

    modalBackdrop.addEventListener('click', closeModal);

    modalImageSection.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    modalImageSection.addEventListener('touchend', (event) => {
        if (touchStartX === null) return;

        const distance = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;

        if (Math.abs(distance) < 50) return;
        if (distance > 0) {
            showPreviousImage();
        } else {
            showNextImage();
        }
    }, { passive: true });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('active')) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showPreviousImage();
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            showNextImage();
            return;
        }

        if (event.key === 'Tab') {
            const focusableControls = [modalClose, modalPrev, modalNext];
            const currentFocusIndex = focusableControls.indexOf(document.activeElement);
            const direction = event.shiftKey ? -1 : 1;
            const nextFocusIndex = (currentFocusIndex + direction + focusableControls.length) % focusableControls.length;

            event.preventDefault();
            focusableControls[nextFocusIndex].focus();
        }
    });
});
