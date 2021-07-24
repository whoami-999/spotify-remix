import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import EachPlaylist from '../EachPlaylist'

class SpecificGenre extends Component {
  state = {isLoading: true, playlists: []}

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = 'https://api.spotify.com/v1/me'

    const token = localStorage.getItem('pa_token', '')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(api, options)
    const data = await response.json()

    const getUserCountry = data.country

    const api1 = `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${getUserCountry}`

    const response1 = await fetch(api1, options)
    const data1 = await response1.json()

    const formattedData = data1.playlists.items.map(each => ({
      id: each.id,
      name: each.name,
      imgUrl: each.images[0].url,
      numberOfTracks: each.tracks.total,
    }))
    console.log(formattedData)
    console.log(data1)

    this.setState({isLoading: false, playlists: formattedData})
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
        <Link className="arrow-container" to="/">
          <img
            alt="left-arrow"
            className="arrow-image"
            src="https://res.cloudinary.com/df9mebfal/image/upload/v1626583577/Spotify/left-arrow_yu8lys.png"
          />
          <p className="back-text">Back</p>
        </Link>
        {isLoading ? this.loadingComponent() : this.showPlaylist()}
      </div>
    )
  }
}

export default SpecificGenre
