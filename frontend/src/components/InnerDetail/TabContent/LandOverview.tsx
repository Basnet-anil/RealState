import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRoad,
  faRulerCombined,
  faMapMarkerAlt,
  faCalendarAlt,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";
import { fetchPropertyDetails } from "@/types/property";
import { useTranslation } from "react-i18next";
import { englishToNepaliNumber } from "@/utils/numberUtils";

function LandOverview({
  property,
  isLoading,
  error,
}: {
  property: fetchPropertyDetails;
  isLoading: boolean;
  error: any;
}) {
  const { t, i18n } = useTranslation();

  // Helper function to format numbers based on language
  const formatNumber = (value: any) => {
    if (!value) return value;
    return i18n.language === "ne" ? englishToNepaliNumber(value) : value;
  };

  const formatPrice = (price: number) => {
    const formattedPrice = price.toLocaleString();
    return i18n.language === "ne"
      ? englishToNepaliNumber(formattedPrice)
      : formattedPrice;
  };

  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return i18n.language === "ne"
      ? englishToNepaliNumber(formattedDate)
      : formattedDate;
  };

  const features = [
    {
      label: t("area"),
      value: `${formatNumber(property.details.landArea.value)} ${
        property.details.landArea.unit
      }`,
      icon: faRulerCombined,
    },
    {
      label: t("roadAccess"),
      value: `${formatNumber(property.details.frontage.value)} ${
        property.details.frontage.unit
      }`,
      icon: faRoad,
    },
    {
      label: t("landType"),
      value: property.details.zoning,
      icon: faMountain,
    },
    {
      label: t("listedYear"),
      value: formatDate(property.createdAt),
      icon: faCalendarAlt,
    },
  ];

  const propertyDetails = [
    { label: t("landId"), value: formatNumber(property.propertyCode) },
    { label: t("landFacilities.facing"), value: property.details.facing },
    {
      label: t("houseFacilities.roadAccess"),
      value: `${formatNumber(property.details.frontage.value)} ${
        property.details.frontage.unit
      }`,
    },
    { label: t("landFacilities.purpose"), value: property.purpose },
    {
      label: t("landFacilities.landArea"),
      value: `${formatNumber(property.details.landArea.value)} ${
        property.details.landArea.unit
      }`,
    },
    { label: t("houseFacilities.datePosted"), value: formatDate(property.createdAt) },
    { label: t("landFacilities.price"), value: `Rs ${formatPrice(property.price)}` },
    { label: t("landFacilities.status"), value: property.status },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between py-6">
          <h1 className="font-medium">{t("overview")}</h1>
          <h1>
            <span className="font-semibold">{t("landId")}</span> [
            {formatNumber(property.propertyCode)}]
          </h1>
        </div>

        <div className="flex flex-wrap gap-6">
          {features.map((item, index) => (
            <div key={item.label} className="flex gap-3 items-center">
              <div className="flex flex-col gap-1 text-gray-500">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: "#74C0FC" }}
                  />
                  <p className="font-semibold text-black">{item.value}</p>
                </div>
                <p className="text-sm">{item.label}</p>
              </div>
              {index < features.length - 1 && (
                <div className="h-10 border-r border-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h1 className="font-medium py-4">{t("desc")}</h1>
        <p className="text-gray-500 font-light">
          {property.details.description.en}
        </p>
      </div>

      <div className="flex flex-col gap-5 bg-sky-100 p-4 rounded-lg shadow">
        <h1 className="font-medium py-4">{t("landDetails")}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
          {propertyDetails.map((item, index) => (
            <div key={index} className="grid grid-cols-2">
              <p className="text-gray-400  pr-2">{item.label}</p>
              <p className="">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandOverview;
