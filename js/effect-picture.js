import {imagePreview} from './scale.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueSliderElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effectsLevel = document.querySelector('.effect-level');
const image = imagePreview.querySelector ('img');

//Создание объекта данных с парамтерами эффектов
const effects = {
  none: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'none',
    sign: '',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    sign: '',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'sepia',
    sign: '',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    filter: 'invert',
    sign: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'blur',
    sign: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'brightness',
    sign: '',
  },
};

// Cоздание слайдера для регулировки эффектов
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value)
  }
});

effectsList.addEventListener('change', (evt) => {
  if (evt.target.matches('.effects__radio')) {
    const effect = evt.target.value;
    const effectFilter = effects[effect];
    sliderElement.noUiSlider.updateOptions(effectFilter);
    if (effect === 'none') {
      image.style.filter = '';
      effectsLevel.classList.add('hidden');
    } else {
      effectsLevel.classList.remove('hidden');
    }
    sliderElement.noUiSlider.on('update', () => {
      valueSliderElement.value = sliderElement.noUiSlider.get();
      image.style.filter = `${effectFilter.filter}(${valueSliderElement.value}${effectFilter.sign})`;
    });
  }
});
