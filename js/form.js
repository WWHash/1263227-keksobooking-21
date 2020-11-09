"use strict";

(function () {
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
    adForm.reset();
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

  const synchronizePrice = function () {
    let minPrice = 0;
    switch (selectType.value) {
      case `flat`:
        minPrice = 1000;
        break;
      case `bungalo`:
        minPrice = 0;
        break;
      case `house`:
        minPrice = 5000;
        break;
      case `palace`:
        minPrice = 10000;
        break;
    }
    inputPrice.setAttribute(`placeholder`, minPrice);
    inputPrice.setAttribute(`min`, minPrice);
  };

  const onFormEditChange = function (evt) {
    validateRooms();
    synchronizePrice();
    if (evt && evt.target === selectCheckIn) {
      selectCheckOut.value = selectCheckIn.value;
    }

    if (evt && evt.target === selectCheckOut) {
      selectCheckIn.value = selectCheckOut.value;
    }
  };

  adForm.addEventListener(`submit`, function (evt) {
    const formData = new FormData(adForm);
    evt.preventDefault();
    window.backend.save(formData, function () {
      window.map.deactivatePage();
      window.util.showMessage(`success`);
    }, function () {
      window.util.showMessage(`error`);
    });
  });

  resetButton.addEventListener(`click`, function (evt) {
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
})();
