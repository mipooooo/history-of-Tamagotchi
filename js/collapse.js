document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.read-more-btn');
    const allCollapses = document.querySelectorAll('.collapse');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const collapse = this.nextElementSibling;
            
            if (collapse && collapse.classList.contains('collapse')) {
                const isAlreadyOpen = collapse.classList.contains('open');
                allCollapses.forEach(item => {
                    item.classList.remove('open');
                });
                if (!isAlreadyOpen) {
                    collapse.classList.add('open');
                }
            }
        });
    });
});