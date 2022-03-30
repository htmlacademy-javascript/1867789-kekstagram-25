import {dataPhotos} from './data.js';
import {openFullView} from './big-picture.js';

const picture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const newPicture = dataPhotos;
// Шаблон для фотографии пользователя
const newPictureFragment = document.createDocumentFragment();
// Генерация данных с url, likes, comment
newPicture.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  newPictureFragment.appendChild(pictureElement);
});
picture.appendChild(newPictureFragment);

// Открывает большую картинку по клику на миниатюру
picture.addEventListener('click', (evt) => {
  if (evt.target.className === 'picture__img') {
    const i = evt.target.id;
    openFullView(i);
  }
});

