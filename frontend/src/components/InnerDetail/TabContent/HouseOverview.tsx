import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRoad,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faStairs,
  faDollarSign,
  faLocationDot,
  faCouch,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { fetchPropertyDetails } from "@/types/property";
import { useTranslation } from "react-i18next";
import { englishToNepaliNumber } from "@/utils/numberUtils";

const iconMap = {
  ruler: faRulerCombined,
  dollar: faDollarSign,
  bed: faBed,
  bath: faBath,
  road: faRoad,
  calendar: faCalendarAlt,
  stairs: faStairs,
  location: faLocationDot,
  couch: faCouch,
  mountain: faMountain,
};

function Overview({
  property,
  isLoading,
  error,
}: {
  property: fetchPropertyDetails;
  isLoading: boolean;
  error: boolean;
}) {
  const { t, i18n } = useTranslation();
  const [descriptionData, setDescriptionData] = useState<string>("");

  // Helper function to format numbers and prices based on language
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading property details</div>;
  }

  if (!property || property.type !== "house") {
    return <div>No property found</div>;
  }

  const propertyDetails = [
    {
      label: t("houseFacilities.yearBuilt"),
      value: formatNumber(property.details.builtYear),
      icon: "calendar",
    },
    {
      label: t("houseFacilities.roadAccess"),
      value: `${formatNumber(property.details.frontage.value)}${
        property.details.frontage.unit
      }`,
      icon: "road",
    },
    {
      label: t("houseFacilities.propertyArea"),
      value: `${formatNumber(property.details.landArea.value)} ${
        property.details.landArea.unit
      }`,
      icon: "mountain",
    },
    {
      label: t("houseFacilities.builtUpArea"),
      value: `${formatNumber(property.details.builtInArea?.value)} ${
        property.details.builtInArea?.unit
      }`,
      icon: "mountain",
    },
    {
      label: t("houseFacilities.datePosted"),
      value: formatDate(property.createdAt),
      icon: "calendar",
    },
    {
      label: t("houseFacilities.pricing"),
      value: `Rs ${formatPrice(property.price)}`,
      icon: "dollar",
    },
  ];

  useEffect(() => {
    if (i18n.language === "ne") {
      setDescriptionData(property.details.description?.np || "");
    } else {
      setDescriptionData(property.details.description?.en || "");
    }
  }, [i18n.language, property.details.description]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between py-6">
            <h1 className="font-medium">{t("overview")}</h1>
            <h1 className="">
              <span className="font-semibold">{t("propertyId")}:</span>[
              {formatNumber(property.propertyCode)}]
            </h1>
          </div>

          <div className="flex flex-wrap gap-8">
            {propertyDetails.map((item, index) => (
              <div key={index} className="flex gap-3 items-center">
                <div className="flex flex-col gap-1 text-gray-500">
                  <div className="flex gap-3 items-center">
                    <FontAwesomeIcon
                      icon={iconMap[item.icon as keyof typeof iconMap]}
                      style={{ color: "#74C0FC" }}
                    />
                    <p className="font-semibold text-black">{item.value}</p>
                  </div>
                  <p className="text-sm">{item.label}</p>
                </div>

                {index < propertyDetails.length - 1 && (
                  <div className="h-10 border-r border-gray-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h1 className="font-medium py-4">{t("desc")}</h1>
          <p className="text-gray-500 font-light">{descriptionData}</p>
        </div>

        <div className="flex flex-col gap-5 bg-sky-100 p-4 rounded-lg shadow">
          <h1 className="font-medium py-4">{t("propertyDetails")}</h1>
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
    </>
  );
}

export default Overview;
