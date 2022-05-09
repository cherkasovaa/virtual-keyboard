const textsArray = [
  'Клавиатура создана в операционной системе Windows',
  'Для смены языка используется комбинация клавиш Shift left + Alt left',
];

class Information {
  constructor(parent) {
    this.parent = parent;
  }

  createInfoText() {
    for (const text in textsArray) {
      const paragraph = document.createElement('p');
      paragraph.className = 'info';
      paragraph.innerText = textsArray[text];

      this.parent.append(paragraph);
    }
  }
}

export default Information;
