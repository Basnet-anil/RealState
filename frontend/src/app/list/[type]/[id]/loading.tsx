import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailsLoading() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 min-h-screen p-4 sm:p-6 lg:p-20">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="pb-6 lg:pb-10">
          <Skeleton className="w-48 h-6 bg-sky-100 rounded-lg" />
        </div>

        {/* Property Header Skeleton */}
        <div className="flex flex-col gap-4 mb-6 lg:mb-8">
          {/* Status and Type Badges */}
          <div className="flex flex-wrap gap-2 items-center">
            <Skeleton className="w-20 h-8 bg-green-100 rounded-xl" />
            <Skeleton className="w-16 h-8 bg-sky-100 rounded-xl" />
          </div>

          {/* Title and Price */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <Skeleton className="w-3/4 h-12 bg-gradient-to-r from-sky-100 to-sky-200 rounded-lg" />
            <Skeleton className="w-48 h-16 bg-white rounded-2xl shadow-lg border border-sky-100" />
          </div>
        </div>

        {/* Location Skeleton */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-sky-100 mb-6 lg:mb-10">
          <Skeleton className="w-full h-6 bg-sky-100 rounded-lg" />
        </div>

        {/* Gallery Skeleton */}
        <div className="mb-8 lg:mb-16">
          {/* Mobile Gallery Skeleton */}
          <div className="block lg:hidden">
            <Skeleton className="w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200" />
            <div className="flex gap-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-16 h-16 rounded-lg bg-sky-100 flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Desktop Gallery Skeleton */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4">
            <Skeleton className="col-span-2 w-full h-[520px] rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200" />
            <div className="grid grid-rows-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-40 w-full rounded-xl bg-sky-100"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Section Skeleton */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Navigation Links */}
            <div className="flex flex-wrap gap-4 lg:gap-8 pb-4 border-b border-sky-200">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-6 bg-sky-100 rounded-lg" />
              ))}
            </div>

            {/* Overview Section */}
            <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg border border-sky-100 space-y-4">
              <Skeleton className="w-48 h-8 bg-sky-100 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2"
                  >
                    <Skeleton className="w-24 h-5 bg-sky-100 rounded" />
                    <Skeleton className="w-16 h-5 bg-sky-100 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Interior Details Section */}
            <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg border border-sky-100 space-y-4">
              <Skeleton className="w-56 h-8 bg-sky-100 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2"
                  >
                    <Skeleton className="w-32 h-5 bg-sky-100 rounded" />
                    <Skeleton className="w-20 h-5 bg-sky-100 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities Section */}
            <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg border border-sky-100 space-y-4">
              <Skeleton className="w-24 h-8 bg-sky-100 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <Skeleton className="w-5 h-5 bg-green-100 rounded" />
                    <Skeleton className="w-32 h-5 bg-sky-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form Skeleton */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-sky-100 space-y-6">
              <div className="text-center">
                <Skeleton className="w-48 h-8 bg-sky-100 rounded-lg mx-auto mb-2" />
                <Skeleton className="w-16 h-2 bg-sky-200 rounded-full mx-auto" />
              </div>

              {/* Form Fields */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-24 h-5 bg-sky-100 rounded" />
                  <Skeleton className="w-full h-12 bg-sky-50 rounded-xl" />
                </div>
              ))}

              <Skeleton className="w-full h-14 bg-sky-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
