import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({name: values.name, about: values.description});
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setValues({name: currentUser.name, description: currentUser.about});
  }, [currentUser, isOpen, setValues]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_type_name"
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__error name-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_type_job"
          id="job-input"
          type="text"
          minLength="2"
          maxLength="200"
          name="description"
          value={values.description || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__error job-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
