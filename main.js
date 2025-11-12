const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

function toggleMenu() {
  menuIcon.classList.toggle("active");
  navbar.classList.toggle("active");
}

document.addEventListener("click", function (e) {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    navbar.classList.remove("active");
    menuIcon.classList.remove("active");
  }
});

let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  header.style.top = currentScroll > lastScrollTop ? "-100px" : "0";
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


let cartCount = document.getElementById('cart-count');
let addButtons = document.querySelectorAll('.click');
let savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartCount() {
  cartCount.textContent = savedCart.length;
}
updateCartCount();

function hideCartItems() {
  let allProducts = document.querySelectorAll('.image, .image2');
  allProducts.forEach(product => {
    let name = product.querySelector('p').innerText;
    if (savedCart.some(item => item.name === name)) {
      product.style.display = 'none';
    }
  });
}
hideCartItems();

addButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    let product = btn.parentElement;
    let productData = {
      name: product.querySelector('p').innerText,
      image: product.querySelector('img').src,
      price: product.querySelector('span:last-of-type').innerText
    };

    if (!savedCart.some(item => item.name === productData.name)) {
      savedCart.push(productData);
      localStorage.setItem('cartItems', JSON.stringify(savedCart));
      updateCartCount();
    }

    product.style.display = 'none';
  });
});

document.getElementById('search').addEventListener('input', function () {
  let searchValue = this.value.toLowerCase().trim();
  let allProducts = document.querySelectorAll('.image, .image2');
  allProducts.forEach(product => {
    let productName = product.querySelector('p').innerText.toLowerCase();
    product.style.display = productName.includes(searchValue) ? 'block' : 'none';
  });
});

window.addEventListener('load', () => {
  let lastRemoved = localStorage.getItem('lastRemoved');
  if (lastRemoved) {
    let allProducts = document.querySelectorAll('.image, .image2');
    allProducts.forEach(product => {
      let name = product.querySelector('p').innerText;
      if (name === lastRemoved) {
        product.style.display = 'block';
      }
    });
    localStorage.removeItem('lastRemoved');
  }
});