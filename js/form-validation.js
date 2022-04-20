import {getLength, showAlert} from './util.js';
import {onErrorCloseForm, onSuccessCloseForm, blockSubmitButton, unblockSubmitButton} from './load-image.js';
import {sendData} from './api.js';

// Свойства хэштегов
const HashtagsOptions = {
  REGULAR: /^#[A-Za-za-Яа-яЁё 0-9]{1,19}$/,
  MAX_NUMBER: 5,
  MAX: 20,
  IS_HASH_SYMBOL: /[^#]/,
  IS_SPACE: /.#/g,
};

const CommentsField = {
  MAX_LENGTH: 140
};

// Сообщения об ошибках во время неправильного заполнения формы
const ErrorMessages = {
  HASH_SYMBOL: 'Хэш-тег должен начинаться с символа #',
  SPACE_HASHTAGS: 'Хэш-теги должны разделяться пробелами',
  HASHTAGS_LONG: `Максимальная длина одно хэш-тега не должна превышать ${HashtagsOptions.MAX} символов`,
  BAG_SYMBOL_MESSAGE: 'Строка после решетки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и.т.п), символы пунктуации (тире, запятая, и.т.п), эмодзи',
  TOO_SHORT: 'Хэш-тег не может состоять только из символа #',
  COMMENT_LONG: `Комментарий не может составлять больше ${CommentsField.MAX_LENGTH} символов`,
  UNIQUE: 'Хэш-тег не может быть использован дважды',
  OVER_MAX: `Количество хэш-тегов не должно быть больше ${HashtagsOptions.MAX_NUMBER}`,
};

const SPACE_SEPARATOR = ' ';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const commentText = document.querySelector('.text__description');

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

// Обработчик проверки длины строки ввода хештега (не более 20 символов)
pristine.addValidator(textHashtags, () => {
  const hashtags = getStringArray(textHashtags.value.toLowerCase(), SPACE_SEPARATOR);
  return hashtags.every((hashtag) => hashtag.length <= HashtagsOptions.MAX);
}, ErrorMessages.HASHTAGS_LONG);

// Проверка на обязательное наличие первого символа '#'
pristine.addValidator(textHashtags, () => {
  const hashtags = getStringArray(textHashtags.value.toLowerCase(), SPACE_SEPARATOR);
  return hashtags.every((hashtag) => (hashtag.startsWith('#')) || (hashtag.length === 0));
}, ErrorMessages.HASH_SYMBOL);

// Проверка ввода регулярных символов
pristine.addValidator(textHashtags, () => {
  const hashtags = getStringArray(textHashtags.value.toLowerCase(), SPACE_SEPARATOR);
  return hashtags.every((hashtag) => (HashtagsOptions.REGULAR.test(hashtag)) || (hashtag.length === 0));
}, ErrorMessages.BAG_SYMBOL_MESSAGE);

// Проверка наличия повторного хэштега
pristine.addValidator(textHashtags, () => {
  const hashtagsArray = getStringArray(textHashtags.value.toLowerCase(), SPACE_SEPARATOR);
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
  const hashtags = getStringArray(textHashtags.value.toLowerCase(), SPACE_SEPARATOR);
  return hashtags.every((hashtag) => (HashtagsOptions.REGULAR.test(hashtag) || hashtag.length === 0));
}, ErrorMessages.SPACE_HASHTAGS);

// Проверка длины строки ввода комментария
const validateComment = (value) => (
  getLength(value, commentText.MAX_LENGTH)
);
pristine.addValidator(commentText, validateComment, ErrorMessages.COMMENT_LONG);

export {setUserFormSubmit};
