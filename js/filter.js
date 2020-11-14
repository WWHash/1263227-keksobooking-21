"use strict";

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const MAX_PINS_ON_THE_MAP = 5;

const priceRange = {
  ANY: `any`,
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};

const filters = document.querySelector(`.map__filters`);
const filterType = filters.querySelector(`#housing-type`);
const filterPrice = filters.querySelector(`#housing-price`);
const filterRooms = filters.querySelector(`#housing-rooms`);
const filterGuests = filters.querySelector(`#housing-guests`);
const filterFeatures = filters.querySelectorAll(`input`);

const comparePrice = (value, price) => {
  switch (value) {
    case priceRange.ANY:
      return true;
    case priceRange.LOW:
      return price < LOW_PRICE;
    case priceRange.MIDDLE:
      return price >= LOW_PRICE && price <= HIGH_PRICE;
    case priceRange.HIGH:
      return price > HIGH_PRICE;
    default:
      return false;
  }
};

const compareInput = (offerFeatures) => {
  for (let i = 0; i < filterFeatures.length; i++) {
    if (filterFeatures[i].checked) {
      if (!offerFeatures.includes(filterFeatures[i].value)) {
        return false;
      }
    }
  }
  return true;
};

const compareValues = (filterValue, offerValue) => {
  return `${offerValue}` === filterValue || filterValue === `any`;
};

const onFilterFormChange = () => {
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

  window.card.close();
  window.pin.drawPins(filteredOffers);
};

filters.addEventListener(`change`, window.debounce(onFilterFormChange));
