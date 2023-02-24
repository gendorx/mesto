export default class UserInfo {
  constructor({ nameElement, aboutElement, avatarElement }) {
    this._nameElement = nameElement;
    this._aboutElement = aboutElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  getPhoto() {
    return this._avatarElement.src;
  }

  setPhoto(avatar) {
    this._avatarElement.src = avatar;
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setFullInfo({ avatar, ...context }) {
    this.setUserInfo(context);
    this.setPhoto(avatar);
  }
}
