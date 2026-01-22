"use client";

import AdminCard from "@/components/admin/aCard";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Cardfm from "@/components/Card";
import { useAxiosQuery } from "@/hooks/useAxiosQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";
import $axios from "@/lib/axios.instance";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProperty } from "@/store/slices/propertyDetailsSlice";
import { fetchPropertyDetails } from "@/types/property";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatNumberByLanguage } from "@/utils/formatNumberByLanguage";
import { FilterLocationFields } from "@/components/Filter/FilterLocationFields";
type Property = {
  propertyCode: string;
  price: string;
  // thumbnail: string;
  images: [];
  createdAt: string;
  purpose: string;
  type: string;
  details: {
    frontage: {
      value: string;
      unit: string;
    };
    landArea: {
      value: string;
      unit: string;
    };
  };
  address: {
    municipality: {
      municipalityTitle: string;
    };
    district: {
      districtTitle: string;
    };
    province: {
      provinceTitle: string;
    };
  };
  id: string;
  category: string;
  status: string;
};

// Property types for checkbox filter
const propertyTypes = [
  { id: "land", label: "Land" },
  { id: "house", label: "House" },
  { id: "apartment", label: "Apartment" },
  { id: "flat", label: "Flat" },
  { id: "space", label: "Space" },
] as const;

