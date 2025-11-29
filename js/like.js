document.addEventListener('DOMContentLoaded', () =>{
    const likeBtn = document.querySelectorAll(".like_btn");
    likeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            btn.classList.toggle('inactive');
        })
        
    });
})