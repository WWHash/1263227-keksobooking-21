"use strict";

const HIDDEN = `hidden`;

const HousingType = {
  FLAT: `Квартира`,
  BUNGALO: `Бунгало`,
  HOUSE: `Дом`,
  PALACE: `Дворец`
};

const definitionType = function (type) {
  let housingType;
  switch (type) {
    case window.util.OffersType.FLAT:
      housingType = HousingType.FLAT;
      break;
    case window.util.OffersType.BUNGALO:
      housingType = HousingType.BUNGALO;
      break;
    case window.util.OffersType.HOUSE:
      housingType = HousingType.HOUSE;
      break;
    case window.util.OffersType.PALACE:
      housingType = HousingType.PALACE;
      break;
  }
  return housingType;
};

const getCardPhotos = function (photosElement, photos) {
  const imgClone = photosElement.querySelector(`img`);
  if (photos && photos.length > 0) {
    photos.forEach(function (photo) {
      const img = imgClone.cloneNode(true);
      img.src = photo;
      photosElement.appendChild(img);
    });
    imgClone.remove();
  } else {
    photosElement.classList.add(HIDDEN);
  }
};

const getFeaturesList = function (featureElement, features) {
  if (features && features.length > 0) {
    features.forEach(function (feature) {
      featureElement.querySelector(`.popup__feature--${feature}`).classList.remove(HIDDEN);
    });
  } else {
    featureElement.classList.add(HIDDEN);
  }
};

const fillTextContent = function (element, textContent) {
  if (textContent) {
    element.textContent = textContent;
  } else {
    element.classList.add(HIDDEN);
  }
};

const fillAvatarSrc = function (element, src) {
  if (src) {
    element.src = src;
  } else {
    element.classList.add(HIDDEN);
  }
};

const createCard = function (cardData) {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector(`.popup__title`);
  const cardAddress = card.querySelector(`.popup__text--address`);
  const cardPrice = card.querySelector(`.popup__text--price`);
  const cardType = card.querySelector(`.popup__type`);
  const cardCapacity = card.querySelector(`.popup__text--capacity`);
  const cardTime = card.querySelector(`.popup__text--time`);
  const cardFeatures = card.querySelector(`.popup__features`);
  const cardDescription = card.querySelector(`.popup__description`);
  const cardAvatar = card.querySelector(`.popup__avatar`);
  const cardPhotos = card.querySelector(`.popup__photos`);

  fillTextContent(cardTitle, cardData.offer.title);
  fillTextContent(cardAddress, cardData.offer.address);
  fillTextContent(cardPrice, `${cardData.offer.price} р/ночь`);
  fillTextContent(cardType, definitionType(cardData.offer.type));
  fillTextContent(cardCapacity, `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`);
  fillTextContent(cardTime, `Заезд после ${cardData.offer.checkin} выезд до ${cardData.offer.checkout}`);
  getFeaturesList(cardFeatures, cardData.offer.features);
  fillTextContent(cardDescription, cardData.offer.description);
  fillAvatarSrc(cardAvatar, cardData.author.avatar);
  getCardPhotos(cardPhotos, cardData.offer.photos);
  return card;
};

const renderCard = function (cardData) {
  closeCard();
  const card = createCard(cardData);
  const map = window.map.getMapElement();
  const mapFilterContainer = map.querySelector(`.map__filters-container`);
  map.insertBefore(card, mapFilterContainer);

  const closeBtn = card.querySelector(`.popup__close`);
  closeBtn.addEventListener(`click`, function (evt) {
    if (evt.button === 0) {
      closeCard();
    }
  });
};

const closeCard = function () {
  const card = document.querySelector(`.map__card`);
  if (card) {
    const pinActive = document.querySelector(`.map__pin--active`);
    pinActive.classList.remove(`map__pin--active`);
    card.remove();
  }
};

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
};

document.addEventListener(`keydown`, onPopupEscPress);

window.card = {
  renderCard,
  closeCard
};
