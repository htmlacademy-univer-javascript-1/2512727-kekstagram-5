import { openFullViewPopup } from './full-picture-popup.js';
import { createPictureTemplate } from './templates.js';

const PICTURE_SELECTOR = '.picture';
const PICTURES_SELECTOR = '.pictures';

let pictures = null;
const picturesContainer = document.querySelector(PICTURES_SELECTOR);

const onPicturesContainerElementClick = (evt) => {
  const targetElement = evt.target.closest(PICTURE_SELECTOR);

  if (targetElement) {
    const pictureId = +targetElement.dataset.id;
    const targetPicture = pictures.filter((picture) => picture.id === pictureId)[0];
    openFullViewPopup(targetPicture);
  }

};

export const renderPictures = (data) => {
  pictures = data.slice();

  if (pictures) {
    picturesContainer.insertAdjacentHTML(
      'afterbegin',
      pictures.map((picture) => createPictureTemplate(picture)).join('')
    );

    picturesContainer.addEventListener(
      'click',
      onPicturesContainerElementClick
    );
  }
};
