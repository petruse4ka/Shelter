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
let newPets = shuffle([...pets]);

/* Fill list of Pets with items on main page */

let petList = document.querySelector('.pets-cards__list');
let itemsPerPage;

let populateSlider = (array, items) => {
    for (let i = 0; i < (items * 2); i++) {
        let petItem = document.createElement('li');
        let petImage = document.createElement('img')
        let petTitle = document.createElement('h4')
        let petButton = document.createElement('a')

        petItem.classList.add('pets-cards__item');
        petItem.id = array[i].id;
    
        petTitle.classList.add('pets-cards__item-heading');
        petTitle.textContent = array[i].name;
    
        petButton.classList.add('button', 'pets-cards__item-link');
        petButton.textContent = 'Learn more'
    
        petImage.classList.add('pets-cards__item-image');
        petImage.alt = array[i].alt;
        petImage.src = array[i].img;

        petItem.appendChild(petImage);
        petItem.appendChild(petTitle);
        petItem.appendChild(petButton);
        petItem.addEventListener('click', () => {
            openPopup(petItem.id)
        });

        petList.appendChild(petItem);
    }
}

/* Repopulate list of pets with a newly shuffled array */

let clearSlider = () => {
    petList.innerHTML = '';
}

let reshuffleArrayRight = (array, items) => {
    let lastObjects = array.slice(items, (items * 2));
    let remainingElements = shuffle(pets.filter(item1 => 
        !lastObjects.some(item2 => item2.id === item1.id)
      ));
    let newElements = remainingElements.slice(0, items);
    let newPets = [...lastObjects, ...newElements];
    return newPets;
}

let reshuffleArrayLeft = (array, items) => {
    let firstObjects = array.slice(0, items);
    let remainingElements = shuffle(pets.filter(item1 => 
        !firstObjects.some(item2 => item2.id === item1.id)
    ));
    let newElements = remainingElements.slice(0, items);
    let newPets = [...newElements, ...firstObjects];
    return newPets;
}

let reshuffleArray = (array, items) => {
    if (array.length < (items * 2)) {
        let remainingElements = shuffle(pets.filter(item1 => 
            !array.some(item2 => item2.id === item1.id)
        ));
        let newElements = remainingElements.slice(0, items);
        return [...array, ...newElements];
    }
    return array; 
}

/* Infinite Slider */

let slider = document.querySelector('.pets-cards');
let slideRight = document.querySelector('.button-paginator_right');
let slideLeft = document.querySelector('.button-paginator_left');
let petListGap = parseInt(window.getComputedStyle(petList).getPropertyValue('gap'));

if (window.innerWidth >= 1280) {
    itemsPerPage = 3;
} else if (window.innerWidth >= 768) {
    itemsPerPage = 2;
} else {
    itemsPerPage = 1;
}

populateSlider(newPets, itemsPerPage);

let leftSlide = () => {
    newPets = reshuffleArrayLeft(newPets, itemsPerPage);
    clearSlider();
    populateSlider(newPets, itemsPerPage);
    slider.classList.add('pets-cards__no-scroll');
    slider.scrollLeft += (slider.offsetWidth + petListGap);
    slider.classList.remove('pets-cards__no-scroll');
    slider.scrollLeft -= (slider.offsetWidth + petListGap);
}

let rightSlide = () => {
    newPets = reshuffleArrayRight(newPets, itemsPerPage);
    clearSlider();
    populateSlider(newPets, itemsPerPage);
    slider.classList.add('pets-cards__no-scroll');
    slider.scrollLeft -= (slider.offsetWidth + petListGap);
    slider.classList.remove('pets-cards__no-scroll');
    slider.scrollLeft += (slider.offsetWidth + petListGap); 
}

slideLeft.addEventListener('click', () => {
    if (slider.scrollLeft === 0) {
        leftSlide();
    } else {
        slider.scrollLeft -= (slider.offsetWidth + petListGap);
    }
});


slideRight.addEventListener('click', () => {
    if (slider.scrollLeft === 0) {
        slider.scrollLeft += (slider.offsetWidth + petListGap);
    } else {
    rightSlide();
    }
})

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1279) {
        itemsPerPage = 3;
        petListGap = parseInt(window.getComputedStyle(petList).getPropertyValue('gap'));
        if (slider.scrollLeft !== 0) {
            slider.classList.add('pets-cards__no-scroll');
            slider.scrollLeft = slider.scrollWidth - slider.clientWidth;
            slider.classList.remove('pets-cards__no-scroll');
        }
    } else if (window.innerWidth >= 767) {
        itemsPerPage = 2;
        petListGap = parseInt(window.getComputedStyle(petList).getPropertyValue('gap'));
    } else {
        itemsPerPage = 1;
        petListGap = parseInt(window.getComputedStyle(petList).getPropertyValue('gap'));
    }
    
    newPets = reshuffleArray(newPets, itemsPerPage);
    clearSlider();
    populateSlider(newPets, itemsPerPage);
});

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