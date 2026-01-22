import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faArrowUpRightFromSquare,
  faMapMarkerAlt,
  faRoad,
  faS,
  faStairs,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { englishToNepaliNumber } from "@/utils/numberUtils";

export default function SpaceOverview({
  property,
  isLoading,
  error,
}: {
  property: any;
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

  const features = [
  {
    label: t("spaceListing.features.area"),
    value: `${formatNumber(property.details.landArea.value)}${property.details.landArea.unit}`,
    icon: faRulerCombined,
  },
  {
    label: t("spaceListing.features.frontage"),
    value: `${formatNumber(property.details.frontage.value)}${property.details.frontage.unit}`,
    icon: faRoad,
  },
  {
    label: t("spaceListing.features.floor_number"),
    value: formatNumber(property.details.floors),
    icon: faStairs,
  },
  {
    label: t("spaceListing.features.built_year"),
    value: formatNumber(property.details.builtYear),
    icon: faCalendarAlt,
  },
];

const propertyDetails = [
  { label: t("spaceListing.details.space_id"), value: formatNumber(property.propertyCode) },
  { label: t("spaceListing.details.facing"), value: property.details.facing },
  { label: t("spaceListing.details.purpose"), value: property.purpose },
  { label: t("spaceListing.details.floor"), value: formatNumber(property.details.floors) },
  {
    label: t("spaceListing.details.access_road"),
    value: `${formatNumber(property.details.frontage.value)} ${property.details.frontage.unit}`,
  },
  {
    label: t("spaceListing.details.total_area"),
    value: `${formatNumber(property.details.landArea.value)} ${property.details.landArea.unit}`,
  },
  { label: t("spaceListing.details.rent_per_month"), value: `Rs ${formatPrice(property.price)}` },
  { label: t("spaceListing.details.date_listed"), value: "२०२५-०५-०१" },
  { label: t("spaceListing.details.status"), value: property.status ? "Available" : "Not Available" },
];
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details.</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between py-6">
          <h1 className="font-medium">{t("overview")}</h1>
          <h1>
            <span className="font-semibold">{t("spaceId")}:</span> [
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
          Well-maintained commercial space in a prime location with modern
          amenities.
        </p>
      </div>

      <div className="flex flex-col gap-5 bg-sky-100 p-4 rounded-lg shadow">
        <h1 className="font-medium py-4">{t("spaceDetails")}</h1>
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
