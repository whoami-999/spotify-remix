import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

import SpecificPlay from '../SpecificPlay'

class SpecificNewRelease extends Component {
  state = {songsList: [], data: ''}

  componentDidMount() {
    this.renderItem()
  }

  renderItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const tracksUrl = `https://api.spotify.com/v1/albums/${id}`
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
      id: each.id,
      trackName: each.name,

      duration: each.duration_ms,
      popularity: 57,
    }))

    const temp = {
      name: playlistData.name,
      imgUrl: playlistData.images[0].url,
      total: playlistData.artists[0].name,
    }

    this.setState({songsList: formattedData, data: temp})
  }

  displayList = () => {
    const {songsList} = this.state

    return (
      <ul className="playlist-container">
        <li className="playlist-item">
          <p className="item11">#</p>
          <p className="item">Track</p>
          <p className="item">Time</p>
          <p className="item">Popularity</p>
        </li>
        <hr className="line" />
        {songsList.map(each => (
          <SpecificPlay key={each.id} data={each} />
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
            <p className="playlist-text">New Releases</p>
            <h1 className="playlist-name-">{name}</h1>
            <p className="playlist-text">{total}</p>
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

export default SpecificNewRelease
