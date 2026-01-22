"use client";

import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Gallery from "@/components/Gallery";
import InnerTab from "@/components/InnerDetail/Tabs";
import Innerform from "@/components/InnerDetail/form";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPropertyById } from "@/store/slices/propertyDetailsSlice";
import { fetchPropertyDetails } from "@/types/property";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

function PropertyDetailsPage() {
  const params = useParams();
  const { type, id } = params;
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPost, isLoading, error } = useSelector(
    (state: RootState) => state.propertyDetails
  );
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchPropertyById(id as string));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 min-h-screen p-4 sm:p-6 lg:p-20">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="w-full h-8 mb-6 bg-sky-100" />
          <div className="space-y-4 mb-8">
            <Skeleton className="w-3/4 h-12 bg-sky-100" />
            <Skeleton className="w-1/2 h-8 bg-sky-100" />
          </div>
          <Skeleton className="w-full h-64 sm:h-80 lg:h-96 bg-sky-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    console.log("error is", error);
    return (
      <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-sky-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <p className="text-red-600 font-medium text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!selectedPost) {
    return (
      <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-sky-100">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-sky-600 text-2xl">🏠</span>
          </div>
          <p className="text-sky-600 font-medium text-lg">No property found</p>
        </div>
      </div>
    );
  }

  const images = selectedPost?.images.map((image) => image.url) || [];

  return (
    <>
      <section className=" p-4 sm:p-6 lg:p-20 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Breadcrumb */}
          <Breadcrumb className="pb-6 lg:pb-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex gap-2 items-center text-sky-600 hover:text-sky-700 transition-colors">
                  <FontAwesomeIcon icon={faHouse} className="text-sky-600" />
                  <span className="hidden sm:inline">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-sky-400" />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-sky-700 font-medium">
                  List
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Property Header */}
          <div className="flex flex-col gap-2 mb-6 lg:mb-8">
            {/* Status and Type Badges */}
            <div className="flex flex-wrap gap-2 items-center">
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white text-xs sm:text-sm rounded-xl px-3 py-1.5 font-medium shadow-lg">
                {selectedPost?.status}
              </button>
              <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white text-xs sm:text-sm rounded-xl px-3 py-1.5 font-medium shadow-lg">
                {selectedPost?.type}
              </button>
            </div>

            {/* Title and Price */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold  text-sky-600 bg-clip-text ">
                  {t("propertyCode")}: [{selectedPost?.propertyCode}]
                </h1>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-700 bg-white px-4 py-2 rounded-2xl shadow-lg border border-sky-100">
                {t("rs")} {selectedPost?.price?.toLocaleString()}
              </h1>
            </div>
          </div>

          {/* Location */}
          <div className="flex justify-start
           items-center gap-2 text-sky-600 mb-6 lg:mb-10 bg-white p-4 
          ">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-sky-500 flex-shrink-0"
            />
            <span className="font-medium">{t("location")}:</span>
            <span className="text-sky-700">
              {selectedPost?.address?.municipality?.municipalityTitle},
              {selectedPost?.address?.district?.districtTitle},
              {selectedPost?.address?.province?.provinceTitle}
            </span>
          </div>

          {/* Gallery */}
          <div className="mb-8 lg:mb-16">
            <Gallery images={images} />
          </div>

          {/* Content Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <InnerTab
              property={selectedPost as fetchPropertyDetails}
              isLoading={isLoading}
              error={error}
            />
            <Innerform propertyId={selectedPost.id} />
          </div>
        </div>
      </section>
    </>
  );
}

export default PropertyDetailsPage;
