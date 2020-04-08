const menuToggle = document.querySelector('#menu-togle');
const mobileNavContainer = document.querySelector('.top-nav');

document.querySelector('[data-btn-video]').addEventListener('click', event => {
    event.preventDefault()
    document.querySelector('[data-modal-video]').style.display='block'
})

document.querySelector('[data-modal-video]').addEventListener('click', event => {
    event.preventDefault()
    document.querySelector('[data-modal-video]').style.display='none'
})

menuToggle.onclick = function(){
    menuToggle.classList.toggle('menu-icon-active');
    mobileNavContainer.classList.toggle('top-nav--active');
}