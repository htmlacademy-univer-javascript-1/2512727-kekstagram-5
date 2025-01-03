import { isEscapeKey } from './utils.js';
import { createCommentTemplate } from './templates.js';
import { COMMENTS_STEP } from './constants.js';

let allComments = null;
let commentsToShow = COMMENTS_STEP;

const body = document.querySelector('body');
const fullPicture = document.querySelector('.big-picture');
const commentCount = fullPicture.querySelector('.social__comment-count');
const commentList = fullPicture.querySelector('.social__comments');
const commentsLoader = fullPicture.querySelector('.social__comments-loader');
const exitButton = fullPicture.querySelector('.big-picture__cancel');

const renderFullPicture = ({ url, likes, description }) => {
  const picture = fullPicture.querySelector('.big-picture__img img');
  picture.src = url;
  picture.alt = description;

  fullPicture.querySelector('.social__caption').textContent = description;
  fullPicture.querySelector('.likes-count').textContent = likes;
};

const renderComments = () => {
  const visibleComments = allComments.slice(0, commentsToShow);

  commentList.innerHTML = visibleComments
    .map((comment) => createCommentTemplate(comment))
    .join('');

  commentCount.textContent = `${visibleComments.length} из ${allComments.length} комментариев`;

  if (visibleComments.length < allComments.length) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
};

const closeFullViewPopup = () => {
  allComments = null;
  commentsToShow = COMMENTS_STEP;

  fullPicture.classList.add('hidden');
  commentCount.classList.add('hidden');
  body.classList.remove('modal-open');

  exitButton.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const onShowMoreComments = () => {
  commentsToShow += COMMENTS_STEP;
  renderComments();
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
  allComments = picture.comments;

  renderFullPicture(picture);
  renderComments();

  fullPicture.classList.remove('hidden');
  commentCount.classList.remove('hidden');
  body.classList.add('modal-open');

  exitButton.addEventListener('click', onCloseBtnClick);
  commentsLoader.addEventListener('click', onShowMoreComments);
  document.addEventListener('keydown', onDocumentEscKeydown);
};
