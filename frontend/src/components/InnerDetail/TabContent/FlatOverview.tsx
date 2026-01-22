import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { fetchPropertyDetails } from "@/types/property";
import { useTranslation } from "react-i18next";
import { englishToNepaliNumber } from "@/utils/numberUtils";

export default function FlatOverview({
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details.</div>;
const features = [
  {
    label: t("listedFlat.features.bedrooms"),
    value: formatNumber(property.details.bedrooms),
    icon: faBed,
  },
  // {
  //   label: t("listedFlat.features.bathrooms"),
  //   value: formatNumber(property.details.bathrooms),
  //   icon: faBath,
  // },
  {
    label: t("listedFlat.features.built_area"),
    value: `${formatNumber(property.details.builtInArea?.value)} ${property.details.builtInArea?.unit}`,
    icon: faRulerCombined,
  },
  {
    label: t("listedFlat.features.floor_number"),
    value: formatNumber(property.details.floors),
    icon: faArrowUpRightFromSquare,
  },
  {
    label: t("listedFlat.features.built_year"),
    value: formatNumber(property.details.builtYear),
    icon: faCalendarAlt,
  },
  {
    label: t("listedFlat.features.flat_type"),
    value: property.details.apartmentType,
    icon: faBuilding,
  },
];

const propertyDetails = [
  {
    label: t("listedFlat.details.flat_id"),
    value: formatNumber(property.propertyCode),
  },
  {
    label: t("listedFlat.details.facing"),
    value: t(`enum.facing.${property.details.facing}`),
  },
  {
    label: t("listedFlat.details.total_floors"),
    value: formatNumber(property.details.totalFloors),
  },
  {
    label: t("listedFlat.details.purpose"),
    value: t(`enum.purpose.${property.purpose}`), // Assuming `purpose` exists globally
  },
  {
    label: t("listedFlat.details.total_area"),
    value: `${formatNumber(property.details.landArea.value)} ${property.details.landArea.unit}`,
  },
  {
    label: t("listedFlat.details.built_up_area"),
    value: `${formatNumber(property.details.builtInArea?.value)} ${property.details.builtInArea?.unit}`,
  },
  {
    label: t("listedFlat.details.date_posted"),
    value: formatDate(property.createdAt),
  },
  {
    label: t("listedFlat.details.price"),
    value: property.price ? `Rs ${formatPrice(property.price)}` : "N/A",
  },
  {
    label: t("listedFlat.details.status"),
    value: t(`enum.status.${property.status}`),
  },
];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between py-6">
          <h1 className="font-medium">{t("overview")}</h1>
          <h1>
            <span className="font-semibold">{t("flatId")}:</span> [
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
          {property.details.description.en ||
            "No description available for this flat."}
        </p>
      </div>

      <div className="flex flex-col gap-5 bg-sky-100 p-4 rounded-lg shadow">
        <h1 className="font-medium py-4">{t("flatDetails")}</h1>
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
