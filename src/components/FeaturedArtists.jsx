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
            <a href={artist.info_link} target="_blank"><img src={artist.image} alt="image" /></a>
            <h4>{artist.name}</h4>
            <p className="birthplace">{artist.birthplace} <span className="born">(b. {artist.year_of_birth})</span></p>
            <div className="further-info"><h4>Techniques: </h4>
            {artist.technique.map((technique, index) => (
            <li className="technique" key={index}>{technique}</li>))}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
