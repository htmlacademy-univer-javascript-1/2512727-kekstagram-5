import { MAX_COUNT_HASHTAG, MAX_COMMENT_SYMBOL, HashtagError, HASHTAG_REGEX, SubmitButtonText } from './constants.js';
import { initEffectsSlider, destroyEffectsSlider } from './effects-slider.js';
import { initScale, destroyScale } from './scale.js';
import { isEscapeKey, isImageFile } from './utils.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';
import { sendData } from './api.js';

const bodyElement = document.querySelector('body');
const formElement = bodyElement.querySelector('.img-upload__form');
const formButton = formElement.querySelector('.img-upload__submit');
const fileInput = formElement.querySelector('.img-upload__input');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const exitButton = overlayElement.querySelector('.img-upload__cancel');
const commentInput = overlayElement.querySelector('.text__description');
const hashtagsInput = overlayElement.querySelector('.text__hashtags');

let formValidator = null;

const splitHashtagInput = (value) => value.trim().split(' ');

const isValidHashtag = (value) => value
  ? splitHashtagInput(value).every((hashtag) => HASHTAG_REGEX.test(hashtag))
  : true;

const isCountValidHashtag = (value) => splitHashtagInput(value).length <= MAX_COUNT_HASHTAG;

const isUniqueValidHashtag = (value) => {
  const hashtags = splitHashtagInput(value).map((hastag) => hastag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const isCountValidComment = (value) => value.length <= MAX_COMMENT_SYMBOL;

const initValidation = () => {
  formValidator = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper-error-text',
  });

  formValidator.addValidator(
    hashtagsInput,
    isValidHashtag,
    HashtagError.IS_NOT_VALID,
  );

  formValidator.addValidator(
    hashtagsInput,
    isUniqueValidHashtag,
    HashtagError.IS_NOT_UNIQUE,
  );

  formValidator.addValidator(
    hashtagsInput,
    isCountValidHashtag,
    HashtagError.IS_NOT_VALID_COUNT,
  );

  formValidator.addValidator(
    commentInput,
    isCountValidComment,
    `Длина комментария не более ${MAX_COMMENT_SYMBOL} символов`
  );
};

const toggleSubmitButton = (isDisabled = false) => {
  formButton.disabled = isDisabled;
  formButton.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.DEFAULT;
};

const onCloseBtnClick = () => {
  closeCreatePopup();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeCreatePopup();
  }
};

const onInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (formValidator.validate()) {
    toggleSubmitButton(true);
    sendData(new FormData(evt.target))
      .then(() => {
        closeCreatePopup();
        showSuccessMessage();
      })
      .catch(showErrorMessage)
      .finally(toggleSubmitButton);
  }
};

const onFileInputChange = () => {
  const file = fileInput.files[0];
  if (isImageFile(file)) {
    openCreatePopup();
  } else {
    showErrorMessage();
    formElement.reset();
  }
};

function closeCreatePopup() {
  formValidator.reset();
  formElement.reset();
  destroyScale();
  destroyEffectsSlider();

  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  formElement.removeEventListener('submit', onFormSubmit);
  exitButton.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  commentInput.removeEventListener('keydown', onInputEscKeydown);
  hashtagsInput.removeEventListener('keydown', onInputEscKeydown);
}

function openCreatePopup () {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  initValidation();
  initScale();
  initEffectsSlider();

  formElement.addEventListener('submit', onFormSubmit);
  exitButton.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  commentInput.addEventListener('keydown', onInputEscKeydown);
  hashtagsInput.addEventListener('keydown', onInputEscKeydown);
}

export const initCreatePopup = () => {
  fileInput.addEventListener('change', onFileInputChange);
};
