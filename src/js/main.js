const menuToggle = document.querySelector('#menu-togle');
const mobileNavContainer = document.querySelector('.top-nav');

menuToggle.onclick = function(){
    menuToggle.classList.toggle('menu-icon-active');
    mobileNavContainer.classList.toggle('top-nav--active');
}