// Filter form schema
const FilterFormSchema = z.object({
  propertyCode: z.string().optional(),
  type: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  status: z.string().optional(),
  district: z.number().optional(),
  municipality: z.number().optional(),
  purpose: z.enum(["sale", "rent"]).optional(),
});

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function AddProperty() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const itemsPerPage = 4;
  const [filters, setFilters] = useState<any>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 100000000]);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  const { posts, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.property
  );

  const dispatch = useDispatch<AppDispatch>();

  // Filter form
  const filterForm = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      propertyCode: "",
      type: [],
      minPrice: 1000,
      maxPrice: 100000000,
      status: "all",
      district: undefined,
      municipality: undefined,
      purpose: "sale",
    },
  });

  const debouncedPriceRange = useDebounce(priceRange, 400);

  useEffect(() => {
    filterForm.setValue("minPrice", debouncedPriceRange[0]);
    filterForm.setValue("maxPrice", debouncedPriceRange[1]);
  }, [debouncedPriceRange, filterForm]);

  useEffect(() => {
    const filterParams = {
      page: currentPage,
      size: itemsPerPage,
      ...filters,
    };
    dispatch(fetchProperty(filterParams));
  }, [dispatch, currentPage, itemsPerPage, filters]);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
    const res= await $axios.delete(`/api/property/${id}`);
    console.log(res)
    return res.data.data
    },
    onSuccess: () => {
      toast.success("Property deleted successfully!");
      const filterParams = {
        page: currentPage,
        size: itemsPerPage,
        ...filters,
      };
      dispatch(fetchProperty(filterParams));
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message?.en || "Failed to delete property.";
      toast.error(msg);
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    console.log("Delete property:", id);
    setDeletingId(id);
    deleteMutation.mutate(id);
  };

  // Filter form submission
  const onFilterSubmit = (data: z.infer<typeof FilterFormSchema>) => {
    console.log("Filter data:", data);

    const filterParams: any = {};

    // Add filter parameters
    if (data.propertyCode && data.propertyCode.trim()) {
      filterParams.propertyCode = data.propertyCode.trim();
    }

    if (data.type && data.type.length > 0) {
      filterParams.type = data.type.join(",");
    }

    // Handle minPrice and maxPrice separately - only add if not default values
    if (data.minPrice && data.minPrice > 1000) {
      filterParams.minPrice = data.minPrice;
    }
    if (data.maxPrice && data.maxPrice < 100000000) {
      filterParams.maxPrice = data.maxPrice;
    }

    if (data.status && data.status !== "all") {
      filterParams.status = data.status;
    }

    // Handle district and municipality as numbers
    if (data.district && data.district !== undefined) {
      filterParams.district = data.district.toString();
    }
    if (data.municipality && data.municipality !== undefined) {
      filterParams.municipality = data.municipality.toString();
    }

    if (data.purpose) {
      filterParams.purpose = data.purpose;
    }

    console.log("Applied filters:", filterParams);
    setFilters(filterParams);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    filterForm.reset({
      propertyCode: "",
      type: [],
      minPrice: 1000,
      maxPrice: 100000000,
      status: "all",
      district: undefined,
      municipality: undefined,
      purpose: "sale",
    });
    setPriceRange([1000, 100000000]);
    setFilters({});
    setCurrentPage(1);
  };

  // Helper function to format price for display
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} L`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return formatNumberByLanguage(price, i18n.language);
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl lg:shadow-md p-6">
        <div className="text-center text-red-500">
          Error loading properties. Please try again later.
        </div>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const properties: fetchPropertyDetails[] = posts || [];

  // Filter Content Component
  const FilterContent = () => (
    <Form {...filterForm}>
      <form
        onSubmit={filterForm.handleSubmit(onFilterSubmit)}
        className="space-y-6"
      >
        {/* Property Code Search */}
        <FormField
          control={filterForm.control}
          name="propertyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold text-green-700">
                {t("searchByCode")}
              </FormLabel>
              <FormControl>
                <Input placeholder={t("enterPropertyCode")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Purpose Selection */}
        <FormField
          control={filterForm.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold text-green-700">
                {t("purpose")}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectPurpose")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sale">{t("sale")}</SelectItem>
                  <SelectItem value="rent">{t("rent")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Property Type Checkboxes */}
        <FormField
          control={filterForm.control}
          name="type"
          render={() => (
            <FormItem>
              <FormLabel className="text-md font-semibold text-green-700">
                {t("propertyType")}
              </FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((item) => (
                  <FormField
                    key={item.id}
                    control={filterForm.control}
                    name="type"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      item.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (val) => val !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-semibold text-sky-700">
                            {t(item.id)}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Range Slider */}
        <div className="space-y-4">
          <FormLabel className="text-md font-semibold text-green-700">
            {t("priceRange")}
          </FormLabel>

          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              {t("rs")} {formatPrice(filterForm.watch("minPrice") || 1000)}
            </span>
            <span>
              {t("rs")} {formatPrice(filterForm.watch("maxPrice") || 100000000)}
            </span>
          </div>

          <Slider
            value={priceRange}
            onValueChange={(val) => setPriceRange(val as [number, number])}
            min={1000}
            max={100000000}
            step={1000}
            className="w-full"
          />

          <div className="flex justify-between text-xs text-gray-500 px-1 pt-1">
            <span>{t("rs")} 1K</span>
            <span>{t("rs")} 10Cr</span>
          </div>
        </div>

        {/* Property Status */}
        <FormField
          control={filterForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold text-green-700">
                {t("propertyStatus")}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectPropertyStatus")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  <SelectItem value="all">{t("all")}</SelectItem>
                  <SelectItem value="featured">{t("featured")}</SelectItem>
                  <SelectItem value="exclusive">{t("exclusive")}</SelectItem>
                  <SelectItem value="latest">{t("latest")}</SelectItem>
                  <SelectItem value="emerging">{t("emerging")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Fields */}
        <div className="space-y-4">
          <FilterLocationFields form={filterForm} />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="bg-green-600 flex-1">
            {t("applyFilters")}
          </Button>
          <Button type="button" variant="outline" onClick={clearFilters}>
            {t("clear")}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl lg:shadow-md p-6 sm:p-5 md:p-10">
        <div className="flex lg:flex-row flex-col justify-between lg:px-10 py-10 ">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            {t("myListings")}
          </h1>
          <div className="flex gap-2  items-start  justify-end lg:items-center   ">
            <Button className="border text-white bg-sky-600 hover:bg-sky-600 hover:cursor-pointer hover:shadow-lg">
              <Link href="/admin/listings/addproperty">{t("addProperty")}</Link>
            </Button>
            <Button
              className="bg-transparent border border-sky-200 text-sky-600 hover:bg-white hover:shadow-lg hover:cursor-pointer"
            >
              <Sheet>
                <SheetTrigger asChild>
                  <div className="flex items-center gap-2">
                    {t("filter")}
                    <FontAwesomeIcon icon={faFilter} style={{ color: "#74C0FC" }} />
                  </div>
                </SheetTrigger>
                <SheetContent className="overflow-y-scroll px-10">
                  <SheetHeader>
                    <SheetTitle className="text-lg font-bold text-sky-700">
                      {t("filters")}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </Button>
          </div>
        </div>
        <hr />
        <div className="lg:p-10 max-w-4xl lg:space-y-10 space-y-20 mx-auto">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className=" rounded-lg">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : properties && properties.length > 0 ? (
            properties.map((property) => (
              <AdminCard
                key={property.id}
                property={property}
                onDelete={handleDelete}
                isDeleting={deletingId === property.id}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">{t("noPropertiesFound")}</div>
          )}
        </div>
      
        {isLoading ? (
            <Skeleton className="w-50 h-5" />
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
              {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded border transition cursor-pointer ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white border-gray-300"
              }`}
            >
              {t("previous")}
            </button>

            {/* Page Numbers */}
            {Array.from({ length: pagination.totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded border transition cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 hover:bg-blue-100 border-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded border transition cursor-pointer ${
                currentPage === pagination.totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white border-gray-300"
              }`}
            >
              {t("next")}
            </button>
          </div>
          )}
      </div>
      
    </>
  );
}
