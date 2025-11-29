document.addEventListener('DOMContentLoaded', function() {
    const newsSection = document.getElementById('news');

    let newsLoaded = false;

    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    function handleScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        updateScrollProgress(scrollPosition, documentHeight, windowHeight);
        animateOnScroll();
    }

    function updateScrollProgress(scrollY, docHeight, winHeight) {
        let progressBar = document.getElementById('scroll-progress');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, #ffbbdb, #96cffa, #63f1a0);
                transform-origin: left;
                transform: scaleX(0);
                z-index: 10000;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }

        const progress = scrollY / (docHeight - winHeight);
        progressBar.style.transform = `scaleX(${progress})`;
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.scroll-item');
        
        elements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('show')) {
                element.classList.add('show');
            }
        });
    }

    function initAnimations() {
        const newsCards = document.querySelectorAll('.news-card');
        const galleryItems = document.querySelectorAll('.txt_two');
        const carouselItems = document.querySelectorAll('.card-item');
        
        const allElements = [...newsCards, ...galleryItems, ...carouselItems];
        
        allElements.forEach(element => {
            element.classList.add('scroll-item');
        });
    }

    let ticking = false;
    function optimizedScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    initAnimations();
    window.addEventListener('scroll', optimizedScroll);
    
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    setTimeout(() => {
        if (isElementInViewport(newsSection)) {
            loadMoreNews();
        }
    }, 2000);
});