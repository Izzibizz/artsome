import { useArtistsStore } from '../store/useArtistsStore'
import { Carousel } from './Carousel'
import { Header } from './Header'
import { FeaturedArtists } from './FeaturedArtists'
import { useEffect } from 'react'

export const Body = () => {

const { fetchArtists } = useArtistsStore()

useEffect(() => {
    fetchArtists()
}, [])


  return (
    <>
    < Header />
    <main>
    < Carousel /> 
    < FeaturedArtists />
    </main>
    </>
  )
}
