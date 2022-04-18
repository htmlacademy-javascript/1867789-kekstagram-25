import {getRandomPositiveInteger, getRandomArrayElement} from './util.js';

// Objects
const DESCRIPTION_TEXTS = [
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
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const USER_NAMES = [
  'Иван',
  'Марго',
  'Алиса',
  'Кирилл',
  'Виктор',
  'Юлия',
  'Александр',
  'Василиса'
];
const OBJECTS_COUNT = 25;
let ID = 1;

const CREATE_COMMENTS = () => ([{
  id: getRandomPositiveInteger(1,500),
  avatar: `img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
  message: getRandomArrayElement(COMMENTS_TEXT),
  name: getRandomArrayElement(USER_NAMES),
}]);

const createNewObject = () => {
  const currentID = ID++;
  return {
    id: currentID,
    url: `photos/${currentID}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_TEXTS),
    likes: getRandomPositiveInteger(15,200),
    comments: CREATE_COMMENTS(),
  };
};

const getNewObjects = () => Array.from({length: OBJECTS_COUNT}, createNewObject);
const dataPhotos = getNewObjects();
export {dataPhotos};
