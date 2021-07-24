import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class GenreMood extends Component {
  renderPlaylist = () => {
    const {data} = this.props
    const {id, imgUrl, name} = data
    return (
      <Link className="link" to={`/genre/${id}`}>
        <li className="album-details">
          <img className="album-img" src={imgUrl} alt={name} />
          <p className="album-desc">{name}</p>
        </li>
      </Link>
    )
  }

  render() {
    return <>{this.renderPlaylist()}</>
  }
}

export default GenreMood
