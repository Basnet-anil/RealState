import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Skeleton className="w-48 h-8 bg-sky-100 rounded-full mx-auto mb-6" />
            <Skeleton className="w-3/4 h-16 bg-sky-100 rounded-lg mx-auto mb-6" />
            <Skeleton className="w-full max-w-3xl h-6 bg-sky-100 rounded-lg mx-auto mb-4" />
            <Skeleton className="w-2/3 h-6 bg-sky-100 rounded-lg mx-auto" />
          </div>

          {/* Company Image Skeleton */}
          <div className="relative max-w-4xl mx-auto">
            <Skeleton className="w-full h-80 lg:h-96 bg-sky-100 rounded-3xl" />

            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-2xl shadow-xl border border-sky-100 text-center"
                  >
                    <Skeleton className="w-8 h-8 bg-sky-100 rounded-lg mx-auto mb-2" />
                    <Skeleton className="w-12 h-6 bg-sky-100 rounded mx-auto mb-1" />
                    <Skeleton className="w-16 h-3 bg-sky-100 rounded mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg border border-sky-100 text-center"
              >
                <Skeleton className="w-16 h-16 bg-sky-100 rounded-2xl mx-auto mb-6" />
                <Skeleton className="w-32 h-8 bg-sky-100 rounded-lg mx-auto mb-4" />
                <div className="space-y-2">
                  <Skeleton className="w-full h-4 bg-sky-100 rounded" />
                  <Skeleton className="w-3/4 h-4 bg-sky-100 rounded mx-auto" />
                  <Skeleton className="w-5/6 h-4 bg-sky-100 rounded mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Skeleton className="w-64 h-12 bg-sky-100 rounded-lg mx-auto mb-6" />
            <Skeleton className="w-full max-w-2xl h-6 bg-sky-100 rounded-lg mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg border border-sky-100 overflow-hidden"
              >
                <Skeleton className="w-full h-64 bg-sky-100" />
                <div className="p-6 space-y-4">
                  <div className="text-center space-y-2">
                    <Skeleton className="w-32 h-6 bg-sky-100 rounded mx-auto" />
                    <Skeleton className="w-24 h-4 bg-sky-100 rounded mx-auto" />
                    <Skeleton className="w-20 h-3 bg-green-100 rounded mx-auto" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="w-full h-4 bg-sky-100 rounded" />
                    <Skeleton className="w-3/4 h-4 bg-sky-100 rounded" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="w-20 h-4 bg-sky-100 rounded" />
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton
                          key={i}
                          className="w-16 h-6 bg-sky-100 rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-sky-100 space-y-2">
                    <Skeleton className="w-full h-4 bg-sky-100 rounded" />
                    <Skeleton className="w-3/4 h-4 bg-sky-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
