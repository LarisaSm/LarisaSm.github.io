class Api {
  constructor (config) {
      this._url = config.url;
      this._headers = config.headers;
  }

  getInitialCards() {
    return fetch(this._url + 'cards', {
      headers: this._headers,
  })
      .then(res => this._returnData(res));
  } 

  addNewCard (name, link) {
    return fetch(this._url + 'cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link 
      })
    })
    .then((res) => this._returnData(res));
}

  editUserInfo (name, about) {
    return fetch(this._url + 'users/me', {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      about: about 
    })
  })
  .then((res) => this._returnData(res));
}
  
  getUserInfo () {
    return fetch(this._url + 'users/me', {
        headers: this._headers
      })
      .then((res) => this._returnData(res));
    }


  deleteCard(id) {
      return fetch(this._url + `cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
      }).then((res) => this._returnData(res))
  }


  likeCard(id) {
    return fetch(this._url + `cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
  }).then((res) => this._returnData(res))
  }

  deleteLikeCard(id) {
    return fetch(this._url + `cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
  }).then((res) => this._returnData(res))
  }

  getLikesCard(id) {
    return fetch(this._url + `cards/likes/${id}`, {
      method: "GET",
      headers: this._headers,
  }).then((res) => this._returnData(res))
  }

  setUserAvatar(avatar) {
    return fetch(this._url + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar 
      })
    })
    .then((res) => this._returnData(res));
  }

_returnData (res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
		authorization: '4b126959-9593-4c1c-9c1d-30d3e8eeddbf',
    "content-type": "application/json",
  }
}); 

export default api;