import {Component} from 'react'
import moment from 'moment'
import prettyMilliseconds from 'pretty-ms'
import './index.css'

class SongsList extends Component {
  diffDays = (date, otherDate) =>
    Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24))

  render() {
    const {data} = this.props

    const {trackName, albumName, duration, artistName, addedTime} = data

    const a = prettyMilliseconds(duration)

    const date = moment(addedTime).format('YYYY-MM-DD')
    const timeStamp = moment(new Date()).format('YYYY-MM-DD')
    let b = this.diffDays(new Date(timeStamp), new Date(date))
    if (b > 30) {
      b %= 30
    }

    const min = a[0]
    let seconds = a.slice(3, 5)
    if (seconds[1] === '.') {
      seconds = `0${seconds[0]}`
    }

    return (
      <>
        <li className="playlist-item">
          <p className="item1">1</p>
          <p className="item">{trackName}</p>
          <p className="item">{albumName}</p>
          <p className="item a">
            {min} : {seconds}
          </p>
          <p className="item">{artistName}</p>
          <p className="item a">{b} days ago</p>
        </li>
      </>
    )
  }
}

export default SongsList
