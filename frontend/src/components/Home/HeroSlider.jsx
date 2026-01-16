import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, title: "Premium Electronics", subtitle: "Discover the latest tech innovations", description: "Up to 50% off on premium headphones, smartwatches, and more", image: "./electronics.jpg", cta: "Shop Electronics", url: "/products?category=Electronics" },
    { id: 2, title: "Fashion Forward", subtitle: "Style meets comfort", description: "New arrivals in designer clothing and accessories", image: "./fashion.jpg", cta: "Explore Fashion", url: "/products?category=Fashion" },
    { id: 3, title: "Home & Garden", subtitle: "Transform your space", description: "Delever to every home", image: "./stocks.jpg", cta: "Buy Unlimited stocks", url: `/products?category=Home & Garden` },
    { id: 3, title: "Shopping Time", subtitle: "Transform your space", description: "Shop as you want", image: "./shop.jpg", cta: "Shopping what you want", url: `/products` },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const slide = slides[currentSlide];

  return (
    <div className="relative h-[75vh] overflow-hidden m-2 rounded-tr-3xl">
      {/* Slide Image */}
      <div key={slide.id} className="absolute inset-0 transition-all duration-1000 ease-out scale-105 animate-fade-in" style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "contain", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white animate-fade-in-up">
        <h3 className="text-md md:text-xl font-mono mb-3 tracking-wide uppercase">{slide.subtitle}</h3>
        <h1 className="text-4xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">{slide.title}</h1>
        <p className="text-md md:text-xl text-gray-200 mb-8 max-w-2xl">{slide.description}</p>
        <Link to={slide.url} className="px-8 py-4 bg-purple-800 text-white rounded-s-mdYes.  shadow-md hover:shadow-lg hover:scale-105 transition-transform font-semibold">
          {slide.cta}
        </Link>
      </div>

      {/* Arrows */}
      <button onClick={prevSlide} className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition"><ChevronLeft className="w-6 h-6 text-white" /></button>
      <button onClick={nextSlide} className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition"><ChevronRight className="w-6 h-6 text-white" /></button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-purple-500 scale-125" : "bg-white/40 hover:bg-white/60"}`} />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
