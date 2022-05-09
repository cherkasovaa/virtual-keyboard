class LocalStorage {
  static setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  static getLocalStorage(key) {
    return localStorage.getItem(key);
  }
}

export default LocalStorage;