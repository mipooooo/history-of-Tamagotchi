document.addEventListener('DOMContentLoaded', function() {
const contentsDiv = document.getElementById('contents');
    
    contentsDiv.addEventListener('click', function(event) {
        const link = event.target.closest('a');
        
        if (link && link.href) {
            let domain = '';
            try {
                domain = new URL(link.href).hostname;
            } catch (e) {
                domain = link.href;
            }
            
            const confirmMessage = `Вы действительно хотите покинуть страницу?\n\n` +
                                `Сайт: ${domain}\n` +
                                `Адрес: ${link.href}\n\n` +
                                `Нажмите OK для перехода или Отмена для отмены.`;
            
            const userConfirmed = confirm(confirmMessage);
            
            if (!userConfirmed) {
                event.preventDefault();
                event.stopPropagation();
                link.style.background = '#ffbbdb';
                setTimeout(() => {
                    link.style.background = '';
                }, 500);
            }
        }
    });

});