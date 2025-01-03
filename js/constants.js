export const PICTURES_COUNT = 25;
export const LIKES_COUNT = { MIN: 15, MAX: 200 };
export const AVATAR_COUNT = 6;
export const COMMENTS_COUNT = 30;
export const COMMENTS_STEP = 5;

export const MAX_COMMENT_SYMBOLS = 140;
export const MAX_COUNT_HASHTAG = 5;
export const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
export const HashtagError = {
  IS_NOT_VALID: 'Xештег не валиден',
  IS_NOT_UNIQUE: 'Xештеги не должны совпадать',
  IS_NOT_VALID_COUNT: `Xештегов должно быть не больше ${MAX_COUNT_HASHTAG}`,
};

export const Scale = {
  DEFAULT_SCALE: 100,
  MAX_SCALE: 100,
  MIN_SCALE: 25,
  STEP_SCALE: 25,
};

export const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

export const EffectSettings = {
  [Effect.DEFAULT]: {
    FILTER: '',
    MIN: 0,
    MAX: 0,
    STEP: 0,
    UNIT: '',
  },
  [Effect.CHROME]: {
    FILTER: 'grayscale',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNIT: '',
  },
  [Effect.SEPIA]: {
    FILTER: 'sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNIT: '',
  },
  [Effect.MARVIN]: {
    FILTER: 'invert',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    UNIT: '%',
  },
  [Effect.PHOBOS]: {
    FILTER: 'blur',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    UNIT: 'px',
  },
  [Effect.HEAT]: {
    FILTER: 'brightness',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    UNIT: '',
  },
};

export const PICTURE_DESCRIPTIONS = [
  'Закат на пляже',
  'Городская панорама ночью',
  'Зимний лес',
  'Макро съемка цветка',
  'Архитектурные детали здания',
  'Пейзаж с горами',
  'Городской фонарь в тумане',
  'Мост через реку',
  'Парк с вишневыми деревьями весной',
  'Портрет девушки в черно-белом стиле',
  'Собака играет на пляже',
  'Закат в горах',
  'Абстрактное искусство',
  'Расцветающее поле под солнцем',
  'Старая улица в Европе',
  'Макро съемка бабочки',
  'Природа весной',
  'Пейзаж с водопадом',
  'Городская архитектура',
  'Портрет мужчины',
  'Зимний город ночью',
  'Рыбак на рассвете',
  'Пейзаж с озером',
  'Рабочий процесс в офисе',
  'Автомобиль на закате',
];

export const NAMES = [
  'Анна',
  'Иван',
  'Мария',
  'Александр',
  'Екатерина',
  'Дмитрий',
  'Ольга',
  'Михаил',
  'Елена',
  'Павел'
];

export const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
