"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ruler, Square, Grid3X3 } from "lucide-react";
import ConverterHeader from "@/components/ConverterHeader";

interface UnitValues {
  ropani: string;
  aana: string;
  paisa: string;
  dam: string;
  bigha: string;
  katha: string;
  dhur: string;
  sqFeet: string;
  sqMeter: string;
}

export default function UnitConverter() {
  const { t } = useTranslation();
  const [values, setValues] = useState<UnitValues>({
    ropani: "",
    aana: "",
    paisa: "",
    dam: "",
    bigha: "",
    katha: "",
    dhur: "",
    sqFeet: "",
    sqMeter: "",
  });

  const conversionRates = {
    ropani: 5476,
    aana: 342.25,
    paisa: 85.56,
    dam: 21.39,
    bigha: 72900,
    katha: 3645,
    dhur: 182.25,
    sqFeet: 1,
    sqMeter: 10.764,
  };

  const convertFromSqFeet = (sqFeet: number): UnitValues => ({
    ropani: (sqFeet / conversionRates.ropani).toFixed(6),
    aana: (sqFeet / conversionRates.aana).toFixed(6),
    paisa: (sqFeet / conversionRates.paisa).toFixed(6),
    dam: (sqFeet / conversionRates.dam).toFixed(6),
    bigha: (sqFeet / conversionRates.bigha).toFixed(6),
    katha: (sqFeet / conversionRates.katha).toFixed(6),
    dhur: (sqFeet / conversionRates.dhur).toFixed(6),
    sqFeet: sqFeet.toFixed(2),
    sqMeter: (sqFeet / conversionRates.sqMeter).toFixed(2),
  });

  const handleInputChange = (unit: keyof UnitValues, value: string) => {
    if (value === "") {
      return setValues({
        ropani: "",
        aana: "",
        paisa: "",
        dam: "",
        bigha: "",
        katha: "",
        dhur: "",
        sqFeet: "",
        sqMeter: "",
      });
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const sqFeetValue = numValue * conversionRates[unit];
    setValues(convertFromSqFeet(sqFeetValue));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConverterHeader
        title={t("unitConverter")}
        description={t("convertDescription")}
        icon={<Ruler className="h-8 w-8 text-white" />}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ropani System */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <Grid3X3 className="h-6 w-6" />
                {t("ropaniSystem")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {["ropani", "aana", "paisa", "dam"].map((unit) => (
                <div key={unit} className="space-y-2">
                  <Label htmlFor={unit} className="text-sm font-medium text-gray-700">
                    {t(unit)}
                  </Label>
                  <Input
                    id={unit}
                    type="number"
                    step="any"
                    placeholder="0"
                    value={values[unit as keyof UnitValues]}
                    onChange={(e) => handleInputChange(unit as keyof UnitValues, e.target.value)}
                    className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bigha System */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <Square className="h-6 w-6" />
                {t("bighaSystem")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {["bigha", "katha", "dhur"].map((unit) => (
                <div key={unit} className="space-y-2">
                  <Label htmlFor={unit} className="text-sm font-medium text-gray-700">
                    {t(unit)}
                  </Label>
                  <Input
                    id={unit}
                    type="number"
                    step="any"
                    placeholder="0"
                    value={values[unit as keyof UnitValues]}
                    onChange={(e) => handleInputChange(unit as keyof UnitValues, e.target.value)}
                    className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                  />
                </div>
              ))}
              <div className="h-[72px]" />
            </CardContent>
          </Card>

          {/* International System */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-700 to-sky-800 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <Ruler className="h-6 w-6" />
                {t("internationalSystem")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {["sqFeet", "sqMeter"].map((unit) => (
                <div key={unit} className="space-y-2">
                  <Label htmlFor={unit} className="text-sm font-medium text-gray-700">
                    {t(unit)}
                  </Label>
                  <Input
                    id={unit}
                    type="number"
                    step="any"
                    placeholder="0"
                    value={values[unit as keyof UnitValues]}
                    onChange={(e) => handleInputChange(unit as keyof UnitValues, e.target.value)}
                    className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                  />
                </div>
              ))}
              <div className="h-[72px]" />
              <div className="h-[72px]" />
            </CardContent>
          </Card>
        </div>

        {/* Conversion Reference Table */}
        <Card className="mt-12 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
            <CardTitle className="text-gray-800">
              {t("conversionReference")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 text-center">{t("ropaniRef")}</h4>
                {["1ropani", "1aana", "1paisa", "1ropaniSqft"].map((item, i) => (
                  <div key={i} className="flex justify-between border-b py-1">
                    {t(item)}
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 text-center">{t("bighaRef")}</h4>
                {["1bigha", "1katha", "1bighaSqft", "1kathaSqft"].map((item, i) => (
                  <div key={i} className="flex justify-between border-b py-1">
                    {t(item)}
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 text-center">{t("intlRef")}</h4>
                {["1sqMeter", "1acre", "1hectare", "ropaniToAcre"].map((item, i) => (
                  <div key={i} className="flex justify-between border-b py-1">
                    {t(item)}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
