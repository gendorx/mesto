class Card {
  constructor({
    _id,
    name,
    link,
    template,
    likes,
    handleImageClick,
    handleLikeClick,
    handleDeleteCard,
    userId,
  }) {
    this._templateSelector = template;
    this._handleImageClick = () => handleImageClick({ name, link });

    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._userId = userId;

    this._handlerLikeClick = handleLikeClick.bind(this);
    this._handlerDeleteCard = handleDeleteCard.bind(this);
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._handlerDeleteCard);

    this._likeElement.addEventListener("click", () =>
      this._handlerLikeClick(this._userLiked())
    );
    this._imageElement.addEventListener("click", this._handleImageClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeElement = this._element.querySelector(".element__like");
    this._imageElement = this._element.querySelector(".element__image");
    this._likesCountElement = this._element.querySelector(
      ".element__likes-count"
    );

    this._setEventListeners();
    this._isLiked();

    this._element.querySelector(".element__title").textContent =
      this._imageElement.alt = this._name;

    this._imageElement.src = this._link;
    this._likesCountElement.textContent = this._likes.length;

    return this._element;
  }

  remove() {
    this._element.remove();
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  updateLikesCount(count) {
    this._likesCountElement.textContent = count;
  }

  like() {
    this._likeElement.classList.add("element__like_active");
  }

  unlike() {
    this._likeElement.classList.remove("element__like_active");
  }

  _userLiked() {
    return this._likeElement.classList.contains("element__like_active");
  }

  _isLiked() {
    this._likes.forEach((user) => {
      user._id == this._userId ? this.like() : this.unlike();
    });
  }
}

export default Card;
