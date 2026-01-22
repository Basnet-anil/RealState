"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Calculator,
  Handshake,
  Hammer,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = [
  {
    id: "brokerage",
    icon: Handshake,
    image: "/user/service/brokerage.jpg"
  },
  {
    id: "loan",
    icon: Calculator,
    image: "/user/service/loan.jpg"
  },
  {
    id: "valuation",
    icon: Building2,
    image: "/user/service/valuation.jpg"
  },
  {
    id: "construction",
    icon: Hammer,
    image: "/user/service/construction.jpg"
  }
];


const stats = [
  { icon: Users, value: "1000+", label: "stats.happyClients" },
  { icon: Building2, value: "500+", label: "stats.propertiesSold" },
  { icon: Award, value: "15+", label: "stats.yearsExperience" },
  { icon: Shield, value: "100%", label: "stats.satisfactionRate" },
];


export default function ServicePage() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-200 to-sky-300 border border-sky-300 mb-6"
            data-aos="fade-down"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            <span className="text-sky-700 font-medium text-sm">
              {t("ourServices")}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent leading-tight mb-6"
            data-aos="fade-up"
          >
            {t("comprehensiveSolution")}
          </h1>

          <p
            className="text-lg sm:text-xl text-sky-600 max-w-3xl mx-auto mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t("serviceParagraph")}
          </p>

          <div
            className="flex items-center justify-center"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <div className="h-1 w-20 bg-gradient-to-r from-green-300 to-green-500 rounded-full"></div>
            <div className="h-2 w-2 bg-green-400 rounded-full mx-3"></div>
            <div className="h-1 w-20 bg-gradient-to-l from-green-300 to-green-500 rounded-full"></div>
          </div>
        </div>
      </section>
 <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-sky-100 text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-sky-700 mb-1">
                {stat.value}
              </div>
              <div className="text-sky-600 text-sm lg:text-base font-medium">
                {t(stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
 <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-16">
          {Services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-12 items-center`}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                    {t(`Services.${service.id}.title`)}
                  </h3>
                </div>

                <p className="text-sky-600 text-lg leading-relaxed">
                  {t(`Services.${service.id}.description`)}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.isArray(t(`Services.${service.id}.features`, { returnObjects: true }))
                    ? (t(`Services.${service.id}.features`, { returnObjects: true }) as string[]).map(
                        (feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-sky-700 text-sm lg:text-base">
                              {feature}
                            </span>
                          </div>
                        )
                      )
                    : null}
                </div>

                <div className="pt-4">
                  <Link href="/list">
                    <Button className="group relative px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                      <span className="flex items-center">
                        {t("getStarted")}
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"></div>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1 max-w-lg">
                <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-sky-100 to-sky-200">
                  <img
                    src={service.image}
                    alt={t(`Services.${service.id}.title`)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-600/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-3xl p-8 lg:p-12 shadow-2xl"
            data-aos="zoom-in"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t("readyToGetStarted")}
            </h2>
            <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
              {t("getStartedWithUs")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/list">
                <Button className="bg-white text-sky-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  {t("browseProperties")}
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="bg-white text-sky-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  {t("learnMoreAboutUs")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
