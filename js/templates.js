export const createCommentTemplate = ({ name, avatar, message }) =>`
  <li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;

export const createPictureTemplate = ({ id, url, description, likes, comments }) => `
  <a href="#" data-id="${id}" class="picture">
    <img class="picture__img" src="${url}" width="182" height="182" alt="${description}">
    <p class="picture__info">
      <span class="picture__comments">${likes}</span>
      <span class="picture__likes">${comments.length}</span>
    </p>
  </a>
`;
