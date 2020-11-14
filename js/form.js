"use strict";

const CAPACITY_MIN = `0`;
const ROOMS_MAX = `100`;

const BuildMinPrice = {
  BUNGALO: `0`,
  FLAT: `1000`,
  HOUSE: `5000`,
  PALACE: `10000`
};

const adForm = document.querySelector(`.ad-form`);
const capacityInput = adForm.querySelector(`[name = capacity]`);
const roomsInput = adForm.querySelector(`[name= rooms]`);
const fieldsets = adForm.querySelectorAll(`fieldset`);
const addressInput = adForm.querySelector(`[name = address]`);
const selectType = adForm.querySelector(`#type`);
const inputPrice = adForm.querySelector(`#price`);
const selectCheckIn = adForm.querySelector(`#timein`);
const selectCheckOut = adForm.querySelector(`#timeout`);
const resetButton = adForm.querySelector(`.ad-form__reset`);


const setAddress = (x, y) => {
  addressInput.value = `${x}, ${y}`;
};

const activateForm = () => {
  adForm.classList.remove(`ad-form--disabled`);
  window.util.toggleDisabled(fieldsets, false);
  onFormEditChange();
};

const deactivateForm = () => {
  adForm.classList.add(`ad-form--disabled`);
  window.util.toggleDisabled(fieldsets, true);
  adForm.reset();
};

const validateRooms = () => {
  if (roomsInput.value < capacityInput.value && capacityInput.value > CAPACITY_MIN && roomsInput.value !== ROOMS_MAX) {
    capacityInput.setCustomValidity(`Вам нужна квартира побольше`);
  } else if (roomsInput.value === ROOMS_MAX && capacityInput.value > CAPACITY_MIN) {
    capacityInput.setCustomValidity(`Эти аппартаменты не для гостей`);
  } else if (roomsInput.value !== CAPACITY_MIN && capacityInput.value === CAPACITY_MIN) {
    capacityInput.setCustomValidity(`Выберите аппартаменты не для гостей`);
  } else {
    capacityInput.setCustomValidity(``);
  }
};

const synchronizePrice = () => {
  let minPrice = 0;
  switch (selectType.value) {
    case window.util.OffersType.FLAT:
      minPrice = BuildMinPrice.FLAT;
      break;
    case window.util.OffersType.BUNGALO:
      minPrice = BuildMinPrice.BUNGALO;
      break;
    case window.util.OffersType.HOUSE:
      minPrice = BuildMinPrice.HOUSE;
      break;
    case window.util.OffersType.PALACE:
      minPrice = BuildMinPrice.PALACE;
      break;
  }
  inputPrice.setAttribute(`placeholder`, minPrice);
  inputPrice.setAttribute(`min`, minPrice);
};

const onFormEditChange = (evt) => {
  validateRooms();
  synchronizePrice();
  if (evt && evt.target === selectCheckIn) {
    selectCheckOut.value = selectCheckIn.value;
  }

  if (evt && evt.target === selectCheckOut) {
    selectCheckIn.value = selectCheckOut.value;
  }
};

adForm.addEventListener(`submit`, (evt) => {
  const formData = new FormData(adForm);
  evt.preventDefault();
  window.backend.save(formData, () => {
    window.map.deactivatePage();
    window.util.showMessage(`success`);
  }, () => {
    window.util.showMessage(`error`);
  });
});

resetButton.addEventListener(`click`, (evt) => {
  if (evt.button === 0) {
    evt.preventDefault();
    window.map.deactivatePage();
  }
});

adForm.addEventListener(`change`, onFormEditChange);

window.form = {
  activate: activateForm,
  deactivate: deactivateForm,
  setAddress
};
