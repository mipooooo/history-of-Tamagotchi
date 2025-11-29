document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("authModal");
    const openLink = document.getElementById("reg-log");
    const closeBtn = document.querySelector(".close-button");

    const logForm = document.getElementById("login-form");
    const regForm = document.getElementById("reg-form");

    const switchToLog = document.getElementById("switchToLog");
    const switchToReg = document.getElementById("switchToReg");

    function openModal(){
        modal.classList.add("is-open");
        modal.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeModal(){
        modal.classList.remove("is-open");
        document.body.style.overflow = '';
    }

    openLink.addEventListener('click', (event) => {
        event.preventDefault();
        openModal();
    }) 

    closeBtn.addEventListener('click', closeModal);

    switchToReg.addEventListener('click', (event) => {
        event.preventDefault();
        logForm.style.display = 'none';
        regForm.style.display = 'block';
    })

    switchToLog.addEventListener('click', (event) => {
        event.preventDefault();
        logForm.style.display = 'block';
        regForm.style.display = 'none';
    })


    let currentCaptchaValue = ''; 
    let currentStage = 'text';

    const captchaDisplay = document.getElementById('captcha-display');
    const captchaInput = document.getElementById('captcha-input');
    const submitButton = document.getElementById('reg-submit-button');
    const captchaMessage = document.getElementById('captcha-message');

    function isEmpty(value) {
        return value === null || value.trim() === '';
    }

    function generateTextCaptcha(){
        const chars = 'QWERTYUIOPASDFGHJKLZXCVBNM';
        let captcha = '';

        for(let i=0; i<5;i++){
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        currentCaptchaValue = captcha;
        captchaDisplay.textContent = `Введите код: ${captcha}`;
        captchaMessage.textContent = '';
        currentStage = 'text';
        captchaInput.value = '';
        if(submitButton) submitButton.disabled = true;
    }

    function generateMathCaptcha(){
        const num1 = Math.floor(Math.random() * 10) +1;
        const num2 = Math.floor(Math.random() * 10) +1;
        
        currentCaptchaValue = (num1 + num2).toString(); 
        
        captchaDisplay.textContent = `Введите сумму: ${num1} + ${num2}`;
        captchaMessage.textContent = '';
        currentStage = 'math';
        captchaInput.value = '';
        if(submitButton) submitButton.disabled = true;
    }

    function checkCaptcha() { 
        const userInput = captchaInput.value;

        if(isEmpty(userInput)){
            captchaMessage.textContent = 'Ошибка: поле ввода пустое'; 
            captchaMessage.classList.add('error-message');
            captchaMessage.classList.remove('success-message'); 
            submitButton.disabled = true;
            return;
        }

        if (userInput.toUpperCase() === currentCaptchaValue.toUpperCase() ||
            userInput === currentCaptchaValue) 
        {
            submitButton.disabled = false;
            captchaMessage.textContent = 'Проверка пройдена! Регистрация разрешена.';
            captchaMessage.classList.add('success-message');
            captchaMessage.classList.remove('error-message');
            
        } else {
            captchaMessage.classList.remove('success-message');
            captchaMessage.classList.add('error-message');

            if (currentStage === 'text') {
                captchaMessage.textContent = 'Неверный код, будет выдана математическая капча';
                generateMathCaptcha();
            } else {
                captchaMessage.textContent = 'Неверная сумма. Повторите ввод ответа';
                generateMathCaptcha();
            }
            submitButton.disabled = true;
        }
    }
    
    generateTextCaptcha();

    if(regForm) {
        regForm.addEventListener('submit', (e) => {
            if (submitButton.disabled) {
                e.preventDefault();
                captchaMessage.textContent = 'Сначала пройдите Проверку';
                captchaMessage.classList.add('error-message');
            }
        });
    }
    
    captchaInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkCaptcha();
        }
    });
});