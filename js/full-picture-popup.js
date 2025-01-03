import { isEscapeKey } from './utils.js';
import { createCommentTemplate } from './templates.js';

const body = document.querySelector('body');
const fullPicture = document.querySelector('.big-picture');
const commentCount = fullPicture.querySelector('.social__comment-count');
const commentList = fullPicture.querySelector('.social__comments');
const exitButton = fullPicture.querySelector('.big-picture__cancel');

const renderFullPicture = ({ url, likes, description }) => {
  const picture = fullPicture.querySelector('.big-picture__img img');
  picture.src = url;
  picture.alt = description;

  fullPicture.querySelector('.social__caption').textContent = description;
  fullPicture.querySelector('.likes-count').textContent = likes;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';
  commentList.insertAdjacentHTML(
    'afterbegin',
    comments.map((comment) => createCommentTemplate(comment)).join('')
  );
};

const closeFullViewPopup = () => {
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  exitButton.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

function onCloseBtnClick() {
  closeFullViewPopup();
}

function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullViewPopup();
  }
}

export const openFullViewPopup = (picture) => {
  renderFullPicture(picture);
  renderComments(picture.comments);

  fullPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  body.classList.add('modal-open');

  exitButton.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};
