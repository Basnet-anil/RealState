"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Filter from "@/components/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const images = [
  { src: "/user/hero/hero_1.jpg", shape: "rounded-full" },
  { src: "/user/hero/hero_1.jpg", shape: "rounded-lg" },
  { src: "/user/hero/hero_1.jpg", shape: "rounded-md" },
  { src: "/user/hero/hero_1.jpg", shape: "rounded-xl" },
];

function Hero() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const words = t(
    "exploreTheBestPropertiesInYourAreaWithUsTrustedByThousandsOfHappyHomeowners"
  );

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[80vh] relative lg:mb-0 mb-32">
      {/* Left Content */}
      <div className="lg:w-2/3 w-full bg-sky-200 lg:bg-gradient-to-r from-sky-500 to-white flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 lg:py-0 min-h-[60vh] lg:min-h-0">
        <div className="max-w-2xl">
          {/* Trust Badge */}
          <div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-6"
            data-aos="fade-down"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
            {t("trustedRealEstate")}
          </div>

          {/* Main Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6"
            data-aos="zoom-in"
          >
            {t("findYourDreamHome")}
          </h1>

          {/* Subtitle */}
          <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
            <TextGenerateEffect
              duration={2}
              filter={false}
              words={words}
              className="text-white/90 text-base sm:text-lg lg:text-base xl:text-lg font-light leading-relaxed"
            />
          </div>

          {/* CTA Button */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <a
              className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-sky-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-gray-50 w-full sm:w-auto"
              href="/list"
            >
              <span className="mr-3">{t("getStarted")}</span>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className="text-sky-700 group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>

            <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/40 text-white font-medium rounded-xl backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 w-full sm:w-auto">
              
             <a href="/about" className="ml-2 text-white/80 hover:text-white">{t("learnMore")}</a> 
            </button>
          </div>

          {/* Stats Section */}
          <div
            className="flex flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="text-center sm:text-left">
              <div className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-white">
                500+
              </div>
              <div className="text-white/80 text-xs sm:text-sm">
                {t("properties")}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-white">
                1K+
              </div>
              <div className="text-white/80 text-xs sm:text-sm">
                {t("clients")}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-white">
                50+
              </div>
              <div className="text-white/80 text-xs sm:text-sm">
                {t("locations")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative lg:w-1/2 h-64 sm:h-80 lg:h-full order-first lg:order-last">
        {/* Enhanced gradient overlay for better blending */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-sky-500/20 via-transparent to-transparent z-10" />

        <Image
          src="/user/hero/hero_2.jpg"
          alt="Beautiful properties showcase"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />

        {/* Decorative floating elements */}
        <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 hidden lg:block animate-pulse" />
        <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 hidden lg:block" />
      </div>

      {/* Filter Component */}
        <Filter />
    </div>
  );
}

export default Hero;
