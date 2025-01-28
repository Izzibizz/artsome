import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { useArtistsStore } from "../store/useArtistsStore";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/effect-fade";
import "swiper/css/free-mode";

export const SwiperComp = () => {
    const { singleArtist, setImageToDisplay } = useArtistsStore()

    return (
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          spaceBetween={10}
          slidesPerView={4}
          speed={1200}
          loop
          autoplay={{
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          effect="fade"
          breakpoints={{
            320: {
              spaceBetween: 10,
              slidesPerView: 4,
            },
            768: {
              spaceBetween: 5,
              slidesPerView: 4
            },
        }}
        className="w-full"
        >
         {singleArtist?.[0].images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img.thumbnail} alt={img.alt} className="object-cover aspect-[4/3] cursor-pointer" onClick={() => setImageToDisplay({image:img.image, alt:img.alt})}/>
                    </SwiperSlide>
                  ))}
        </Swiper>
      );
}

