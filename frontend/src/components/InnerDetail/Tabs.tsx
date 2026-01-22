"use client";

import React from "react";
import HouseOverview from "./TabContent/HouseOverview";
import LandOverview from "./TabContent/LandOverview";
import ApartmentOverview from "./TabContent/ApartmentOverview";
import SpaceOverview from "./TabContent/SpaceOverview";
import FlatOverview from "./TabContent/FlatOverview";
import { fetchPropertyDetails } from "@/types/property";
import { useTranslation } from "react-i18next";
import { englishToNepaliNumber } from "@/utils/numberUtils";

interface InnerTabProps {
  property: fetchPropertyDetails;
  isLoading: boolean;
  error: any;
}

function InnerTab({ property, isLoading, error }: InnerTabProps) {
  const { t, i18n } = useTranslation();

  // Helper function to format numbers based on language
  const formatNumber = (value: any) => {
    if (!value) return value;
    console.log("i18n language:", i18n.language);
    return i18n.language === "ne" ? englishToNepaliNumber(value) : value;
  };

 const propertyInteriorDetails = [
  { 
    label: t("enum.intPropertyDetails.bedrooms"),
    value: formatNumber(property.details.bedrooms),
  },
  // {
  //   label: t("intPropertyDetails.bathrooms"),
  //   value: formatNumber(property.details.bathrooms),
  // },
  {
    label: t("enum.intPropertyDetails.livingRooms"),
    value: formatNumber(property.details.livingRooms),
  },
  {
    label: t("enum.intPropertyDetails.furnishing"),
    value: t( `${property.details.furnishing}`),
  },
  {
    label: t("enum.intPropertyDetails.parking"),
    value: formatNumber(property.details.parking),
  },
];

  const spaceInteriorDetails = [
    { label: t("enum.intPropertyDetails.furnishing"), value: property.details.furnishing },
    { label: t("intPropertyDetails.parking"), value: property.details.parking },
  ];

  const renderOverview = () => {
    switch (property.type) {
      case "house":
        return (
          <HouseOverview
            property={property}
            isLoading={isLoading}
            error={error}
          />
        );
      case "land":
        return (
          <LandOverview
            property={property}
            isLoading={isLoading}
            error={error}
          />
        );
      case "apartment":
        return (
          <ApartmentOverview
            property={property}
            isLoading={isLoading}
            error={error}
          />
        );
      case "flat":
        return (
          <FlatOverview
            property={property}
            isLoading={isLoading}
            error={error}
          />
        );
      case "space":
        return (
          <SpaceOverview
            property={property}
            isLoading={isLoading}
            error={error}
          />
        );
      default:
        return <div>No Overview Available</div>;
    }
  };

  return (
    <div className="w-full lg:w-2/3">
      {/* Enhanced Anchor Links */}
      <div className="flex flex-wrap gap-4 lg:gap-8 pb-4 mb-6 border-b border-sky-200">
        <a
          href="#overview"
          className="scroll-smooth pb-2 border-b-2 border-transparent font-semibold text-sky-600 hover:border-sky-500 hover:text-sky-700 transition-all duration-200 text-sm lg:text-base"
        >
          {t("overview")}
        </a>
        {property.type !== "land" && (
          <a
            href="#interior"
            className="scroll-smooth pb-2 border-b-2 border-transparent font-semibold text-sky-600 hover:border-sky-500 hover:text-sky-700 transition-all duration-200 text-sm lg:text-base"
          >
            {t("interiorDetails")}
          </a>
        )}
        <a
          href="#facilities"
          className="scroll-smooth pb-2 border-b-2 border-transparent font-semibold text-sky-600 hover:border-sky-500 hover:text-sky-700 transition-all duration-200 text-sm lg:text-base"
        >
          {t("facilities")}
        </a>
      </div>

      {/* Overview Section */}
      <div id="overview" className="py-4 mb-6">
        {renderOverview()}
      </div>

      {/* Interior Details Section */}
      {property.type !== "land" && property.type !== "space" && (
        <div
          id="interior"
          className="flex flex-col gap-5 bg-white p-4 lg:p-6 rounded-2xl shadow-lg border border-sky-100 mb-6"
        >
          <h1 className="font-bold text-lg lg:text-xl bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
            {t("propertyInterior")}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
            {propertyInteriorDetails.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-sky-100 last:border-b-0"
              >
                <p className="text-sky-600 font-medium text-sm lg:text-base">
                  {item.label}
                </p>
                <p className="text-sky-700 font-semibold text-sm lg:text-base">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {property.type === "space" && (
        <div
          id="interior"
          className="flex flex-col gap-5 bg-white p-4 lg:p-6 rounded-2xl shadow-lg border border-sky-100 mb-6"
        >
          <h1 className="font-bold text-lg lg:text-xl bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
            {t("propertyInterior")}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
            {spaceInteriorDetails.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-sky-100 last:border-b-0"
              >
                <p className="text-sky-600 font-medium text-sm lg:text-base">
                  {item.label}
                </p>
                <p className="text-sky-700 font-semibold text-sm lg:text-base">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Facilities Section */}
      <div
        id="facilities"
        className="flex flex-col gap-5 bg-white p-4 lg:p-6 rounded-2xl shadow-lg border border-sky-100"
      >
        <h1 className="font-bold text-lg lg:text-xl bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
          {t("facilities")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          {property.details.facilities.map(
            (facility: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-sky-50 transition-colors"
              >
                <span className="text-green-500 font-bold text-lg">✓</span>
                <p className="text-sky-700 text-sm lg:text-base">{t(`enum.facilities.${facility}`)}</p>
              </div>  
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default InnerTab;
