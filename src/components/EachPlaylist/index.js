import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class EachPlaylist extends Component {
  playlist = () => {
    const {data} = this.props
    const {imgUrl, playlistName, numberOfTracks, id} = data

    return (
      <Link className="link" to={`/playlists/${id}`}>
        <li className="list-item2">
          <img className="album-image" src={imgUrl} alt={playlistName} />
          <p className="playlist-name">{playlistName}</p>
          <p className="no-tracks">{numberOfTracks} Tracks</p>
        </li>
      </Link>
    )
  }

  render() {
    return <>{this.playlist()}</>
  }
}

export default EachPlaylist
