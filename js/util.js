"use strict";

const OffersType = {
  FLAT: `flat`,
  BUNGALO: `bungalo`,
  HOUSE: `house`,
  PALACE: `palace`
};

const toggleDisabled = (collection, isDisabled) => {
  for (let i = 0; i < collection.length; i++) {
    collection[i].disabled = isDisabled;
  }
};

const showMessage = (selector) => {
  const messageTemplate = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`);
  const message = messageTemplate.cloneNode(true);
  document.querySelector(`main`).appendChild(message);
  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      message.remove();
    }
  });

  message.addEventListener(`click`, (evt) => {
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
