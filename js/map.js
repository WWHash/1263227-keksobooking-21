"use strict";

const MIN_TOP = 130;
const MAX_TOP = 630;
const MAP_FADED = `map--faded`;

const mainPin = document.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters`);
const inputsFilter = mapFilters.querySelectorAll(`input`);
const selectedFilters = mapFilters.querySelectorAll(`select`);
const map = document.querySelector(`.map`);
const minPositionMainPinLeft = Math.floor(0 - mainPin.offsetWidth / 2);
const maxPositionMainPinLeft = map.offsetWidth - mainPin.offsetWidth / 2;
const minPositionMainPinTop = MIN_TOP - mainPin.offsetHeight;
const maxPositionMainPinTop = MAX_TOP - mainPin.offsetHeight;
const mainPinDefaultX = mainPin.offsetLeft;
const mainPinDefaultY = mainPin.offsetTop;
let originalOffers = [];

const setAddress = (isDefault) => {
  const coordinate = mainPin.getBoundingClientRect();
  const coordinateLeft = parseInt(mainPin.style.left, 10);
  const coordinateTop = parseInt(mainPin.style.top, 10);
  const x = Math.round(coordinateLeft + coordinate.width / 2);
  const offsetTop = (isDefault) ? coordinate.height / 2 : coordinate.height;
  const y = Math.round(coordinateTop + offsetTop);
  window.form.setAddress(x, y);
};

const activatePage = () => {
  map.classList.remove(MAP_FADED);
  setAddress();
  window.backend.load((offers) => {
    window.util.toggleDisabled(selectedFilters, false);
    window.util.toggleDisabled(inputsFilter, false);
    window.pin.drawPins(offers);
    originalOffers = offers;
  }, window.backend.onError);
  window.form.activate();
  mainPin.removeEventListener(`mousedown`, onMainPinClick);
  mainPin.removeEventListener(`keydown`, onMainPinEnter);
};

const deactivatePage = () => {
  map.classList.add(MAP_FADED);
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

const onMainPinClick = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
};

const onMainPinEnter = (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
};

mainPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const newTop = mainPin.offsetTop - shift.y;
    const newLeft = mainPin.offsetLeft - shift.x;

    if (newLeft >= minPositionMainPinLeft
      && newLeft <= maxPositionMainPinLeft
      && newTop >= minPositionMainPinTop
      && newTop <= maxPositionMainPinTop) {
      mainPin.style.top = `${newTop}px`;
      mainPin.style.left = `${newLeft}px`;
      setAddress();
    }
  };

  const onMouseUp = (upEvt) => {
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
  getElement: () => map,
  deactivatePage
};
