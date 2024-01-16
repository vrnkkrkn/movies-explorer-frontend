class MoviesApi {
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

    _request(options) {
        return fetch(`${this._baseUrl}`, options)
            .then(this._checkRes);
    }

    getMovies() {
        return this._request({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;