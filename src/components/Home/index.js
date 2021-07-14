import {Component} from 'react'
import moment from 'moment'
import GenreMood from '../GenreMood'
import Featured from '../FeaturedPlaylists'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    featuredPlaylists: [],
    genreAndMood: [],
    newReleases: [],
  }

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

    const genreAndMoodsApi = 'https://api.spotify.com/v1/browse/categories'
    const genreAndMoodResponse = await fetch(genreAndMoodsApi, options)
    const genreAndMoodPlaylistData = await genreAndMoodResponse.json()
    // console.log(genreAndMoodPlaylistData)
    const formattedGenreAndMoodsData = genreAndMoodPlaylistData.categories.items.map(
      each => ({
        id: each.id,
        imgUrl: each.icons[0].url,
        name: each.name,
      }),
    )

    const getNewReleasesApi = `https://api.spotify.com/v1/browse/new-releases?country=${country}`
    const getNewReleasesResponse = await fetch(getNewReleasesApi, options)
    const getNewReleasesData = await getNewReleasesResponse.json()
    const formattedNewReleaseData = getNewReleasesData.albums.items.map(
      each => ({
        id: each.id,
        imgUrl: each.images[0].url,
        name: each.name,
      }),
    )
    this.setState({
      isLoading: false,
      featuredPlaylists: formattedFeaturedPlaylistsData,
      genreAndMood: formattedGenreAndMoodsData,
      newReleases: formattedNewReleaseData,
    })
  }

  loadingComponent = () => (
    <div className="loading-component">
      <img
        src="https://res.cloudinary.com/df9mebfal/image/upload/v1626158282/Spotify/Blocks-1s-200px_xlztcm.gif"
        alt="loading"
      />
    </div>
  )

  render() {
    const {isLoading, featuredPlaylists, genreAndMood, newReleases} = this.state
    return (
      <div className="home-container">
        {isLoading ? (
          this.loadingComponent()
        ) : (
          <>
            <h1 className="sub-heading">Editor&apos;s picks</h1>
            <ul className="album-container">
              {featuredPlaylists.map(each => (
                <Featured key={each.id} data={each} />
              ))}
            </ul>
            <h1 className="sub-heading">Genres & Moods</h1>
            <ul className="album-container">
              {genreAndMood.map(each => (
                <GenreMood key={each.id} data={each} />
              ))}
            </ul>
          </>
        )}
        <h1 className="sub-heading">New releases</h1>
        <ul className="album-container">
          {newReleases.map(each => (
            <Featured key={each.id} data={each} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
