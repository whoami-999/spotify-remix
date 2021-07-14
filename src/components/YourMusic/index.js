import {Component} from 'react'
import './index.css'

class YourMusic extends Component {
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
  }

  render() {
    return (
      <div>
        <h1>ff</h1>
      </div>
    )
  }
}

export default YourMusic
