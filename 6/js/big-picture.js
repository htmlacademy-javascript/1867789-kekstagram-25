/* eslint-disable no-use-before-define */
import {dataPhotos} from './data.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bodyContainer = document.querySelector('body');
const userModalCloseElement = document.querySelector('.big-picture__cancel');
const commentBigPicture = document.querySelector('.social__comments');
const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const newPicture = dataPhotos[0];
// Шаблон для поля с комментариями
const newCommentsFragment = document.createDocumentFragment();
// Импортируем модуль для генерации данных с комментариями
function createComments({comments}) {
  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentsTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    newCommentsFragment.appendChild(commentElement);
  });
  commentBigPicture.appendChild(newCommentsFragment);
}
// Создание функции для заполнения данными
function createDataBigPicture ({url, likes, comments, description}) {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
}

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureCancelClick();
  }
};

// Действия после открытия окна
const openFullView = () => {
  createComments(newPicture);
  createDataBigPicture(newPicture);

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bodyContainer.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

// Действие для закрытия окна
const onBigPictureCancelClick = () => {
  bodyContainer.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

userModalCloseElement.addEventListener('click', () => {
  onBigPictureCancelClick();
});

export {openFullView};
