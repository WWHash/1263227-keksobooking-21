'use strict';

const AVATARS = [`img/avatars/user01.png`, `img/avatars/user02.png`, `img/avatars/user03.png`, `img/avatars/user04.png`, `img/avatars/user05.png`, `img/avatars/user06.png`, `img/avatars/user07.png`, `img/avatars/user08.png`];
const TITLES = [`Сдаю квартиру`, `Продаю квартиру`, `Квартира с ремонтом`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_Y = 130;
const MAX_Y = 630;
const MIN_ROOMS = 1;
const MAX_ROOMS = 3;
const MIN_GUESTS = 1;
const MAX_GUESTS = 4;
const MIN_PRICE = 10000;
const MAX_PRICE = 3000000;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const NUMBER_OF_OFFERS = 8;

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

let getRandomElement = function (arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const getRandomElements = function (arr) {
  let newArray = [];
  for (let i = 0; i < getRandomNumber(0, arr.length); i++) {
    let randomElement = getRandomElement(arr);
    if (!newArray.includes(randomElement)) {
      newArray.push(randomElement);
    }
  }
  return newArray;
};

const getRandomObject = function (id) {
  let x = getRandomNumber(0, map.offsetWidth);
  let y = getRandomNumber(MIN_Y, MAX_Y);
  return {
    author: {
      avatar: AVATARS[id],
    },
    offer: {
      title: getRandomElement(TITLES),
      address: `${x}, ${y}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: getRandomElements(FEATURES),
      description: `описание обьявления`,
      photos: getRandomElements(PHOTOS),
    },
    location: {
      x,
      y
    }
  };
};

const getOffers = function (count) {
  const offers = [];
  for (let i = 0; i < count; i++) {
    offers.push(getRandomObject(i));
  }
  return offers;
};

map.classList.remove(`map--faded`);

const renderPin = function (pin) {
  let pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute(`style`, `left: ${pin.location.x - (PIN_WIDTH / 2)}px ; top: ${pin.location.y - PIN_HEIGHT}px`);
  const img = pinElement.querySelector(`img`);
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;
  return pinElement;
};

const drawPins = function (collection) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < collection.length; i++) {
    fragment.appendChild(renderPin(collection[i]));
  }
  mapPins.appendChild(fragment);
};

let offers = getOffers(NUMBER_OF_OFFERS);
drawPins(offers);
