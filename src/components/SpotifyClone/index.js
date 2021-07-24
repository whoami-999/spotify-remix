import {Link} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class SpotifyClone extends Component {
  render() {
    return (
      <div className="spotify-app-container">
        <div className="side-nav-container">
          <Link to="/about">
            <img
              src="https://res.cloudinary.com/df9mebfal/image/upload/v1626067850/Spotify/Vector_rif7kf.png"
              alt="spotify"
            />
          </Link>

          <ul className="menus-container">
            <Link to="/about">
              <li className="list">
                <img
                  src="https://res.cloudinary.com/df9mebfal/image/upload/v1626068737/Spotify/Group_111_ir0gc6.png"
                  alt="user"
                />
              </li>
            </Link>
            <Link to="/">
              <li className="list-item list">
                <img
                  src="https://res.cloudinary.com/df9mebfal/image/upload/v1626078991/Spotify/home_xdug1r.png"
                  alt="home"
                />
                <img
                  src="https://res.cloudinary.com/df9mebfal/image/upload/v1626079172/Spotify/Home_qm7rtp.png"
                  alt="text"
                />
              </li>
            </Link>
            <Link to="/music">
              <li className="list-item list">
                <img
                  src="https://res.cloudinary.com/df9mebfal/image/upload/v1626079342/Spotify/Solid_ldmjsv.png"
                  alt="music"
                />
                <img
                  src="https://res.cloudinary.com/df9mebfal/image/upload/v1626079357/Spotify/Group_103_rdhwkz.png"
                  alt="text"
                />
              </li>
            </Link>
            <Link to="/playlists">
              <li className="list">
                <img
                  src="https://res.cloudinary.com/df9mebfal/image/upload/v1626079457/Spotify/Group_105_z7qmjj.png"
                  alt="playlist"
                />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    )
  }
}

export default SpotifyClone
