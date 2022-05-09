import LocalStorage from './LocalStorage.js';
import {DARK_THEME, ON, Switcher} from './Switcher.js';
import Information from './Information.js';
import {symbols} from './symbols.js';

const BODY = document.body;
const localStorageLang = LocalStorage.getLocalStorage('lang');
const SWITCHER = 'switcher';
const ACTIVE = 'active';
const RU = 'ru';
const EN = 'en';

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
let container;
let count = 0;
let capsFlag = !!+LocalStorage.getLocalStorage('capsFlag') || false;
let flagShift = false;
let lang = localStorageLang || 'en';

const createHTMLElement = (className, elem = 'div') => {
  const element = document.createElement(elem);
  element.className = className;
  return element;
};

const createSwitcher = () => {
  const switcher = createHTMLElement(SWITCHER);
  if (LocalStorage.getLocalStorage('theme') === DARK_THEME) {
    switcher.classList.add(ON);
  }
  return switcher;
};

const addSwitcher = () => {
  let switcher = createSwitcher();
  BODY.append(switcher);
  switcher = new Switcher(SWITCHER);
};

const addContainer = () => {
  const containerElement = createHTMLElement('container');
  BODY.append(containerElement);

  container = document.querySelector('.container');
};

const addTextarea = () => {
  const textarea = createHTMLElement('text', 'textarea');
  textarea.setAttribute('name', 'textarea');
  textarea.setAttribute('autofocus', 'autofocus');

  container.append(textarea);
  TEXT_AREA = document.querySelector('.text');
};

const addKeyboardWrapper = () => {
  const wrapper = createHTMLElement('keyboard-wrapper');
  container.append(wrapper);
  return wrapper;
};

const addKeyboardLightsContainer = () => {
  return createHTMLElement('keyboard-lights');
};

const addKeyboardKeysContainer = () => {
  return createHTMLElement('keyboard-keys');
};

const createKeyboard = () => {
  const wrapper = addKeyboardWrapper();
  wrapper.append(addKeyboardLightsContainer());
  wrapper.append(addKeyboardKeysContainer());
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

const addContent = () => {
  addSwitcher();
  addContainer();
  addTextarea();
  createKeyboard();
  new Information(container).createInfoText();
  createRow(lang);
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

const highlightSpecialKeys = (e) => {
  const hashMap = {
    Space: () => SPACE.classList.add(ACTIVE),
    MetaLeft: () => WIN_KEY.classList.add(ACTIVE),
    CapsLock: () => CAPSLOCK.classList.add(ACTIVE),
    ShiftLeft: () => SHIFT_LEFT.classList.add(ACTIVE),
    ShiftRight: () => SHIFT_RIGHT.classList.add(ACTIVE),
    ControlLeft: () => CTRL_LEFT.classList.add(ACTIVE),
    ControlRight: () => CTRL_RIGHT.classList.add(ACTIVE),
    AltLeft: () => ALT_LEFT.classList.add(ACTIVE),
    AltRight: () => {
      ALT_RIGHT.classList.add(ACTIVE);
      ALT_LEFT.classList.remove(ACTIVE);
      CTRL_LEFT.classList.remove(ACTIVE);
    },
    ArrowLeft: () => LEFT_KEY.classList.add(ACTIVE),
    ArrowUp: () => UP_KEY.classList.add(ACTIVE),
    ArrowDown: () => DOWN_KEY.classList.add(ACTIVE),
    ArrowRight: () => RIGHT_KEY.classList.add(ACTIVE),
  };

  if (e.code in hashMap) {
    hashMap[e.code]();
    return;
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

window.addEventListener('keydown', (e) => {
  keys.forEach((key) => {
    e.preventDefault();

    if (key.getAttribute('data-name') === e.key) {
      key.classList.add(ACTIVE);
    }

    highlightSpecialKeys(e);

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
    highlightSpecialKeys(e);
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
    lang = register === 'UpperCase' ? RU.toUpperCase() : RU;
  } else {
    lang = register === 'UpperCase' ? EN.toUpperCase() : EN;
  }

  LocalStorage.setLocalStorage('lang', lang.toLowerCase());
};

const checkCase = () => {
  const isUpperCase = lang.match('/[A-Z]/g') || lang.match('/[А-Я]/g');

  return isUpperCase ? 'UpperCase' : 'LowerCase';
};

addContent();

document.body.dataset.theme = LocalStorage.getLocalStorage('theme');
