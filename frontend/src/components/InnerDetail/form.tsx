"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import $axios from "@/lib/axios.instance";
import { useTranslation } from "react-i18next";
import {
  resendVerificationEmail,
  setLastBookingResponse,
  setCanResend,
  setResendTimer,
  resetBookingState,
} from "@/store/slices/bookingSlice";
import { Clock, Mail, RefreshCw, Send } from "lucide-react";

type BookingFormValues = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  propertyId: string;
};

function Innerform({ propertyId }: { propertyId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();
  const { lastBookingResponse, isResending, canResend, resendTimer } =
    useSelector((state: RootState) => state.booking);

  const form = useForm<BookingFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      date: "",
      message: "",
      propertyId: propertyId,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      const response = await $axios.post("/booking", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message?.[i18n.language] || "Booking successful!");
      dispatch(setLastBookingResponse(data));
      dispatch(setResendTimer(30));
      startResendTimer();
      form.reset();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message?.[i18n.language] ||
        "Something went wrong!";
      toast.error(message);
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
    if (lastBookingResponse && lastBookingResponse.data) {
      const email = lastBookingResponse.data.user.email;
      const propertyId = lastBookingResponse.data.property.id;

      dispatch(resendVerificationEmail({ email, propertyId }))
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

  const onSubmit = (data: BookingFormValues) => {
    dispatch(resetBookingState());
    bookingMutation.mutate(data);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-sky-100 sticky top-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent mb-2">
            {t("bookThisProperty")}
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full mx-auto"></div>
        </div>

        {/* Success Message */}
        {lastBookingResponse && (
          <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-800 text-sm lg:text-base">
                Booking Submitted Successfully!
              </h4>
            </div>
            <p className="text-green-700 text-xs lg:text-sm mb-4">
              A verification email has been sent to{" "}
              <strong>{lastBookingResponse.data?.user?.email}</strong>. Please
              check your inbox and click the verification link.
            </p>

            {!canResend && resendTimer > 0 && (
              <div className="flex items-center gap-2 text-orange-600 mb-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Clock className="h-4 w-4" />
                <span className="text-xs lg:text-sm">
                  Resend available in:{" "}
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
                className="w-full border-green-300 text-green-700 hover:bg-green-50 rounded-xl"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Resending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 lg:space-y-6"
          >
            <FormField
              control={form.control}
              name="fullName"
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sky-700 font-medium text-sm lg:text-base">
                    {t("yourName")} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl"
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
                  <FormLabel className="text-sky-700 font-medium text-sm lg:text-base">
                    {t("yourEmail")} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sky-700 font-medium text-sm lg:text-base">
                    {t("phoneNumber")} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl"
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
              rules={{ required: "Booking date is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sky-700 font-medium text-sm lg:text-base">
                    {t("bookingDate")} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl"
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
                  <FormLabel className="text-sky-700 font-medium text-sm lg:text-base">
                    {t("message")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your message here..."
                      rows={3}
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={bookingMutation.isPending}
              className="group relative w-full px-6 py-3 lg:py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {bookingMutation.isPending ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit Booking
                </>
              )}
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Innerform;
