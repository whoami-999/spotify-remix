import {Component} from 'react'

import moment from 'moment'
import Featured from '../FeaturedPlaylists'
import './index.css'

class Home extends Component {
  state = {isLoading: true, featuredPlaylists: []}

  componentDidMount() {
    this.getFeaturedPlaylists()
  }

  getFeaturedPlaylists = async () => {
    const token = localStorage.getItem('pa_token', '')
    // Get Profile Data
    const profileApi = 'https://api.spotify.com/v1/me'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const profileResponse = await fetch(profileApi, options)
    const profileData = await profileResponse.json()
    const {country} = profileData
    const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

    // Get Featured Track's
    const featuredPlaylistsApi = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timeStamp}`

    const featuredPlaylistsResponse = await fetch(featuredPlaylistsApi, options)
    const featuredPlaylistsData = await featuredPlaylistsResponse.json()
    // console.log(featuredPlaylistsData)
    const formattedFeaturedPlaylistsData = featuredPlaylistsData.playlists.items.map(
      eachFeatured => ({
        id: eachFeatured.id,
        imgUrl: eachFeatured.images[0].url,
        name: eachFeatured.name,
      }),
    )
    this.setState({
      isLoading: false,
      featuredPlaylists: formattedFeaturedPlaylistsData,
    })
  }

  render() {
    const {isLoading, featuredPlaylists} = this.state
    return (
      <div className="home-container">
        <h1 className="sub-heading">Editor&apos;s picks</h1>
        {isLoading ? (
          <h1>Loading....</h1>
        ) : (
          featuredPlaylists.map(each => <Featured key={each.id} data={each} />)
        )}
      </div>
    )
  }
}

export default Home
