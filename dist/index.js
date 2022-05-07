import LocalStorage from './LocalStorage.js';
import Switcher from './Switcher.js';
import Information from './Information.js';

const BODY = document.body;
let keys = document.querySelectorAll('.keys');
let SPACE = document.querySelector('.space-key');
let SHIFT_LEFT = document.querySelector('.shift-left');
let SHIFT_RIGHT = document.querySelector('.shift-right');
let CTRL_LEFT = document.querySelector('.ctrl-left');
let CTRL_RIGHT = document.querySelector('.ctrl-right');
let ALT_LEFT = document.querySelector('.alt-left');
let ALT_RIGHT = document.querySelector('.alt-right');
let CAPSLOCK = document.querySelector('.capslock-key');
let LEFT_KEY = document.querySelector('.left-key');
let UP_KEY = document.querySelector('.up-key');
let DOWN_KEY = document.querySelector('.down-key');
let RIGHT_KEY = document.querySelector('.right-key');
let WIN_KEY = document.querySelector('.win-key');
let TEXT_AREA;

const SWITCHER = 'switcher';
let count = 0;
let capsFlag = !!+LocalStorage.getLocalStorage('capsFlag') || false;
let flagShift = false;
const localStorageLang = LocalStorage.getLocalStorage('lang');
let lang = localStorageLang || 'en';
const ACTIVE = 'active';

const symbols = {
  en: [
    ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt Gr', 'Ctrl', ['&#8678;', '&#8682;', '&#8681;', '&#8680;']],
  ],
  EN: [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
    ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt Gr', 'Ctrl', ['&#8678;', '&#8682;', '&#8681;', '&#8680;']],
  ],
  ru: [
    ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
    ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt Gr', 'Ctrl', ['&#8678;', '&#8682;', '&#8681;', '&#8680;']],
  ],
  RU: [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '|'],
    ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
    ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt Gr', 'Ctrl', ['&#8678;', '&#8682;', '&#8681;', '&#8680;']],
  ],
};

const createHTMLElement = (className, elem = 'div') => {
  const element = document.createElement(elem);
  element.className = className;
  return element;
};

const createSwitcher = () => {
  const switcher = createHTMLElement(SWITCHER);
  if (LocalStorage.getLocalStorage('theme') === 'dark') {
    switcher.classList.add('on');
  }
  return switcher;
};

const addSwitcher = () => {
  let switcher = createSwitcher();
  BODY.append(switcher);
  switcher = new Switcher(SWITCHER);
};

const addContainer = () => {
  const container = createHTMLElement('container');
  BODY.append(container);
};

const createTextarea = () => {
  const textarea = createHTMLElement('text', 'textarea');
  textarea.setAttribute('name', 'textarea');
  textarea.setAttribute('autofocus', 'autofocus');

  document.querySelector('.container').appendChild(textarea);
  TEXT_AREA = document.querySelector('.text');
};

const createKeyboardWrapper = () => {
  const wrapper = createHTMLElement('keyboard-wrapper');
  document.querySelector('.container').append(wrapper);
};

const createKeyboardLights = () => {
  const lights = createHTMLElement('keyboard-lights');
  document.querySelector('.keyboard-wrapper').append(lights);
};

const createKeyboardKeysContainer = () => {
  const wrapper = createHTMLElement('keyboard-keys');
  document.querySelector('.keyboard-wrapper').append(wrapper);
};

const createKeyboard = () => {
  createKeyboardWrapper();
  createKeyboardLights();
  createKeyboardKeysContainer();
};

const removeAllChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const createRow = (lang) => {
  const fragment = new DocumentFragment();
  const parent = document.querySelector('.keyboard-keys');

  removeAllChildren(parent);

  for (let i = 0; i < symbols[lang].length; i++) {
    const row = createHTMLElement('row');

    for (const arr in symbols[lang][i]) {
      typeof symbols[lang][i][arr] === 'object'
        ? createArrowsBlock(symbols[lang][i][arr], row)
        : createKeyButton(symbols[lang][i][arr], row);
    }

    fragment.appendChild(row);
  }

  parent.append(fragment);

  assignButtonValues();
};

