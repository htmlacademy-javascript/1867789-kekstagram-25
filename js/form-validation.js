import {showAlert} from './util.js';
import {sendData} from './api.js';
import {unblockSubmitButton, onErrorCloseForm, blockSubmitButton, onSuccessCloseForm} from './load-image.js';

const form = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const comments = document.querySelector('.text__description');
const MAX_SYMBOLS = 140;
const ERRORS = {
  HASH_ERROR: 'Хэштег должен начинаться символа # (решётка) и строка после решётки должна состоять из букв и чисел (не более 20 символов) и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  AMOUNT_HASH: 'Нельзя указать больше пяти хэш-тегов',
  DUPLICAT_HASH: 'Один и тот же хэш-тег не может быть использован дважды',
  LONG_COMMENTS: 'Длина комментария не может составлять больше 140 символов',
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextClass: 'text-help',
  errorTextParent: 'form-group',
  errorTextTag: 'div'
}, true);

// Функция для превращения набора хэштегов в массив, вызываем метод filter() на массиве hashtagText и передаём функцию, которая отрабатывает на каждом элементе этого массива
const createHashtagsArray = (hashtagText) => hashtagText.toLowerCase().split(' ').filter((e) => e);

const validateHashtags = (value) => {
  const hashtag = createHashtagsArray(value);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}[\s+]*$/;
  const newHashtags = hashtag.map((hashtags) => re.test(hashtags));
  return !newHashtags.includes(false);
};
pristine.addValidator(textHashtags, validateHashtags, ERRORS.HASH_ERROR);

const ammountHashtags = (value) => {
  const hashtag = createHashtagsArray(value);
  const correctAmmount = hashtag.length <= 5;
  return correctAmmount;
};
pristine.addValidator(textHashtags, ammountHashtags, ERRORS.AMOUNT_HASH);

const duplicatHashtags = (value) => {
  const hashtag = createHashtagsArray(value);
  const hasUniqueHashtags = hashtag.length === new Set(hashtag).size;
  return hasUniqueHashtags;
};
pristine.addValidator(textHashtags, duplicatHashtags, ERRORS.DUPLICAT_HASH);

// Максимальная длинаа комментариев
const validateComments = () => comments.length <= MAX_SYMBOLS;
pristine.addValidator(comments, validateComments, ERRORS.LONG_COMMENTS);


// Обработчик отправки формы
const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          onSuccessCloseForm();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          onErrorCloseForm();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};
export {setUserFormSubmit};
