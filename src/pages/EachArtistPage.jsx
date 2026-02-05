import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SwiperComp } from "../components/SwiperComp";
import { MdOutlineArrowOutward } from "react-icons/md";
import { toSlug } from "../utils/toSlug";
import { artistData } from "../data/artistData";

export const EachArtistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleArtist, setSingleArtist] = useState(null);
  const [prevArtist, setPrevArtist] = useState(null);
  const [nextArtist, setNextArtist] = useState(null);
  const [imageToDisplay, setImageToDisplay] = useState({
    image: singleArtist?.images?.[0]?.image || "",
    alt: singleArtist?.images?.[0]?.alt || "",
  });
  const [fadeIn, setFadeIn] = useState(true);

  const handleNextPrev = (artist) => {
  if (!artist) return;

  // 1. Preload image
  const img = new Image();
  img.src = artist.images[0].image;

  // 2. Trigger fade-out, byt imageToDisplay direkt
  setFadeIn(false);
  setTimeout(() => {
    setImageToDisplay({ image: artist.images[0].image, alt: artist.images[0].alt });
    setFadeIn(true);

    // 3. Byt URL (React Router)
    navigate(`/artist/${toSlug(artist.name)}`);
  }, 200); // match durationen på din fade-out
};


  useEffect(() => {
    const artist = artistData.find((a) => toSlug(a.name) === id);
    setSingleArtist(artist);

    const index = artistData.findIndex((a) => toSlug(a.name) === id);
    if (index !== -1) {
      setPrevArtist(
        artistData[(index - 1 + artistData.length) % artistData.length],
      );
      setNextArtist(artistData[(index + 1) % artistData.length]);
    }
  }, [id]);

  useEffect(() => {
    if (singleArtist?.images?.length) {
      setImageToDisplay({
        image: singleArtist.images[0].image,
        alt: singleArtist.images[0].alt,
      });
    }
  }, [singleArtist]);

  useEffect(() => {
    artistData.forEach((artist) => {
      artist.images.forEach((img) => {
        const preload = new Image();
        preload.src = img.image;
      });
    });
  }, []);


  if (!singleArtist) return <p>Artist not found</p>;

  console.log(artistData, singleArtist, imageToDisplay);

  return (
    <section
      className={`bg-white min-h-screen pb-10 px-6 w-screen max-w-screen overflow-hidden relative flex flex-col font-heading gap-12 animate-fadeIn ${`transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}`}
    >
      {singleArtist && (
        <>
          <div className=" w-11/12 laptop:w-8/12 mx-auto mt-20 laptop:mt-32 flex flex-col gap-4">
            <div className=" flex flex-col laptop:flex-row gap-4 ">
              <img
                src={imageToDisplay.image}
                alt={imageToDisplay.alt}
                className="w-full laptop:w-2/3 laptop:h-[600px] aspect-[4/3] object-cover"
              />
              <div className="w-full laptop:w-1/3 flex flex-col gap-6 laptop:gap-4 laptop:bg-light-peach laptop:p-4">
                <SwiperComp
                  singleArtist={singleArtist}
                  setImageToDisplay={setImageToDisplay}
                />
                <h3 className="text-4xl tablet:text-[50px] font-fat text-peach laptop:hidden">
                  {singleArtist?.name}
                </h3>
                <ul className="text-dark-brown gap-y-2 flex flex-col">
                  <li>
                    Year of birth:{" "}
                    <span className="italic">
                      {singleArtist?.year_of_birth}
                    </span>
                  </li>
                  <li>
                    Origin:{" "}
                    <span className="italic">{singleArtist?.birthplace}</span>
                  </li>
                  <ul className="flex flex-wrap gap-x-2">
                    Techniques:
                    {singleArtist?.technique.map((technique, index) => (
                      <li key={index} className="italic ">
                        {technique}
                        {index < singleArtist.technique.length - 1 && ","}
                      </li>
                    ))}
                  </ul>
                  <li className="flex gap-1 items-center group">
                    <MdOutlineArrowOutward className="group-hover:text-orange-500" />
                    <a
                      href={singleArtist?.info_link}
                      target="_blank"
                      className="relative after:content-[''] after:block after:w-0 after:h-[1px] after:bg-orange-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 group-hover:after:w-full"
                    >
                      {" "}
                      Website{" "}
                    </a>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <h3 className="font-fat laptop:text-[130px] text-peach absolute bottom-10 hidden laptop:block">
              {singleArtist?.name}
            </h3>
          </div>
          <div className="flex justify-between mt-6 text-sm tablet:text-base">
            <button
              onClick={() => handleNextPrev(prevArtist)}
              className="text-dark-brown hover:underline"
            >
              ← {prevArtist?.name}
            </button>
            <button
             onClick={() => handleNextPrev(nextArtist)}
              className="text-dark-brown hover:underonClick={() => handleNextPrev(prevArtist)}line"
            >
              {nextArtist?.name} →
            </button>
          </div>
        </>
      )}
    </section>
  );
};
