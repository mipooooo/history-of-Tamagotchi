document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('image-container');
    const img = document.getElementById('centered-img');
    const coords = document.getElementById('coords');
    const showBtn = document.getElementById('show-image-btn');
    
    showBtn.addEventListener('click', function() {
        img.src = '../img/design.png';
        container.style.display = 'block';
        centerImage();
    });

    function centerImage() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        
        const left = (containerWidth - imgWidth) / 2;
        const top = (containerHeight - imgHeight) / 2;
        
        img.style.left = left + 'px';
        img.style.top = top + 'px';
    }
    
    img.addEventListener('click', function(e) {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        coords.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
    });
    
    container.addEventListener('click', function(e) {
        if (e.target === container) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && container.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        container.style.display = 'none';
    }
    
    window.addEventListener('resize', centerImage);
    img.onload = centerImage;


    const contentsDiv = document.getElementById('contents');

    if (!contentsDiv) {
        console.log('Элемент #contents не найден');
        return;
    }


});