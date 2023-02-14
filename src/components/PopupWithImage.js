import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(config) {
    super(config);

    this._imageElement = this._container.querySelector(
      this._config.popupBigPictureSelector
    );
    this._descriptionElement = this._container.querySelector(
      this._config.popupBigAboutSelector
    );
  }

  setData({ description, urlImage }) {
    this._description = description;
    this._urlImage = urlImage;
  }

  _changePictureData() {
    this._imageElement.alt = this._descriptionElement.textContent =
      this._description;

    this._imageElement.src = this._urlImage;
  }

  open() {
    this.setEventListeners();
    this._changePictureData();
    this.showPopup();
  }
}
