import { useArtistsStore } from '../store/useArtistsStore'
import { useState, useRef } from 'react'
import '../styles/carousel.css'
import { GoChevronLeft,GoChevronRight } from 'react-icons/go'

export const Carousel = () => {
  const { artistData } = useArtistsStore()
  const [ slideIndex, setSlideIndex ] = useState(10)
  
  const nextSlide = () => {
    if(slideIndex !== artistData.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === artistData.lenght){
      setSlideIndex(1)
    }
  }
  const prevSlide = () => {
    
  }


  return (
    <section
      className="carousel">
        <button className="carousel-button prev" onClick={prevSlide}><GoChevronLeft size="70px"/></button>
        <button className="carousel-button next" onClick={nextSlide}><GoChevronRight size="70px"/></button>
      <ul>
      {artistData.map((artist, index) => {
        return (
          <li key={index} className={slideIndex === index + 1 ? "slide active" : "slide"}>
            <img src={artist.image} alt="artist" className="carousel-image" />
          </li>
        )
      })}
  </ul>
    </section>
  )
}
