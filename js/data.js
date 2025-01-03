import {
  createIdGenerator,
  getRandomInteger,
  getRandomArrayElement,
} from './utils.js';

import {
  AVATAR_COUNT,
  PICTURE_DESCRIPTIONS,
  LIKES_COUNT,
  NAMES,
  COMMENT_MESSAGES,
  COMMENTS_COUNT,
  PICTURES_COUNT
} from './constants.js';

const generateCommentId = createIdGenerator();

export const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(NAMES),
});

export const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(PICTURE_DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENTS_COUNT) },
    createComment
  ),
});

export const getPictures = () => Array.from(
  { length: PICTURES_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);
