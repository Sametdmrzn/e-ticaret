const navbarToggler = document.querySelector('.navbar-toggler');
const mobileMenu = document.querySelector('#mobileMenu');

// Hamburger menüsüne tıklanınca mobil menüyü aç/kapat
navbarToggler.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});
