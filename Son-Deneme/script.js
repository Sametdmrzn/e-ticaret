const navbarToggler = document.querySelector('.navbar-toggler');
const mobileMenu = document.querySelector('#mobileMenu');

// Hamburger menüsüne tıklanınca mobil menüyü aç/kapat
navbarToggler.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});


// Dropdown menüyü açma / kapama
const dropdownLinks = document.querySelectorAll('.mobile-menu > ul > li > a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const submenu = link.nextElementSibling; // Alt menüyü al
        const arrow = link.querySelector('.toggle-arrow'); // Ok işaretini al
        
        if (submenu && submenu.classList.contains('sub-menu')) {
            e.preventDefault(); // Menü linkine gitmesini engelle
            submenu.classList.toggle('open'); // Alt menüyü aç / kapa
            arrow.classList.toggle('open'); // Ok işaretini döndür
        }
    });
});


