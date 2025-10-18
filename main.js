function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        header.style.top = "-100px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

let page = document.getElementById('page');
let cartCount = document.getElementById('cart-count');
let addButtons = document.querySelectorAll('.click');

let cartContainer = document.createElement('div');
cartContainer.id = "cart-items";
cartContainer.style.display = 'flex';
cartContainer.style.flexWrap = 'wrap';
cartContainer.style.justifyContent = 'center';
cartContainer.style.gap = '20px';
cartContainer.style.marginTop = '20px';
page.appendChild(cartContainer);

function getcart() {
    page.style.display = 'block';
}
function getbutton() {
    page.style.display = 'none';
}

let savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartCount() {
    cartCount.textContent = savedCart.length;
}

// ✅ تحميل المنتجات من localStorage
window.addEventListener('load', () => {
    cartContainer.innerHTML = '';

    savedCart.forEach(itemHTML => {
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = itemHTML.trim();
        let product = tempDiv.firstElementChild;

        let removeBtn = product.querySelector('.remove');
        if (removeBtn) {
            removeBtn.removeAttribute('style'); // ✅ يمسح أي ستايل داخلي
            removeBtn.style.display = 'inline-block';
            removeBtn.classList.add('remove');
            removeBtn.addEventListener('click', () => removeFromCart(product));
        }

        // 🔥 أنيميشن دخول
        product.classList.add('fade-in');

        cartContainer.appendChild(product);
    });

    addButtons.forEach(btn => {
        let productName = btn.parentElement.querySelector('p').innerText;
        if (savedCart.some(item => item.includes(productName))) {
            btn.parentElement.style.display = 'none';
        }
    });

    updateCartCount();
});

// ✅ عند الضغط على Add to Cart
addButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        let product = btn.parentElement;
        let clone = product.cloneNode(true);

        let removeBtn = clone.querySelector('.remove');
        let addBtn = clone.querySelector('.click');

        addBtn.style.display = 'none';

        if (removeBtn) {
            removeBtn.removeAttribute('style'); // ✅ يمسح أي ستايل داخلي
            removeBtn.style.display = 'inline-block';
            removeBtn.classList.add('remove');
            removeBtn.addEventListener('click', () => removeFromCart(clone));
        }

        // 🔥 أنيميشن دخول
        clone.classList.add('fade-in');

        cartContainer.appendChild(clone);

        savedCart.push(clone.outerHTML);
        localStorage.setItem('cartItems', JSON.stringify(savedCart));

        product.style.display = 'none';

        updateCartCount();
    });
});

// ✅ إزالة المنتج من السلة + أنيميشن خروج
function removeFromCart(product) {
    let name = product.querySelector('p').innerText;

    // 🔥 أنيميشن خروج
    product.classList.add('fade-out');

    // بعد انتهاء الأنيميشن احذف العنصر فعليًا
    setTimeout(() => {
        savedCart = savedCart.filter(item => {
            let temp = document.createElement('div');
            temp.innerHTML = item;
            let itemName = temp.querySelector('p').innerText;
            return itemName !== name;
        });

        localStorage.setItem('cartItems', JSON.stringify(savedCart));
        product.remove();

        // نظهر المنتج تاني في الصفحة الرئيسية
        document.querySelectorAll('.image, .image2').forEach(item => {
            if (item.querySelector('p').innerText === name) {
                item.style.display = 'block';
            }
        });

        updateCartCount();
    }, 300); // نفس زمن الأنيميشن
}
// ✅ البحث في المنتجات
let searchInput = document.getElementById('search');

// لما المستخدم يكتب في البحث
searchInput.addEventListener('input', function () {
    let searchValue = this.value.toLowerCase().trim();

    // هنجمع كل المنتجات سواء في الصفحة أو السلة
    let allProducts = document.querySelectorAll('.image, .image2');

    allProducts.forEach(product => {
        let productName = product.querySelector('p').innerText.toLowerCase();

        // لو المنتج فيه الكلمة المكتوبة يظهر، غير كده يختفي
        if (productName.includes(searchValue)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });

    // ✅ لو خانة البحث فاضية، رجّع كل المنتجات تظهر تاني
    if (searchValue === '') {
        allProducts.forEach(product => {
            product.style.display = 'block';
        });
    }
});
