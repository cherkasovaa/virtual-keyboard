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
const TEXT_AREA = document.querySelector('.text');
// const wrapper = document.querySelector('.keyboard-wrapper');

let count = 0;

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
          col.append(key);
          row.append(col);
        }
      } else {
        const key = document.createElement('div');
        key.className = 'keys';
        key.innerText = symbols[lang][i][arr];
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
}

const checkMainKeys = (key) => {
  if (key.innerText === 'Backspace') {
    key.classList.add('backspace-key');
  }

  if (key.innerText === 'Tab') {
    key.classList.add('tab-key');
  }

  if (key.innerText === '\\' || key.innerText === '|') {
    key.classList.add('slash-key');
  }

  if (key.innerText === 'Caps Lock') {
    key.classList.add('capslock-key');
  }

  if (key.innerText === 'Enter') {
    key.classList.add('enter-key');
  }

  if (key.innerText === 'Shift') {
    if (count === 0) {
      key.classList.add('shift-key', 'shift-left');
      count++;
      return;
    }

    if (count === 1) {
      key.classList.add('shift-key', 'shift-right');
      count = 0;
      return;
    }
  }

  if (key.innerText === 'Ctrl') {
    key.classList.add('ctrl-key');
  }

  if (key.innerText === 'Alt') {
    key.classList.add('alt-key', 'alt-left');
  }

  if (key.innerText === 'Alt Gr') {
    key.classList.add('alt-key', 'alt-right');
  }

  if (key.innerHTML === 'Space') {
    key.classList.add('space-key');
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

  // return key;
};

createRow('en');

keys.forEach((key) => {
  key.setAttribute('data-name', key.innerHTML);
});

const hightlightSpaceKey = (e) => {
  if (e.code === 'Space') {
    SPACE.classList.add('active');
  }
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

const hightlightShiftsKey = (e) => {
  if (e.code === 'ShiftLeft') {
    SHIFT_RIGHT.classList.remove('active');
  }

  if (e.code === 'ShiftRight') {
    SHIFT_LEFT.classList.remove('active');
  }
};

const hightlightCtrlKey = (e) => {
  if (e.code === 'ControlLeft') {
    CTRL_RIGHT.classList.remove('active');
    CTRL_LEFT.classList.add('active');
  }

  if (e.code === 'ControlRight') {
    CTRL_LEFT.classList.remove('active');
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

  if (text === 'Backspace') {
    return deleteText();
  }

  if (text === 'Enter') {
    return addEnter();
  }

  if (text === 'Shift') {
    return;
  }

  if (
    text === 'Alt' ||
    text === 'Alt Gr' ||
    text === 'Control' ||
    text === 'CapsLock' ||
    text === 'Caps Lock' ||
    text === 'Meta' ||
    text === 'Win' ||
    text === 'Ctrl'
  ) {
    return;
  }

  if (text === 'Tab') {
    return addTab();
  }

  if (e.code === 'Space' || text === '') {
    return addSpace();
  }

  TEXT_AREA.value += text;
  return TEXT_AREA;
};

window.addEventListener('keydown', (e) => {
  keys.forEach((key) => {
    e.preventDefault();

    if (key.getAttribute('data-name') === e.key) {
      key.classList.add('active');
    }

    hightlightSpaceKey(e);
    hightlightCapslockKey(e);
    hightlightShiftsKey(e);
    hightlightCtrlKey(e);
    hightlightAltKey(e);
    hightlightArrowKey(e);
    hightlightWindowKey(e);

    if (key.innerHTML === e.key) {
      displayText(e);
    }

    if (key.innerHTML === '' && e.code === 'Space') {
      displayText(e);
    }

    if (e.key === '&' && key.innerHTML === '&amp;') {
      displayText(e);
    }

    if (e.key === '>' && key.innerHTML === '&gt;') {
      displayText(e);
    }

    if (e.key === '<' && key.innerHTML === '&lt;') {
      displayText(e);
    }
  });
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Shift') {
    createRow('EN');
  }
});

window.addEventListener('keyup', (e) => {
  keys.forEach((key) => {
    key.classList.remove('active');

    if (e.key === 'Shift') {
      createRow('en');
    }
  });
});

keys.forEach((key) => {
  key.addEventListener('mouseover', () => {
    key.classList.add('active');
  });
});

keys.forEach((key) => {
  key.addEventListener('mouseout', () => {
    key.classList.remove('active');
  });
});

keys.forEach((key) => {
  key.addEventListener('click', (e) => displayText(e));
});
