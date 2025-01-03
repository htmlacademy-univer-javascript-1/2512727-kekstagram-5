import { isEscapeKey, isImageFile } from './utils.js';
import { MAX_COUNT_HASHTAG, HashtagError, HASHTAG_REGEX } from './constants.js';

const bodyElement = document.querySelector('body');
const formElement = bodyElement.querySelector('.img-upload__form');
const formButton = bodyElement.querySelector('.img-upload__submit');
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
};

const onSubmitBtnClick = (evt) => {
  evt.preventDefault();
  if (formValidator.validate()) {
    formElement.submit();
  }
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

const onFileInputChange = () => {
  const file = fileInput.files[0];
  if (isImageFile(file)) {
    openCreatePopup();
  }
};

function closeCreatePopup() {
  formValidator.reset();
  formElement.reset();

  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  formButton.removeEventListener('click', onSubmitBtnClick);
  exitButton.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  commentInput.removeEventListener('keydown', onInputEscKeydown);
  hashtagsInput.removeEventListener('keydown', onInputEscKeydown);
}

function openCreatePopup () {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  initValidation();

  formButton.addEventListener('click', onSubmitBtnClick);
  exitButton.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  commentInput.addEventListener('keydown', onInputEscKeydown);
  hashtagsInput.addEventListener('keydown', onInputEscKeydown);
}

export const initCreatePopup = () => {
  fileInput.addEventListener('change', onFileInputChange);
};
