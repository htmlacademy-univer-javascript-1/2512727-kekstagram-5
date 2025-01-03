import { Scale } from './constants.js';
import { parseNumber } from './utils.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const imageElement = uploadOverlay.querySelector('.img-upload__preview img');
const scaleElement = uploadOverlay.querySelector('.img-upload__scale');
const scaleValue = scaleElement.querySelector('.scale__control--value');
const increaseScaleButton = scaleElement.querySelector('.scale__control--bigger');
const reduceScaleButton = scaleElement.querySelector('.scale__control--smaller');

const setImageScale = (scale) => {
  imageElement.style.transform = `scale(${scale / 100})`;
  scaleValue.value = `${scale}%`;
};

const onZoomInClick = () => {
  const scale = parseNumber(scaleValue.value);
  const newScale = Math.min(scale + Scale.STEP_SCALE, Scale.MAX_SCALE);
  setImageScale(newScale);
};

const onZoomOutClick = () => {
  const scale = parseNumber(scaleValue.value);
  const newScale = Math.max(scale - Scale.STEP_SCALE, Scale.MIN_SCALE);
  setImageScale(newScale);
};

export const destroyScale = () => {
  increaseScaleButton.removeEventListener('click', onZoomInClick);
  reduceScaleButton.removeEventListener('click', onZoomOutClick);
};

export const initScale = () => {
  setImageScale(Scale.DEFAULT_SCALE);
  increaseScaleButton.addEventListener('click', onZoomInClick);
  reduceScaleButton.addEventListener('click', onZoomOutClick);
};
