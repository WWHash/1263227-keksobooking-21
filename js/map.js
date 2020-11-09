"use strict";

(function () {
  const MIN_TOP = 130;
  const MAX_TOP = 630;
  const mainPin = document.querySelector(`.map__pin--main`);
  const mapFilters = document.querySelector(`.map__filters`);
  const inputsFilter = mapFilters.querySelectorAll(`input`);
  const selectedFilters = mapFilters.querySelectorAll(`select`);
  const map = document.querySelector(`.map`);
  const minPositionMainPinTop = 0 - mainPin.offsetWidth / 2;
  const maxPositionMainPinTop = map.offsetWidth - mainPin.offsetWidth / 2;
  const minPositionMainPinLeft = MIN_TOP - mainPin.offsetHeight;
  const maxPositionMainPinLeft = MAX_TOP - mainPin.offsetHeight;
  const mainPinDefaultX = mainPin.offsetLeft;
  const mainPinDefaultY = mainPin.offsetTop;
  let originalOffers = [];

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
      window.util.toggleDisabled(inputsFilter, false);
      window.pin.drawPins(offers);
      originalOffers = offers;
    }, window.backend.onError);
    window.form.activate();
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinEnter);
  };

  const deactivatePage = function () {
    map.classList.add(`map--faded`);
    window.util.toggleDisabled(selectedFilters, true);
    window.util.toggleDisabled(inputsFilter, true);
    window.pin.deletePins();
    window.form.deactivate();
    mainPin.style.top = `${mainPinDefaultY}px`;
    mainPin.style.left = `${mainPinDefaultX}px`;
    setAddress(true);
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

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newTop = mainPin.offsetTop - shift.y;
      const newLeft = mainPin.offsetLeft - shift.x;

      if (newLeft >= minPositionMainPinTop
        && newLeft <= maxPositionMainPinTop
        && newTop >= minPositionMainPinLeft
        && newTop <= maxPositionMainPinLeft) {
        mainPin.style.top = `${newTop}px`;
        mainPin.style.left = `${newLeft}px`;
        setAddress();
      }
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };


    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  deactivatePage();

  window.map = {
    getOriginalOffers: () => originalOffers,
    getMapElement: () => map,
    deactivatePage
  };
})();
