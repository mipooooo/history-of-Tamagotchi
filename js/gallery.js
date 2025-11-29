document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    const imageTitle = document.getElementById('imageTitle');
    const imageDescription = document.getElementById('imageDescription');
    const galleryDetailsBtn = document.getElementById('galleryDetailsBtn');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    function changeImage(event) {
        const thumbnail = event.currentTarget;
        const newImageSrc = thumbnail.getAttribute('data-image');
        const newTitle = thumbnail.getAttribute('data-title');
        const newDescription = thumbnail.getAttribute('data-description');
        const newLink = thumbnail.getAttribute('data-link');
        
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = newImageSrc;
            mainImage.alt = newTitle;
            
            mainImage.style.opacity = '1';
            
            imageTitle.textContent = newTitle;
            imageDescription.textContent = newDescription;
            galleryDetailsBtn.href = newLink;
            
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        }, 300);
    }
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', changeImage);
        thumbnail.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                changeImage(event);
            }
        });
    });
    
    thumbnails.forEach(thumbnail => {
        thumbnail.setAttribute('tabindex', '0');
        thumbnail.setAttribute('role', 'button');
        thumbnail.setAttribute('aria-label', `Показать ${thumbnail.getAttribute('data-title')}`);
    });
});