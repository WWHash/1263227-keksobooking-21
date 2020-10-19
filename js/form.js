"use strict";

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const capacityInput = adForm.querySelector(`[name = capacity]`);
  const roomsInput = adForm.querySelector(`[name= rooms]`);
  const fieldsets = adForm.querySelectorAll(`fieldset`);
  const addressInput = adForm.querySelector(`[name = address]`);

  const setAddress = function (x, y) {
    addressInput.value = `${x}, ${y}`;
  };

  const activateForm = function () {
    adForm.classList.remove(`ad-form--disabled`);
    window.util.toggleDisabled(fieldsets, false);
    onFormEditChange();
  };

  const deactivateForm = function () {
    adForm.classList.add(`ad-form--disabled`);
    window.util.toggleDisabled(fieldsets, true);
  };

  const validateRooms = function () {
    if (roomsInput.value < capacityInput.value && capacityInput.value > 0 && roomsInput.value !== `100`) {
      capacityInput.setCustomValidity(`Вам нужна квартира побольше`);
    } else if (roomsInput.value === `100` && capacityInput.value > 0) {
      capacityInput.setCustomValidity(`Эти аппартаменты не для гостей`);
    } else if (roomsInput.value !== `100` && capacityInput.value === `0`) {
      capacityInput.setCustomValidity(`Выберите аппартаменты не для гостей`);
    } else {
      capacityInput.setCustomValidity(``);
    }
  };

  const onFormEditChange = function () {
    validateRooms();
  };

  adForm.addEventListener(`change`, onFormEditChange);

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    setAddress
  };
})();
