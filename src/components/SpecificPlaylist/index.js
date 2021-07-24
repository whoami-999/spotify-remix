import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import SongsList from '../SongsList'

class SpecificPlaylist extends Component {
  state = {songsList: [], data: ''}

  componentDidMount() {
    this.renderItem()
  }

  renderItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const tracksUrl = `https://api.spotify.com/v1/users/spotify/playlists/${id}`
    const token = localStorage.getItem('pa_token', '')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const playlistResponse = await fetch(tracksUrl, options)
    const playlistData = await playlistResponse.json()

    const formattedData = playlistData.tracks.items.map(each => ({
      id: each.track.id,
      trackName: each.track.name,
      albumName: each.track.album.name,
      duration: each.track.duration_ms,
      artistName: each.track.artists[0].name,
      addedTime: each.added_at,
    }))

    const temp = {
      name: playlistData.name,
      imgUrl: playlistData.images[0].url,
      total: playlistData.tracks.total,
    }

    this.setState({songsList: formattedData, data: temp})
  }

  displayList = () => {
    const {songsList} = this.state

    return (
      <ul className="playlist-container">
        <li className="playlist-item">
          <p className="item1">#</p>
          <p className="item">Track</p>
          <p className="item">Album</p>
          <p className="item">Time</p>
          <p className="item">Artist</p>
          <p className="item">Added</p>
        </li>
        <hr className="line" />
        {songsList.map(each => (
          <SongsList key={each.id} data={each} />
        ))}
      </ul>
    )
  }

  displayImage = () => {
    const {data} = this.state
    const {name, imgUrl, total} = data

    return (
      <>
        <div className="playlist-info-container">
          <div>
            <img className="playlist-image" alt={name} src={imgUrl} />
          </div>
          <div className="text-container">
            <p className="playlist-text">#playlist</p>
            <h1 className="playlist-name-">{name}</h1>
            <p className="total">{total} tracks</p>
          </div>
        </div>
      </>
    )
  }

  render() {
    return (
      <div>
        <Link className="arrow-container" to="/">
          <img
            alt="left-arrow"
            className="arrow-image"
            src="https://res.cloudinary.com/df9mebfal/image/upload/v1626583577/Spotify/left-arrow_yu8lys.png"
          />
          <p className="back-text">Back</p>
        </Link>
        {this.displayImage()}
        {this.displayList()}
      </div>
    )
  }
}

export default SpecificPlaylist
