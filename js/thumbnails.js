const pictureTemplate = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');

const createPicture = ({ url, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  return picture;
};

export const renderPictures = (data) => {
  const picturesFragment = document.createDocumentFragment();
  data.forEach((pictureData) =>
    picturesFragment.appendChild(createPicture(pictureData))
  );

  pictures.appendChild(picturesFragment);
};
