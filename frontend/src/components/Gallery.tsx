"use client";
import React, { useState } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () =>
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);

  const nextMobileSlide = () => {
    setMobileSlideIndex((prev) => (prev + 1) % images.length);
  };

  const prevMobileSlide = () => {
    setMobileSlideIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const visibleImages = images.slice(0, 3);
  const extraCount = images.length - 3;

  return (
    <div className="w-full">
      {/* Mobile Gallery - Single Image with Slider */}
      <div className="block lg:hidden">
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 to-sky-200 shadow-xl">
          <Image
            src={images[mobileSlideIndex]}
            alt={`Property image ${mobileSlideIndex + 1}`}
            fill
            className="object-cover"
            priority={mobileSlideIndex === 0}
            onClick={() => openLightbox(mobileSlideIndex)}
          />

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevMobileSlide}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-sky-700 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextMobileSlide}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-sky-700 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1
           rounded-full text-sm font-medium backdrop-blur-sm">
            {mobileSlideIndex + 1} / {images.length}
          </div>

          {/* View All Photos Button */}
          <button
            onClick={() => openLightbox(mobileSlideIndex)}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-sky-700 px-3 py-1.5 rounded-xl text-sm font-medium shadow-lg transition-all duration-200"
          >
            View All
          </button>
        </div>

        {/* Mobile Thumbnail Strip */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMobileSlideIndex(idx)}
              className={clsx(
                "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                mobileSlideIndex === idx
                  ? "border-sky-500 ring-2 ring-sky-200"
                  : "border-sky-200 hover:border-sky-300"
              )}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Gallery - Original Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        {/* Featured Image */}
        <div
          className="col-span-2 w-full h-[520px] rounded-2xl overflow-hidden cursor-pointer shadow-xl bg-gradient-to-br from-sky-100 to-sky-200"
          onClick={() => openLightbox(images.indexOf(selectedImg))}
        >
          <Image
            src={selectedImg}
            alt="Featured"
            width={1000}
            height={500}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-rows-3 gap-4">
          {visibleImages.map((img, idx) => {
            const isLastVisible = idx === 2 && extraCount > 0;

            return (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-sky-100 to-sky-200"
                onClick={() => {
                  setSelectedImg(img);
                  openLightbox(images.indexOf(img));
                }}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  width={300}
                  height={200}
                  className={clsx(
                    "h-40 w-full object-cover cursor-pointer transition-all duration-300 hover:scale-105",
                    selectedImg === img && "ring-4 ring-sky-400"
                  )}
                />
                {isLastVisible && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-lg font-semibold cursor-pointer backdrop-blur-[1px]">
                    +{extraCount} photos
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-[999999999] flex items-center justify-center backdrop-blur-sm">
          <button
            className="absolute top-4 right-4 text-white hover:text-sky-300 cursor-pointer z-10 bg-black/50 rounded-full p-2 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={32} />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white hover:text-sky-300 cursor-pointer z-10 bg-black/50 rounded-full p-2 transition-colors"
                onClick={prevImage}
              >
                <ArrowLeft size={32} />
              </button>
              <button
                className="absolute right-4 text-white hover:text-sky-300 cursor-pointer z-10 bg-black/50 rounded-full p-2 transition-colors"
                onClick={nextImage}
              >
                <ArrowRight size={32} />
              </button>
            </>
          )}

          <div className="relative max-w-[95vw] max-h-[90vh]">
            <Image
              src={images[lightboxIndex]}
              alt="Lightbox"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            {/* Lightbox Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              {lightboxIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
