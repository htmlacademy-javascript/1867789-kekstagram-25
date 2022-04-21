import {isEscapeKey} from './util.js';

const MAX_COMMENTS_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const bodyContainer = document.querySelector('body');
const userModalCloseElement = document.querySelector('.big-picture__cancel');
const commentBigPicture = document.querySelector('#comments').content.querySelector('.social__comment');
const bigPictureImg = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
let commentData = [];
let commentsCounter = 5;


// Создание одного комментария
const addComment = (comment) => {
  const commentElement = commentBigPicture.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

// Создание фрагента комментариев
const createCommentFragment = (commentArray) => {
  const fragment = document.createDocumentFragment();
  commentArray.forEach((comment) => {
    const newComment = addComment(comment);
    fragment.appendChild(newComment);
  });
  socialComments.appendChild(fragment);
};


//нажатие на кнопку закрытия большого фото
const onCancelClick = () => {
  bigPicture.classList.add('hidden');
  socialComments.innerHTML = '';
};

//Закрытие окна полноразмерного изображения: добавляем класс, удаляем обработчик
const closeFullView = () => {
  bigPicture.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupeEscPress);
  userModalCloseElement.removeEventListener('click', onCancelClick);
};

//Проверка текущего числа комментариев
const getCurentCountComment = (comments) => comments ? comments.children.length: 0;

// Обработчик на загрузку комментариев
const clickCommentsLoader = () => {
  createCommentFragment(commentData.slice(commentsCounter, commentsCounter += MAX_COMMENTS_COUNT));
  if (commentsCounter >= commentData.length) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', clickCommentsLoader);
    commentsCounter = MAX_COMMENTS_COUNT;
  }
  socialCommentCount.firstChild.textContent = `${getCurentCountComment(socialComments)} из `;
  if (commentData.length === 0) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', clickCommentsLoader);
  }
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
  socialComments.innerHTML = '';
  bodyContainer.classList.add('modal-open');
  likesCount.textContent = photo.likes;
  bigPictureImg.querySelector('img').src = photo.url;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  socialCommentCount.firstChild.textContent = `${MAX_COMMENTS_COUNT} из `;
  commentData = photo.comments.slice();
  if (photo.comments.length <= MAX_COMMENTS_COUNT) {
    socialCommentCount.firstChild.textContent = `${photo.comments.length} из `;
    createCommentFragment(commentData);
    commentsLoader.classList.add('hidden');
  }
  if (photo.comments.length >= MAX_COMMENTS_COUNT) {
    createCommentFragment(commentData.slice(0, MAX_COMMENTS_COUNT));
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', clickCommentsLoader);
  }
};

// Просмотр полноразмерного изображения
const showBigPhoto = (photo) => {
  createDataBigPicture(photo);
  openFullView();
};

export {showBigPhoto};
