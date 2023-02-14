class Card {
  constructor({ name, link, template, handleImageClick }) {
    this._templateSelector = template;
    this._handleImageClick = () => handleImageClick({ name, link });

    this._name = name;
    this._link = link;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._handleDeleteCard);

    this._likeElement.addEventListener("click", this._handleToggleLikeCard.bind(this));
    this._imageElement.addEventListener("click", this._handleImageClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeElement = this._element.querySelector(".element__like");
    this._imageElement = this._element.querySelector(".element__image");

    this._setEventListeners();

    this._element.querySelector(".element__title").textContent =
      this._imageElement.alt = this._name;

    this._imageElement.src = this._link;

    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleToggleLikeCard() {
    this._likeElement.classList.toggle("element__like_active");
  }
}

export default Card;
