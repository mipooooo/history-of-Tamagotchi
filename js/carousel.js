document.addEventListener('DOMContentLoaded', function() {
    const cardItems = document.querySelectorAll('.card-item');
    
    cardItems.forEach(card => {
        card.addEventListener('click', function(e) {
            const link = this.querySelector('a.card-link');
            if (link && link.href) {
                e.preventDefault();
                window.location.href = link.href;
            }
        });
    });
});