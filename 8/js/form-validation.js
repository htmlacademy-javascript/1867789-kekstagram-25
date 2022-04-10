const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
const comments = form.querySelector('.text__description');
const MAX_SYMBOLS = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
}, true);

// Функция для превращения набора хэштегов в массив, вызываем метод filter() на массиве hashtagText и передаём функцию, которая отрабатывает на каждом элементе этого массива
const createHashtagsArray = (hashtagText) => hashtagText.toLowerCase().split(' ').filter((e) => e);

const validateHashtags = (value) => {
  const hashtag = createHashtagsArray(value);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}[\s+]*$/;
  const newHashtags = hashtag.map((hashtags) => re.test(hashtags));
  return !newHashtags.includes(false);
};

pristine.addValidator(textHashtags, validateHashtags, 'Хэштег должен начинаться символа # (решётка) и строка после решётки должна состоять из букв и чисел (не более 20 символов) и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');

const ammountHashtags = (value) => {
  const hashtag = createHashtagsArray(value);
  const correctAmmount = hashtag.length <= 5;
  return correctAmmount;
};

pristine.addValidator(textHashtags, ammountHashtags, 'Нельзя указать больше пяти хэш-тегов');

const duplicatHashtags = (value) => {
  const hashtag = createHashtagsArray(value);
  const hasUniqueHashtags = hashtag.length === new Set(hashtag).size;
  return hasUniqueHashtags;
};

pristine.addValidator(textHashtags, duplicatHashtags, 'Один и тот же хэш-тег не может быть использован дважды');

// Максимальная длинаа комментариев
const validateComments = () => comments.length <= MAX_SYMBOLS;

pristine.addValidator(comments, validateComments, 'Длина комментария не может составлять больше 140 символов');

const onFormValidation = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {onFormValidation};
