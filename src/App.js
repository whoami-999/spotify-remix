import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import About from './components/About'
import Home from './components/Home'
import SpecificNewRelease from './components/SpecificNewRelease'
import SpecificGenre from './components/SpecificGenre'
import Playlists from './components/Playlists'
import YourMusic from './components/YourMusic'
import LoginForm from './components/LoginForm'
import SpecificPlaylist from './components/SpecificPlaylist'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <div className="app">
        <SpotifyClone />
        <div className="side">
          <ProtectedRoute exact path="/about" component={About} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/music" component={YourMusic} />
          <ProtectedRoute exact path="/genre/:id" component={SpecificGenre} />
          <ProtectedRoute
            eaxt
            path="/playlists/new/:id"
            component={SpecificNewRelease}
          />
          <ProtectedRoute exact path="/playlists" component={Playlists} />
          <ProtectedRoute
            exact
            path="/playlists/:id"
            component={SpecificPlaylist}
          />
        </div>
      </div>
    </Switch>
  </BrowserRouter>
)

export default App
