import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import About from './components/About'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
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
        </div>
      </div>
    </Switch>
  </BrowserRouter>
)

export default App
