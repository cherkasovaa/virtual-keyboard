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

const symbols = {
  en: [
    ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
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

const createSwitcher = () => {
  const switcher = document.createElement('div');
  switcher.className = SWITCHER;
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
  const container = document.createElement('div');
  container.className = 'container';

  BODY.append(container);
};

const createTextarea = () => {
  const textarea = document.createElement('textarea');
  textarea.className = 'text';
  textarea.setAttribute('name', 'textarea');
  textarea.setAttribute('autofocus', 'autofocus');

  document.querySelector('.container').appendChild(textarea);
  TEXT_AREA = document.querySelector('.text');
};

const createKeyboardWrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.className = 'keyboard-wrapper';
  document.querySelector('.container').append(wrapper);
};

const createKeyboardLights = () => {
  const lights = document.createElement('div');
  lights.className = 'keyboard-lights';
  document.querySelector('.keyboard-wrapper').append(lights);
};

const createKeyboardKeysContainer = () => {
  const wrapper = document.createElement('div');
  wrapper.className = 'keyboard-keys';
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

  if (parent) {
    removeAllChildren(parent);
  }

  for (let i = 0; i < symbols[lang].length; i++) {
    const row = document.createElement('div');
    row.className = 'row';

    for (const arr in symbols[lang][i]) {
      if (typeof symbols[lang][i][arr] === 'object') {
        const col = document.createElement('div');
        col.className = 'col';

        for (const keyy in symbols[lang][i][arr]) {
          const key = document.createElement('div');
          key.className = 'keys';
          key.innerHTML = symbols[lang][i][arr][keyy];
          checkMainKeys(key);
          key.setAttribute('data-name', key.innerHTML);
          col.append(key);
          row.append(col);
        }
      } else {
        const key = document.createElement('div');
        key.className = 'keys';
        key.innerText = capsFlag ? toUpperCase(symbols[lang][i][arr]) : symbols[lang][i][arr];

        checkMainKeys(key);
        key.setAttribute('data-name', key.innerHTML);
        row.append(key);
      }
    }

    fragment.appendChild(row);
  }

  parent.append(fragment);

  assignButtonValues();
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

  if (capsFlag && !CAPSLOCK.classList.contains('active')) {
    CAPSLOCK.classList.add('active');
  }

  CAPSLOCK.addEventListener('click', () => {
    if (capsFlag) {
      capsFlag = !capsFlag;
      LocalStorage.setLocalStorage('capsFlag', 0);
      createRow(lang);
      return;
    }

    capsFlag = !capsFlag;
    LocalStorage.setLocalStorage('capsFlag', 1);
    createRow(lang);
    CAPSLOCK.classList.add('active');
  });

  SHIFT_LEFT.addEventListener('mousedown', () => {
    lang = lang.toUpperCase();
    createRow(lang);
    SHIFT_LEFT.classList.add('active');
  });

  SHIFT_LEFT.addEventListener('mouseup', () => {
    lang = lang.toLowerCase();
    createRow(lang);
    SHIFT_LEFT.classList.remove('active');
  });

  keys.forEach((key) => {
    key.addEventListener('mouseover', () => {
      key.classList.add('active');
    });
  });

  keys.forEach((key) => {
    key.addEventListener('mouseout', () => {
      key.classList.remove('active');

      if (capsFlag) {
        CAPSLOCK.classList.add('active');
      }
    });
  });

  keys.forEach((key) => {
    key.addEventListener('click', (e) => {
      displayText(e);
    });
  });
};

const checkMainKeys = (key) => {
  let arr = ['Backspace', 'Tab', 'Caps Lock', 'Enter', 'Space', 'Win'];

  if (arr.some((el) => el === key.innerText)) {
    const className = key.innerText.toLowerCase().split(' ').join('');
    key.classList.add(`${className}-key`);
  }

  if (key.innerText === '\\' || key.innerText === '|') {
    key.classList.add('slash-key');
  }

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

  if (key.innerText === 'Alt') {
    key.classList.add('alt-key', 'alt-left');
  }

  if (key.innerText === 'Alt Gr') {
    key.classList.add('alt-key', 'alt-right');
  }

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

const hightlightSpaceKey = () => {
  SPACE.classList.add('active');
};

const hightlightWindowKey = (e) => {
  if (e.code === 'MetaLeft') {
    WIN_KEY.classList.add('active');
  }
};

const hightlightCapslockKey = (e) => {
  if (e.code === 'CapsLock') {
    CAPSLOCK.classList.add('active');
  }
};

// const hightlightKey = (selector) => {
//   selector.classList.add('active');
// };

const hightlightShiftsKey = (e) => {
  if (e.code === 'ShiftLeft') {
    SHIFT_LEFT.classList.add('active');
    SHIFT_RIGHT.classList.remove('active');
  }

  if (e.code === 'ShiftRight') {
    SHIFT_RIGHT.classList.add('active');
    SHIFT_LEFT.classList.remove('active');
  }
};

const hightlightCtrlKey = (e) => {
  if (e.code === 'ControlLeft') {
    CTRL_LEFT.classList.add('active');
  }

  if (e.code === 'ControlRight') {
    CTRL_RIGHT.classList.add('active');
  }
};

const hightlightAltKey = (e) => {
  if (e.code === 'AltLeft') {
    ALT_RIGHT.classList.remove('active');
    ALT_LEFT.classList.add('active');
  }

  if (e.code === 'AltRight') {
    ALT_LEFT.classList.remove('active');
    ALT_RIGHT.classList.add('active');
  }
};

const hightlightArrowKey = (e) => {
  if (e.code === 'ArrowLeft') {
    LEFT_KEY.classList.add('active');
  }

  if (e.code === 'ArrowUp') {
    UP_KEY.classList.add('active');
  }

  if (e.code === 'ArrowDown') {
    DOWN_KEY.classList.add('active');
  }

  if (e.code === 'ArrowRight') {
    RIGHT_KEY.classList.add('active');
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
    ' ': () => addSpace()
  };

  if (arr.some((el) => text === el)) {
    return;
  }

  if (arrows.some((el) => text === el)) {
    return checkArrows(text);
  }

  if (text in hashMap) {
    return hashMap[text]();
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
  console.log(e);
  keys.forEach((key) => {
    e.preventDefault();
    if (key.getAttribute('data-name') === e.key) {
      key.classList.add('active');
    }

    hightlightCapslockKey(e);
    hightlightShiftsKey(e);
    hightlightCtrlKey(e);
    hightlightAltKey(e);
    hightlightArrowKey(e);
    hightlightWindowKey(e);

    if (key.innerHTML === e.key) {
      displayText(e);
      return;
    }

    if (e.key === ' ' && key.innerHTML === 'Space') {
      hightlightSpaceKey(e);
      displayText(e);
      return;
    }

    if (e.key === '&' && key.innerHTML === '&amp;') {
      displayText(e);
      return;
    }

    if (e.key === '>' && key.innerHTML === '&gt;') {
      displayText(e);
      return;
    }

    if (e.key === '<' && key.innerHTML === '&lt;') {
      displayText(e);
      return;
    }

    displayArrows(e, key);
  });
});

const displayArrows = (e, key) => {
  const isArrowLeft = e.key === 'ArrowLeft' && key.innerHTML === '⇦';
  const isArrowUp = e.key === 'ArrowUp' && key.innerHTML === '⇪';
  const isArrowDown = e.key === 'ArrowDown' && key.innerHTML === '⇩';
  const isArrowRight = e.key === 'ArrowRight' && key.innerHTML === '⇨';

  if (isArrowLeft) {
    displayText(e);
  }
  if (isArrowUp) {
    displayText(e);
  }
  if (isArrowDown) {
    displayText(e);
  }
  if (isArrowRight) {
    displayText(e);
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
    CAPSLOCK.classList.add('active');
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
    key.classList.remove('active');

    if (e.key === 'Shift') {
      flagShift = !flagShift;
      lang = lang.toLowerCase();
      createRow(lang);
    }

    if (capsFlag) {
      CAPSLOCK.classList.add('active');
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
