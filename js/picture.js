import {showBigPhoto} from './big-picture.js';

const picture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Шаблон для фотографии пользователя
const newPictureFragment = document.createDocumentFragment();
// Заполнение шаблона
const createPicture = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPhoto(photo);
  });
  return pictureElement;
};

const createPictureFragment = (pictures) => {
  pictures.forEach((photo)=> {
    const photoElement = createPicture(photo);
    newPictureFragment.appendChild(photoElement);
  });
  picture.appendChild(newPictureFragment);
};

export {createPictureFragment};
