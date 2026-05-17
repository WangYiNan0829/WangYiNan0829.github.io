const imageMetadata = {
    './images/Everyday Spaces/2025-10-07 230614.jpg': {
        index: '#001',
        title: 'Late Afternoon',
        location: 'Hangzhou',
        date: 'October 2025',
        description: `I stayed here longer than I planned.

The sunlight kept moving across the table.
Nobody talked much.`
    },
    './images/Everyday Spaces/2025-10-07 230702.jpg': {
        index: '#002',
        title: 'Corner Seat',
        location: 'Hangzhou',
        date: 'October 2025',
        description: `This is where I go when I need to think.

The coffee gets cold.
I don't mind.`
    },
    './images/Everyday Spaces/2025-10-07 230908.jpg': {
        index: '#003',
        title: 'Empty Tables',
        location: 'Hangzhou',
        date: 'October 2025',
        description: `Between lunch and dinner.
The quiet hour.

This is when the space feels most honest.`
    },
    './images/Everyday Spaces/2025-10-07 231235.jpg': {
        index: '#004',
        title: 'Window Light',
        location: 'Hangzhou',
        date: 'October 2025',
        description: `The way light falls through old windows.

I come back for this.`
    },
    './images/Everyday Spaces/2025-10-07 234458.jpg': {
        index: '#005',
        title: 'Street Corner',
        location: 'Hangzhou',
        date: 'October 2025',
        description: `Familiar streets at unfamiliar hours.

Everything looks different in the evening.`
    },
    './images/Everyday Spaces/2025-10-07 234712.jpg': {
        index: '#006',
        title: 'Quiet Moment',
        location: 'Hangzhou',
        date: 'October 2025',
        description: `Small spaces where time moves differently.

I notice things I usually miss.`
    },
    './images/Light, Travel & Memory/2025-10-07 230949.jpg': {
        index: '#007',
        title: 'Golden Hour',
        location: 'Travel',
        date: 'October 2025',
        description: `Chasing light across unfamiliar cities.

This is what I came for.`
    },
    './images/Light, Travel & Memory/2025-10-07 233236.jpg': {
        index: '#008',
        title: 'Distant View',
        location: 'Travel',
        date: 'October 2025',
        description: `Sometimes you have to go far away
to see things clearly.`
    },
    './images/Light, Travel & Memory/2025-10-07 233714.jpg': {
        index: '#009',
        title: 'Sunset',
        location: 'Travel',
        date: 'October 2025',
        description: `I planned this shot for weeks.
Researched the timing, the angle.

It was worth it.`
    },
    './images/Light, Travel & Memory/2025-10-07 235628.jpg': {
        index: '#010',
        title: 'Evening Sky',
        location: 'Travel',
        date: 'October 2025',
        description: `The light changes everything.

Same place, different feeling.`
    },
    './images/Light, Travel & Memory/2025-10-08 000100.jpg': {
        index: '#011',
        title: 'Night Falls',
        location: 'Travel',
        date: 'October 2025',
        description: `The moment between day and night.

Everything feels suspended.`
    },
    './images/Light, Travel & Memory/2026-02-24 174744.jpg': {
        index: '#012',
        title: 'Winter Light',
        location: 'Travel',
        date: 'February 2026',
        description: `Cold air, warm light.

This is what winter looks like to me.`
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
        title: 'Small Things',
        location: 'Hangzhou',
        date: 'October 2025',
        description: `Objects that carry memory.

I've always been drawn to these quiet details.`
    },
    './images/Objects & Quiet Narratives/2025-10-07 234318.jpg': {
        index: '#015',
        title: 'Café Details',
        location: 'Hangzhou',
        date: 'October 2025',
        description: `The small stories spaces tell.

If you look closely enough.`
    },
    './images/Objects & Quiet Narratives/2025-12-25 154300.jpg': {
        index: '#016',
        title: 'Winter Day',
        location: 'Hangzhou',
        date: 'December 2025',
        description: `Christmas afternoon.

Quiet and still.`
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
            modalMeta.textContent = `${metadata.location} · ${metadata.date}`;
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
