import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useArtistsStore } from "../store/useArtistsStore";
import { Loading } from "../components/Loading"
import { SwiperComp } from "../components/SwiperComp"
import { MdOutlineArrowOutward } from "react-icons/md";

export const EachArtistPage = () => {

  const { singleArtist, fetchSingleArtist, artistData, loading, imageToDisplay, setBgWhite } = useArtistsStore();
  const { id } = useParams()
  const artistToDisplay = id.replace(/-/g, "_").toLowerCase()
  const [prevArtist, setPrevArtist] = useState(null);
  const [nextArtist, setNextArtist] = useState(null);



  useEffect(() => {
    fetchSingleArtist(artistToDisplay);
    setBgWhite(true)
  }, [artistToDisplay]);

  useEffect(() => {
    if (artistData.length > 0) {
      const currentArtistIndex = artistData.findIndex(
        (artist) => artist.name
        .toLowerCase()
        .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/ /g, "_") 
      .replace(/[^a-z0-9_]/g, "")  === artistToDisplay
      );

      if (currentArtistIndex === -1) return; // Check if artist exists in the array

      // Correctly calculate previous and next artist indices with wrapping
      const prevIndex = (currentArtistIndex - 1 + artistData.length) % artistData.length; // Wrap to last artist if at the start
      const nextIndex = (currentArtistIndex + 1) % artistData.length; // Wrap to first artist if at the end

      // Ensure you're correctly fetching the previous and next artists
      setPrevArtist(artistData[prevIndex]);
      setNextArtist(artistData[nextIndex]);
    }
  }, [artistData, artistToDisplay]);

  useEffect(() => {
    if (singleArtist?.[0]?.images) {
        singleArtist[0].images.forEach((img) => {
            const preloadImage = new Image();
            preloadImage.src = img.image; // Preload full-sized image
        });
    }
}, [singleArtist]);

  console.log(artistData)

  return (
    <section className="bg-white h-screen min-h-screen pb-10 px-6 w-screen max-w-screen overflow-hidden relative flex flex-col font-heading ">
          {loading ? (
            <Loading />
          ) : (
            singleArtist.length > 0 && (
            <div className=" w-11/12 laptop:w-8/12 mx-auto mt-20 laptop:mt-32 flex flex-col h-full gap-4">
               <div className=" flex flex-col laptop:flex-row gap-4 ">
               <img src={imageToDisplay.image} alt={imageToDisplay.alt} className="w-full laptop:w-2/3 aspect-[4/3] object-cover"/>
               <div className="w-full laptop:w-1/3 flex flex-col gap-6 laptop:gap-4 laptop:bg-light-peach laptop:p-4">
               <SwiperComp />
               <h3 className="text-4xl tablet:text-[50px] font-fat text-peach laptop:hidden">{singleArtist?.[0].name}</h3>
               <ul className="text-dark-brown">
               <li>Year of birth: <span className="italic">{singleArtist?.[0].year_of_birth}</span></li>
               <li>Origin: <span className="italic">{singleArtist?.[0].birthplace}</span></li>
               <ul className="flex gap-2">
                Techniques:
                {singleArtist?.[0].technique.map((technique, index) => (
                  <li key={index} className="italic">
                    {technique}
                    {index < singleArtist[0].technique.length - 1 && ","}
                  </li>
                ))}
                </ul>
                <li className="flex gap-1 items-center group"><MdOutlineArrowOutward className="group-hover:text-orange-500"/><a href={singleArtist?.[0].info_link} target="_blank" className="relative after:content-[''] after:block after:w-0 after:h-[1px] after:bg-orange-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 group-hover:after:w-full"> Website </a> </li>
               </ul>
               </div>
               </div>
               <h3 className="font-fat laptop:text-[130px] text-peach absolute bottom-10 hidden laptop:block">{singleArtist?.[0].name}</h3>
      </div>))}
      <div className="flex justify-between mt-8">
              <NavLink
                to={`/artist/${prevArtist?.name
                  .toLowerCase()
                  .normalize("NFD") 
                .replace(/[\u0300-\u036f]/g, "") 
                .replace(/ /g, "_") 
                .replace(/[^a-z0-9_]/g, "") 
                }`}
                className="text-dark-brown hover:underline"
              >
                ← {prevArtist?.name}
              </NavLink>
              <NavLink
                to={`/artist/${nextArtist?.name
                  .toLowerCase()
                  .normalize("NFD") 
                .replace(/[\u0300-\u036f]/g, "") 
                .replace(/ /g, "_") 
                .replace(/[^a-z0-9_]/g, "") 
                }`}
                className="text-dark-brown hover:underline"
              >
                {nextArtist?.name} →
              </NavLink>
            </div>
    </section>
  )
}

