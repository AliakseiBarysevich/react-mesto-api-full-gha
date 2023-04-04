import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const {values, handleChange, setValues} = useForm({});

  useEffect(() => {
    setValues({});

  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_type_place-name"
          id="place-name-input"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
          required
        />
        <span className="popup__error place-name-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_type_place-link"
          id="place-link-input"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          value={values.link || ''}
          onChange={handleChange}
          required
        />
        <span className="popup__error place-link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
