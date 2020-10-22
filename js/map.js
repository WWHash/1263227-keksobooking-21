"use strict";

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const mapFilters = document.querySelector(`.map__filters`);
  const inputsFilter = mapFilters.querySelectorAll(`input`);
  const selectedFilters = mapFilters.querySelectorAll(`select`);
  const map = document.querySelector(`.map`);


  const setAddress = function (isDefault) {
    let coordinate = mainPin.getBoundingClientRect();
    let coordinateLeft = parseInt(mainPin.style.left, 10);
    let coordinateTop = parseInt(mainPin.style.top, 10);
    let x = Math.round(coordinateLeft + coordinate.width / 2);
    let offsetTop = (isDefault) ? coordinate.height / 2 : coordinate.height;
    let y = Math.round(coordinateTop + offsetTop);
    window.form.setAddress(x, y);
  };

  const activatePage = function () {
    map.classList.remove(`map--faded`);
    setAddress();
    window.backend.load(function (offers) {
      window.util.toggleDisabled(selectedFilters, false);
      window.pin.drawPins(offers);
    }, window.backend.onError);
    window.form.activate();
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinEnter);
  };

  const deactivatePage = function () {
    map.classList.add(`map--faded`);
    window.util.toggleDisabled(selectedFilters, true);
    window.util.toggleDisabled(inputsFilter, true);
    setAddress(true);
    window.pin.deletePins();
    window.form.deactivate();
    mainPin.addEventListener(`mousedown`, onMainPinClick);
    mainPin.addEventListener(`keydown`, onMainPinEnter);
  };

  const onMainPinClick = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  const onMainPinEnter = function (evt) {
    if (evt.key === `Enter`) {
      activatePage();
    }
  };
  deactivatePage();
})();
