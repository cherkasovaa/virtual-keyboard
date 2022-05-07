import LocalStorage from './LocalStorage.js';

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';
export const ON = 'on';

export class Switcher {
  constructor(selector) {
    this.$el = document.querySelector(`.${selector}`);
    this.bindEvent();
  }

  bindEvent() {
    this.$el.addEventListener('click', this.toggle);
  }

  toggle() {
    this.classList.contains(ON) ? this.classList.remove(ON) : this.classList.add(ON);

    Switcher.changeTheme();
  }

  static changeTheme() {
    const isDarkTheme = document.body.dataset.theme === DARK_THEME;

    document.body.dataset.theme = isDarkTheme ? LIGHT_THEME : DARK_THEME;
    LocalStorage.setLocalStorage('theme', document.body.dataset.theme);
  }
}
