export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const serverInteractionConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-51/",
  headers: {
    "Content-Type": "application/json",
    authorization: "7b587be5-7909-4dd7-9779-ccf15578e8cc",
  },
};
