class Api {
  constructor(address, token, cohorId) {
    this.address = address
    this.token = token
    this.cohortId = cohorId
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`))
    }
  }

  _request(endpoint, method, body) {
    const fetchInit = {
      method: method,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    }
    return fetch(
      `${this.address}/${this.cohortId}/${endpoint}`,
      body
        ? {...fetchInit, body: JSON.stringify(body)}
        : fetchInit)
      .then(
        this._handleResponse
      )
  }

  getUserInfo() {
    return this._request('users/me', 'GET')
  }

  getCardList() {
    return this._request('cards', 'GET')
  }

  updateUserInfo(userInfo) {
    return this._request('users/me', 'PATCH', userInfo)
  }

  updateAvatar(avatar) {
    return this._request('users/me/avatar', 'PATCH', avatar)
  }

  addNewCard(cardData) {
    return this._request('cards', 'POST', cardData)
  }

  changeLikeCardStatus(cardID, isLiked) {
    return this._request(`cards/likes/${cardID}`, isLiked ? 'DELETE' : 'PUT')
  }

  deleteCard(cardID) {
    return this._request(`cards/${cardID}`, 'DELETE')
  }
}

export const api = new Api(
  'https://nomoreparties.co/v1',
  '7334389e-9ffb-4678-b7ba-2496fb9a2222',
  'cohort-26'
)