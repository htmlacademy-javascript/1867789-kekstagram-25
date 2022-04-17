const scale = document.querySelector('.scale');
const scaleButtonSmaller = scale.querySelector('.scale__control--smaller');
const scaleButtonBigger = scale.querySelector('.scale__control--bigger');
const scaleInput = scale.querySelector('.scale__control--value');
const imagePreview = document.querySelector ('.img-upload__preview');
const MAX_VALUE = 100;
const MIN_VALUE = 25;
const VALUE_STEP = 25;

// Уменьшение масштаба
const reduceImage = () => {
  let currentValue = parseInt(scaleInput.value, 10);
  if (currentValue > MIN_VALUE && currentValue <= MAX_VALUE) {
    currentValue -= VALUE_STEP;
    scaleInput.value = `${currentValue}%`;
    imagePreview.style.transform = `scale(${(parseInt(scaleInput.value, 10)/100)})`;
  }
};

// Добавление событие на уменьшение изображение по клику
scaleButtonSmaller.addEventListener('click', reduceImage);

// Увеличение масштаба
const increaseImage = () => {
  let currentValue = parseInt(scaleInput.value, 10);
  if (currentValue >= MIN_VALUE && currentValue < MAX_VALUE) {
    currentValue += VALUE_STEP;
    scaleInput.value = `${currentValue}%`;
    imagePreview.style.transform = `scale(${(parseInt(scaleInput.value, 10)/100)})`;
  }
};

// Добавление событие на увеличение изображение по клику
scaleButtonBigger.addEventListener('click', increaseImage);

export {imagePreview};
