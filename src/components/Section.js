export default class Section {
    constructor({ renderer, selector }) {
        this._renderer = renderer.bind(this)

        this._container = document.querySelector(selector)
    }

    renderItems(items) {
        items.forEach(this._renderer)
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
