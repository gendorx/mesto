// @ts-nocheck
import "./index.css";

/** Components */

import FormValidator from "../components/FormValidator.js";
import PopupImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";

import {
  validationConfig,
  profileNameElement,
  profileAboutElement,
  popupConfig,
  profileEditButton,
  popupEditProfile,
  popupBuilderElements,
  popupViewerPicture,
  popupEditProfileNameInput,
  popupEditProfileAboutInput,
  profileAddButton,
  editProfileForm,
  addPlaceForm,
  apiConfig,
  profileAvatarElement,
  profileEditPhotoButton,
  popupEditProfilePhoto,
  popupEditProfilePhotoAvatarInput,
  editProfilePhotoForm,
  popupConfirm,
} from "../utils/constants.js";

let userId;

/**
 * instances of components
 */

const sectionCards = new Section({
  selector: ".elements",
  renderer: function (item) {
    this.addItem(createCard(item));
  },
});

const userInfo = new UserInfo({
  nameElement: profileNameElement,
  aboutElement: profileAboutElement,
  avatarElement: profileAvatarElement,
});

const popupImage = new PopupImage({
  container: popupViewerPicture,
  ...popupConfig,
});

const popupFormEditProfile = new PopupWithForm({
  container: popupEditProfile,
  ...popupConfig,
  submitForm: submitEditProfileForm,
});

const popupFormBuilderCards = new PopupWithForm({
  container: popupBuilderElements,
  ...popupConfig,
  submitForm: submitBuilderElementsForm,
});

const popupEditPhotoProfile = new PopupWithForm({
  container: popupEditProfilePhoto,
  ...popupConfig,
  submitForm: submitEditProfilePhotoForm,
});

const popupConfirmAction = new PopupConfirm({
  container: popupConfirm,
  ...popupConfig,
  submitForm: submitFormConfirmDeletionCard,
});

const api = new Api(apiConfig);

/**
 *  Instances validations of forms
 */

const validatonEditProfileForm = new FormValidator({
  ...validationConfig,
  formElement: editProfileForm,
});

const validationAddPlaceForm = new FormValidator({
  ...validationConfig,
  formElement: addPlaceForm,
});

const validationEditProfilePhoto = new FormValidator({
  ...validationConfig,
  formElement: editProfilePhotoForm,
});

// Auxiliary functions

function createCard(item) {
  const card = new Card({
    ...item,
    userId,
    template: "#element-template",
    handleImageClick: handleImageCardClick,
    handleDeleteCard: handleDeleteCardClick,
    handleLikeClick: handleLikeCardClick,
  });

  return card.generateCard();
}

// Handlers

function handleImageCardClick({ name, link }) {
  popupImage.setData({ description: name, urlImage: link });
  popupImage.open();
}

function handleDeleteCardClick() {
  popupConfirmAction.open(this);
}

async function handleLikeCardClick(isActive) {
  let response;
  if (isActive) {
    response = await api.removeLikeCard(this._id);
    this.unlike();
  } else {
    response = await api.addLikeCard(this._id);
    this.like();
  }

  this.updateLikesCount(response.likes.length);
}

function handleProfileEditButtonClick(evt) {
  evt.preventDefault();
  const { name, about } = userInfo.getUserInfo();

  popupEditProfileNameInput.value = name;
  popupEditProfileAboutInput.value = about;

  popupFormEditProfile.open();
  validatonEditProfileForm.validateForm(false);
}

function handleProfilePhotoEditButtonClick() {
  popupEditProfilePhotoAvatarInput.value = userInfo.getPhoto();

  popupEditPhotoProfile.open();
}

function handleElementBuilderButtonClick() {
  popupFormBuilderCards.open();
  validationAddPlaceForm.validateForm();
  validationAddPlaceForm.hideErrors();
}

// Submits forms

async function submitEditProfileForm(item) {
  await api.setUserInfo(item);
  userInfo.setUserInfo(item);
  this.close();
}

async function submitBuilderElementsForm(item) {
  const card = await api.addCard(item);
  sectionCards.addItem(createCard(card));
  this.close();
}

async function submitEditProfilePhotoForm({ avatar }) {
  await api.setProfilePhoto(avatar);
  userInfo.setPhoto(avatar);
  this.close();
}

async function submitFormConfirmDeletionCard(context) {
  await api.removeCard(context._id);
  context.remove();
  this.close();
}

// Get Data from server

async function getDataServer() {
  const [cards, profile] = await Promise.all([
    api.getInitialCards(),
    api.getProfileInfo(),
  ]);

  userId = profile._id;

  sectionCards.renderItems(cards.reverse());
  userInfo.setFullInfo(profile);
}

// Events Handlers

profileEditButton.addEventListener("click", handleProfileEditButtonClick);
profileAddButton.addEventListener("click", handleElementBuilderButtonClick);
profileEditPhotoButton.addEventListener(
  "click",
  handleProfilePhotoEditButtonClick
);

getDataServer();
validationAddPlaceForm.enableValidation();
validatonEditProfileForm.enableValidation();
validationEditProfilePhoto.enableValidation();
