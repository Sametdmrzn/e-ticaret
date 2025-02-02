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



    function sendCartToWhatsApp() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        if (cart.length === 0) {
            alert("Sepetiniz boş!");
            return;
        }
    
        let message = "Sipariş Listesi:\n";
        cart.forEach((item, index) => {
            message += `${index + 1}) ${item.name} - ${item.price}₺\n`;
        });
    
        message += "\n Sepetimde bulunan ürünleri istiyorum.";
    
        // WhatsApp linkini oluştur ve yeni sekmede aç
        const whatsappLink = `https://wa.me/905469467889?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");
    }
    
    // HTML'de bir butona bağla:
    document.getElementById("send-cart").addEventListener("click", sendCartToWhatsApp);
    



    // Sepeti sıfırlama
    function sepetiSifirla() {
        localStorage.removeItem("cart");  // Sepeti temizler
        alert("Sepetiniz sıfırlandı.");
    }

    // Sepet ekleme kısmı sonrası zamanlayıcı başlatma
    setTimeout(sepetiSifirla, 3600000);  // 1 saat (3600000 ms) sonra sıfırlanır

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartContainer = document.getElementById("cart-items");
    
        if (!cartContainer) return; // Sepet alanı yoksa işlem yapma
    
        cartContainer.innerHTML = cart.length ? "" : "Sepetiniz boş";
    
        cart.forEach((item, index) => {
            let div = document.createElement("div");
            div.classList.add("cart-item"); 
            div.innerHTML = `${item.name} - ${item.price}₺ 
                <button class="remove-btn" onclick="removeFromCart(${index})">Sil</button>`; // Butona sınıf ekledik
            cartContainer.appendChild(div);
        });
    }
    
        // Sepetten öğe silme fonksiyonu
        function removeFromCart(index) {
            cart.splice(index, 1); // Ürünü diziden kaldır
            localStorage.setItem("cart", JSON.stringify(cart)); // Güncellenmiş sepeti kaydet
            updateCart(); // Görünümü güncelle
        }
    

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
