import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Navigation from '../Navigation/Navigation';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';


function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [movies, setMovies] = useState([])
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getMovies(localStorage.getItem('jwt')), mainApi.getUserInfo(localStorage.getItem('jwt'))])
        /** обрабатываем результат*/
        .then(([dataMovies, dataUserInfo]) => {
          setCurrentUser(dataUserInfo)
          setMovies(dataMovies)
          setLoggedIn(true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [loggedIn])

  /** регистрация пользователя */
  function handleRegister({ name, email, password }) {
    mainApi.register(name, email, password)
      .then(() => {
        handleLogin({ email, password })
        setStatus(true);
      })
      .catch((error) => {
        setStatus(false);
        console.log(error);
      })
  }

  /** авторизация пользователя */
  function handleLogin({ email, password }) {
    mainApi.authorize(email, password)
      .then((data) => {
        /** проверка, есть ли у данных JWT */
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /** выход */
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('shortMovies');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('searchQueryMovies');
    navigate('/');
  }

  /** проверка токена */
  useEffect(() => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // проверим токен
      mainApi.checkToken(jwt).then((res) => {
        if (res) {
          // авторизуем пользователя
          setLoggedIn(true);
          navigate(location.pathname);
        }
      })
        .catch((error) => {
          console.log(error)
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  /** изменение данных юзера */
  function handleUpdateUser({name, email, token}) {
    setIsLoading(true);
    mainApi.setUserInfo(name, email, token)
      .then((data) => {
        setCurrentUser(data)
        setStatus(true);
      })
      .catch((error) => {
        setStatus(false);
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleMovieDelete(movie, isSavedMovie) {
    const movieToDelete = isSavedMovie ? (movies.find(({movieId}) => movieId===movie.movieId))._id : (movies.find(({movieId}) => movieId===movie.id))._id
    mainApi.deleteMovie(movieToDelete, localStorage.getItem('jwt'))
      .then(() => {
        const newMovies = isSavedMovie ? movies.filter(({movieId}) => movieId!==movie.movieId): movies.filter(({movieId}) => movieId!==movie.id)
        setMovies(newMovies)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function handleMovieLike(movie) {
    mainApi
      .addNewMovie(movie, localStorage.getItem('jwt'))
      .then((newMovie) => {
        setMovies([newMovie, ...movies]);
      })
      .catch((err) => {
        // setIsSuccess(false);
        console.log(err);
        // handleUnauthorized(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path='/signup' element={<Register onRegister={handleRegister} />} />
          <Route path='/signin' element={<Login onLogin={handleLogin} />} />
          <Route path={'/profile'} element={
            <ProtectedRoute
              loggedIn={loggedIn}>
              <>
                <Navigation />
                <Profile
                  onUpdateUser={handleUpdateUser}
                  signOut={handleSignOut}
                />
              </>
            </ProtectedRoute>}>
          </Route>
          <Route path='/' element={<> <Header loggedIn={loggedIn} /> <Main /> <Footer /> </>} />
          <Route path={'/movies'} element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Navigation />
                <Movies
                  handleMovieLike={handleMovieLike}
                  handleMovieDelete={handleMovieDelete}
                  savedMovies={movies}
                />
                <Footer />
              </>
            </ProtectedRoute>}>
          </Route>
          <Route path={'/saved-movies'} element={
            <ProtectedRoute loggedIn={loggedIn} >
              <>
                <Navigation />
                <SavedMovies
                  movies={movies}
                  loggedIn={loggedIn}
                  handleMovieDelete={handleMovieDelete}
                  handleMovieLike={handleMovieLike}
                />
                <Footer />
              </>
            </ProtectedRoute>}>
          </Route>
          <Route exact path='*' element={< InfoTooltip />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;