"use strict";

const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_UP_LOAD = `https://21.javascript.pages.academy/keksobooking`;
const STATUS_CODE_OK = 200;
const TIMEOUT_IN_MS = 10000;
const Method = {
  POST: `POST`,
  GET: `GET`
};

const executeRequest = (method, url, data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  if (method === Method.GET) {
    xhr.responseType = `json`;
  }


  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_CODE_OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} + ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(method, url);
  xhr.send(data);
};

const load = (onLoad, onError) => {
  executeRequest(Method.GET, URL_LOAD, null, onLoad, onError);
};

const save = (data, onLoad, onError) => {
  executeRequest(Method.POST, URL_UP_LOAD, data, onLoad, onError);
};

const onError = (errorMessage) => {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.backend = {
  load,
  save,
  onError
};
