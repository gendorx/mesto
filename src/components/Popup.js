export default class Popup {
  constructor({ container, ...restConfig }) {
    this._container = container;
    this._config = restConfig;

    this._handlerEscClose = this._handleEscClose.bind(this);
    this._handlerCloseEvents = this._handleCloseEvents.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") return this.close();
  }

  _handleCloseEvents(evt) {
    const { popupCloseButtonClass, popupContainerClass } = this._config;

    const targetClassList = evt.target.classList;
    if (
      targetClassList.contains(popupContainerClass) ||
      targetClassList.contains(popupCloseButtonClass)
    ) {
      return this.close();
    }
  }

  hidePopup() {
    this._container.classList.remove(this._config.popupContainerActiveClass);
  }

  showPopup() {
    this._container.classList.add(this._config.popupContainerActiveClass);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handlerEscClose);
    this._container.addEventListener("mousedown", this._handlerCloseEvents);
  }

  unsetEventListeners() {
    document.removeEventListener("keydown", this._handlerEscClose);
    this._container.removeEventListener("mousedown", this._handlerCloseEvents);
  }

  open() {
    this.setEventListeners();
    this.showPopup();
  }

  close() {
    this.unsetEventListeners();
    this.hidePopup();
  }
}
