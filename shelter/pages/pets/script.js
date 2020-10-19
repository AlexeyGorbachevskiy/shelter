let burgerIcon = document.querySelector('.burger-menu-icon');
let logo = document.querySelector('.logo');
let logoTitle = document.querySelector('.logo__title');
let logoSubtitle = document.querySelector('.logo__subtitle');
let burgerMenuIcon = document.querySelector('.burger-menu-icon');
let blackout = document.querySelector('.sidebar-blackout');
let sidebar = document.querySelector('.sidebar');
let petsPage = document.querySelector('#pets-page');
let sidebarBlackout = document.querySelector('.sidebar-blackout');
let header = document.querySelector('.header');
let burgerMenuSpan = document.getElementsByClassName('burger-menu-icon__line');


burgerIcon.addEventListener('click', () => {
    toggleStyles();

})

sidebarBlackout.addEventListener('click', () => {
    toggleStyles();

})
petsPage.addEventListener('click', () => {
    toggleStyles();

})
logo.addEventListener('click',()=>{
    location.href = "../main/index.html"
})

function toggleStyles() {

    blackout.classList.toggle('blackout');
    logo.classList.toggle('sidebar-logo');
    logoTitle.classList.toggle('sidebar-logo__title');
    logoSubtitle.classList.toggle('sidebar-logo__subtitle');
    burgerMenuIcon.classList.toggle('sidebar-burgerMenuIcon');
    sidebar.classList.toggle('sidebar_active');
    header.classList.toggle('header');
    header.classList.toggle('sidebarHeader');

    for(let el of burgerMenuSpan){
        el.classList.toggle('noSidebarSpan');
        el.classList.toggle('sidebarSpan');
    }

}

