"use strict";

(function () {

  const definitionType = function (type) {
    let housingType;
    switch (type) {
      case `flat`:
        housingType = `Квартира`;
        break;
      case `bungalo`:
        housingType = `Бунгало`;
        break;
      case `house`:
        housingType = `Дом`;
        break;
      case `palace`:
        housingType = `Дворец`;
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
      photosElement.classList.add(`hidden`);
    }
  };

  const getFeaturesList = function (featureElement, features) {
    if (features && features.length > 0) {
      features.forEach(function (feature) {
        featureElement.querySelector(`.popup__feature--${feature}`).classList.remove(`hidden`);
      });
    } else {
      featureElement.classList.add(`hidden`);
    }
  };

  const fillTextContent = function (element, textContent) {
    if (textContent) {
      element.textContent = textContent;
    } else {
      element.classList.add(`hidden`);
    }
  };

  const fillAvatarSrc = function (element, src) {
    if (src) {
      element.src = src;
    } else {
      element.classList.add(`hidden`);
    }
  };

  const createCard = function (cardData) {
    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    let card = cardTemplate.cloneNode(true);
    let cardTitle = card.querySelector(`.popup__title`);
    let cardAddress = card.querySelector(`.popup__text--address`);
    let cardPrice = card.querySelector(`.popup__text--price`);
    let cardType = card.querySelector(`.popup__type`);
    let cardCapacity = card.querySelector(`.popup__text--capacity`);
    let cardTime = card.querySelector(`.popup__text--time`);
    let cardFeatures = card.querySelector(`.popup__features`);
    let cardDescription = card.querySelector(`.popup__description`);
    let cardAvatar = card.querySelector(`.popup__avatar`);
    let cardPhotos = card.querySelector(`.popup__photos`);

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
    let card = createCard(cardData);
    let map = window.map.getMapElement();
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
    renderCard
  };

})();
