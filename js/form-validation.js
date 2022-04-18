import {getLength, showAlert} from './util.js';
import {sendData} from './api.js';
import {onSuccessCloseForm, onErrorCloseForm, blockSubmitButton, unblockSubmitButton} from './load-image.js';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const commentText = document.querySelector('.text__description');

const SPACE_HASHTAG_SEPARATOR = ' ';
const CommentsField = {
  MAX_LENGTH: 140
};

const HashtagsOptions = {
  MAX_NUMBER: 5,
  MAX: 20,
  REGULAR: /^#[A-Za-za-Яа-яЁё 0-9]{1,19}$/,
  IS_HASH_SYMBOL: /[^#]/,
  IS_SPACE: /.#/g,
};

// Сообщания об ошибках во время неправильного заполнения формы
const ErrorMessages = {
  HASH_SYMBOL: 'Хэш-тег должен начинаться с символа # (решётка)',
  SPACE_HASHTAGS: 'Хэш-теги должны разделяться пробелами',
  HASHTAGS_LONG: `Максимальная длина одно хэш-тега не должна превышать ${HashtagsOptions.MAX} символов`,
  BAG_SYMBOL_MESSAGE: 'Строка после решетки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и.т.п), символы пунктуации (тире, запятая, и.т.п), эмодзи',
  TOO_SHORT: 'Хэш-тег не может состоять только из символа # (решётка)',
  COMMENT_LONG: `Комментарий не может составлять больше ${CommentsField.MAX_LENGTH} символов`,
  UNIQUE: 'Хэш-тег не может быть использован дважды',
  OVER_MAX: `Количество хэш-тегов не должно быть больше ${HashtagsOptions.MAX_NUMBER}`,
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  succesClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'text'
});

// Обработчик отправки формы
const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
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

// Функция деления строки хэштегов по указаннаму элементу separator
const getStringArray = (string, separator) => string.split(separator);

// Проверка длины строки ввода комментария
pristine.addValidator (commentText, (value) => {
  getLength(value, CommentsField.MAX_LENGTH);
}, ErrorMessages.COMMENT_LONG);

// Обработчик проверки длины строки ввода хештега (не более 20 символов)
pristine.addValidator(textHashtags, () => {
  const hashtags = getStringArray(textHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => hashtag.length <= HashtagsOptions.MAX);
}, ErrorMessages.HASHTAGS_LONG);

// Проверка ввода недопустимых регулярных символов
pristine.addValidator(textHashtags, () => {
  const hashtags = getStringArray(textHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => (HashtagsOptions.REGULAR.test(hashtag)) || (hashtag.length === 0));
}, ErrorMessages.BAG_SYMBOL_MESSAGE);

// Проверка на обязательное наличие первого символа '#'
pristine.addValidator(textHashtags, () => {
  const hashtags = getStringArray(textHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => (hashtag.startsWith('#')) || (hashtag.length === 0));
}, ErrorMessages.HASH_SYMBOL);

// Проверка наличия повторного хэштега
pristine.addValidator(textHashtags, () => {
  const hashtagsArray = getStringArray(textHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  const copyArrDublicates = Array.from(hashtagsArray);
  let duplicateExists = true;
  for (let i = 0; i <= hashtagsArray.length; i++) {
    if (!(hashtagsArray[i] in copyArrDublicates)) {
      copyArrDublicates[hashtagsArray[i]] = true;
    } else {
      duplicateExists = false;
    }
  }
  return duplicateExists;
}, ErrorMessages.UNIQUE);

// Проверка на наличие ввода только символа '#'
pristine.addValidator(textHashtags, (value) => {
  if (value.match(HashtagsOptions.IS_HASH_SYMBOL) || value.length === 0) {
    return true;
  }
  return false;
}, ErrorMessages.TOO_SHORT);

// Проверка количества введенных хештегов не более 5
pristine.addValidator(textHashtags, (value) => {
  if (!(value.split(' ').length > HashtagsOptions.MAX_NUMBER)) {
    return true;
  }
  return false;
}, ErrorMessages.OVER_MAX);

// Проверка пробелов между хэштегами
pristine.addValidator(textHashtags, () => {
  const hashtags = getStringArray(textHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => (HashtagsOptions.REGULAR.test(hashtag) || hashtag.length === 0));
}, ErrorMessages.SPACE_HASHTAGS);

export {setUserFormSubmit};
