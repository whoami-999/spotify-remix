import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Featured extends Component {
  renderPlaylist = () => {
    const {data} = this.props
    const {id, imgUrl, name} = data

    return (
      <Link className="link" to={`/playlists/${id}`}>
        <li className="album-details">
          <img src={imgUrl} className="album-img" alt={name} />
          <p className="album-desc">{name}</p>
        </li>
      </Link>
    )
  }

  render() {
    return <>{this.renderPlaylist()}</>
  }
}

export default Featured
