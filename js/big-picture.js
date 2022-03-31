import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bodyContainer = document.querySelector('body');
const userModalCloseElement = document.querySelector('.big-picture__cancel');
const commentBigPicture = document.querySelector('.social__comment');
const bigPictureImg = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const commentListFragment = document.createDocumentFragment();
const socialCaption = document.querySelector('.social__caption');

//Создание комментария
const addComment = (comment) => {
  const commentElement = commentBigPicture.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  commentListFragment.appendChild(commentElement);
};

//нажатие на кнопку закрытия большого фото
const onCancelClick = () => {
  bigPicture.classList.add('hidden');
};

//Закрытие окна полноразмерного изображения: добавляем класс, удаляем обработчик
const closeFullView = () => {
  bodyContainer.classList.add('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupeEscPress);
  userModalCloseElement.removeEventListener('click', onCancelClick);
};

//Нажатие клавиши Esc на открытом окне
function onPopupeEscPress (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullView();
  }
}

//Открываем окно: удаляем класс, добавляем обработчики
const openFullView = () => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupeEscPress);
  userModalCloseElement.addEventListener('click', onCancelClick);
};

// Заполнение данными
const createDataBigPicture = (photo) => {
  likesCount.textContent = photo.likes;
  bigPictureImg.querySelector('img').src = photo.url;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  addComment();
};

// Просмотр полноразмерного изображения
const showBigPhoto = (photo) => {
  createDataBigPicture(photo);
  openFullView();
};

export {showBigPhoto};


