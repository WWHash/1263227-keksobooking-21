"use strict";

(function () {
  const housingTypeSelect = document.querySelector(`#housing-type`);

  housingTypeSelect.addEventListener(`change`, function (evt) {
    const filteredOffers = window.map.getOriginalOffers().filter(function (offer) {
      return offer.offer.type === evt.target.value || evt.target.value === `any`;
    });
    window.pin.drawPins(filteredOffers);
  });
})();
