import {getNewObjects} from './data.js';

const picture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const newPicture = getNewObjects();
const newPictureFragment = document.createDocumentFragment();

newPicture.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  newPictureFragment.appendChild(pictureElement);
});

picture.appendChild(newPictureFragment);
