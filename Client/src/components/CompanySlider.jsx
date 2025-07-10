import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { assets } from "../assets/assets";

const CompanySlider = () => {
  const logos = [
    assets.microsoft_logo,
    assets.samsung_logo,
    assets.accenture_logo,
    assets.amazon_logo,
    assets.walmart_logo,
    assets.adobe_logo,
    assets.meta_logo,
    assets.google_logo,
    assets.Netflix_logo,
    assets.microsoft_logo,
    assets.samsung_logo,
    assets.accenture_logo,
    assets.amazon_logo,
    assets.walmart_logo,
    assets.adobe_logo,
    assets.meta_logo,
    assets.google_logo,
    assets.Netflix_logo,
  ];

  return (
    <div className="py-8 overflow-hidden mx-1 pl-3 pr-1">
      {
        /* <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={30}
        
        loop={true}
        autoplay={{
          delay: 80,
          disableOnInteraction: false,
        }}
        speed={4000}
        breakpoints={{
          640: { slidesPerView: 3 },
          850: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={logo}
              alt={`logo-${index}`}
              className="h-10 w-auto mx-auto  transition-all duration-300"
            />
          </SwiperSlide>
        ))}
      </Swiper> */
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={4000}
          spaceBetween={30}
          slidesPerView="auto"
          freeMode={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <SwiperSlide
              key={index}
              className="!w-auto flex justify-center items-center px-5"
            >
              <img
                src={logo}
                alt={`logo-${index}`}
                className="h-10 w-auto mx-auto transition-all duration-300 over"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      }
    </div>
  );
};

export default CompanySlider;
