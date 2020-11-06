"use strict";

(function () {
  const MAX_PIN_COUNT = 5;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const mapPins = document.querySelector(`.map__pins`);

  const renderPin = function (pin) {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    let pinElement = pinTemplate.cloneNode(true);
    pinElement.setAttribute(`style`, `left: ${pin.location.x - (PIN_WIDTH / 2)}px ; top: ${pin.location.y - PIN_HEIGHT}px`);
    const img = pinElement.querySelector(`img`);
    img.src = pin.author.avatar;
    img.alt = pin.offer.title;

    pinElement.addEventListener(`click`, function () {
      pinElement.classList.add(`map__pin--active`);
      window.card.renderCard(pin);
    });

    pinElement.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.card.renderCard(pin);
      }
    });

    return pinElement;
  };

  const drawPins = function (collection) {
    deletePins();
    let fragment = document.createDocumentFragment();
    const takeNumber = Math.min(MAX_PIN_COUNT, collection.length);
    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(collection[i]));
    }
    mapPins.appendChild(fragment);
  };

  const deletePins = function () {
    let pins = document.querySelectorAll(`.map__pin`);
    for (let i = 1; i < pins.length; i++) {
      let pin = pins[i];
      pin.remove();
    }
  };


  window.pin = {
    drawPins,
    deletePins,
    mapPins,
    getPinWidth: () => PIN_WIDTH,
    getPinElement: () => pinElement
  };
})();
