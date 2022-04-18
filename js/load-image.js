/* eslint-disable no-use-before-define */
import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imageEditing = document.querySelector('.img-upload__overlay');
const textHashtags = document.querySelector('.text__hashtags');
const comments = document.querySelector('.text__description');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const scaleInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector ('.img-upload__preview');
const image = document.querySelector('img');
const effectLevel = document.querySelector('.effect-level');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = document.querySelector('.success');
const successMessageButton = document.querySelector('.success__button');
const successInner = document.querySelector('.success__inner');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = document.querySelector('.error');
const errorMessageButton = document.querySelector('.error__button');
const errorInner = document.querySelector('.error__inner');
const uploadButton = document.querySelector('.img-upload__submit');
const DEFAULT_VALUE = 100;

// если фокус находится в поле ввода хэш-тега,
// нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
const onImageEscPress = (evt) =>{
  if(isEscapeKey(evt) && evt.target !== textHashtags && evt.target !== comments) {
    evt.preventDefault();
    onOverlayClose(onImageEscPress);
  }
};
// Cоздание функции для закрытия редактирования изображения
const onCancelClick = () => {
  onOverlayClose(onImageEscPress);
};
// Функция для открытия окна редактирования изображения
const onOverlayOpen = () => {
  imageEditing.classList.remove('hidden');
  body.classList.add('modal-open');
  body.addEventListener('keydown', onImageEscPress);
  uploadCancel.addEventListener('click', onCancelClick);
  scaleInput.value = `${DEFAULT_VALUE}%`;
  imagePreview.style.transform = `scale(${(parseInt(scaleInput.value, 10)/100)})`;
  image.style.filter = '';
  effectLevel.classList.add('hidden');
};
// Обработчик на открытие окна редактирования
const openImageEdit = () => {onOverlayOpen();};
// Загрузка файла
const uploudFileImage = () => {
  uploadFile.addEventListener('change', openImageEdit);
};
uploudFileImage();

// Закрытие формы
const onOverlayClose = () => {
  imageEditing.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
  body.removeEventListener('keydown', onImageEscPress);
  uploadCancel.removeEventListener('click', onCancelClick);
};
// Создание фрагмента сообщения
const createMessage = (template) => {
  const statusMessage = template.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(statusMessage);
  body.appendChild(fragment);
};
// Создание сообщения об успешной отправке формы
const createSuccessMessage = () => {
  createMessage(successTemplate);
};
// Обработчик на закрытие сообщения об успешной отправке
function onSuccessMessageClose () {
  closeSuccessMessage();
}
// Обработчик закрытия сообщения об успехе по Esc
function onSuccessMessageEsc (evt) {
  isEscapeKey(evt, closeSuccessMessage);
}
// Закрытие сообщения об успешной отправке
const closeSuccessMessage = () => {
  successMessageButton.removeEventListener('click', onSuccessMessageClose);
  body.removeEventListener('keydown', onSuccessMessageEsc);
  body.removeChild(successMessage);
};

// Разблокировка и блокировка кнопок отправки
const unblockSubmitButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'Сохранить';
};

const blockSubmitButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'Сохраняю...';
};

// Обработчик на закрытие об успешной отправки формы
const onSuccessCloseForm = () => {
  createSuccessMessage();
  body.addEventListener('keydown', onSuccessMessageEsc);
  successMessageButton.addEventListener('click', onSuccessMessageClose);
  successMessage.addEventListener('click', (evt) => {
    if (evt.target !== successInner) {
      closeSuccessMessage();
    }
  });
};

// Создание сообщения об ошибке при отправке формы
const createErrorMessage = () => {
  onOverlayClose();
  createMessage(errorTemplate);
};
// Обработчик на закрытие сообщения об ошибки при отправке формы
function onErrorMessageClose () {
  closeErrorMessage();
}
// Обработчик закрытия сообщения об ошибки при отправке формы Esc
function onErrorMessageEsc (evt) {
  isEscapeKey(evt, closeSuccessMessage);
}
// Закрытие сообщения об ошибки при отправке формы
const closeErrorMessage = () => {
  errorMessageButton.addEventListener('click', onErrorMessageClose);
  document.removeEventListener('keydown', onErrorMessageEsc);
  body.removeChild(errorMessage);
};
// Обработчик закрытия на сообщение об ошибке при отправке формы
const onErrorCloseForm = () => {
  createErrorMessage();
  body.addEventListener('keydown', onErrorMessageEsc);
  errorMessageButton.addEventListener('click', onErrorMessageClose);
  errorInner.addEventListener('click', (evt) => {
    if (evt.target !== errorInner) {
      closeErrorMessage();
    }
  });
};

export {onCancelClick, onOverlayClose, unblockSubmitButton, onErrorCloseForm, blockSubmitButton, onSuccessCloseForm};
