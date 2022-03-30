import {isEscapeKey} from './util.js';

const uploadFile = document.querySelector('#upload-file');
const imageEditing = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    onOverlayOpen();
    // eslint-disable-next-line no-use-before-define
    onOverlayClose();
  }
};
// Открытие формы редактирования изображения
const onOverlayOpen = () => {
  imageEditing.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};
// Cоздание события для открытия формы
uploadFile.addEventListener('click', (evt) => {
  if (!imageEditing.classList.contains('hidden')) {
    evt.preventDefault();
  }
});
// Закрытие формы
const onOverlayClose = () => {
  body.classList.remove('modal-open');
  imageEditing.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
};
// Cоздание события для закрытия формы
uploadCancel.addEventListener('click', (evt) => {
  onOverlayClose(evt);
});
// Открытие формы
uploadFile.addEventListener('change', onOverlayOpen);
