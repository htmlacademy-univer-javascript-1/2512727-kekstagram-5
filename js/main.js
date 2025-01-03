import { getPictures } from './data.js';
import { renderPictures } from './thumbnails.js';

const pictures = getPictures();
renderPictures(pictures);
