import {Component} from 'react'
import './index.css'

class GenreMood extends Component {
  renderPlaylist = () => {
    const {data} = this.props
    const {imgUrl, name} = data
    return (
      <li className="album-details">
        <img className="album-img" src={imgUrl} alt={name} />
        <p className="album-desc">{name}</p>
      </li>
    )
  }

  render() {
    return <>{this.renderPlaylist()}</>
  }
}

export default GenreMood
