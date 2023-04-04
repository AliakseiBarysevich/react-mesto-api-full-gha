import React from 'react';

function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h3 className="popup__heading">{title}</h3>
                <form className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit} >
                    {children}
                    <button className="popup__submit-button">{buttonText}</button>
                </form>
                <button className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;