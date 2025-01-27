// Ürün resimlerine tıklanabilirlik ekleyelim
const productImages = document.querySelectorAll('.product-image');

productImages.forEach(image => {
    image.addEventListener('click', () => {
        // Tıklanan resmi büyütmek için bir modal açılacak
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const img = document.createElement('img');
        img.src = image.src;
        img.classList.add('modal-image');
        modal.appendChild(img);
        
        document.body.appendChild(modal);
        
        // Modal kapanması için
        modal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

function showOverlay() {
    document.getElementById('overlay').style.display = 'block';
}

// Sayfa kararması için overlay'yi gizle
function hideOverlay() {
    document.getElementById('overlay').style.display = 'none';
}


        // Dropdown menüsünü açma
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => {
                const menu = dropdown.querySelector('.dropdown-menu');
                menu.classList.add('show');  // Menü açılacak
                menu.classList.remove('hide'); // Kapanma animasyonunu kaldır
            });
        
            dropdown.addEventListener('mouseleave', () => {
                const menu = dropdown.querySelector('.dropdown-menu');
                menu.classList.add('hide'); // Kapanma animasyonu
                menu.classList.remove('show'); // Açılma animasyonunu kaldır
        
                // Menü kapanma animasyonu tamamlandığında display'i none yap
                menu.addEventListener('animationend', () => {
                    if (menu.classList.contains('hide')) {
                        menu.style.display = 'none';  // Kapanma animasyonu tamamlandığında menüyü gizle
                    }
                });
            });
        });
        
        // Menü üzerine gelindiğinde menüyü açık tut
        document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                const menu = dropdown.querySelector('.dropdown-menu');
                menu.classList.add('show'); // Menüyü göster
                menu.style.display = 'block'; // Görünür yap
            });
            dropdown.addEventListener('mouseleave', function() {
                const menu = dropdown.querySelector('.dropdown-menu');
                setTimeout(function() {
                    menu.classList.remove('show'); // Menüyü gizle
                    menu.style.display = 'none'; // Menü kaybolsun
                }, 200); // Menü kaybolmadan önce kısa bir bekleme süresi
            });
        });
        