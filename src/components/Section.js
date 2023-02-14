export default class Section {
    constructor({ items, renderer, selector }) {
        this._items = items
        this._renderer = renderer.bind(this)

        this._container = document.querySelector(selector)
    }

    renderItems() {
        this._items.forEach(this._renderer)
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
