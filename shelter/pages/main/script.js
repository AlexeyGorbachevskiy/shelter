// Resize
// function resize() {
//     let cards = document.querySelectorAll('.card')
//     if (window.innerWidth >= 1280) {
//         cards[1].classList.add('card_visible')
//         cards[2].classList.add('card_visible')
//     }
//
//     if (window.innerWidth >= 768 && window.innerWidth < 1280) {
//         cards[2].classList.remove('card_visible')
//         cards[1].classList.add('card_visible')
//     }
//
//     if (window.innerWidth < 768) {
//         cards[1].classList.remove('card_visible')
//         cards[2].classList.remove('card_visible');
//     }
// }
//
// window.onload = function () {
//     resize()
// }
// window.addEventListener(`resize`, event => {
//     resize();
// }, false);


// Slider

const pets = [
    {
        "name": "Jennifer",
        "img": "../../assets/images/pets/pets-jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "../../assets/images/pets/sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "../../assets/images/pets/pets-woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Scarlett",
        "img": "../../assets/images/pets/pets-scarlet.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Katrine",
        "img": "../../assets/images/pets/pets-katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "../../assets/images/pets/pets-timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "../../assets/images/pets/pets-freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "../../assets/images/pets/pets-charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
]
let isEnabled = true;
let leftBtn = document.querySelector('.cards-wrapper__btn-left');
let leftBtn320 = document.querySelector('.cards-wrapper__btn-left-320');
let rightBtn = document.querySelector('.cards-wrapper__btn-right');
let rightBtn320 = document.querySelector('.cards-wrapper__btn-right-320');

leftBtn320.addEventListener('click', function () {
    if (isEnabled) {
        previousItem();
    }

})
leftBtn.addEventListener('click', function () {
    if (isEnabled) {
        previousItem();
    }

})

rightBtn320.addEventListener('click', function () {
    if (isEnabled) {
        nextItem();
    }
})

rightBtn.addEventListener('click', function () {
    if (isEnabled) {
        nextItem();
    }
})

const getAllCards = () => document.querySelectorAll('.card')

function generateNextCardsRandomIndexes(cards) {
    let randomIndexes = [];
    loop: for (let i = 0; i < cards.length; i++) {
        const min = 0;
        const max = pets.length - 1;
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);

        for (let value of randomIndexes) {
            if (value === rand) {
                i--;
                continue loop
            }
        }
        randomIndexes = [...randomIndexes, rand]
    }
    return randomIndexes
}

function createSliderElements(index) {
    let card = document.createElement('div');
    card.classList.add('card');
    let img = document.createElement('img');
    img.classList.add('card__img')
    img.setAttribute('src', pets[index]['img'])
    img.setAttribute('alt', `${pets[index]['type']} image`)
    let h3 = document.createElement('h3');
    h3.classList.add('card__title');
    h3.textContent = pets[index]['name'];
    let cardBtnWrapper = document.createElement('div');
    cardBtnWrapper.classList.add('cards-btn-wrapper');
    let btn = document.createElement('button');
    btn.classList.add('card__btn');
    btn.textContent = 'Learn more';
    btn.id = index;

    cardBtnWrapper.appendChild(btn);
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(cardBtnWrapper);
    return card
}

function toggleSlider() {
    let cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');

    const visibleCards = getAllCards();
    const randomIndexes = generateNextCardsRandomIndexes(visibleCards);


    for (let i = 0; i < randomIndexes.length; i++) {
        let card = createSliderElements(randomIndexes[i]);
        if (i === 1) {
            card.classList.add('card-320_invisible')
        }
        if (i === 2) {
            card.classList.add('card-768_invisible')
        }
        cardsWrapper.appendChild(card);
    }


    return cardsWrapper
}


function previousItem() {
    hideItem('to-right');
    showItem('from-left');
}

function nextItem() {
    hideItem('to-left');
    showItem('from-right');
}


function hideItem(direction) {
    isEnabled = false;

    let oldCardsWrapper = document.querySelector('.cards-wrapper');
    oldCardsWrapper.classList.add(direction);
    oldCardsWrapper.addEventListener('animationend', function () {
        this.classList.remove(direction);
        this.remove();
    })

}

function showItem(direction) {

    let newCardsWrapper = toggleSlider();
    let sliderWrapper = document.querySelector('.cards-content-wrapper')
    sliderWrapper.appendChild(newCardsWrapper)
    newCardsWrapper.classList.add(direction);
    newCardsWrapper.style.position = 'fixed';

    // newCardsWrapper.style.display = 'flex';

    newCardsWrapper.addEventListener('animationend', function () {
        this.classList.remove(direction);
        newCardsWrapper.style.position = 'relative';
        isEnabled = true;
    })


}


// Burger menu
let burgerIcon = document.querySelector('.burger-menu-icon');
let logo = document.querySelector('.logo');
let burgerMenuIcon = document.querySelector('.burger-menu-icon');
let blackout = document.querySelector('.sidebar-blackout');
let sidebar = document.querySelector('.sidebar');
let mainPage = document.querySelector('#main-page');
let makeAFriend = document.querySelector('#makeAFriend');
let ourFriends = document.querySelector('#ourFriends');
let sidebarBlackout = document.querySelector('.sidebar-blackout');
burgerIcon.addEventListener('click', () => {
    toggleSidebar();
})
sidebarBlackout.addEventListener('click', () => {
    toggleSidebar();
})
mainPage.addEventListener('click', () => {
    toggleSidebar();

})
makeAFriend.addEventListener('click', () => {
    location.href = "../pets/index.html"
})
ourFriends.addEventListener('click', () => {
    location.href = "../pets/index.html"
})

function toggleSidebar() {
    blackout.classList.toggle('blackout');
    logo.classList.toggle('sidebar-logo');
    burgerMenuIcon.classList.toggle('sidebar-burgerMenuIcon');
    sidebar.classList.toggle('sidebar_active');
}











