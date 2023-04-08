export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const serverInteractionConfig = {
  url: "https://api.mestoapp.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
};
