"use strict";

(function () {
  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  let getRandomElement = function (arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  const getRandomElements = function (arr) {
    let newArray = [];
    for (let i = 0; i < getRandomNumber(0, arr.length); i++) {
      let randomElement = getRandomElement(arr);
      if (!newArray.includes(randomElement)) {
        newArray.push(randomElement);
      }
    }
    return newArray;
  };

  const toggleDisabled = function (collection, isDisabled) {
    for (let i = 0; i < collection.length; i++) {
      collection[i].disabled = isDisabled;
    }
  };

  window.util = {
    getRandomElement,
    getRandomElements,
    getRandomNumber,
    toggleDisabled
  };
})();
