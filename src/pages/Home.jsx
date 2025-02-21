import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useArtistsStore } from "../store/useArtistsStore";
import { Loading } from "../components/Loading";
import { MdOutlineArrowOutward } from "react-icons/md";

export const Home = () => {
  const { artistData, loading, setBgWhite} = useArtistsStore();
  const [chosenBgImage, setChosenBgImage] = useState(null);
  const [randomImages, setRandomImages] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const getRandomImages = (artistData, count = 5) => {
    if (artistData.length <= count) {
      return artistData; // Return all images if the array has fewer than 5 images
    }

    const shuffled = [...artistData].sort(() => 0.4 - Math.random()); // Shuffle the array
    return shuffled.slice(0, count); // Return the first 5 elements
  };

  const changeImages = (index) => {
    setRandomImages((prevRandomImages) => {
      const updatedImages = [...prevRandomImages];
      
      // Save the clicked image and the first image
      const clickedImage = updatedImages[index];
      const firstImage = updatedImages[0];
  
      // Swap positions: clicked image becomes index 0, first image takes the clicked image's index
      updatedImages[0] = clickedImage;
      updatedImages[index] = firstImage;
  
      // Set the chosenBgImage to the new index 0
      setChosenBgImage(clickedImage);
      window.scrollTo(0, 0);
  
      return updatedImages;
    });
  };

  useEffect(() => {
    if (artistData && artistData.length > 0) {
      const shuffled = getRandomImages(artistData, 4);
      setRandomImages(shuffled);
      setChosenBgImage(shuffled?.[0]);
      setBgWhite(false)
    }
  }, [artistData]);

  console.log(randomImages);

  return (
    <section className="laptop:max-h-screen pb-20 laptop:pb-0 w-screen max-w-screen overflow-hidden relative flex flex-col font-heading ">
      {loading ? (
        <Loading />
      ) : (
        <>
      <img
        src={chosenBgImage?.images[0].image}
        alt={chosenBgImage ? chosenBgImage?.name : "artist"}
        className={` ${isHovered? "z-20 opacity-100 " : "z-10 opacity-20 laptop:opacity-30"} absolute  w-full max-w-full top-0 h-full max-h-full object-cover animate-zoomInOut`}
      />
      <div className={` ${isHovered? "bg-opacity-80 min-w-[20%] " : "bg-opacity-50 min-w-[100%]"} transition-all transform duration-300 laptop:absolute mt-32 self-end laptop:mt-0 top-16 left-[200px] z-20 h-[150px] text-peach flex bg-white items-end px-10 p-4 laptop:border-b-2 `}>
        <div className="w-fit flex-col flex gap-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <NavLink
              to={`/artist/${chosenBgImage?.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`}><h2 className="text-4xl tablet:text-[50px] font-fat laptop:text-[45px] ">
            {chosenBgImage?.name}
          </h2></NavLink>
          <div className="flex gap-1 items-center self-start z-30 group">
            <MdOutlineArrowOutward className="group-hover:text-white" />
            <NavLink
              to={`/artist/${chosenBgImage?.name
                .toLowerCase()
                .normalize("NFD") 
              .replace(/[\u0300-\u036f]/g, "") 
              .replace(/ /g, "_") 
              .replace(/[^a-z0-9_]/g, "") 
              }`}
              className="relative text-xl laptop:text-lg italic after:content-[''] after:block after:w-0 after:h-[1px] after:bg-white after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 group-hover:after:w-full"
            >
              Read more
            </NavLink>
          </div>
        </div>
      </div>
      
        <div className="z-10 relative h-fit laptop:h-screen flex flex-col gap-8">
          {randomImages?.map((artist, index) => {
            const divPositions = [
              "laptop:z-30 w-full h-[230px] mb-20 tablet:h-[350px] laptop:w-[400px] laptop:h-full top-48 laptop:top-[214px] laptop:left-[20%] object-cover laptop:border-r-2 border-t-2 laptop:border-t-0 laptop:border-l-2 laptop:justify-end animate-slideInLeft laptop:animate-slideUp ",
              "z-10 h-[180px] tablet:h-[200px] laptop:h-[180px] w-screen top-[40%] laptop:top-1/3 right-0 items-end border-t-2 flex-col animate-slideInRight",
              "z-10 w-full h-[150px] tablet:h-[220px] laptop:w-[170px] laptop:h-screen bottom-0 left-0 border-t-2  laptop:border-t-0 laptop:border-r-2 items-end laptop:justify-end animate-slideInLeft laptop:animate-slideUp ",
              "z-10 w-full h-[120px] tablet:h-[180px] laptop:w-[180px] laptop:h-screen bottom-[20%] tablet:bottom-1/4 laptop:bottom-0 left-0 laptop:left-1/2 laptop:border-r-2 border-t-2 laptop:border-t-0 items-end laptop:justify-end animate-slideInLeft laptop:animate-slideUp",
            ];
            const imgStyle = [
              "w-[70%] h-full laptop:w-full laptop:max-h-[400px] self-start border-t-2",
              "w-[33%] h-full max-w-[400px] border-r-2 border-l-2  hover:scale-110 hover:border-2",
              "w-[45%] h-full laptop:w-full max-h-[350px] border-t-2  hover:scale-110 hover:border-2",
              "w-1/3 h-full laptop:w-full max-h-[250px] border-l-2  hover:scale-110 hover:border-2",
            ];
            const textPositions = [
              "hidden",
              "bottom-0 right-[33%] laptop:right-0 laptop:bottom-[-34%]",
              "left-[45%] laptop:right-0 laptop:bottom-[350px] ",
              "bottom-[-20%] laptop:bottom-[15%] left-[33%] laptop:left-[180px]",
            ];

            const divPositionClass = divPositions[index] || "";
            const textPositionClass = textPositions[index] || "";
            const imgStyleClass = imgStyle[index] || "";

            return (
              <div className={`${divPositionClass} flex laptop:absolute`} key={index}>
                <img
                  src={artist?.images?.[0].image}
                  alt={artist?.name}
                  className={` ${imgStyleClass} object-cover z-30 cursor-pointer absolute transform transition-transform duration-300 origin-center`}
                  onClick={() => changeImages(index)}
                />
                <div
                  className={` ${textPositionClass} absolute z-60 w-[200px] h-fit w-fit text-white bg-peach bg-opacity-50 p-4 cursor-pointer `}
                >
                  <h3 className="text-xl">{artist?.name}</h3>
                  <div className="flex gap-1 items-center self-start group laptop:hidden">
                    <MdOutlineArrowOutward className="group-hover:text-dark-brown" />
                    <NavLink
                      to={`/artist/${chosenBgImage?.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                      className="relative text-lg italic after:content-[''] after:block after:w-0 after:h-[1px] after:bg-dark-brown after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 group-hover:after:w-full"
                    >
                      Read more
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </>
      )}
    </section>
  );
};
