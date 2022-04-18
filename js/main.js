import './util.js';
import './load-image.js';
import './scale.js';
import './picture.js';
import './effect-picture.js';
import './form-validation.js';
import './big-picture.js';
import './api.js';
import {createPictureFragment} from './picture.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form-validation.js';
import {onCancelClick} from './load-image.js';

getData((photos) => {
  createPictureFragment(photos);
});

setUserFormSubmit(onCancelClick);