const createKeyButton = (el, parent) => {
  const key = createHTMLElement('keys');
  key.innerText = capsFlag ? toUpperCase(el) : el;

  checkMainKeys(key);
  key.setAttribute('data-name', key.innerHTML);
  parent.append(key);
};

const createArrowsBlock = (obj, parent) => {
  const col = createHTMLElement('col');

  for (const item in obj) {
    const key = createHTMLElement('keys');
    key.innerHTML = obj[item];
    checkMainKeys(key);
    key.setAttribute('data-name', key.innerHTML);
    col.append(key);
    parent.append(col);
  }
};

const toUpperCase = (value) => {
  const arr = ['Tab', 'Backspace', 'Enter', 'Caps Lock', 'Shift', 'Ctrl', 'Win', 'Alt', 'Alt Gr', 'Space'];
  if (arr.some((el) => value === el)) {
    return value;
  }

  if (isNaN(value) && value.match(/[а-яa-z]/g)) {
    return value.toUpperCase();
  }

  return value;
};

const assignButtonValues = () => {
  keys = document.querySelectorAll('.keys');
  SPACE = document.querySelector('.space-key');
  SHIFT_LEFT = document.querySelector('.shift-left');
  SHIFT_RIGHT = document.querySelector('.shift-right');
  CTRL_LEFT = document.querySelector('.ctrl-left');
  CTRL_RIGHT = document.querySelector('.ctrl-right');
  ALT_LEFT = document.querySelector('.alt-left');
  ALT_RIGHT = document.querySelector('.alt-right');
  CAPSLOCK = document.querySelector('.capslock-key');
  LEFT_KEY = document.querySelector('.left-key');
  UP_KEY = document.querySelector('.up-key');
  DOWN_KEY = document.querySelector('.down-key');
  RIGHT_KEY = document.querySelector('.right-key');
  WIN_KEY = document.querySelector('.win-key');

  handleButtons();
};

const handleButtons = () => {
  if (capsFlag && !CAPSLOCK.classList.contains(ACTIVE)) {
    CAPSLOCK.classList.add(ACTIVE);
  }

  CAPSLOCK.addEventListener('click', () => {
    capsFlag = !capsFlag;

    if (!capsFlag) {
      LocalStorage.setLocalStorage('capsFlag', 0);
      createRow(lang);
      return;
    }

    LocalStorage.setLocalStorage('capsFlag', 1);
    createRow(lang);
    CAPSLOCK.classList.add(ACTIVE);
  });

  SHIFT_LEFT.addEventListener('mousedown', () => {
    lang = lang.toUpperCase();
    createRow(lang);
    SHIFT_LEFT.classList.add(ACTIVE);
  });

  SHIFT_LEFT.addEventListener('mouseup', () => {
    lang = lang.toLowerCase();
    createRow(lang);
    SHIFT_LEFT.classList.remove(ACTIVE);
  });

  keys.forEach((key) => {
    key.addEventListener('mouseover', () => {
      key.classList.add(ACTIVE);
    });

    key.addEventListener('mouseout', () => {
      key.classList.remove(ACTIVE);

      if (capsFlag) {
        CAPSLOCK.classList.add(ACTIVE);
      }
    });

    key.addEventListener('click', (e) => {
      displayText(e);
    });
  });
};

const checkMainKeys = (key) => {
  const arr = ['Backspace', 'Tab', 'Caps Lock', 'Enter', 'Space', 'Win'];

  if (arr.some((el) => el === key.innerText)) {
    const className = key.innerText.toLowerCase().split(' ').join('');
    key.classList.add(`${className}-key`);
  }

  if (key.innerText === '\\' || key.innerText === '|') {
    key.classList.add('slash-key');
  }

  addShiftClasses(key);
  addCtrlClasses(key);
  addAltClasses(key);
  addArrowClasses(key);
};

const addShiftClasses = (key) => {
  if (key.innerText === 'Shift') {
    if (count === 0) {
      key.classList.add('shift-key', 'shift-left');
      count++;
      return;
    }

    if (count === 1) {
      key.classList.add('shift-key', 'shift-right');
      count++;
      return;
    }
  }
};

