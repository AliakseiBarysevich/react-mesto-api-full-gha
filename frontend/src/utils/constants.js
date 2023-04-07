export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const serverInteractionConfig = {
  // url: "http://localhost:3000",
  url: "http://api.mestoapp.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
    // authorization: "7b587be5-7909-4dd7-9779-ccf15578e8cc",
  },
};
