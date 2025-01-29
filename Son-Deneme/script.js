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

            // Önce diğer açık menüleri kapat (Eğer birden fazla açık olsun istemiyorsan)
            document.querySelectorAll('.sub-menu.open').forEach(openMenu => {
                if (openMenu !== submenu) {
                    openMenu.classList.remove('open');
                    openMenu.previousElementSibling.querySelector('.toggle-arrow').classList.remove('open');
                }
            });

            // Seçili menüyü aç/kapa
            submenu.classList.toggle('open'); 
            if (arrow) {
                arrow.classList.toggle('open'); // Ok işaretini döndür
            }
        }
    });
});


