let pets = [];
let lastPage = 6;
let currentPage = 1;

fetch('../../json/pets.json')
    .then((res) => res.json())
    .then((res2) => {
        pets = res2;
        createFullPetsList();
        fullPetsList = sort863(fullPetsList);
        createPets(fullPetsList);
        initCards();
        displayCardsForPage(currentPage)
    })


// Pagination

let fullPetsList = []; // 48 elements

const createFullPetsList = () => {
    for (let i = 0; i < 6; i++) {
        let tempPets = [...pets];
        for (let j = pets.length; j > 0; j--) {
            let randInd = Math.floor(Math.random() * j);
            const randElem = tempPets.splice(randInd, 1)[0];
            tempPets.push(randElem);
        }
        fullPetsList = [...fullPetsList, ...tempPets];
    }
}

const sort863 = (list) => {
    let unique8List = [];
    let length = list.length;

    // until unique rows count - 6
    for (let i = 0; i < length / 8; i++) {
        const uniqueStepList = [];
        for (j = 0; j < list.length; j++) {
            if (uniqueStepList.length >= 8) {
                break;
            }
            const isUnique = !uniqueStepList.some((item) => {
                return item.name === list[j].name;
            });
            if (isUnique) {
                uniqueStepList.push(list[j]);
                list.splice(j, 1);
                j--;
            }
        }
        unique8List = [...unique8List, ...uniqueStepList];
    }
    list = unique8List;


    list = sort6recursively(list);

    return list;
}

const sort6recursively = (list) => {
    const length = list.length;

    // until unique rows count - 8
    for (let i = 0; i < (length / 6); i++) {

        // search for equal elements in each 6 elements in fullPetsList
        const stepList = list.slice(i * 6, (i * 6) + 6);
        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });

            if (duplicatedItem !== undefined) {
                // index of  duplicatedItem in fullPetsList
                const ind = (i * 6) + j;
                // which row (from 8) duplicatedItem belongs
                const which8OfList = Math.trunc(ind / 8);

                // delete duplicatedItem and paste it in begin of 8 row
                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

                sort6recursively(list);
            }
        }
    }

    return list;
}

const createPets = (petsList) => {
    const wrapper = document.querySelector(".cards-content-wrapper");
    wrapper.innerHTML += createElements(petsList);
}

const createElements = (petsList) => {
    let str = '';
    for (let i = 0; i < petsList.length; i++) {
        // str += `<img src=" ${ petsList[i].img } ">`;
        str += `<div id=${petsList[i].id} class="card">
                        <img class="card__img" src="${petsList[i].img}" alt="${petsList[i].breed} image">
                        <h3 class="card__title">${petsList[i].name}</h3>
                        <div class="cards-btn-wrapper">
                            <button class="card__btn">Learn more</button>
                        </div>
                    </div>`;
    }
    return str;
}

const displayCardsForPage = (currentPage) => {
    const itemsOnPageCount = fullPetsList.length / lastPage;
    const allCards = document.querySelectorAll('.card');

    for (let i = 0; i < allCards.length; i++) {
        if (i >= (currentPage * itemsOnPageCount) - itemsOnPageCount && i <= (currentPage * itemsOnPageCount) - 1) {
            allCards[i].classList.remove('card_invisible');
            allCards[i].classList.add('card_visible');
        } else {
            allCards[i].classList.remove('card_visible');
            allCards[i].classList.add('card_invisible');
        }
    }
}


window.addEventListener('load', () => {
    lastPage = getLastPage();
})
window.addEventListener('resize', () => {
    let prevLastPage = lastPage;
    lastPage = getLastPage();
    changeCurrentPage(prevLastPage, lastPage)
    document.querySelector("#currentPage").textContent = (currentPage).toString();
    displayCardsForPage(currentPage);
    checkPaginatorBtnsStyles();
})

const changeCurrentPage = (prevLastPage, lastPage) => {
    if (prevLastPage !== lastPage) {
        const itemsOnPrevPageCount = fullPetsList.length / prevLastPage;
        const itemsOnNewPageCount = fullPetsList.length / lastPage;
        // not index but number (1 instead 0) in full pets list
        let firstElementNumber = (itemsOnPrevPageCount * (currentPage - 1)) + 1;


        currentPage = Math.ceil(firstElementNumber / itemsOnNewPageCount);

    }
}

const getLastPage = () => {
    if (document.querySelector("body").offsetWidth >= 1280) {
        return 6
    } else if (document.querySelector("body").offsetWidth >= 768 && document.querySelector("body").offsetWidth < 1280) {
        return 8
    } else if (document.querySelector("body").offsetWidth < 768) {
        return 16
    }
}

