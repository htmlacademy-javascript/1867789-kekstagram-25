import {isEscapeKey} from './util.js';
import {onFormValidation} from './form-validation.js';

const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imageEditing = document.querySelector('.img-upload__overlay');
const textHashtags = document.querySelector('.text__hashtags');
const comments = document.querySelector('.text__description');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');

// Функция для открытия формы редактирования изображения
const onOverlayOpen = () => {
  imageEditing.classList.remove('hidden');
  body.classList.add('modal-open');
};

// Закрытие формы
const onOverlayClose = () => {
  imageEditing.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
};

// если фокус находится в поле ввода хэш-тега,
// нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
const onPopupeEscPress = (evt) =>{
  if(isEscapeKey(evt) && evt.target !== textHashtags && evt.target !== comments) {
    evt.preventDefault();
    onOverlayClose(onPopupeEscPress);
  }
};

// Cоздание функции для закрытия формы
const onCancelClick = () => {
  onOverlayClose(onPopupeEscPress);
};

// Открытие формы
const imageUploud = () => {
  onOverlayOpen();
  body.addEventListener ('keydown', onPopupeEscPress);
  uploadCancel.addEventListener('click', onCancelClick);
};

// Загрузка файла и проверка на валидность формы
const uploudFileImage = () => {
  uploadFile.addEventListener('change', imageUploud);
  onFormValidation();
};

export {uploudFileImage};
