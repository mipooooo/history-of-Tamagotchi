
document.addEventListener('DOMContentLoaded', () => {
        
        let currentCaptchaValue = ''; 
        let currentStage = 'text';

        const captchaDisplay = document.getElementById('captcha-display');
        const captchaInput = document.getElementById('captcha-input');
        const submitButton = document.getElementById('reg-submit-button');
        const captchaMessage = document.getElementById('captcha-message');
        const regForm = document.getElementById('reg-form');

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

        function checkCaptcha(event) {
            if (event && event.type === 'keydown' && event.key !== 'Enter') {
                return;
            }
            if (event && event.type === 'keydown') {
                event.preventDefault();
            }

            const userInput = captchaInput.value;

            if(isEmpty(userInput)){
                captchaMessage.textContent = 'Ошибка: поле ввода пустое'; 
                captchaMessage.classList.add('error-message');
                captchaMessage.classList.remove('success-message'); 
                submitButton.disabled = true;
                return;
            }

            if (userInput === currentCaptchaValue) {
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
                    captchaMessage.textContent = 'Неверная сумма. Повторите ввода ответа';
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
        
        captchaInput.addEventListener('keydown', checkCaptcha);
    });