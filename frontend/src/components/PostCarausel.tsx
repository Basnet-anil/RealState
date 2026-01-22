"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Cardfm from "./Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperty } from "@/store/slices/propertyDetailsSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  fetchFeaturedProperties,
  fetchExclusiveProperties,
  fetchLatestProperties,
  fetchEmergingProperties,
} from "@/store/slices/propertyDetailsSlice";

export default function PostCarousel({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    emergingPosts,
    featuredPosts,
    exclusivePosts,
    latestPosts,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.property);

  const getPosts = () => {
    switch (status) {
      case "featured":
        return featuredPosts;
      case "exclusive":
        return exclusivePosts;
      case "latest":
        return latestPosts;
      case "emerging":
        return emergingPosts;
      default:
        return [];
    }
  };

  const posts = getPosts() ?? [];

  useEffect(() => {
    // Dispatch the appropriate thunk based on status
    switch (status) {
      case "featured":
        dispatch(fetchFeaturedProperties({ page: 1, size: 10 }));
        break;
      case "exclusive":
        dispatch(fetchExclusiveProperties({ page: 1, size: 10 }));
        break;
      case "latest":
        dispatch(fetchLatestProperties({ page: 1, size: 10 }));
        break;
      case "emerging":
        dispatch(fetchEmergingProperties({ page: 1, size: 10 }));
        break;
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Group posts into chunks based on screen size
  // Mobile: 1 item, Tablet: 2 items, Desktop: 3 items
  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3; // Default
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    // Set initial value
    setItemsPerSlide(getItemsPerSlide());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chunkedPosts = [];
  for (let i = 0; i < posts.length; i += itemsPerSlide) {
    chunkedPosts.push(posts.slice(i, i + itemsPerSlide));
  }
  const totalSections = chunkedPosts.length;

  return (
    <div className="w-full  py-12 sm:py-16 lg:py-20">
      <div className="max-w-10xl mx-auto">
        {error ? (
          <div className="flex items-center justify-center min-h-[300px] px-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-500 text-2xl">⚠️</span>
              </div>
              <p className="text-red-600 font-medium text-lg">
                {t("errorFetchingPosts")}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="text-center mb-12 sm:mb-16 ">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-200 to-sky-300 border border-sky-300 mb-4"
                data-aos="fade-down"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                <span className="text-sky-700 font-medium text-sm">
                  {t(description)}
                </span>
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent leading-tight"
                data-aos="fade-up"
              >
                {t(title)}
              </h2>

              {/* Decorative line */}
              <div
                className="flex items-center justify-center mt-6"
                data-aos="zoom-in"
              >
                <div className="h-1 w-20 bg-gradient-to-r from-green-300 to-green-500 rounded-full"></div>
                <div className="h-2 w-2 bg-green-400 rounded-full mx-3"></div>
                <div className="h-1 w-20 bg-gradient-to-l from-green-300 to-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Carousel Progress Indicators */}
            <div className="flex justify-center mb-8 gap-2 px-4 sm:px-6 lg:px-8">
              {Array.from({ length: totalSections }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 transition-all rounded-full duration-500 ease-in-out ${
                    i === current
                      ? "w-8 sm:w-10 lg:w-12 bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg"
                      : "w-2 bg-sky-200 hover:bg-sky-300"
                  }`}
                />
              ))}
            </div>

            {/* Carousel Container */}
            <div className="relative">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {isLoading ? (
                    <CarouselItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 lg:p-8">
                        {Array.from({ length: itemsPerSlide }).map(
                          (_, index) => (
                            <div
                              className="flex flex-col space-y-4"
                              key={index}
                            >
                              <Skeleton className="h-[220px] sm:h-[240px] lg:h-[260px] w-full rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200" />
                              <div className="space-y-3">
                                <Skeleton className="h-6 w-full bg-gradient-to-r from-sky-100 to-sky-150 rounded-lg" />
                                <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-green-100 to-green-150 rounded-lg" />
                                <Skeleton className="h-8 w-1/2 bg-gradient-to-r from-sky-200 to-sky-250 rounded-lg" />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CarouselItem>
                  ) : chunkedPosts.length == 0 ? (
                    <CarouselItem>
                      <div className="flex items-center justify-center min-h-[400px] px-4">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-gradient-to-br from-sky-200 to-sky-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-sky-600 text-4xl">🏠</span>
                          </div>
                          <p className="text-sky-600 font-medium text-lg mb-2">
                            No properties available
                          </p>
                          <p className="text-sky-500 text-sm">
                            Check back soon for new listings
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ) : (
                    chunkedPosts.map((section, index) => (
                      <CarouselItem key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 lg:p-8">
                          {section.map((post: any) => (
                            <div
                              key={post.id}
                              className="w-full transform hover:scale-[1.02] transition-all duration-300"
                              data-aos="fade-up"
                              data-aos-delay={`${index * 100}`}
                            >
                              <Cardfm property={post} />
                            </div>
                          ))}
                        </div>
                      </CarouselItem>
                    ))
                  )}
                </CarouselContent>

                {/* Enhanced Carousel Controls */}
                {totalSections > 1 && (
                  <div className="flex w-full justify-center gap-4 mt-8">
                    <CarouselPrevious className="relative left-0 translate-y-0 w-12 h-12 border-2 border-sky-300 bg-white hover:bg-sky-50 hover:border-sky-400 text-sky-600 shadow-lg hover:shadow-xl transition-all duration-300" />
                    <CarouselNext className="relative right-0 translate-y-0 w-12 h-12 border-2 border-sky-300 bg-white hover:bg-sky-50 hover:border-sky-400 text-sky-600 shadow-lg hover:shadow-xl transition-all duration-300" />
                  </div>
                )}
              </Carousel>
            </div>

            {/* View All Button */}
            {!isLoading && posts.length > 0 && (
              <div className="flex justify-center mt-12 px-4 sm:px-6 lg:px-8">
                <Link href="/list">
                  <Button className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg">
                    <span className="flex items-center">
                      {t("viewAll")}
                      <FontAwesomeIcon
                        icon={faArrowRightLong}
                        className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
