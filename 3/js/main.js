/* eslint-disable no-template-curly-in-string */
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
controlComment ('i love cats');

// Objects
// id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
// description, строка — описание фотографии. Описание придумайте самостоятельно.
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой
// фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение.

// Все комментарии генерируются случайным образом.
// У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.
// Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
// Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.

const DESCRIPTION_TEXT = [
  'Сижу у костра, играю на гитаре.',
  'Красивый закат!',
  'Поездка к любимому, давно этого ждала',
  'Море волнуется раз, море волнуется два, море волнуется три!',
  'Звенит январская вьюга.'
];
const COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const USER_NAME = [
  'Иван',
  'Марго',
  'Алиса',
  'Кирилл',
  'Виктор',
  'Юлия',
  'Александр',
  'Василиса',
];
let ID = 1;
const OBJECTS_COUNT = 25;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => (
  elements[getRandomPositiveInteger(0, elements.length - 1)]
);

const CREATE_COMMENTS = () => ({
  id: getRandomPositiveInteger(1,500),
  avatar: `img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
  message: getRandomArrayElement(COMMENTS_TEXT),
  name: getRandomArrayElement(USER_NAME),
});

const createNewObject = () => {
  const currentID = ID++;
  return {
    id: currentID,
    url: `photos/${currentID}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_TEXT),
    likes: getRandomPositiveInteger(15,200),
    comments: CREATE_COMMENTS(),
  };
};

const getNewObjects = Array.from({length: OBJECTS_COUNT}, createNewObject);

window.console.log(getNewObjects);
