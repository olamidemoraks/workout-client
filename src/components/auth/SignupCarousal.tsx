"use client";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const carousalImage = [
  { imageUrl: "/assets/welcome1.jpg" },
  { imageUrl: "/assets/welcome2.jpg" },
  { imageUrl: "/assets/welcome3.jpg" },
  { imageUrl: "/assets/welcome4.jpg" },
];

const SignupCarousal = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={10000}
        showArrows={false}
        showStatus={false}
      >
        {carousalImage.map((image) => (
          <Image
            src={image.imageUrl}
            alt={image.imageUrl}
            key={image.imageUrl}
            height={3000}
            width={3000}
            className=" object-cover h-screen w-full "
          />
        ))}
      </Carousel>
      <div className=" bg-zinc-950/40 h-full w-full absolute top-0" />
    </div>
  );
};

export default SignupCarousal;
