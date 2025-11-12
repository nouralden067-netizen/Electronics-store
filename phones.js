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


let cartCountEl = document.getElementById("cart-count");
let addButtons = document.querySelectorAll(".click");
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


function updateCartCount() {
  const totalQty = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCountEl.textContent = totalQty;
}
updateCartCount();


function hideCartItems() {
  let allProducts = document.querySelectorAll(".image, .image2");
  allProducts.forEach((product) => {
    let name = product.querySelector("p").innerText;
    if (cartItems.some((item) => item.name === name)) {
      product.style.display = "none";
    }
  });
}
hideCartItems();


addButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let product = btn.parentElement;
    let productData = {
      name: product.querySelector("p").innerText,
      image: product.querySelector("img").src,
      price: product.querySelector("span:last-of-type").innerText,
      quantity: 1,
    };

    if (!cartItems.some((item) => item.name === productData.name)) {
      cartItems.push(productData);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartCount();
    }

    product.style.display = "none";
  });
});


const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    let searchValue = this.value.toLowerCase().trim();
    let allProducts = document.querySelectorAll(".image, .image2");
    allProducts.forEach((product) => {
      let productName = product.querySelector("p").innerText.toLowerCase();
      product.style.display = productName.includes(searchValue) ? "block" : "none";
    });
  });
}


window.addEventListener("load", () => {
  let lastRemoved = localStorage.getItem("lastRemoved");
  if (lastRemoved) {
    let allProducts = document.querySelectorAll(".image, .image2");
    allProducts.forEach((product) => {
      let name = product.querySelector("p").innerText;
      if (name === lastRemoved) {
        product.style.display = "block";
      }
    });
    localStorage.removeItem("lastRemoved");
  }
});

const images = document.querySelectorAll(".media img");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
let current = 0;

function showSlide(index) {
  images.forEach((img, i) => img.classList.toggle("active", i === index));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  current = index;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    let newIndex = current - 1;
    if (newIndex < 0) newIndex = images.length - 1;
    showSlide(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    let newIndex = current + 1;
    if (newIndex >= images.length) newIndex = 0;
    showSlide(newIndex);
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => showSlide(parseInt(dot.dataset.index)));
});

const dec = document.getElementById("dec");
const inc = document.getElementById("inc");
const qtyEl = document.getElementById("qty");
const addBtn = document.getElementById("addBtn");
const nameEl = document.getElementById("productName");
const priceEl = document.getElementById("productPrice");

let qty = 1;

function renderQty() {
  if (qtyEl) qtyEl.textContent = qty;
}

if (dec && inc) {
  dec.addEventListener("click", () => {
    if (qty > 1) qty--;
    renderQty();
  });

  inc.addEventListener("click", () => {
    qty++;
    renderQty();
  });
}

if (addBtn) {
  addBtn.addEventListener("click", () => {
    const item = {
      name: nameEl.textContent,
      price: priceEl.textContent,
      image: images[current]?.src || "",
      quantity: qty,
    };

    const existingItem = cartItems.find((i) => i.name === item.name);

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cartItems.push(item);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount();

    addBtn.textContent = "Added ✓";
    addBtn.disabled = true;
    setTimeout(() => {
      addBtn.textContent = "Add to cart";
      addBtn.disabled = false;
    }, 1000);
  });
}

renderQty();
