// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для проверки максимальной длины строки
const getLength = (stringChecked, maxLength) => stringChecked.length <= maxLength;

// Функция Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Показ сообщения об отправке с ошибкой на 5 секунд
const showAlert = (message) => {
  const ALERT_SHOW_TIME = 5000;
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция перемешивания массива
const mixPicturesArray = (array) => {
  let k;
  let template;
  for (let i = array.length - 1; i > 0; i--) {
    k = Math.floor(Math.random() * (i + 1));
    template = array[k];
    array[k] = array[i];
    array[i] = template;
  }
  return array;
};

// debounce списка фотографий
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomPositiveInteger, isEscapeKey, showAlert, getLength, mixPicturesArray, debounce};
