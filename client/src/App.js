// import our css files here
import './App.css';


// package imports
// import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//utils imports
import { SiteProvider } from './utils/SiteContext';

//component imports
import NavUI from './components/navbar/Navbar';

//page imports
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import News from './pages/News';
import Admin from './pages/Admin';
import Gallery from './pages/Gallery';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import TV from './pages/TV';
import Event from './pages/Event';

function App() {

  return (
    <SiteProvider>
      <Router>
        <NavUI/>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/menu' element={<Menu />} />
            <Route exact path='/news' element={<News/>} />
            <Route exact path='/admin' element={<Admin />} />
            <Route exact path='/gallery' element={<Gallery />} />
            <Route exact path='/calendar' element={<Calendar />} />
            <Route exact path='/tv' element={<TV />} />
            <Route exact path='/gallery/:id' element={<Event />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
      </Router>
    </SiteProvider>
  );
}

export default App;
