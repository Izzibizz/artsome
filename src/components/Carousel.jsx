import { useArtistsStore } from '../store/useArtistsStore'
import { useState, useEffect, useRef } from 'react'
import '../styles/carousel.css'
import { GoChevronLeft,GoChevronRight } from 'react-icons/go'

export const Carousel = () => {
  const { artistData } = useArtistsStore()
  const [ slideIndex, setSlideIndex ] = useState(10)

  const autoScroll = true;
  let intervalTime = 6000
  let slideInterval
  
  const nextSlide = () => {
    if(slideIndex !== artistData.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === artistData.lenght){
      setSlideIndex(1)
    }
  }
  const prevSlide = () => {
    if(slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else if (slideIndex === 1){
      setSlideIndex(artistData.length)
    }
  }
  const autoSlide = () => {
    slideInterval= setInterval(nextSlide,intervalTime)
}


     useEffect(() => {
       if (autoScroll) {
        autoSlide()
       }
       return() => clearInterval(slideInterval)
    }, [slideIndex])


  return (
    <section
      className="carousel">
        <button className="carousel-button prev" onClick={prevSlide}><GoChevronLeft className="arrow"/></button>
        <button className="carousel-button next" onClick={nextSlide}><GoChevronRight className="arrow"/></button>
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
