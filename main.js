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

window.addEventListener('load', () => {

    cartContainer.innerHTML = '';

    savedCart.forEach(item => {
        let product = document.createElement('div');
        product.className = 'image';
        product.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        <p class="price">${item.price}</p>
        <button class="remove">Remove</button>
    `;

        let removeBtn = product.querySelector('.remove');

        if (removeBtn) {

            removeBtn.removeAttribute('style');
            removeBtn.style.display = 'inline-block';
            removeBtn.classList.add('remove');
            removeBtn.addEventListener('click', () =>
                removeFromCart(product));
        }

        product.classList.add('fade-in');
        cartContainer.appendChild(product);

    });

    addButtons.forEach(btn => {

        let productName = btn.parentElement.querySelector('p').innerText;
        if (savedCart.some(item => item.name === productName)) {
            btn.parentElement.style.display = 'none';
        }
    });

    updateCartCount();

});

addButtons.forEach(btn => {

    btn.addEventListener('click', function () {

        let product = btn.parentElement;
        let clone = product.cloneNode(true);
        let removeBtn = clone.querySelector('.remove');
        let addBtn = clone.querySelector('.click');
        addBtn.style.display = 'none';

        if (removeBtn) {

            removeBtn.removeAttribute('style');
            removeBtn.style.display = 'inline-block';
            removeBtn.classList.add('remove');

            removeBtn.addEventListener('click', () =>
                removeFromCart(clone));

        }

        clone.classList.add('fade-in');
        cartContainer.appendChild(clone);
        let productData = {
            name: product.querySelector('p').innerText,
            image: product.querySelector('img').src,
            price: product.querySelector('.price') ? product.querySelector('.price').innerText : ''
        };

        savedCart.push(productData);
        localStorage.setItem('cartItems', JSON.stringify(savedCart));

        product.style.display = 'none';
        updateCartCount();
    });
});

function removeFromCart(product) {

    let name = product.querySelector('p').innerText;
    product.classList.add('fade-out'); setTimeout(() => {

savedCart = savedCart.filter(item => item.name !== name);


        localStorage.setItem('cartItems', JSON.stringify(savedCart));
        product.remove();
        document.querySelectorAll('.image, .image2').forEach(item => {

            if (item.querySelector('p').innerText === name) {
                item.style.display = 'block';
            }

        });

        updateCartCount();

    }, 300);

}

let searchInput = document.getElementById('search');
searchInput.addEventListener('input', function () {

    let searchValue = this.value.toLowerCase().trim();
    let allProducts = document.querySelectorAll('.image, .image2');

    allProducts.forEach(product => {
        let productName = product.querySelector('p').innerText.toLowerCase();
        if (productName.includes(searchValue)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    if (searchValue === '') {
        allProducts.forEach(product => {
            product.style.display = 'block';
        });
    }
});