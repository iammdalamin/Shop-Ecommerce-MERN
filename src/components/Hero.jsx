import React from "react";
// import required modules
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Img1 from "../assets/pexels-antonio-sokic-3839432 (1).jpg";
import Img2 from "../assets/pexels-ksenia-chernaya-3965539.jpg";
import Img3 from "../assets/pexels-rachel-claire-5490969 (1).jpg";

const Hero = () => {
  const Slides = [
    {
      url: Img1,
      slogan: "Shop is fun",
      title: "BROWSE OUR PREMIUM PRODUCT",
      text: "Us which over of signs divide dominion deep fill bring they're meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.",
    },
    {
      url: Img2,
      slogan: "Shop is fun",
      title: "Women’s Fashion",
      text: "Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore edolore magna aliquapendisse ultrices gravida.",
    },
    {
      url: Img3,
      slogan: "Shop is fun",
      title: "BROWSE OUR PREMIUM PRODUCT",
      text: "Us which over of signs divide dominion deep fill bring they're meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.",
    },
  ];
  return (
    <div className="w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {Slides.map(({ url, slogan, title, text }, i) => {
          return (
            <SwiperSlide key={i} className="relative ">
              <img src={url} />
              <div
                className="absolute max-w-[750px] h-auto bg-[#ffffff69]   backdrop-blur-sm drop-shadow-xl

 p-10"
              >
                <span className="text-4xl text-[#333]">{slogan}</span>
                <h1 className="text-6xl font-bold">{title}</h1>
                <p>{text}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Hero;
