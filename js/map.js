"use strict";

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const mapFilters = document.querySelector(`.map__filters`);
  const selectedFilters = mapFilters.querySelectorAll(`select`);

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
    window.data.map.classList.remove(`map--faded`);
    window.util.toggleDisabled(selectedFilters, false);
    setAddress();
    window.pin.drawPins(window.data.offers);
    window.form.activate();
  };

  const deactivatePage = function () {
    window.data.map.classList.add(`map--faded`);
    window.util.toggleDisabled(selectedFilters, true);
    setAddress(true);
    window.pin.deletePins();
    window.form.deactivate();
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

  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinEnter);
  deactivatePage();
})();