const addCtrlClasses = (key) => {
  if (key.innerText === 'Ctrl') {
    if (count === 2) {
      key.classList.add('ctrl-key', 'ctrl-left');
      count++;
      return;
    }

    if (count === 3) {
      key.classList.add('ctrl-key', 'ctrl-right');
      count = 0;
      return;
    }
  }
};

const addAltClasses = (key) => {
  if (key.innerText === 'Alt') {
    key.classList.add('alt-key', 'alt-left');
  }

  if (key.innerText === 'Alt Gr') {
    key.classList.add('alt-key', 'alt-right');
  }
};

const addArrowClasses = (key) => {
  if (key.innerHTML === '⇦') {
    key.classList.add('left-key');
  }

  if (key.innerHTML === '⇪') {
    key.classList.add('up-key');
  }

  if (key.innerHTML === '⇩') {
    key.classList.add('down-key');
  }

  if (key.innerHTML === '⇨') {
    key.classList.add('right-key');
  }
};

keys.forEach((key) => {
  key.setAttribute('data-name', key.innerHTML);
});

const hightlightSpaceKey = (e) => {
  if (e.code === 'Space') {
    SPACE.classList.add(ACTIVE);
  }
};

const hightlightWindowKey = (e) => {
  if (e.code === 'MetaLeft') {
    WIN_KEY.classList.add(ACTIVE);
  }
};

const hightlightCapslockKey = (e) => {
  if (e.code === 'CapsLock') {
    CAPSLOCK.classList.add(ACTIVE);
  }
};

const hightlightShiftsKey = (e) => {
  if (e.code === 'ShiftLeft') {
    SHIFT_LEFT.classList.add(ACTIVE);
    SHIFT_RIGHT.classList.remove(ACTIVE);
  }

  if (e.code === 'ShiftRight') {
    SHIFT_RIGHT.classList.add(ACTIVE);
    SHIFT_LEFT.classList.remove(ACTIVE);
  }
};

const hightlightCtrlKey = (e) => {
  if (e.code === 'ControlLeft') {
    CTRL_LEFT.classList.add(ACTIVE);
  }

  if (e.code === 'ControlRight') {
    CTRL_RIGHT.classList.add(ACTIVE);
  }
};

const hightlightAltKey = (e) => {
  if (e.code === 'AltLeft') {
    ALT_RIGHT.classList.remove(ACTIVE);
    ALT_LEFT.classList.add(ACTIVE);
  }

  if (e.code === 'AltRight') {
    ALT_LEFT.classList.remove(ACTIVE);
    ALT_RIGHT.classList.add(ACTIVE);
  }
};

const hightlightArrowKey = (e) => {
  if (e.code === 'ArrowLeft') {
    LEFT_KEY.classList.add(ACTIVE);
  }

  if (e.code === 'ArrowUp') {
    UP_KEY.classList.add(ACTIVE);
  }

  if (e.code === 'ArrowDown') {
    DOWN_KEY.classList.add(ACTIVE);
  }

  if (e.code === 'ArrowRight') {
    RIGHT_KEY.classList.add(ACTIVE);
  }
};

const deleteText = () => {
  TEXT_AREA.value = TEXT_AREA.value.slice(0, -1);
  return TEXT_AREA.value;
};

const addSpace = () => (TEXT_AREA.value += ' ');

const addEnter = () => (TEXT_AREA.value += '\n');

const addTab = () => (TEXT_AREA.value += ' '.repeat(4));

const displayText = (e) => {
  const text = e.key || e.currentTarget.dataset.name;
  const arr = ['Alt', 'Alt Gr', 'Control', 'CapsLock', 'Caps Lock', 'Meta', 'Win', 'Ctrl', 'Shift'];
  const arrows = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];
  const hashMap = {
    Backspace: () => deleteText(),
    Enter: () => addEnter(),
    Tab: () => addTab(),
    Space: () => addSpace(),
    ' ': () => addSpace(),
  };

  if (arr.some((el) => text === el)) {
    return;
  }

  if (arrows.some((el) => text === el)) {
    checkArrows(text);
    return;
  }

  if (text in hashMap) {
    hashMap[text]();
    return;
  }

  TEXT_AREA.value += text;
};

