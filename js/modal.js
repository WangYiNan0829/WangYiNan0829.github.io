const imageMetadata = {
    './images/Everyday Spaces/2025-10-07 230614.jpg': {
        index: '#001',
        title: 'Glass room café',
        description: `Light pours in through the big glass window.`
    },
    './images/Everyday Spaces/2025-10-07 230702.jpg': {
        index: '#002',
        title: 'Leisure in the courtyard fountain',
        description: `A slow afternoon by the fountain.`
    },
    './images/Everyday Spaces/2025-10-07 230908.jpg': {
        index: '#003',
        title: 'The moment of being alone by the river',
        description: `One drink, soft light, happy alone.`
    },
    './images/Everyday Spaces/2025-10-07 231235.jpg': {
        index: '#004',
        title: 'Half a day in the street cafe',
        description: `Half a day slips by at the corner café.`
    },
    './images/Everyday Spaces/2025-10-07 234458.jpg': {
        index: '#005',
        title: 'The countryside in the window',
        description: `A quiet, faraway view past the window frame.`
    },
    './images/Everyday Spaces/2025-10-07 234712.jpg': {
        index: '#006',
        title: 'Green shade and white umbrella outside the window',
        description: `Green trees and white umbrellas frame the summer.`
    },
    './images/Light, Travel & Memory/2025-10-07 230949.jpg': {
        index: '#007',
        title: 'Reading books and watching the river view',
        description: `Reading a book while the river flows by.`
    },
    './images/Light, Travel & Memory/2025-10-07 233236.jpg': {
        index: '#008',
        title: 'Couple watching sunset by sea',
        description: `Two people, one sunset by the sea.`
    },
    './images/Light, Travel & Memory/2025-10-07 233714.jpg': {
        index: '#009',
        title: 'Clouds and fog overflow the river.',
        description: `Soft clouds and fog drift over the water.`
    },
    './images/Light, Travel & Memory/2025-10-07 235628.jpg': {
        index: '#010',
        title: 'Victoria Port Day Cruise',
        description: `A daytime ride across the harbor.`
    },
    './images/Light, Travel & Memory/2025-10-08 000100.jpg': {
        index: '#011',
        title: 'Dusk and twilight on the sea',
        description: `The sky slowly fades over the sea.`
    },
    './images/Light, Travel & Memory/2026-02-24 174744.jpg': {
        index: '#012',
        title: 'The sunset between the balcony windows',
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
        title: 'Desserts and small dolls',
        description: `Sweets and little dolls, a small happy moment.`
    },
    './images/Objects & Quiet Narratives/2025-10-07 234318.jpg': {
        index: '#015',
        title: 'Quiet coffee shop',
        description: `A quiet café where time slows down.`
    },
    './images/Objects & Quiet Narratives/2025-10-07 234351.jpg': {
        index: '#016',
        title: 'Afternoon tea in the busy',
        description: `A little tea break from a busy day.`
    },
    './images/Objects & Quiet Narratives/2025-12-25 154300.jpg': {
        index: '#017',
        title: 'The table is full of cute dolls',
        description: `A whole table of soft, cute dolls.`
    },
    './images/Objects & Quiet Narratives/20260517114630.jpg': {
        index: '#018',
        title: 'Small table by the autumn skylight',
        description: `A small table under the autumn light.`
    },
    './images/Objects & Quiet Narratives/20260517114637.jpg': {
        index: '#019',
        title: 'Coffee and double cake',
        description: `One coffee, one layered cake, just right.`
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
    const modalIndex = modal.querySelector('.modal-index');
    const modalTitle = modal.querySelector('.modal-title');
    const modalMeta = modal.querySelector('.modal-meta');
    const modalDescription = modal.querySelector('.modal-description');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const html = document.documentElement;
    const body = document.body;

    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const imgSrc = img.getAttribute('src');
            const metadata = imageMetadata[imgSrc] || {
                index: '#000',
                title: 'Untitled',
                location: 'Unknown',
                date: 'Unknown',
                description: getTimeBasedGreeting()
            };

            modalImage.src = imgSrc;
            modalImage.alt = metadata.title;
            modalIndex.textContent = metadata.index;
            modalTitle.textContent = metadata.title;
            modalMeta.textContent = '';
            modalDescription.textContent = metadata.description;

            html.classList.add('no-scroll');
            body.classList.add('no-scroll');

            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        
        setTimeout(() => {
            html.classList.remove('no-scroll');
            body.classList.remove('no-scroll');
        }, 800);
    }

    modalClose.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
