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

export {getRandomPositiveInteger, getRandomArrayElement, isEscapeKey};
