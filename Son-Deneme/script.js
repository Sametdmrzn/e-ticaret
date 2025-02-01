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

