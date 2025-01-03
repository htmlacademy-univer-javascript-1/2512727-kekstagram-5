import { initCreatePopup } from './create-picture-popup.js';
import { renderPictures } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

getData()
  .then((pictures) => renderPictures(pictures))
  .catch((err) => showAlert(err.message));

initCreatePopup();
