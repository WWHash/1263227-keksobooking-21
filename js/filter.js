"use strict";

(function () {
  const lowPrice = 10000;
  const highPrice = 50000;
  const MAX_PINS_ON_THE_MAP = 5;
  const filters = document.querySelector(`.map__filters`);
  const filterType = filters.querySelector(`#housing-type`);
  const filterPrice = filters.querySelector(`#housing-price`);
  const filterRooms = filters.querySelector(`#housing-rooms`);
  const filterGuests = filters.querySelector(`#housing-guests`);
  const filterFeatures = filters.querySelectorAll(`input`);

  const comparePrice = function (value, price) {
    switch (value) {
      case `any`:
        return true;
      case `low`:
        return price < lowPrice;
      case `middle`:
        return price >= lowPrice && price <= highPrice;
      case `high`:
        return price > highPrice;
      default:
        return false;
    }
  };

  const compareInput = function (offerFeatures) {
    for (let i = 0; i < filterFeatures.length; i++) {
      if (filterFeatures[i].checked) {
        if (!offerFeatures.includes(filterFeatures[i].value)) {
          return false;
        }
      }
    }
    return true;
  };

  const compareValues = function (filterValue, offerValue) {
    return `${offerValue}` === filterValue || filterValue === `any`;
  };

  const onFilterFormChange = function () {
    const originalOffers = window.map.getOriginalOffers();
    const filteredOffers = [];
    for (const offer of originalOffers) {
      if (compareValues(filterType.value, offer.offer.type)
        && compareValues(filterRooms.value, offer.offer.rooms)
        && compareValues(filterGuests.value, offer.offer.guests)
        && comparePrice(filterPrice.value, offer.offer.price)
        && compareInput(offer.offer.features)) {
        filteredOffers.push(offer);
        if (filteredOffers.length === MAX_PINS_ON_THE_MAP) {
          break;
        }
      }
    }

    window.card.closeCard();
    window.pin.drawPins(filteredOffers);
  };

  filters.addEventListener(`change`, window.debounce(onFilterFormChange));

})();