const checkPaginatorBtnsStyles = () => {
    if (currentPage === 1) {
        document.querySelector("#prevPage").classList.add('paginator_inactive');
        document.querySelector("#prevPage").classList.remove('paginator_active');
        document.querySelector("#to-firstPage").classList.remove('paginator_active');
        document.querySelector("#to-firstPage").classList.add('paginator_inactive');
    }
    if (currentPage < lastPage) {
        document.querySelector("#nextPage").classList.add('paginator_active');
        document.querySelector("#nextPage").classList.remove('paginator_inactive');
        document.querySelector("#to-LastPage").classList.add('paginator_active');
        document.querySelector("#to-LastPage").classList.remove('paginator_inactive');
    }
    if (currentPage > 1) {
        document.querySelector("#prevPage").classList.remove('paginator_inactive');
        document.querySelector("#prevPage").classList.add('paginator_active');
        document.querySelector("#to-firstPage").classList.add('paginator_active');
        document.querySelector("#to-firstPage").classList.remove('paginator_inactive');
    }
    if (currentPage === lastPage) {
        document.querySelector("#nextPage").classList.add('paginator_inactive');
        document.querySelector("#nextPage").classList.remove('paginator_active');
        document.querySelector("#to-LastPage").classList.remove('paginator_active');
        document.querySelector("#to-LastPage").classList.add('paginator_inactive');
    }
}


document.querySelector("#prevPage").addEventListener('click', (e) => {
    if (currentPage > 1) {
        currentPage--;
    }
    checkPaginatorBtnsStyles();
    document.querySelector("#currentPage").textContent = (currentPage).toString();
    displayCardsForPage(currentPage);

});

document.querySelector("#nextPage").addEventListener('click', (e) => {
    if (currentPage < lastPage) {
        currentPage++;
    }
    checkPaginatorBtnsStyles()
    document.querySelector("#currentPage").textContent = (currentPage).toString();
    displayCardsForPage(currentPage);
});
document.querySelector("#to-LastPage").addEventListener('click', (e) => {
    currentPage = lastPage;
    document.querySelector("#currentPage").textContent = (currentPage).toString();
    checkPaginatorBtnsStyles();
    displayCardsForPage(currentPage);
});
document.querySelector("#to-firstPage").addEventListener('click', (e) => {
    currentPage = 1;
    document.querySelector("#currentPage").textContent = (currentPage).toString();
    checkPaginatorBtnsStyles();
    displayCardsForPage(currentPage);
});


//Pop up

// window.onload = function () {
//     initCards()
// }

function initCards() {
    let cards = document.querySelectorAll('.card');
    for (let el of cards) {
        el.addEventListener('click', (e) => {
            openPopUp(e);
        })
    }
}


function openPopUp(e) {

    document.body.style.overflow = 'hidden';
    const modalWindow = document.querySelector('.modal-window');
    const popupWrapper = document.querySelector('.popup-wrapper');

    document.querySelector('.popup-img').src = `${pets[e.currentTarget.id]['img']}`;
    document.querySelector('.popup-content__h3').textContent = `${pets[e.currentTarget.id]['name']}`;
    document.querySelector('.popup-content__h4').textContent = `${pets[e.currentTarget.id]['type']} - ${pets[e.currentTarget.id]['breed']}`;
    document.querySelector('.popup-content__h5').textContent = `${pets[e.currentTarget.id]['description']}`;
    document.querySelector('.popup-content__age').textContent = `${pets[e.currentTarget.id]['age']}`;
    document.querySelector('.popup-content__inoculations').textContent = `${pets[e.currentTarget.id]['inoculations']}`;
    document.querySelector('.popup-content__diseases').textContent = `${pets[e.currentTarget.id]['diseases']}`;
    document.querySelector('.popup-content__parasites').textContent = `${pets[e.currentTarget.id]['parasites']}`;

    modalWindow.style.display = 'flex';

    modalWindow.addEventListener('click', (e) => {
        if (modalWindow === e.target || popupWrapper === e.target) {
            document.body.style.overflow = 'auto';
            modalWindow.style.display = 'none';
            e.stopPropagation();
        }
    })
    const closeBtn = document.querySelector('.popup-close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.style.overflow = 'visible';
        modalWindow.style.display = 'none';
    })

}


// Sidebar
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
logo.addEventListener('click', () => {
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

    for (let el of burgerMenuSpan) {
        el.classList.toggle('noSidebarSpan');
        el.classList.toggle('sidebarSpan');
    }

}

