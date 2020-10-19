"use strict";

(function () {
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
    return pinElement;
  };

  const drawPins = function (collection) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < collection.length; i++) {
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
    deletePins
  };
})();