const checkArrows = (text) => {
  switch (text) {
    case 'ArrowLeft':
      text = '⇦';
      break;
    case 'ArrowUp':
      text = '⇪';
      break;
    case 'ArrowDown':
      text = '⇩';
      break;
    case 'ArrowRight':
      text = '⇨';
      break;
    default:
      break;
  }

  TEXT_AREA.value += text;
};

const addContent = () => {
  addSwitcher();

  addContainer();
  createTextarea();
  createKeyboard();
  const container = document.querySelector('.container');
  new Information(container).createInfoText();
  createRow(lang);
};

addContent();

window.addEventListener('keydown', (e) => {
  keys.forEach((key) => {
    e.preventDefault();

    if (key.getAttribute('data-name') === e.key) {
      key.classList.add(ACTIVE);
    }

    hightlightSpaceKey(e);
    hightlightCapslockKey(e);
    hightlightShiftsKey(e);
    hightlightCtrlKey(e);
    hightlightAltKey(e);
    hightlightArrowKey(e);
    hightlightWindowKey(e);

    const hashMap = {
      isRightKey: () => key.innerHTML === e.key,
      isSpaceKey: () => e.key === ' ' && key.innerHTML === 'Space',
      isAmpersandKey: () => e.key === '&' && key.innerHTML === '&amp;',
      isArrowLeft: () => e.key === '>' && key.innerHTML === '&gt;',
      isArrowRight: () => e.key === '<' && key.innerHTML === '&lt;',
    };

    for (const cond in hashMap) {
      if (hashMap[cond]()) {
        displayText(e);
      }
    }

    displayArrows(e, key);
  });
});

const displayArrows = (e, key) => {
  const hashMap = {
    isArrowLeft: () => e.key === 'ArrowLeft' && key.innerHTML === '⇦',
    isArrowUp: () => e.key === 'ArrowUp' && key.innerHTML === '⇪',
    isArrowDown: () => e.key === 'ArrowDown' && key.innerHTML === '⇩',
    isArrowRight: () => e.key === 'ArrowRight' && key.innerHTML === '⇨',
  };

  for (const cond in hashMap) {
    if (hashMap[cond]()) {
      displayText(e);
    }
  }
};

const changeKeyboardLayout = (e) => {
  if (e.key === 'Shift' && !flagShift) {
    flagShift = !flagShift;
    lang = lang.toUpperCase();
    createRow(lang);
    hightlightShiftsKey(e);
  }
};

window.addEventListener('keydown', (e) => {
  changeKeyboardLayout(e);

  if (e.key === 'CapsLock' && !capsFlag) {
    capsFlag = !capsFlag;
    LocalStorage.setLocalStorage('capsFlag', 1);
    createRow(lang);
    CAPSLOCK.classList.add(ACTIVE);
    return;
  }

  if (e.key === 'CapsLock' && capsFlag) {
    capsFlag = !capsFlag;
    LocalStorage.setLocalStorage('capsFlag', 0);
    createRow(lang);
  }
});

window.addEventListener('keyup', (e) => {
  keys.forEach((key) => {
    key.classList.remove(ACTIVE);

    if (e.key === 'Shift') {
      flagShift = !flagShift;
      lang = lang.toLowerCase();
      createRow(lang);
    }

    if (capsFlag) {
      CAPSLOCK.classList.add(ACTIVE);
    }
  });

  if (!capsFlag) {
    LocalStorage.setLocalStorage('capsFlag', 0);
  }
});

window.onkeydown = (e) => {
  if (e.altKey && e.shiftKey) {
    e.preventDefault();
    changeLang();
    const isCaps = capsFlag ? 1 : 0;
    LocalStorage.setLocalStorage('capsFlag', isCaps);
    createRow(lang);
    return;
  }
};

const changeLang = () => {
  const register = checkCase();

  if (lang === 'en' || lang === 'EN') {
    lang = register === 'UpperCase' ? 'RU' : 'ru';
  } else {
    lang = register === 'UpperCase' ? 'EN' : 'en';
  }

  LocalStorage.setLocalStorage('lang', lang.toLowerCase());
};

const checkCase = () => {
  if (lang.match('/[A-Z]/g') || lang.match('/[А-Я]/g')) {
    return 'UpperCase';
  } else {
    return 'LowerCase';
  }
};

document.body.dataset.theme = LocalStorage.getLocalStorage('theme');
