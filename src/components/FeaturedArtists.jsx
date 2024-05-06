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
            <img src={artist.image} alt="image" />
            <h4>{artist.name}</h4>
          </li>
        ))}
      </ul>
    </section>
  )
}
