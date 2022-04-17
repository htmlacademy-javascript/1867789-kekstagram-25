// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => (
  elements[getRandomPositiveInteger(0, elements.length - 1)]
);

// Функция для проверки максимальной длины строки
const MAX_SYMBOLS = 140;
function controlComment (commentFieldText) {
  if (commentFieldText.length <= MAX_SYMBOLS) {
    return true;
  }
  return false;
}
controlComment ('i love cats');

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


export {getRandomPositiveInteger, getRandomArrayElement, isEscapeKey, showAlert};
