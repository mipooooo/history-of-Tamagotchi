document.addEventListener('DOMContentLoaded', function() {
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'parallax-pixels';
    
    const tamagotchiImages = [
        'img/charact2.png',
        'img/charact3.png', 
        'img/charact4.png',
        'img/charact3_1.png',
        'img/charct4_1.png',
        'img/charact5_1.png',
        'img/charact6_1.png'
    ];
    
    for (let i = 0; i < 20; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        const randomImage = tamagotchiImages[Math.floor(Math.random() * tamagotchiImages.length)];
        pixel.style.backgroundImage = `url(${randomImage})`;
        
        pixel.style.left = Math.random() * 100 + '%';
        pixel.style.top = Math.random() * 100 + '%';
        const size = 30 + Math.random() * 50;
        pixel.style.width = size + 'px';
        pixel.style.height = size + 'px';
        
        pixel.style.transform = `rotate(${Math.random() * 360}deg)`;

        pixel.style.opacity = 0.1 + Math.random() * 0.2;
        
        parallaxContainer.appendChild(pixel);
    }
    
    document.body.insertBefore(parallaxContainer, document.body.firstChild);
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const pixels = document.querySelectorAll('.pixel');
        
        pixels.forEach((pixel, index) => {
            const speed = 0.1 + (index * 0.03);
            const move = scrolled * speed;
            pixel.style.transform = `translateY(${move}px) rotate(${Math.random() * 360}deg)`;
        });
    }
    
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    updateParallax();
});