import {Link} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class About extends Component {
  state = {isLoading: true, data: ''}

  componentDidMount() {
    this.getProfileData()
  }

  logoutUser = () => {
    localStorage.removeItem('pa_token')
  }

  getProfileData = async () => {
    const token = localStorage.getItem('pa_token', '')

    const api = 'https://api.spotify.com/v1/me'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(api, options)
    const data = await response.json()

    const formattedData = {
      name: data.display_name,
      followers: data.followers.total,
    }

    this.setState({isLoading: false, data: formattedData})
  }

  loadingComponent = () => (
    <img
      src="https://res.cloudinary.com/df9mebfal/image/upload/v1626158282/Spotify/Blocks-1s-200px_xlztcm.gif"
      alt="loading"
    />
  )

  renderProfile = () => {
    const {data} = this.state
    return (
      <>
        <img
          src="https://res.cloudinary.com/df9mebfal/image/upload/v1626105971/Spotify/Group_1_vinijn.png"
          alt="profile-pic"
        />
        <h1 className="profile-name">{data.name}</h1>
        <div className="container">
          <div className="follower-count-container">
            <p className="count-text">{data.followers}</p>
            <p className="text-heading">FOLLOWERS</p>
          </div>
          <div className="follower-count-container">
            <p className="count-text">6</p>
            <p className="text-heading">PLAYLISTS</p>
          </div>
        </div>
        <div>
          <Link to="/login">
            <button
              onClick={this.logoutUser}
              className="logout-button"
              type="button"
            >
              LOGOUT
            </button>
          </Link>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="profile-container">
        {isLoading ? this.loadingComponent() : this.renderProfile()}
      </div>
    )
  }
}

export default About
