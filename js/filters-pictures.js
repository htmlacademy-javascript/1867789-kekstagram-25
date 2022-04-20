import {debounce} from './util.js';
import {getData} from './api.js';
import {createPictureFragment} from './picture.js';
import {mixPicturesArray} from './util.js';

const RANDOM_PICTURES = 10;
const TIMEOUT_DELAY = 500;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const activeButton = imgFilters.querySelector('.img-filters__button--active');
const discussedFilter = document.querySelector('#filter-discussed');
const randomFilter = document.querySelector('#filter-random');
const defaultFilter = document.querySelector('#filter-default');
let photosArray;

// Настройка активной кнопки
const setActiveClass = (picture) => {
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  picture.classList.add('img-filters__button--active');
};


// Удаление фотографий
const removePhotos = () => {
  const pictures = document.querySelectorAll('.pictures .picture');
  pictures.forEach((photo) => {
    photo.remove();
  });
};

// Показ дефолтных фотографий
const getDefaultPhotos = () => {
  const photosCopyArray = Array.from(photosArray);
  const defaultPhotos = photosCopyArray;
  createPictureFragment(defaultPhotos);
};

// Cоздание сортировки массива по количеству коментариев
const sortPhotos = (photoArray) => {
  photoArray.sort((first, second) => second.comments.length - first.comments.length);
  return photoArray;
};

// Создание массива обсуждаемых фотографий
const getPhotosDiscussed = () => {
  const photosCopyArray = Array.from(photosArray);
  const discussedPhotos = sortPhotos(photosCopyArray);
  createPictureFragment(discussedPhotos);
};

// Создание массива 10 случайных фотографий неповторяющихся фотографий
const getRandomPhotos = () => {
  const photosCopyArray = Array.from(photosArray);
  const randomPhotos = mixPicturesArray(photosCopyArray).slice(0, RANDOM_PICTURES);
  createPictureFragment(randomPhotos);
};

// Добавление обработчика на изменение фильтров
const onFilterClick = debounce((evt) => {
  const target = evt.target;
  removePhotos();
  setActiveClass(target);
  switch (target) {
    case randomFilter:
      getRandomPhotos();
      break;
    case defaultFilter:
      getDefaultPhotos();
      break;
    case discussedFilter:
      getPhotosDiscussed();
      break;
    default:
      getDefaultPhotos();
  }
}, TIMEOUT_DELAY);

imgFiltersForm.addEventListener('click', onFilterClick);

const receiveData = (photos) => {
  photosArray = photos;
  createPictureFragment(photos);
  imgFilters.classList.remove('img-filters--inactive');
};

getData(receiveData);
