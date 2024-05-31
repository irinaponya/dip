const wrapper = document.querySelector('.wrapper');
const signUpLink = document.querySelector('.forgot-link');
const signInLink = document.querySelector('.signIn-link');
const errorMessage = document.querySelector(".error");

signUpLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signIn');
    wrapper.classList.remove('animate-forgot');
});

signInLink.addEventListener('click', () => {
    wrapper.classList.add('animate-forgot');
    wrapper.classList.remove('animate-signIn');
});

if(errorMessage.textContent == 0){
    errorMessage.style.display = 'none';
}