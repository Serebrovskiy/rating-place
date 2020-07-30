export default class Section {
  constructor(items , {renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  rendererPrimaryCards() {

    this._items.forEach(item => {
      const card = this._renderer(item);
      this.addAppendCard(card);
    })
  }

  addAppendCard(element) {
    this._containerSelector.append(element);
  }
}