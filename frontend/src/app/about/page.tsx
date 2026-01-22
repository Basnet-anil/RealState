"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Users,
  Building2,
  Target,
  Eye,
  Heart,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
  {
    id: "john",
    name: "John Doe",
    experience: "15+ Years",
    image: "/user/team/ceo.jpg",
    email: "john@dhanashree.com",
    phone: "+977-1-234567"
  },
  {
    id: "jane",
    name: "Jane Smith",
    experience: "12+ Years",
    image: "/user/team/sales-head.jpg",
    email: "jane@dhanashree.com",
    phone: "+977-1-234568"
  },
  {
    id: "mike",
    name: "Mike Johnson",
    experience: "8+ Years",
    image: "/user/team/consultant.jpg",
    email: "mike@dhanashree.com",
    phone: "+977-1-234569"
  },
  {
    id: "sarah",
    name: "Sarah Wilson",
    experience: "10+ Years",
    image: "/user/team/marketing.jpg",
    email: "sarah@dhanashree.com",
    phone: "+977-1-234570"
  }
];

const companyValues = [
  { icon: Target, id: "mission" },
  { icon: Eye,    id: "vision"  },
  { icon: Heart,  id: "values"  },
];

const achievements = [
  { icon: Building2, value: "500+", label: "achievements.propertiesSold" },
  { icon: Users, value: "1000+", label: "achievements.happyClients" },
  { icon: Award, value: "15+", label: "achievements.yearsExperience" },
  { icon: MapPin, value: "50+", label: "achievements.locationsCovered" }
];


export default function AboutPage() {
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-200 to-sky-300 border border-sky-300 mb-6"
              data-aos="fade-down"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              <span className="text-sky-700 font-medium text-sm">
                {t("aboutDhanaShree")}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent leading-tight mb-6"
              data-aos="fade-up"
            >
              {t("aboutHeading")}
            </h1>

            <p
              className="text-lg sm:text-xl text-sky-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {t("aboutParagraph")}
              </p>

            {/* Decorative line */}
            <div
              className="flex items-center justify-center mt-8"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="h-1 w-20 bg-gradient-to-r from-green-300 to-green-500 rounded-full"></div>
              <div className="h-2 w-2 bg-green-400 rounded-full mx-3"></div>
              <div className="h-1 w-20 bg-gradient-to-l from-green-300 to-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Company Image */}
          <div
            className="relative max-w-4xl mx-auto"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <div className="relative w-full h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-sky-100 to-sky-200">
              <img
                src="/logo.png"
                alt="Dhanashree Real Estate Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-600/30 via-transparent to-transparent"></div>
            </div>

<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {achievements.map((achievement, index) => (
      <div
        key={index}
        className="bg-white p-4 rounded-2xl shadow-xl border border-sky-100 text-center"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg flex items-center justify-center mx-auto mb-2">
          <achievement.icon className="h-4 w-4 text-white" />
        </div>
        <div className="text-xl font-bold text-sky-700">
          {achievement.value}
        </div>
        <div className="text-sky-600 text-xs font-medium">
          {t(achievement.label)}
        </div>
      </div>
    ))}
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
  <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {companyValues.map((value, index) => {
            const key = `companyValues.${value.id}`;
            return (
              <div
                key={value.id}
                className="bg-white p-8 rounded-3xl shadow-lg border border-sky-100 text-center"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent mb-4">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-sky-600 leading-relaxed">
                  {t(`${key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

      {/* Team Section */}
 <section className="py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent mb-6"
        data-aos="fade-up"
      >
        {t("meetExpertTeam")}
      </h2>
      <p
        className="text-lg text-sky-600 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {t("teamDescription")}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member, index) => {
        const base = `team.${member.id}`;
        return (
          <div
            key={member.id}
            className="group bg-white rounded-3xl shadow-lg border border-sky-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            {/* Image */}
            <div className="relative w-full h-64 bg-gradient-to-br from-sky-100 to-sky-200">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-sky-700 mb-1">
                  {member.name}
                </h3>
                <p className="text-sky-600 font-medium text-sm">
                  {t(`${base}.position`)}
                </p>
                <p className="text-green-600 text-xs font-semibold">
                  {member.experience}
                </p>
              </div>

              <p className="text-sky-600 text-sm leading-relaxed">
                {t(`${base}.bio`)}
              </p>

              {/* Specialties */}
              <div className="space-y-2">
                <p className="text-sky-700 font-semibold text-sm">
                  {t("team.specialtiesLabel")}
                </p>
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(t(`${base}.specialties`, { returnObjects: true }))
                    ? (t(`${base}.specialties`, { returnObjects: true }) as string[]).map(
                        (specialty: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-lg"
                          >
                            {specialty}
                          </span>
                        )
                      )
                    : null}
                </div>
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-sky-100">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-sky-500" />
                  <span className="text-sky-600 text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-sky-500" />
                  <span className="text-sky-600 text-sm">{member.phone}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
      {/* Company Story */}
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1" data-aos="fade-right">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent mb-6">
              {t("ourStory.title")}
            </h2>
            <div className="space-y-6 text-sky-600 leading-relaxed">
              {Array.isArray(t("ourStory.paragraphs", { returnObjects: true }))
                ? (t("ourStory.paragraphs", { returnObjects: true }) as string[]).map(
                    (paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    )
                  )
                : <p>{t("ourStory.paragraphs")}</p>
              }
            </div>
          </div>

          <div className="flex-1" data-aos="fade-left">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-sky-100 to-sky-200">
              <img
                src="logo.png"
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-600/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Contact CTA */}
   <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-3xl p-8 lg:p-12 shadow-2xl"
          data-aos="zoom-in"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("contactSection.title")}
          </h2>
          <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
            {t("contactSection.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+977-1-234567"
              className="inline-flex items-center gap-2 bg-white text-sky-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Phone className="h-5 w-5" />
              {t("contactSection.callUs")}
            </a>
            <a
              href="mailto:info@dhanashree.com"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-sky-700 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              <Mail className="h-5 w-5" />
              {t("contactSection.sendEmail")}
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
