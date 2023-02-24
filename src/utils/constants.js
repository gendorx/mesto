/** config for validation forms */

export const validationConfig = {
  formInputSelector: ".form__input",
  formInputInvalidClass: "form__input_invalid",
  formSubmitSelector: ".popup__submit",
  formSubmitInactiveClass: "popup__submit_disabled",
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

/** config for api */

export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "3c12d929-d321-40f7-9ea5-47a9cc856981",
    "Content-Type": "application/json",
  },
};

/**
 *  Constants
 */

/** Profile constants */
const profileElement = document.querySelector(".profile");

export const profileNameElement =
  profileElement.querySelector(".profile__heading");
export const profileAboutElement =
  profileElement.querySelector(".profile__desc");
export const profileEditButton = profileElement.querySelector(
  ".profile__button_action_edit"
);
export const profileAddButton = profileElement.querySelector(
  ".profile__button_action_add"
);
export const profileEditPhotoButton = profileElement.querySelector(
  ".profile__photo-edit"
);
export const profileAvatarElement =
  profileElement.querySelector(".profile__photo");

/** Forms constants */
const { forms } = document;

// export const addPlaceForm = forms.addPlace;
// export const editProfileForm = forms.editProfile;
// export const editProfilePhotoForm = forms.

export const {
  addPlace: addPlaceForm,
  editProfile: editProfileForm,
  editPhotoProfile: editProfilePhotoForm,
  popupConfirm: formConfirm
} = forms;

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
export const popupEditProfilePhoto = document.querySelector(
  ".popup_type_edit-photo"
);
export const popupEditProfilePhotoAvatarInput =
  editProfilePhotoForm.querySelector(".form__input_type_url");

export const popupConfirm = document.querySelector(".popup_type_confirm");
