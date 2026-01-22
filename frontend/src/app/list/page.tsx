"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cardfm from "@/components/Card";
import Listfilter from "@/components/Listfilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProperty } from "@/store/slices/propertyDetailsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { formatNumberByLanguage } from "@/utils/formatNumberByLanguage";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import $axios from "@/lib/axios.instance";
import { getLocalizedLabel } from "@/utils/formatAddressByLanguage";

function Page() {
  const { posts, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.property
  );
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    district: "",
    municipality: "",
    minPrice: "",
    maxPrice: "",
    purpose: "sale",
    status: "all",
    propertyCode: "",
  });
  const itemsPerPage = 4;

  const { t, i18n } = useTranslation();

  const fetchProperties = useCallback(
    (filtersToUse: typeof filters, pageToUse: number) => {
      const apiParams: Record<string, any> = {
        page: pageToUse,
        size: itemsPerPage,
      };

      if (filtersToUse.type && filtersToUse.type !== "") {
        apiParams.type = filtersToUse.type;
      }

      if (
        filtersToUse.district &&
        filtersToUse.district !== "" &&
        filtersToUse.district !== "all"
      ) {
        apiParams.district = parseInt(filtersToUse.district);
      }
      if (
        filtersToUse.municipality &&
        filtersToUse.municipality !== "" &&
        filtersToUse.municipality !== "all"
      ) {
        apiParams.municipality = parseInt(filtersToUse.municipality);
      }

      if (filtersToUse.minPrice && filtersToUse.minPrice !== "") {
        apiParams.minPrice = filtersToUse.minPrice;
      }
      if (filtersToUse.maxPrice && filtersToUse.maxPrice !== "") {
        apiParams.maxPrice = filtersToUse.maxPrice;
      }
      if (filtersToUse.purpose && filtersToUse.purpose !== "") {
        apiParams.purpose = filtersToUse.purpose;
      }
      if (filtersToUse.status && filtersToUse.status !== "all") {
        apiParams.status = filtersToUse.status;
      }
      if (filtersToUse.propertyCode && filtersToUse.propertyCode !== "") {
        apiParams.propertyCode = filtersToUse.propertyCode;
      }

      console.log("API Parameters being sent:", apiParams);
      dispatch(fetchProperty(apiParams));
    },
    [dispatch, itemsPerPage]
  );

  // Handle URL changes and initial load
  useEffect(() => {
    const urlFilters = {
      type: searchParams.get("type") || "",
      district: searchParams.get("district") || "",
      municipality: searchParams.get("municipality") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      purpose: searchParams.get("purpose") || "",
      status: searchParams.get("status") || "all",
      propertyCode: searchParams.get("propertyCode") || "",
    };

    console.log("URL changed, new filters:", urlFilters);

    // Always start from page 1 when filters come from URL
    setFilters(urlFilters);
    setCurrentPage(1);

    // Fetch with new filters and page 1
    fetchProperties(urlFilters, 1);
  }, [searchParams, fetchProperties]);

  // Handle pagination changes (only when not from URL)
  useEffect(() => {
    // Only fetch if we're not on page 1 (to avoid double fetch on initial load)
    if (currentPage > 1) {
      console.log("Page changed to:", currentPage);
      fetchProperties(filters, currentPage);
    }
  }, [currentPage, filters, fetchProperties]);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "highToLow") return Number(b.price) - Number(a.price);
    if (sortOrder === "lowToHigh") return Number(a.price) - Number(b.price);
    if (sortOrder === "newToOld")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortOrder === "oldToNew")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  const handlePageChange = (newPage: number) => {
    console.log("Changing to page:", newPage);
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className=" min-h-screen">
        <div className="p-6 lg:p-20 flex flex-col lg:flex-row gap-8 ">
          <div className="block lg:hidden w-full">
            <Listfilter />
          </div>

          <div className="w-full lg:w-2/3">
            {/* Enhanced Breadcrumb */}
            <Breadcrumb className="pb-10">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="flex gap-2 items-center text-sky-600 hover:text-sky-700 transition-colors">
                    <FontAwesomeIcon icon={faHouse} className="text-sky-600" />
                    Home
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

            {/* Enhanced Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent mb-2">
                {t("availableProperties")}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full"></div>
            </div>

            {/* Enhanced Stats and Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-6 px-6 bg-white rounded-2xl shadow-lg border border-sky-100 mb-8">
              {isLoading ? (
                <Skeleton className="w-40 h-6 bg-sky-100" />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                  <p className="text-sky-700 font-medium">
                    {formatNumberByLanguage(pagination.total, i18n.language)}{" "}
                    <span className="text-sky-600">{t("properties")}</span>
                  </p>
                </div>
              )}
              <div className="flex gap-3 items-center">
                <p className="text-sky-700 font-medium">{t("sortBy")}:</p>
                <Select onValueChange={(value) => setSortOrder(value)}>
                  <SelectTrigger className="w-[200px] border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl">
                    <SelectValue placeholder={t("defaultOrder")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-sky-200">
                    <SelectGroup>
                      <SelectItem value="highToLow" className="rounded-lg">
                        {t("priceHighToLow")}
                      </SelectItem>
                      <SelectItem value="lowToHigh" className="rounded-lg">
                        {t("priceLowToHigh")}
                      </SelectItem>
                      <SelectItem value="newToOld" className="rounded-lg">
                        {t("dateNewToOld")}
                      </SelectItem>
                      <SelectItem value="oldToNew" className="rounded-lg">
                        {t("dateOldToNew")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                <p className="text-red-600 font-medium">Error: {error}</p>
              </div>
            )}

            {/* Enhanced Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="w-full h-64 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200" />
                    <div className="space-y-3 p-4">
                      <Skeleton className="h-6 w-3/4 bg-sky-100 rounded-lg" />
                      <Skeleton className="h-4 w-1/2 bg-sky-75 rounded-lg" />
                      <Skeleton className="h-8 w-2/3 bg-sky-150 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {sortedPosts.map((property) => (
                  <div
                    key={property.id}
                    className="transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Cardfm property={property} />
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced Empty State */}
            {!isLoading && sortedPosts.length === 0 && (
              <div className="text-center py-20 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-sky-100">
                <div className="w-24 h-24 bg-gradient-to-br from-sky-200 to-sky-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-sky-600 text-4xl">🏠</span>
                </div>
                <p className="text-sky-600 font-semibold text-xl mb-2">
                  {t("noPropertiesFound")}
                </p>
                <p className="text-sky-500 text-sm">
                  {t("tryAdjustingFilters")}
                </p>
              </div>
            )}

            {/* Enhanced Professional Pagination */}
            {pagination.totalPages > 0 && (
              <div className="flex flex-col items-center gap-6 mt-16">
                {/* Pagination Info */}
                <div className="text-center">
                  <p className="text-sky-600 text-sm">
                    Showing page{" "}
                    {formatNumberByLanguage(currentPage, i18n.language)} of{" "}
                    {formatNumberByLanguage(
                      pagination.totalPages,
                      i18n.language
                    )}
                  </p>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2 bg-white p-3 rounded-2xl shadow-xl border border-sky-100">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`group relative flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">{t("previous")}</span>
                    {currentPage > 1 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    )}
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`relative w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                            currentPage === index + 1
                              ? "bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-lg transform scale-110"
                              : "bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 hover:scale-105"
                          }`}
                        >
                          {formatNumberByLanguage(index + 1, i18n.language)}
                          {currentPage === index + 1 && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl animate-pulse"></div>
                          )}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className={`group relative flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === pagination.totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="hidden sm:inline">{t("next")}</span>
                    <ChevronRight className="h-4 w-4" />
                    {currentPage < pagination.totalPages && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    )}
                  </button>
                </div>

                {/* Page Jump Quick Links (for large page counts) */}
                {pagination.totalPages > 5 && (
                  <div className="flex items-center gap-2 text-sm text-sky-600">
                    <span>Quick jump:</span>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="px-3 py-1 rounded-lg hover:bg-sky-100 transition-colors"
                    >
                      First
                    </button>
                    <button
                      onClick={() =>
                        handlePageChange(Math.ceil(pagination.totalPages / 2))
                      }
                      className="px-3 py-1 rounded-lg hover:bg-sky-100 transition-colors"
                    >
                      Middle
                    </button>
                    <button
                      onClick={() => handlePageChange(pagination.totalPages)}
                      className="px-3 py-1 rounded-lg hover:bg-sky-100 transition-colors"
                    >
                      Last
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hidden lg:block lg:w-1/3 w-full">
            <Listfilter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
