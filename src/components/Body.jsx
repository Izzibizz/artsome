import { useArtistsStore } from '../store/useArtistsStore'
import { Carousel } from './Carousel'
import { Header } from './Header'
import { FeaturedArtists } from './FeaturedArtists'
import { useEffect } from 'react'
import Lottie from 'lottie-react'
import animation from '../assets/loading-animation.json'
import '../styles/Body.css'

export const Body = () => {

const { fetchArtists, loading } = useArtistsStore()

useEffect(() => {
    fetchArtists()
}, [])


  return (
    <>
    {loading && (
        <div className="loading">
            <Lottie
              animationData={animation}
              loop
              autoPlay
              style={{ width: 200, height: 200 }}
            />
        </div>
      )}
      {!loading && (
      <>
    < Header />
    <main>
    < Carousel /> 
    < FeaturedArtists />
    </main>
        </>
      )}
    </>
  )
}
