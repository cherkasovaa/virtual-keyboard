const keys = document.querySelectorAll('.keys');
const SPACE = document.querySelector('.space-key');
const SHIFT_LEFT = document.querySelector('.shift-left');
const SHIFT_RIGHT = document.querySelector('.shift-right');
const CTRL_LEFT = document.querySelector('.ctrl-left');
const CTRL_RIGHT = document.querySelector('.ctrl-right');
const ALT_LEFT = document.querySelector('.alt-left');
const ALT_RIGHT = document.querySelector('.alt-right');
const CAPSLOCK = document.querySelector('.capslock-key');
const LEFT_KEY = document.querySelector('.left-key');
const UP_KEY = document.querySelector('.up-key');
const DOWN_KEY = document.querySelector('.down-key');
const RIGHT_KEY = document.querySelector('.right-key');
const WIN_KEY = document.querySelector('.win-key');
const TEXT_AREA = document.querySelector('.text');

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

const addTab = () => {
  return ' '.repeat(4);
};

const displayText = (e) => {
  let text = e.key;

  if (text === 'Backspace') {
    return deleteText();
  }

  if (text === 'Enter') {
    text = '\n';
  }

  if (text === 'Shift' || text === 'Alt' || text === 'Control' || text === 'CapsLock' || text === 'Meta') {
    return;
  }

  if (text === 'Tab') {
    text = addTab();
  }

  if (e.code === 'Space') {
    text = ' ';
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
  });
});

window.addEventListener('keyup', () => {
  keys.forEach((key) => {
    key.classList.remove('active');
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
