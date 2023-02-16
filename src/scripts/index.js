// @ts-nocheck
import "../pages/index.css";

/** Components */

import FormValidator from "../components/FormValidator.js";
import PopupImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";

import {
  validationConfig,
  initialCards,
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
} from "../utils/constants.js";

/**
 * instances of components
 */

const sectionCards = new Section({
  items: initialCards,
  selector: ".elements",
  renderer: function (item) {
    this.addItem(createCard(item));
  },
});

const userInfo = new UserInfo({
  nameElement: profileNameElement,
  aboutElement: profileAboutElement,
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

// Auxiliary functions

function createCard(item) {
  const card = new Card({
    ...item,
    template: "#element-template",
    handleImageClick: handleImageCardClick,
  });

  return card.generateCard();
}

// Handlers

function handleImageCardClick({ name, link }) {
  popupImage.setData({ description: name, urlImage: link });
  popupImage.open();
}

function handleProfileEditButtonClick(evt) {
  evt.preventDefault();
  const { name, about } = userInfo.getUserInfo();

  popupEditProfileNameInput.value = name;
  popupEditProfileAboutInput.value = about;

  popupFormEditProfile.open();
  validatonEditProfileForm.validateForm(false);
}

function handleElementBuilderButtonClick() {
  popupFormBuilderCards.open();
  validationAddPlaceForm.validateForm();
  validationAddPlaceForm.hideErrors();
}

// Submits forms

function submitEditProfileForm(item) {
  userInfo.setUserInfo(item);
  this.close();
}

function submitBuilderElementsForm(item) {
  sectionCards.addItem(createCard(item));
  this.close();
}

// Events Handlers

profileEditButton.addEventListener("click", handleProfileEditButtonClick);
profileAddButton.addEventListener("click", handleElementBuilderButtonClick);

// Init page
sectionCards.renderItems(initialCards);
validationAddPlaceForm.enableValidation();
validatonEditProfileForm.enableValidation();
