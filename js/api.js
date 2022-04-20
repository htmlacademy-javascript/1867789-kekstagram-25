import {showAlert} from './util.js';

const Url =  {
  GET: 'https://25.javascript.pages.academy/kekstagram/data',
  POST: 'https://25.javascript.pages.academy/kekstagram',
};

const getData = (onSuccess) => {
  fetch(Url.GET)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Что-то пошло не так, попробуйте позже...');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
