export class Section {
  constructor ({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = selector;
  }

  renderItem () {
    
    this._items.forEach((item) => {
      this._renderer(item);
  });
}

  addItem (cardElement) {
    this._container.prepend(cardElement);
  }
}