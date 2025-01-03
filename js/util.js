import { ALERT_SHOW_TIME } from './constants.js';

export const isEscapeKey = (evt) => evt.key === 'Escape';
export const isImageFile = (file) => file && file.type.startsWith('image/');
export const parseNumber = (string) => parseInt(string, 10);

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.margin = '5px 10px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '22px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.borderRadius = '5px';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
