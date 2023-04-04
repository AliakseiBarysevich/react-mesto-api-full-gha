import React from "react";

function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div
      className={`popup popup_type_large-image ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
        <button
          className="popup__close-button popup__close-button_type_large-image"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
