import {Component} from 'react'
import './index.css'

class Featured extends Component {
  renderPlaylist = () => {
    const {data} = this.props
    const {imgUrl, name} = data
    return (
      <li className="album-details">
        <img src={imgUrl} className="album-img" alt={name} />
        <p className="album-desc">{name}</p>
      </li>
    )
  }

  render() {
    return <>{this.renderPlaylist()}</>
  }
}

export default Featured
