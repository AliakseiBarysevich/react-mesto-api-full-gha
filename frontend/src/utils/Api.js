import { serverInteractionConfig } from "./constants.js";

class Api {
  // любой запрос первично будет обрабатываться следующим образом:
  #onResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  constructor(config) {
    this._url = config.url;
  }

  getCards() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  loadUserInfoFromServer() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  updateUserInfo(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  addNewCard(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  editAvatar(avatar) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatar),
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  likeCard(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  removeLike(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this.#onResponce(res);
    });
  }
}

export const api = new Api(serverInteractionConfig);
