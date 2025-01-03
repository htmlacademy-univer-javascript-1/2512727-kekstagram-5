import { initCreatePopup } from './create-picture-popup.js';
import { getPictures } from './data.js';
import { renderPictures } from './thumbnails.js';

const pictures = getPictures();
renderPictures(pictures);

initCreatePopup();
