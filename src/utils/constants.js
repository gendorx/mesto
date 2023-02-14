/** List of card */

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/** config for validation forms */

export const validationConfig = {
  formInputSelector: ".form__input",
  formInputInvalidClass: "form__input_invalid",
  formSubmitSelector: ".form__submit",
  formSubmitInactiveClass: "form__submit_disabled",
  formErrorActiveClass: "form__input-error_show",
};

/** config for popups */

export const popupConfig = {
  popupContainerClass: "popup",
  popupCloseButtonClass: "popup__close",
  popupContainerActiveClass: "popup_opened",
  popupFormSelector: ".form",
  popupBigPictureSelector: ".popup__big-picture",
  popupBigAboutSelector: ".popup__picture-desc",
};

/**
 *  Constants
 */

/** Profile constants */
export const profileNameElement = document.querySelector(".profile__heading");
export const profileAboutElement = document.querySelector(".profile__desc");
export const profileEditButton = document.querySelector(
  ".profile__button_action_edit"
);
export const profileAddButton = document.querySelector(
  ".profile__button_action_add"
);

/** Forms constants */
const { forms } = document;

export const addPlaceForm = forms.addPlace;
export const editProfileForm = forms.editProfile;

/** Popup constants */
export const popupEditProfile = document.querySelector(
  ".popup_type_editor-profile"
);
export const popupEditProfileNameInput = editProfileForm.querySelector(
  ".form__input_type_name"
);
export const popupEditProfileAboutInput = editProfileForm.querySelector(
  ".form__input_type_desc"
);
export const popupBuilderElements = document.querySelector(
  ".popup_type_add-element"
);
export const popupViewerPicture = document.querySelector(
  ".popup_type_view-image"
);
