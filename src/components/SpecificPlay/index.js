import {Component} from 'react'
import prettyMilliseconds from 'pretty-ms'
import './index.css'

class SpecificPlay extends Component {
  render() {
    const {data} = this.props

    const {trackName, duration, popularity} = data

    const a = prettyMilliseconds(duration)

    const min = a[0]
    let seconds = a.slice(3, 5)
    if (seconds[1] === '.') {
      seconds = `0${seconds[0]}`
    }

    return (
      <>
        <li className="playlist-item">
          <p className="item11">1</p>
          <p className="item">{trackName}</p>

          <p className="item ">
            {min} : {seconds}
          </p>
          <p className="item">{popularity}</p>
        </li>
      </>
    )
  }
}

export default SpecificPlay
