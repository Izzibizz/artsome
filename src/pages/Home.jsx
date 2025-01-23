import { useState, useEffect } from "react"
import { useArtistsStore } from "../store/useArtistsStore"
import { Loading } from "../components/Loading"


export const Home = () => {
const { artistData, loading } = useArtistsStore()
const [ chosenBgImage, setChosenBgImage ] = useState(null)
const [ randomImages, setRandomImages ] = useState(null)

const getRandomImages = (artistData, count = 5) => {
  if (artistData.length <= count) {
    return artistData; // Return all images if the array has fewer than 5 images
  }

  const shuffled = [...artistData].sort(() => 0.4 - Math.random()); // Shuffle the array
  return shuffled.slice(0, count); // Return the first 5 elements
}

const changeImages = (index) => {
  setRandomImages((prevRandomImages) => {
    const updatedImages = [...prevRandomImages];
    const temp = updatedImages[index]; // Save the clicked image
    updatedImages[index] = chosenBgImage; // Replace the clicked image with the current background image
    setChosenBgImage(temp); // Update the background image to the clicked one
    return updatedImages; // Update the randomImages array
  });
};

useEffect(() => {
  if (artistData && artistData.length > 0) {
    const shuffled = getRandomImages(artistData, 4);
    setRandomImages(shuffled);
    setChosenBgImage(artistData?.[0])
  }
}, [artistData]);




  return (
    <section className="h-screen max-h-screen w-screen max-w-screen overflow-hidden relative">
      <img src={chosenBgImage?.images[0].image} alt={chosenBgImage? chosenBgImage.name : "artist"} className="absolute opacity-80 w-full max-w-full top-0 z-0 h-full max-h-full object-cover animate-zoomInOut"/>
    {loading? (<Loading/>) : (<div className="z-10 relative h-screen animate-slideUp" >
  {randomImages?.map((artist, index) => {
    // Define custom positions based on the index
    const imgPositions = [
      "w-[150px] tablet:w-[250px] tablet:w-[10%] absolute top-20 laptop:top-40 laptop:left-[15%] aspect-square object-cover",
      "w-[150px] tablet:w-[310px] laptop:w-[500px] absolute top-1/3 right-0",
      "w-[210px] tablet:w-[210px] laptop:w-[25%] absolute bottom-0 left-0",
      "w-[130px] tablet:w-[280px] laptop:w-[280px] absolute bottom-[20%] laptop:bottom-0 left-0 laptop:left-1/3",
    ];
    const textPositions = [
      "bottom-[-5px] right-[-10%]",
      " top-10 right-[120%]",
      " top-10 right-[-20%]",
      " top-10 right-[-20%]",
    ];

    // Fallback in case there are more than 5 images
    const imgPositionClass = imgPositions[index] || "absolute";
    const textPositionClass = textPositions[index] || "";

    return (
      <div className={`${imgPositionClass}`} key={index}>
      <img
        src={artist.images[0].image}
        alt={artist.name}
        className={` cursor-pointer  hover:scale-[110%]`}
        onClick={() => changeImages(index)}
      />
      <div className={` ${textPositionClass} absolute text-white   cursor-pointer hover:scale-[150%] `}>
      <h3 className="text-3xl">{artist.name}</h3>
      <button className="">Read more </button>
      </div>
      </div>
    );
  })}
</div>)}
    
    </section>
  )
}
