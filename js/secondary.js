/* Burger Menu */

let burger = document.querySelector('.header-nav__burger');
let menu = document.querySelector('.header-nav__list');
let menuBackground = document.querySelector('.menu-background');
let body = document.body;
let overlay = document.querySelector('.overlay');

function burgerMenu () {
    burger.classList.toggle('header-nav__burger_active');
    menu.classList.toggle('header-nav__list_active');
    menuBackground.classList.toggle('menu-background_active');
    body.classList.toggle('no-scroll');
    overlay.classList.toggle('overlay_active');
};

/* Open Burger Menu */

burger.addEventListener('click', () => {
    burgerMenu();

    window.scrollTo({
        top: 0,
    });
});

/* Close Burger Menu */

overlay.addEventListener('click', (event) => {
    if (event.target.classList.contains('overlay') && window.getComputedStyle(menuBackground).display === 'block') {
        burgerMenu();
    }
});

menu.addEventListener('click', (event) => {
    if (event.target.classList.contains('header-nav__link') && window.getComputedStyle(burger).display === 'block') {
        burgerMenu();
    }
}
);

window.addEventListener('resize', () => {
    if (window.innerWidth > 767 && !modal.open) {
        burger.classList.remove('header-nav__burger_active');
        menu.classList.remove('header-nav__list_active');
        menuBackground.classList.remove('menu-background_active');
        body.classList.remove('no-scroll');
        overlay.classList.remove('overlay_active');
    }
});

/* Shuffle array of pets with the Fisher–Yates */

function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--; 
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

import { pets } from './pets.js';

let shufflePets = shuffle(pets);
let firstHalf = shufflePets.slice(0, 4);
let secondHalf = shufflePets.slice(4, 8);

function getRandomOrder(arr1, arr2) {
    return Math.random() < 0.5 ? [arr1, arr2] : [arr2, arr1];
}

let [firstHalfRandom, secondHalfRandom] = getRandomOrder(firstHalf, secondHalf);
let newPets = [];

for (let i = 0; i < 6; i++) {
    newPets = newPets.concat(shuffle(firstHalfRandom), shuffle(secondHalfRandom));
}

/* Fill list of Pets with items on pets page */

let petListInternal = document.querySelector('.pets-cards__list_internal');
let populatePaginator = (array, page, items) => {

    for (let i = items * (page - 1); i < (items * page); i++) {
        let petItem = document.createElement('li');
        let petImage = document.createElement('img');
        let petTitle = document.createElement('h4');
        let petButton = document.createElement('a');

        petItem.classList.add('pets-cards__item');
        petItem.id = array[i].id;
    
        petTitle.classList.add('pets-cards__item-heading');
        petTitle.textContent = array[i].name;
    
        petButton.classList.add('button', 'pets-cards__item-link');
        petButton.textContent = 'Learn more';
    
        petImage.classList.add('pets-cards__item-image');
        petImage.alt = array[i].alt;
        petImage.src = array[i].img;

        petItem.appendChild(petImage);
        petItem.appendChild(petTitle);
        petItem.appendChild(petButton);
        petItem.addEventListener('click', () => {
            openPopup(petItem.id);
        });

        petListInternal.appendChild(petItem);
    }
}

/* Paginator */

let nextPage = document.querySelector('.paginator__next');
let lastPage = document.querySelector('.paginator__last');
let prevPage = document.querySelector('.paginator__prev');
let firstPage = document.querySelector('.paginator__first');
let currentPage = document.querySelector('.paginator__current');
let currentPageNumber;
let itemsPerPage;
let totalPages;

if (window.innerWidth >= 1280) {
    itemsPerPage = 8;
    totalPages = newPets.length / itemsPerPage;
} else if (window.innerWidth >= 768) {
    itemsPerPage = 6;
    totalPages = newPets.length / itemsPerPage;
} else {
    itemsPerPage = 3;
    totalPages = newPets.length / itemsPerPage;
}

let populatePage = (page) => {
    petListInternal.innerHTML = '';
    populatePaginator(newPets, page, itemsPerPage);
    currentPage.innerHTML = page;
    currentPageNumber = page;

    firstPage.classList.toggle('paginator_inactive', page === 1);
    firstPage.classList.add('paginator_active', page === 2);
    prevPage.classList.toggle('paginator_inactive', page === 1);
    prevPage.classList.add('paginator_active', page === 2);
    nextPage.classList.add('paginator_active', page === 1);
    nextPage.classList.toggle('paginator_inactive', page === totalPages);
    lastPage.classList.add('paginator_active', page === 1);
    lastPage.classList.toggle('paginator_inactive', page === totalPages);
}

