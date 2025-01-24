import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useArtistsStore } from "../store/useArtistsStore";
import { Loading } from "../components/Loading";
import { MdOutlineArrowOutward } from "react-icons/md";

export const Home = () => {
  const { artistData, loading } = useArtistsStore();
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

      const clickedImage = updatedImages[index];
      updatedImages[index] = chosenBgImage;
      setChosenBgImage(clickedImage);

      return updatedImages;
    });
  };

  useEffect(() => {
    if (artistData && artistData.length > 0) {
      const shuffled = getRandomImages(artistData, 4);
      setRandomImages(shuffled);
      setChosenBgImage(shuffled?.[0]);
    }
  }, [artistData]);

  console.log(randomImages);

  return (
    <section className=" laptop:max-h-screen pb-20 laptop:pb-0 w-screen max-w-screen overflow-hidden relative flex flex-col">
      {loading ? (
        <Loading />
      ) : (
        <>
      <img
        src={chosenBgImage?.images[0].image}
        alt={chosenBgImage ? chosenBgImage?.name : "artist"}
        className={` ${isHovered? "z-20 opacity-100 " : "z-10 opacity-20 laptop:opacity-30"} absolute  w-full max-w-full top-0 h-full max-h-full object-cover animate-zoomInOut`}
      />
      <div className={` ${isHovered? "bg-opacity-80" : "bg-opacity-50"} laptop:absolute mt-16 self-end laptop:mt-0 top-16 z-20 right-0 w-fit h-fit min-w-[40%] min-h-[30px] laptop:min-h-[15%] text-peach flex bg-white  items-end px-10 p-4 border-b-2 `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        <div className="w-fit flex-col flex gap-4">
        <NavLink
              to={`/artists/${chosenBgImage?.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`}><h2 className="text-2xl tablet:text-[50px] laptop:text-[45px] ">
            {chosenBgImage?.name}
          </h2></NavLink>
          <div className="flex gap-1 items-center self-start z-30 group">
            <MdOutlineArrowOutward className="group-hover:text-white" />
            <NavLink
              to={`/artists/${chosenBgImage?.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              className="relative text-xl laptop:text-lg italic after:content-[''] after:block after:w-0 after:h-[1px] after:bg-white after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 group-hover:after:w-full"
            >
              Read more
            </NavLink>
          </div>
        </div>
      </div>
      
        <div className="z-10 relative h-fit laptop:h-screen ">
          {randomImages?.map((artist, index) => {
            const divPositions = [
              "laptop:z-30 w-full h-[150px] tablet:h-[160px] laptop:w-[200px] laptop:h-full top-48 laptop:top-40 laptop:left-[20%] object-cover laptop:border-r-2 border-t-2 laptop:border-t-0 laptop:border-l-2 laptop:justify-end animate-slideInLeft laptop:animate-slideUp ",
              "z-10 h-[180px] tablet:h-[200px] laptop:h-[320px] w-screen top-[40%] laptop:top-1/3 right-0 items-end border-t-2 flex-col animate-slideInRight",
              "z-10 w-full h-[150px] tablet:h-[220px] laptop:w-[250px] laptop:h-screen bottom-0 left-0 border-t-2 laptop:border-t-0 laptop:border-r-2 items-end laptop:justify-end animate-slideInLeft laptop:animate-slideUp ",
              "z-10 w-full h-[120px] tablet:h-[200px] laptop:w-[20%] laptop:h-screen bottom-[20%] tablet:bottom-1/4 laptop:bottom-0 left-0 laptop:left-1/2 laptop:border-r-2 border-t-2 laptop:border-t-0 items-end laptop:justify-end animate-slideInLeft laptop:animate-slideUp",
            ];
            const imgSize = [
              "w-1/2 h-full laptop:w-full laptop:max-h-[200px] self-start border-t-2",
              "w-1/3 h-full max-w-[400px] border-r-2 border-l-2",
              "w-2/3 h-full laptop:w-full max-h-[350px] border-t-2",
              "w-1/2 h-full laptop:w-full max-h-[250px] border-l-2",
            ];
            const textPositions = [
              "top-[-20%] laptop:top-[-10%]",
              "bottom-[-20%]",
              "right-[10%] bottom-[30%] laptop:bottom-0 laptop:right-[-10%]",
              "bottom-[-20%] laptop:bottom-0 left-[40%] laptop:left-[-40%]",
            ];

            const divPositionClass = divPositions[index] || "";
            const textPositionClass = textPositions[index] || "";
            const imgSizeClass = imgSize[index] || "";

            return (
              <div className={`${divPositionClass} flex laptop:absolute`} key={index}>
                <img
                  src={artist?.images?.[0].image}
                  alt={artist?.name}
                  className={` ${imgSizeClass} object-cover cursor-pointer absolute hover:scale-105 transform transition-transform duration-300 origin-center`}
                  onClick={() => changeImages(index)}
                />
                <div
                  className={` ${textPositionClass} absolute z-40 text-white bg-peach bg-opacity-50 p-4 cursor-pointer `}
                >
                  <h3 className="text-xl">{artist?.name}</h3>
                  <div className="flex gap-1 items-center self-start group">
                    <MdOutlineArrowOutward className="group-hover:text-dark-brown" />
                    <NavLink
                      to={`/artists/${chosenBgImage?.name
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
