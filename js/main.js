/* eslint-disable no-unused-vars */
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomNumber (min, max) {
  if (max < min) {
    [min, max] = [max, min];
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber (0, 5);

// Функция для проверки максимальной длины строки.
// комментарий не обязателен;
// длина комментария не может составлять больше 140 символов;
// имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине, и false — если не проходит

const MAX_SYMBOLS = 140;
function controlComment (commentFieldText) {
  if (commentFieldText.length <= MAX_SYMBOLS) {
    return true;
  }
  return false;
}
controlComment ('i love dogs');
