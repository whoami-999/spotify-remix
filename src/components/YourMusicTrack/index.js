import {Component} from 'react'
import ReactAudioPlayer from 'react-audio-player'
import prettyMilliseconds from 'pretty-ms'
import './index.css'

class YourMusicTrack extends Component {
  renderMusicList = () => {
    const {data} = this.props
    const {imgUrl, time, trackName, songLink, albumName, artistName} = data
    //  console.log(time)
    const a = prettyMilliseconds(time)

    const min = a[0]
    let seconds = a.slice(3, 5)
    if (seconds[1] === '.') {
      seconds = `0${seconds[0]}`
    }

    return (
      <>
        <li className="track-container">
          <div className="song-track-container">
            <img src={imgUrl} className="song-img" alt={albumName} />
            <div className="artist-track-container">
              <p className="track">{trackName}</p>
              <p className="artist">
                {albumName} - {artistName}
              </p>
            </div>
          </div>
          <p className="time">
            {min}:{seconds}
          </p>
        </li>
      </>
    )
  }

  render() {
    return <ul className="music-list-container">{this.renderMusicList()}</ul>
  }
}

export default YourMusicTrack
