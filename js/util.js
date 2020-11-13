"use strict";

const OffersType = {
  FLAT: `flat`,
  BUNGALO: `bungalo`,
  HOUSE: `house`,
  PALACE: `palace`
};

const toggleDisabled = function (collection, isDisabled) {
  for (let i = 0; i < collection.length; i++) {
    collection[i].disabled = isDisabled;
  }
};

const showMessage = function (selector) {
  const messageTemplate = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`);
  const message = messageTemplate.cloneNode(true);
  document.querySelector(`main`).appendChild(message);
  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      message.remove();
    }
  });

  message.addEventListener(`click`, function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      message.remove();
    }
  });
};

window.util = {
  toggleDisabled,
  showMessage,
  OffersType
};
