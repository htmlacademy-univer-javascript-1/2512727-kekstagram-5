import { Effect, EffectSettings } from './constants.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const imageElement = uploadOverlay.querySelector('.img-upload__preview img');
const effectsElement = uploadOverlay.querySelector('.effects');
const effectLevelElement = uploadOverlay.querySelector('.effect-level');
const effectLevelValue = effectLevelElement.querySelector('.effect-level__value');
const sliderElement = effectLevelElement.querySelector('.effect-level__slider');

let selectedEffect = null;

const clearFilter = () => {
  imageElement.style.filter = null;
};

const setFilter = () => {
  const { FILTER, UNIT } = EffectSettings[selectedEffect];
  imageElement.style.filter = `${FILTER}(${effectLevelValue.value}${UNIT})`;
};

const onSliderUpdate = () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  setFilter();
};

const showSlider = () => {
  effectLevelElement.classList.remove('hidden');
  setFilter();
};

const hideSlider = () => {
  effectLevelElement.classList.add('hidden');
  clearFilter();
};

const removeSlider = () => {
  selectedEffect = Effect.DEFAULT;
  hideSlider();
  sliderElement.noUiSlider.destroy();
};

const createSlider = () => {
  selectedEffect = Effect.DEFAULT;
  hideSlider();

  noUiSlider.create(sliderElement, {
    start: EffectSettings[selectedEffect].MAX,
    step: EffectSettings[selectedEffect].STEP,
    range: {
      min: EffectSettings[selectedEffect].MIN,
      max: EffectSettings[selectedEffect].MAX,
    },
    connect: 'lower',
    format: {
      to: (value) => +value,
      from: (value) => +value,
    }
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const updateSlider = () => {
  if (selectedEffect === Effect.DEFAULT) {
    hideSlider();
  } else {
    sliderElement.noUiSlider.updateOptions({
      start: EffectSettings[selectedEffect].MAX,
      step: EffectSettings[selectedEffect].STEP,
      range: {
        min: EffectSettings[selectedEffect].MIN,
        max: EffectSettings[selectedEffect].MAX,
      },
    });

    showSlider();
  }
};

const onEffectsChange = (evt) => {
  selectedEffect = evt.target.value;
  updateSlider();
};

export const destroyEffectsSlider = () => {
  removeSlider();
  effectsElement.removeEventListener('change', onEffectsChange);
};

export const initEffectsSlider = () => {
  createSlider();
  effectsElement.addEventListener('change', onEffectsChange);
};