nextPage.addEventListener('click', () => {
    if (currentPageNumber < totalPages) {
        petListInternal.classList.remove('fade-in');
        petListInternal.classList.add('fade-out');
        nextPage.classList.add('paginator_disabled')

        setTimeout(() => {
            populatePage(currentPageNumber + 1);
            petListInternal.classList.remove('fade-out');
            petListInternal.classList.add('fade-in');
            nextPage.classList.remove('paginator_disabled')
        }, 200);
    }
});

lastPage.addEventListener('click', () => {
    petListInternal.classList.remove('fade-in');
    petListInternal.classList.add('fade-out');
    
    setTimeout(() => {
        populatePage(totalPages);
        petListInternal.classList.remove('fade-out');
        petListInternal.classList.add('fade-in');
    }, 200);
});

prevPage.addEventListener('click', () => {
    if (currentPageNumber > 1) {
        petListInternal.classList.remove('fade-in');
        petListInternal.classList.add('fade-out');
        prevPage.classList.add('paginator_disabled');

        setTimeout(() => {
            populatePage(currentPageNumber - 1);
            petListInternal.classList.remove('fade-out');
            petListInternal.classList.add('fade-in');
            prevPage.classList.remove('paginator_disabled')
        }, 200);
    }
});

firstPage.addEventListener('click', () => {
    petListInternal.classList.remove('fade-in');
    petListInternal.classList.add('fade-out');

    setTimeout(() => {
        populatePage(1);
        petListInternal.classList.remove('fade-out');
        petListInternal.classList.add('fade-in');
    }, 200);
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
        itemsPerPage = 8;
        totalPages = newPets.length / itemsPerPage;
    } else if (window.innerWidth >= 768) {
        itemsPerPage = 6;
        totalPages = newPets.length / itemsPerPage;
    } else {
        itemsPerPage = 3;
        totalPages = newPets.length / itemsPerPage;
    }

    if (currentPageNumber > totalPages) {
        currentPageNumber = totalPages;
    }
    
    populatePage(currentPageNumber);
});

populatePage(1);

/* Pop-up window */

let petCard = document.querySelectorAll('.pets-cards__item');
let modal = document.querySelector('.pets-popup');
let modalContainer = document.querySelector('.pets-popup__container');

/* Fill Pop-up with data from the selected pet */

function openPopup (petId) {
    let imgPopup = document.querySelector('.pets-popup__image');
    let titlePopup = document.querySelector('.pets-popup__title');
    let subtitlePopup = document.querySelector('.pets-popup__subtitle');
    let descriptionPopup = document.querySelector('.pets-popup__description');
    let itemAge = document.querySelector('.pets-popup__item-age');
    let itemInoculations = document.querySelector('.pets-popup__item-inoculations');
    let itemDisease = document.querySelector('.pets-popup__item-disease');
    let itemParasites = document.querySelector('.pets-popup__item_parasites');
    let listItem = newPets.find((element) => element.id === petId);

    if (listItem) {
        imgPopup.alt = listItem.alt;
        imgPopup.src = listItem.img;

        titlePopup.textContent = listItem.name;

        subtitlePopup.textContent = listItem.type + ' - ' + listItem.breed;

        descriptionPopup.textContent = listItem.description;

        itemAge.innerHTML = `<strong>Age:</strong> ${listItem.age}`;
        itemInoculations.innerHTML = `<strong>Inoculations:</strong> ${listItem.inoculations.join(', ')}`;
        itemDisease.innerHTML = `<strong>Disease:</strong> ${listItem.diseases.join(', ')}`;
        itemParasites.innerHTML = `<strong>Parasites:</strong> ${listItem.parasites.join(', ')}`;

        modal.showModal();
        body.classList.add('no-scroll');
    }
}

modalContainer.addEventListener('mouseenter', () => {
    modal.classList.toggle('pets-popup__hover');
  });
  
  modalContainer.addEventListener('mouseleave', () => {
    modal.classList.toggle('pets-popup__hover');
  });

/* Open Pop-up */

petCard.forEach((pet) => {
    pet.addEventListener('click', () => {
        openPopup(pet.id);
    });
});

/* Close Pop-up */

modal.addEventListener('click', (event) => {
    if (event.clientX < modal.getBoundingClientRect().left || event.clientX > modal.getBoundingClientRect().right || event.clientY < modal.getBoundingClientRect().top || event.clientY > modal.getBoundingClientRect().bottom) {
        modal.close();
        body.classList.remove('no-scroll');
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.open) { 
        body.classList.remove('no-scroll');
    }
});