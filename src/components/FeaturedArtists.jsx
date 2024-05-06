import '../styles/FeaturedArtists.css'
//import { ImageContainer } from './reusable components/ImageContainer'
import { useArtistsStore } from '../store/useArtistsStore'

export const FeaturedArtists = () => {
  const { artistData } = useArtistsStore()

  return (
    <section className="featured">
      <h2>Featured artists</h2>
      <ul className="featured-list">
        {artistData.map((artist) => (
          <li key={artist.id} className="image-container">
            <a href={artist.info_link} target="_blank">
            <div className="overlay">
                      <h3>Read more about <br></br><span className="name">{artist.name}</span></h3>
                    </div>
              <img src={artist.image} alt="imag>e" />
            </a>
            <h4>{artist.name}</h4>
            <p className="birthplace">
              {artist.birthplace}{' '}
              <span className="born"> (b. {artist.year_of_birth})</span>
            </p>
            <div className="further-info">
              <p className="techniques-heading">Techniques: </p>
              <ul>
                {artist.technique.map((technique, index) => (
                  <li className="technique" key={index}>
                    {technique}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
