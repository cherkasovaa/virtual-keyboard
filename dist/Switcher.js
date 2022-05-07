import LocalStorage from './LocalStorage.js';

class Switcher {
  constructor(selector) {
    this.$el = document.querySelector(`.${selector}`);
    this.bindEvent();
  }

  bindEvent() {
    this.$el.addEventListener('click', this.toggle);
  }

  toggle() {
    this.classList.contains('on') ? this.classList.remove('on') : this.classList.add('on');

    Switcher.changeTheme();
  }

  static changeTheme() {
    const isDarkTheme = document.body.dataset.theme === 'dark';

    document.body.dataset.theme = isDarkTheme ? 'light' : 'dark';
    LocalStorage.setLocalStorage('theme', document.body.dataset.theme);
  }
}

export default Switcher;
