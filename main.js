function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  
    if (currentScroll > lastScrollTop) {
        header.style.top = "-100px";
    } 

    else {
        header.style.top = "0"; 
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
