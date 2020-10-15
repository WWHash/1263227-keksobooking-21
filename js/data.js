"use strict";

(function () {
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
  const NUMBER_OF_OFFERS = 8;
  const map = document.querySelector(`.map`);

  const getRandomObject = function (id) {
    let x = window.util.getRandomNumber(0, map.offsetWidth);
    let y = window.util.getRandomNumber(MIN_Y, MAX_Y);
    return {
      author: {
        avatar: AVATARS[id],
      },
      offer: {
        title: window.util.getRandomElement(TITLES),
        address: `${x}, ${y}`,
        price: window.util.getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: window.util.getRandomElement(TYPES),
        rooms: window.util.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: window.util.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: window.util.getRandomElement(TIMES),
        checkout: window.util.getRandomElement(TIMES),
        features: window.util.getRandomElements(FEATURES),
        description: `описание обьявления`,
        photos: window.util.getRandomElements(PHOTOS),
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
  let offers = getOffers(NUMBER_OF_OFFERS);

  window.data = {
    offers,
    map
  };
})();
