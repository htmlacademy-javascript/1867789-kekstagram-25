import {dataPhotos} from './data.js';
import {showBigPhoto} from './big-picture.js';

const picture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const newPicture = dataPhotos;
// Шаблон для фотографии пользователя
const newPictureFragment = document.createDocumentFragment();
// Генерация данных с url, likes, comment
const createPicture = () => {
  newPicture.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPhoto(photo);
    });
    newPictureFragment.appendChild(pictureElement);
  });
  picture.appendChild(newPictureFragment);
};


// Создание картинки используя массив данных из data.js
createPicture();

