import {Component} from 'react'

import YourMusicTrack from '../YourMusicTrack'
import './index.css'

class YourMusic extends Component {
  state = {isLoading: true, musicData: []}

  componentDidMount() {
    this.renderMusic()
  }

  renderMusic = async () => {
    const token = localStorage.getItem('pa_token', '')
    const getMusicApi = 'https://api.spotify.com/v1/me/tracks'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const getMusicResponse = await fetch(getMusicApi, options)
    const getMusicData = await getMusicResponse.json()
    console.log(getMusicData)
    const formattedMusicData = getMusicData.items.map(each => ({
      id: each.track.id,
      imgUrl: each.track.album.images[0].url,
      time: each.track.duration_ms,
      trackName: each.track.name,
      albumName: each.track.album.name,
      songLink: each.track.uri,
      artistName: each.track.artists.map(artist => artist.name),
    }))
    // console.log(formattedMusicData)
    this.setState({
      isLoading: false,
      musicData: formattedMusicData,
    })
  }

  loadingComponent = () => (
    <div className="loading-component">
      <img
        src="https://res.cloudinary.com/df9mebfal/image/upload/v1626158282/Spotify/Blocks-1s-200px_xlztcm.gif"
        alt="loading"
      />
    </div>
  )

  renderMusicData = () => {
    const {musicData} = this.state
    return (
      <>
        <h1 className="sub-heading">Your Music</h1>
        {musicData.map(each => (
          <YourMusicTrack key={each.id} data={each} />
        ))}
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-container">
        {isLoading ? this.loadingComponent() : this.renderMusicData()}
      </div>
    )
  }
}

export default YourMusic
