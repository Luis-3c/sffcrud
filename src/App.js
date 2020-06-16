import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Navbar from './components/navbar/Navbar'
import Videos from './pages/Videos';
import useVideos from './pages/useVideos';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Switch>
            <Route exact path="/Videos" component={Videos}/>
            <Route exact path="/usevideos" component={useVideos}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
