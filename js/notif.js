let notifCount = parseInt(document.querySelector('.notification-count')?.textContent || '0', 10);
let notifInterval;
let notifMuted = false; 
const muteDuration = 10000;
let dropdownHistory = [];


function showNotif(options){
    const container = document.getElementById('notification-popups');
    if(!container) return;

    const notif = document.createElement('div');
    notif.className = 'notification';
    
    notif.innerHTML = `
        <span class="notification-content">${options.content || 'Новое уведомление'}</span>
        <button class="notification-close" aria-label="Закрыть уведомление">×</button>
    `;

    container.prepend(notif);

    setTimeout(() => {
        notif.classList.add('show');
    }, 10);

    notif.dataset.autoCloseTimeout = setTimeout(() => {
        closeNotification(notif);
    }, 1500);
}

function closeNotification(notifElement) {
    if (notifElement.dataset.autoCloseTimeout) {
        clearTimeout(parseInt(notifElement.dataset.autoCloseTimeout));
    }
    notifElement.remove();
}

const notifMessages = [
    'Новая статья на сайте!',
    'Ваш рассказ добавлен на сайт!', 
    'Празднование годовщины выхода тамагочи',
    'Добавлен новый тип тамагочи',
    'Новый рекордный уровень роста тамагочи!'
]

const counterEl = document.querySelector('.notification-count');


function renderNotificationDropdown(message) {
    const dropdown = document.querySelector('.notification-dropdown');
    if (!dropdown) return;

    dropdownHistory.unshift(message);

    if (dropdownHistory.length > 5) {
        dropdownHistory.pop();
    }
    dropdown.innerHTML = '';
    
    dropdownHistory.forEach(msg => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = msg;
        
        li.appendChild(a);
        dropdown.appendChild(li);
    });
}

function updateCounter(){
    if (counterEl){
        counterEl.textContent = notifCount;
        counterEl.style.display = notifCount > 0 ? 'block' : 'none';
    }
}

function createNotif(){
    if(notifMuted) return;
    const message = notifMessages[Math.floor(Math.random() * notifMessages.length)];
    showNotif({content: message});
    renderNotificationDropdown(message);
    notifCount++;
    updateCounter();
}

function startNotifInterval(){
    if(notifInterval) clearInterval(notifInterval);

    notifInterval = setInterval(createNotif, 3000);
}

function delayDecor(func, delay){
    return function(...args){
        if(notifMuted){
            showNotif({ content: 'Пауза уже активна.' });
            return;
        }
        notifMuted = true;
        clearInterval(notifInterval);

        func.apply(this, args);
        notifCount =0;
        updateCounter();

        setTimeout(()=>{
            notifMuted=false;
            startNotifInterval();
            showNotif({ content: 'Счетчик уведомлений возобновлен.' });
        }, delay);
        showNotif({ content: `Генерация приостановлена на ${delay / 1000} секунд.` });
    }
}

const mutedResetCounter = delayDecor(function(){}, muteDuration);

function setupNotificationCloseHandler() {
    const container = document.getElementById('notification-popups');
    if (!container) {
        console.log('Notification container not found');
        return;
    }

    console.log('Setting up notification close handler');
    
    container.addEventListener('click', function(event) {
        console.log('Container clicked', event.target);
        
        if (event.target.classList.contains('notification-close')) {
            console.log('Close button clicked');
            const notification = event.target.closest('.notification');
            if (notification) {
                console.log('Found notification to close');
                closeNotification(notification);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    updateCounter();
    
    setupNotificationCloseHandler();
    
    startNotifInterval(); 

    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', mutedResetCounter);
    }
});