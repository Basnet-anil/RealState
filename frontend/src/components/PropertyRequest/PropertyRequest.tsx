"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  submitRequest,
  resendRequestVerification,
  setLastRequestResponse,
  setCanResend,
  setResendTimer,
  resetRequestState,
} from "@/store/slices/requestSlice";
import {
  Clock,
  Mail,
  RefreshCw,
  Home,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

type RequestFormValues = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  address: string;
};

export default function PropertyRequest() {
  const [activeTab, setActiveTab] = useState("info");
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();
  const {
    isLoading,
    lastRequestResponse,
    isResending,
    canResend,
    resendTimer,
    error,
  } = useSelector((state: RootState) => state.request);

  const form = useForm<RequestFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      date: "",
      message: "",
      address: "",
    },
  });

  const startResendTimer = () => {
    let timeLeft = 30;
    const timer = setInterval(() => {
      timeLeft -= 1;
      dispatch(setResendTimer(timeLeft));

      if (timeLeft <= 0) {
        clearInterval(timer);
        dispatch(setCanResend(true));
      }
    }, 1000);
  };

  const handleResendEmail = () => {
    if (lastRequestResponse && lastRequestResponse.data) {
      const requestId = lastRequestResponse.data.id;

      dispatch(resendRequestVerification(requestId))
        .unwrap()
        .then((response) => {
          toast.success(
            response?.message?.[i18n.language] ||
              "Verification email resent successfully!"
          );
          dispatch(setResendTimer(30));
          startResendTimer();
        })
        .catch((error) => {
          toast.error("Failed to resend verification email");
        });
    }
  };

  const onSubmit = (data: RequestFormValues) => {
    // Reset request state before new submission
    dispatch(resetRequestState());

    // Convert date to ISO string format
    const requestData = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    dispatch(submitRequest(requestData))
      .unwrap()
      .then((response) => {
        toast.success(
          response?.message?.[i18n.language] ||
            "Request submitted successfully!"
        );
        console.log("Request response:", response);

        // Store the request response in Redux
        dispatch(setLastRequestResponse(response));

        // Start the 30-second timer
        dispatch(setResendTimer(30));
        startResendTimer();

        form.reset();
      })
      .catch((error) => {
        console.log("Request error:", error);
        toast.error(error?.message || "Failed to submit request");
      });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 via-white to-sky-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-200 to-sky-300 border border-sky-300 mb-4"
            data-aos="fade-down"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            <span className="text-sky-700 font-medium text-sm">
              {t("propertyListingServices")}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent leading-tight mb-6">
            {t("listYourProperty")}
          </h2>

          {/* Decorative line */}
          <div className="flex items-center justify-center" data-aos="zoom-in">
            <div className="h-1 w-20 bg-gradient-to-r from-green-300 to-green-500 rounded-full"></div>
            <div className="h-2 w-2 bg-green-400 rounded-full mx-3"></div>
            <div className="h-1 w-20 bg-gradient-to-l from-green-300 to-green-500 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Image */}
          <div className="flex-1 lg:w-1/2">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/user/card/card_4.png"
                alt="List your property with us"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black-600/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{t("listYourPropertyWithUs")}</h3>
                <p className="text-lg opacity-90">
                  {t("joinThousandsOwners")} 
                </p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 animate-pulse" />
              <div className="absolute bottom-20 right-8 w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30" />
            </div>
          </div>

          {/* Right Side - Tabs */}
          <div className="flex-1 lg:w-1/2 w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gradient-to-r from-sky-100 to-sky-200 p-1 rounded-xl">
                <TabsTrigger
                  value="info"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
                >
                  <Home className="h-4 w-4" />
                  {t("information")}
                </TabsTrigger>
                <TabsTrigger
                  value="form"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                  {t("requestForm")}
                </TabsTrigger>
              </TabsList>

              {/* Information Tab */}
              <TabsContent value="info" className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                    {t("readyToList")}
                  </h2>
                  <p className="text-lg text-sky-600 leading-relaxed">
                    {t("getStartedWithParagraph")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                  <div className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sky-700">
                        {t("professionalPhoto")}
                      </h4>
                      <p className="text-sky-600 text-sm">
                        {t("highQualityPhotos")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sky-700">
                        {t("marketAnalysis")}
                      </h4>
                      <p className="text-sky-600 text-sm">
                        {t("competitivePricing")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sky-700">
                        {t("wideExposure")}
                      </h4>
                      <p className="text-sky-600 text-sm">
                       {t("listedOnMultiplePlatforms")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sky-700">
                        {t("expertSupport")}
                      </h4>
                      <p className="text-sky-600 text-sm">
                        {t("dedicatedTeam")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => setActiveTab("form")}
                    size="lg"
                    className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="flex items-center">
                      {t("requestNow")}
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Button>
                </div>
              </TabsContent>

              {/* Form Tab */}
              <TabsContent value="form" className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                    {t("submitRequest")}
                  </h2>
                  <p className="text-sky-600">
                   {t("fillOutTheForm")}
                  </p>
                </div>

                {/* Success Message and Resend Section */}
                {lastRequestResponse && (
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">
                        {t("requestSuccess")}
                      </h4>
                    </div>
                    <p className="text-green-700 text-sm mb-4">
                     {t("aVerifyEmail")} {" "}
                      <strong>{lastRequestResponse.data?.email}</strong>.{t("checkYourEmail")}
                    </p>

                    {!canResend && resendTimer > 0 && (
                      <div className="flex items-center gap-2 text-orange-600 mb-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">
                          {t("resendAvailable")}{" "}
                          <strong>{formatTime(resendTimer)}</strong>
                        </span>
                      </div>
                    )}

                    {canResend && (
                      <Button
                        onClick={handleResendEmail}
                        disabled={isResending}
                        variant="outline"
                        size="sm"
                        className="border-green-300 text-green-700 hover:bg-green-50 rounded-xl"
                      >
                        {isResending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            {t("resending")}
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4 mr-2" />
                            {t("resendLink")}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 bg-gradient-to-br from-sky-50 to-white p-6 rounded-2xl border border-sky-200 shadow-lg"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        rules={{ required: "Full name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sky-700 font-medium">
                              Full Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-lg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sky-700 font-medium">
                              Email Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-lg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        rules={{ required: "Phone number is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sky-700 font-medium">
                              Phone Number *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-lg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="date"
                        rules={{ required: "Preferred date is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sky-700 font-medium">
                              Preferred Contact Date *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-lg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      rules={{ required: "Property address is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sky-700 font-medium">
                            Property Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Baneshwor, Kathmandu, near XYZ School"
                              className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sky-700 font-medium">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your property or any specific requirements..."
                              rows={4}
                              className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-center pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        size="lg"
                        className="group relative px-12 py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Submit Request
                          </>
                        )}
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
