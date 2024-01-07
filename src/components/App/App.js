import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/signup' element={<Register />} />
        <Route exact path='/signin' element={<Login />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route path='/' element={<> <Header /> <Main /> <Footer /> </>} />
        <Route exact path='/movies' element={<> <Navigation /> <Movies /> <Footer /> </>} />
        <Route exact path='/saved-movies' element={<> <Navigation /> <SavedMovies /> <Footer /> </>} />
        <Route exact path='*' element={< InfoTooltip />} />
      </Routes>
    </div>
  );
}

export default App;