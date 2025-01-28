import { useEffect } from "react";
import { useParams} from "react-router-dom";
import { useArtistsStore } from "../store/useArtistsStore";
import { Loading } from "../components/Loading"
import { SwiperComp } from "../components/SwiperComp"
import { MdOutlineArrowOutward } from "react-icons/md";

export const EachArtistPage = () => {

  const { singleArtist, fetchSingleArtist, loading, imageToDisplay } = useArtistsStore();
  const { id } = useParams()
  const artistToDisplay = id.replace(/-/g, "_").toLowerCase() 

  useEffect(() => {
    fetchSingleArtist(artistToDisplay);
    
  }, [artistToDisplay]);

  useEffect(() => {
    if (singleArtist?.[0]?.images) {
        singleArtist[0].images.forEach((img) => {
            const preloadImage = new Image();
            preloadImage.src = img.image; // Preload full-sized image
        });
    }
}, [singleArtist]);

  console.log(artistToDisplay, singleArtist)

  return (
    <section className="bg-white h-screen min-h-screen pb-20 laptop:pb-0 w-screen max-w-screen overflow-hidden relative flex flex-col font-heading ">
          {loading ? (
            <Loading />
          ) : (
            singleArtist.length > 0 && (
            <div className=" w-11/12 laptop:w-8/12 mx-auto mt-20 laptop:mt-32 flex flex-col h-full gap-4">
               <div className=" flex flex-col laptop:flex-row gap-4 ">
               <img src={imageToDisplay.image} alt={imageToDisplay.alt} className="w-full laptop:w-2/3 aspect-[4/3] object-cover"/>
               <div className="w-full laptop:w-1/3 flex flex-col gap-6 laptop:gap-4">
               <SwiperComp />
               <h3 className="text-4xl tablet:text-[50px] font-fat text-peach laptop:hidden">{singleArtist?.[0].name}</h3>
               <ul>
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
               <h3 className="text-sm font-fat laptop:text-[130px] text-peach hidden laptop:block">{singleArtist?.[0].name}</h3>
      </div>))}
    </section>
  )
}

