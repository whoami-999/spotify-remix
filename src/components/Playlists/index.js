import {Component} from 'react'
import EachPlaylist from '../EachPlaylist'
import './index.css'

class Playlists extends Component {
  state = {isLoading: true, playlists: []}

  componentDidMount() {
    this.renderPlaylist()
  }

  renderPlaylist = async () => {
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

    const username = data.id

    const playlistApi = `https://api.spotify.com/v1/users/${username}/playlists?limit=50`

    const playlistResponse = await fetch(playlistApi, options)
    const playlistData = await playlistResponse.json()

    const formattedPlaylists = playlistData.items.map(each => ({
      id: each.id,
      tracksUrl: each.tracks.href,
      imgUrl: each.images[0].url,
      playlistName: each.name,
      numberOfTracks: each.tracks.total,
    }))

    this.setState({isLoading: false, playlists: formattedPlaylists})
  }

  loadingComponent = () => (
    <div className="loading-component">
      <img
        src="https://res.cloudinary.com/df9mebfal/image/upload/v1626158282/Spotify/Blocks-1s-200px_xlztcm.gif"
        alt="loading"
      />
    </div>
  )

  showPlaylist = () => {
    const {playlists} = this.state

    return (
      <>
        <h1 className="sub-heading">Your Playlists</h1>
        <ul className="album-container">
          {playlists.map(each => (
            <EachPlaylist key={each.id} data={each} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-container">
        {isLoading ? this.loadingComponent() : this.showPlaylist()}
      </div>
    )
  }
}

export default Playlists
