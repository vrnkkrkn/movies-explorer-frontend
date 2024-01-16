class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    /** проверка, всё ли в порядке с ответом от сервера */
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(baseUrl, options) {
        return fetch(`${this._baseUrl}${baseUrl}`, options)
            .then(this._checkRes);
    }

    /** запрос для регистрации в сервисе */
    register(name, email, password) {
        return this._request('/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
    };

    /** запрос для авторизации в сервисе */
    authorize(email, password) {
        return this._request('/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
    };

    /** проверка токена */
    checkToken(token) {
        return this._request('/users/me', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    /** загрузка информации о пользователе с сервера */
    getUserInfo(token) {
        return this._request('/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }


    /** редактирование профиля */
    setUserInfo(name, email, token) {
        return this._request('/users/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
    }

    /** загрузка фильмов с сервера */
    getMovies(token) {
        return this._request('/movies', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    /** добавление новой карточки */
    addNewMovie(data, token) {
        return this._request('/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailerLink: data.trailerLink,
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN
            })
        })
    }

    /** удаление карточки */
    deleteMovie(cardId, token) {
        return this._request(`/movies/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
    }
}


const mainApi = new MainApi({
    baseUrl: 'https://api.bitfilms.vrnkkrkn.nomoredomainsrocks.ru',
});

export default mainApi;