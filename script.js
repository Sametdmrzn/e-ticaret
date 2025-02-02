    // Navbar toggler zaten tanımlandığı için ikinci tanım gereksiz
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

                // Önce diğer açık menüleri kapat
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

    // Sepet işlemleri
    document.addEventListener("DOMContentLoaded", function () {
        loadCart(); // Sayfa yüklendiğinde sepeti yükle

        // Tüm "Sepete Ekle" butonlarını seç
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", function () {
                let productElement = this.closest(".product");
                let productName = productElement.querySelector("h3").innerText;
                let productPrice = productElement.querySelector(".price").innerText.replace("Fiyat: ", "").replace(" TL", "");
                let productImage = productElement.querySelector(".product-image").src;

                addToCart(productName, productPrice, productImage, this);
            });
        });
    });

    function addToCart(name, price, image, button) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({ name, price, image });
        localStorage.setItem("cart", JSON.stringify(cart));

        animateButton(button);
    }

    function animateButton(button) {
        button.classList.add("active"); // Butonun rengini değiştir
        button.disabled = true; // Butonu devre dışı bırak

        setTimeout(() => {
            button.classList.remove("active");
            button.disabled = false;
        }, 1500); // 1.5 saniye sonra eski haline döndür
    }

    // Sepet verilerini localStorage'dan alıyoruz
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Sepet bilgisini dinamik olarak ekleme
    function updateCart() {
        const cartList = document.getElementById("cart-items");
        let message = "Sepetiniz: \n";

        // Sepet verisini listeye ekle ve mesajı oluştur
        if (cart.length === 0) {
            cartList.textContent = "Sepetiniz boş";
        } else {
            cartList.innerHTML = '';  // Sepet içeriğini temizle
            cart.forEach((item, index) => {
                // Sepet öğelerini listeye ekle
                const listItem = document.createElement("div");
                listItem.textContent = `${item.name} - ${item.price} - Adet: ${item.quantity || 1}`;
                
                // Silme butonu ekle
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Sil";
                deleteButton.onclick = function() {
                    removeFromCart(index);
                };
                
                listItem.appendChild(deleteButton);
                cartList.appendChild(listItem);

                // Mesajı oluştur
                message += `${item.name} - ${item.price} - Adet: ${item.quantity || 1}\n`;
            });

            // Sepet gönder butonuna tıklandığında mesajı gönder
            document.getElementById("send-cart").onclick = function() {
                sendWhatsAppMessage(message);
            };
        }
    }

    // Sepetten öğe silme fonksiyonu
    function removeFromCart(index) {
        cart.splice(index, 1); // Ürünü diziden kaldır
        localStorage.setItem("cart", JSON.stringify(cart)); // Güncellenmiş sepeti kaydet
        updateCart(); // Görünümü güncelle
    }


    // WhatsApp mesajını gönder
    function sendWhatsAppMessage(message) {
        // WhatsApp linkine mesajı ekle
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");
    }

    // Sayfa yüklendiğinde sepeti güncelle
    window.onload = updateCart;







    // Sepeti sıfırlama
    function sepetiSifirla() {
        localStorage.removeItem("cart");  // Sepeti temizler
        alert("Sepetiniz sıfırlandı.");
    }

    // Sepet ekleme kısmı sonrası zamanlayıcı başlatma
    setTimeout(sepetiSifirla, 3600000);  // 1 saat (3600000 ms) sonra sıfırlanır

    // Sepet yükleme ve görüntüleme
    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartContainer = document.getElementById("cart-items");

        if (!cartContainer) return; // Sepet alanı yoksa işlem yapma

        cartContainer.innerHTML = cart.length ? "" : "Sepetiniz boş";

        cart.forEach((item, index) => {
            let div = document.createElement("div");
            div.classList.add("cart-item"); 
            div.innerHTML = `${item.name} - ${item.price}₺ 
                <button onclick="removeFromCart(${index})">Sil</button>`;
            cartContainer.appendChild(div);
        });
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
