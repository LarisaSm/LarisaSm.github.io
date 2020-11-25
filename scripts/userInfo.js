

export class userInfo {
  constructor ({name, about}) {
    this._name = name;
    this._about = about;
  }

  getUserInfo () {
    const user = {name: this._name.textContent, about: this._about.textContent};
    return user;
  }

  setUserInfo(name, about) {
    this._name.textContent = name,
    this._about.textContent = about
  }
}