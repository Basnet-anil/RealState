import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceLoading() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Skeleton className="w-32 h-8 bg-sky-100 rounded-full mx-auto mb-6" />
          <Skeleton className="w-3/4 h-16 bg-sky-100 rounded-lg mx-auto mb-6" />
          <Skeleton className="w-full max-w-3xl h-6 bg-sky-100 rounded-lg mx-auto mb-4" />
          <Skeleton className="w-2/3 h-6 bg-sky-100 rounded-lg mx-auto mb-8" />

          <div className="flex items-center justify-center">
            <Skeleton className="h-1 w-20 bg-sky-200 rounded-full" />
            <Skeleton className="h-2 w-2 bg-sky-300 rounded-full mx-3" />
            <Skeleton className="h-1 w-20 bg-sky-200 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-sky-100 text-center"
              >
                <Skeleton className="w-12 h-12 bg-sky-100 rounded-xl mx-auto mb-4" />
                <Skeleton className="w-16 h-8 bg-sky-100 rounded mx-auto mb-1" />
                <Skeleton className="w-20 h-4 bg-sky-100 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
            >
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 bg-sky-100 rounded-2xl" />
                  <Skeleton className="w-64 h-8 bg-sky-100 rounded-lg" />
                </div>
                <Skeleton className="w-full h-6 bg-sky-100 rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-5 h-5 bg-green-100 rounded" />
                      <Skeleton className="w-32 h-4 bg-sky-100 rounded" />
                    </div>
                  ))}
                </div>
                <Skeleton className="w-32 h-12 bg-sky-200 rounded-xl" />
              </div>
              <div className="flex-1 max-w-lg">
                <Skeleton className="w-full h-80 lg:h-96 bg-sky-100 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
