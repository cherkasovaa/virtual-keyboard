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
// const keyboard = document.querySelector('.keyboard-wrapper');
// const TEXT_INPUT = document.querySelector('.text');

keys.forEach((key) => {
  key.setAttribute('data-name', key.innerHTML);
  // key.setAttribute('data-name', key.innerHTML);
});

window.addEventListener('keydown', (e) => {
  keys.forEach((key) => {
    e.preventDefault();

    if (key.getAttribute('data-name') === e.key) {
      key.classList.add('active');
    }

    switch (e.code) {
      case 'Space':
        SPACE.classList.add('active');
        break;
      case 'ShiftLeft':
        SHIFT_RIGHT.classList.remove('active');
        break;
      case 'ShiftRight':
        SHIFT_LEFT.classList.remove('active');
        break;
      case 'CapsLock':
        CAPSLOCK.classList.add('active');
        break;
      case 'ControlLeft':
        CTRL_RIGHT.classList.remove('active');
        CTRL_LEFT.classList.add('active');
        break;
      case 'ControlRight':
        CTRL_LEFT.classList.remove('active');
        CTRL_RIGHT.classList.add('active');
        break;
      case 'AltLeft':
        ALT_RIGHT.classList.remove('active');
        ALT_LEFT.classList.add('active');
        break;
      case 'AltRight':
        ALT_LEFT.classList.remove('active');
        ALT_RIGHT.classList.add('active');
        break;
      case 'ArrowLeft':
        LEFT_KEY.classList.add('active');
        break;
      case 'ArrowUp':
        UP_KEY.classList.add('active');
        break;
      case 'ArrowDown':
        DOWN_KEY.classList.add('active');
        break;
      case 'ArrowRight':
        RIGHT_KEY.classList.add('active');
        break;
      case 'MetaLeft':
        WIN_KEY.classList.add('active');
        break;
      default:
        break;
    }
  });
});

window.addEventListener('keyup', (e) => {
  keys.forEach((key) => {
    if (key.getAttribute('key-name') === e.key) {
      key.classList.remove('active');
    }

    switch (e.code) {
      case 'Space':
        SPACE.classList.remove('active');
        break;
      case 'ShiftLeft':
        SHIFT_LEFT.classList.remove('active');
        break;
      case 'ShiftRight':
        SHIFT_RIGHT.classList.remove('active');
        break;
      case 'CapsLock':
        CAPSLOCK.classList.remove('active');
        break;
      case 'ControlLeft':
        CTRL_LEFT.classList.remove('active');
        break;
      case 'ControlRight':
        CTRL_RIGHT.classList.remove('active');
        break;
      case 'AltLeft':
        ALT_LEFT.classList.remove('active');
        break;
      case 'AltRight':
        ALT_RIGHT.classList.remove('active');
        break;
      case 'ArrowLeft':
        LEFT_KEY.classList.remove('active');
        break;
      case 'ArrowUp':
        UP_KEY.classList.remove('active');
        break;
      case 'ArrowDown':
        DOWN_KEY.classList.remove('active');
        break;
      case 'ArrowRight':
        RIGHT_KEY.classList.remove('active');
        break;
      case 'MetaLeft':
        WIN_KEY.classList.remove('active');
        break;
      default:
        break;
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