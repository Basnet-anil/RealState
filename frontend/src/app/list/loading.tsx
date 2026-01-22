import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListLoading() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 min-h-screen">
      <div className="p-6 lg:p-20 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Mobile Filter Skeleton */}
        <div className="block lg:hidden w-full">
          <Skeleton className="w-full h-16 bg-sky-100 rounded-2xl" />
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:w-2/3">
          {/* Breadcrumb Skeleton */}
          <div className="pb-10">
            <Skeleton className="w-48 h-6 bg-sky-100 rounded-lg" />
          </div>

          {/* Page Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="w-72 h-12 bg-gradient-to-r from-sky-100 to-sky-200 rounded-lg mb-2" />
            <Skeleton className="w-24 h-2 bg-sky-200 rounded-full" />
          </div>

          {/* Stats and Sort Bar Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-6 px-6 bg-white rounded-2xl shadow-lg border border-sky-100 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-300 rounded-full animate-pulse"></div>
              <Skeleton className="w-40 h-6 bg-sky-100 rounded-lg" />
            </div>
            <div className="flex gap-3 items-center">
              <Skeleton className="w-16 h-6 bg-sky-100 rounded-lg" />
              <Skeleton className="w-48 h-10 bg-sky-100 rounded-xl" />
            </div>
          </div>

          {/* Property Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="space-y-4 bg-white rounded-2xl p-4 shadow-lg border border-sky-100"
              >
                <Skeleton className="w-full h-64 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200" />
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="w-16 h-6 bg-sky-100 rounded-xl" />
                    <Skeleton className="w-20 h-6 bg-green-100 rounded-xl" />
                  </div>
                  <Skeleton className="h-8 w-3/4 bg-sky-100 rounded-lg" />
                  <Skeleton className="h-6 w-1/2 bg-sky-75 rounded-lg" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-24 bg-sky-150 rounded-lg" />
                    <Skeleton className="h-10 w-28 bg-sky-200 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex flex-col items-center gap-6 mt-16">
            <Skeleton className="w-48 h-4 bg-sky-100 rounded-lg" />
            <div className="flex items-center gap-2 bg-white p-3 rounded-2xl shadow-xl border border-sky-100">
              <Skeleton className="w-24 h-12 bg-sky-100 rounded-xl" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="w-12 h-12 bg-sky-100 rounded-xl" />
              ))}
              <Skeleton className="w-24 h-12 bg-sky-100 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Desktop Filter Skeleton */}
        <div className="hidden lg:block lg:w-1/3 w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 space-y-6">
            <Skeleton className="w-32 h-8 bg-sky-100 rounded-lg" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-24 h-6 bg-sky-100 rounded-lg" />
                <Skeleton className="w-full h-10 bg-sky-50 rounded-xl" />
              </div>
            ))}
            <Skeleton className="w-full h-12 bg-sky-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
