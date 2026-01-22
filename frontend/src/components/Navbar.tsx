"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navigation = [
  { name: "home", href: "/" },
  { name: "services", href: "/service" },
  { name: "about", href: "/about" },
];

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const [lang, setLang] = useState("en");
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLang = Cookies.get("lang") || "en";
    i18n.changeLanguage(storedLang).then(() => {
      setLang(storedLang);
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    Cookies.set("lang", lng);
    router.refresh();
  };

  // Function to check if nav item is current
  const isCurrentPage = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-[999999]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 lg:h-20 items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset transition-all duration-200">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">{t("openMainMenu")}</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start flex-1 lg:flex-initial">
              <Link href="/" className="flex items-center">
                <img
                  alt="Dhanashree Real Estate"
                  src="/user/logo.png"
                  className="h-10 w-auto lg:h-12 hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2 capitalize">
              {navigation.map((item) => {
                const isCurrent = isCurrentPage(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isCurrent
                        ? "bg-sky-50 text-sky-700 border-b-2 border-sky-700"
                        : "text-gray-700 hover:text-sky-700 hover:bg-sky-50 border-b-2 border-transparent hover:border-sky-300",
                      "px-4 py-2 text-sm lg:text-base font-medium rounded-t-lg transition-all duration-200"
                    )}
                  >
                    {t(item.name)}
                  </Link>
                );
              })}

              {/* Tools dropdown */}
              <Menu as="div" className="relative">
                <MenuButton
                  className={classNames(
                    isCurrentPage("/unitConverter") ||
                      isCurrentPage("/emiCalculator") ||
                      isCurrentPage("/dateConverter")
                      ? "bg-sky-50 text-sky-700 border-b-2 border-sky-700"
                      : "text-gray-700 hover:text-sky-700 hover:bg-sky-50 border-b-2 border-transparent hover:border-sky-300",
                    "px-4 py-2 text-sm lg:text-base font-medium inline-flex items-center gap-1 rounded-t-lg transition-all duration-200"
                  )}
                >
                  {t("tools")}
                  <ChevronDownIcon className="w-4 h-4 transition-transform group-data-[open]:rotate-180" />
                </MenuButton>
                <MenuItems className="absolute z-50 mt-2 w-52 origin-top-left rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-100">
                  <div className="py-2">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/unitConverter"
                          className={classNames(
                            active ? "bg-sky-50 text-sky-700" : "text-gray-700",
                            "block px-4 py-3 text-sm font-medium transition-colors duration-150"
                          )}
                        >
                          {t("unitConverter")}
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/emiCalculator"
                          className={classNames(
                            active ? "bg-sky-50 text-sky-700" : "text-gray-700",
                            "block px-4 py-3 text-sm font-medium transition-colors duration-150"
                          )}
                        >
                          {t("emiCalculator")}
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/dateConverter"
                          className={classNames(
                            active ? "bg-sky-50 text-sky-700" : "text-gray-700",
                            "block px-4 py-3 text-sm font-medium transition-colors duration-150"
                          )}
                        >
                          {t("dateConverter")}
                        </Link>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Language Selector */}
              <div className="hidden sm:flex items-center justify-center space-x-2">
                <GlobeAltIcon className="h-5 w-5 text-gray-500" />
          
    <Select
      value={i18n.language}
   onValueChange={(selectedLang) => {
    setLang(selectedLang); // string value like "en" or "ne"
    changeLanguage(selectedLang);
  }}
    >
      <SelectTrigger className="w-[120px] text-sm border-gray-300 focus:ring-2 focus:ring-sky-300 focus:border-sky-500">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent className="z-[999999999]">
        <SelectItem value="en">🇺🇸 English</SelectItem>
        <SelectItem value="ne">🇳🇵 नेपाली</SelectItem>
      </SelectContent>
    </Select>

              </div>

              {/* Admin Login Button */}
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transition-all duration-300 font-medium px-4 py-2 lg:px-6 lg:py-2.5 rounded-lg shadow-sm hover:shadow-md"
                >
                  {t("loginAsAdmin")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <DisclosurePanel className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => {
              const isCurrent = isCurrentPage(item.href);
              return (
                <Link key={item.name} href={item.href}>
                  <DisclosureButton
                    as="div"
                    className={classNames(
                      isCurrent
                        ? "bg-sky-100 text-sky-700 border-l-4 border-sky-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-sky-700 border-l-4 border-transparent",
                      "block rounded-r-lg px-4 py-3 text-base font-medium cursor-pointer transition-all duration-200"
                    )}
                  >
                    {t(item.name)}
                  </DisclosureButton>
                </Link>
              );
            })}

            {/* Mobile Tools Section */}
            <div className="pt-2 border-t border-gray-100 mt-3">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t("tools")}
              </div>
              <Link href="/unitConverter">
                <DisclosureButton
                  as="div"
                  className={classNames(
                    isCurrentPage("/unitConverter")
                      ? "bg-sky-100 text-sky-700 border-l-4 border-sky-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-sky-700 border-l-4 border-transparent",
                    "block rounded-r-lg px-4 py-3 text-base font-medium cursor-pointer transition-all duration-200"
                  )}
                >
                  {t("unitConverter")}
                </DisclosureButton>
              </Link>
              <Link href="/emiCalculator">
                <DisclosureButton
                  as="div"
                  className={classNames(
                    isCurrentPage("/emiCalculator")
                      ? "bg-sky-100 text-sky-700 border-l-4 border-sky-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-sky-700 border-l-4 border-transparent",
                    "block rounded-r-lg px-4 py-3 text-base font-medium cursor-pointer transition-all duration-200"
                  )}
                >
                  {t("emiCalculator")}
                </DisclosureButton>
              </Link>
              <Link href="/dateConverter">
                <DisclosureButton
                  as="div"
                  className={classNames(
                    isCurrentPage("/dateConverter")
                      ? "bg-sky-100 text-sky-700 border-l-4 border-sky-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-sky-700 border-l-4 border-transparent",
                    "block rounded-r-lg px-4 py-3 text-base font-medium cursor-pointer transition-all duration-200"
                  )}
                >
                  {t("dateConverter")}
                </DisclosureButton>
              </Link>
            </div>

            {/* Mobile Language Selector */}
            <div className="flex sm:hidden items-center space-x-3 px-4 py-3 border-t border-gray-100 mt-3">
              <GlobeAltIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {t("language")}:
              </span>
              <select
                aria-label={t("language")}
                onChange={(e) => {
                  const selectedLang = e.target.value;
                  setLang(selectedLang);
                  changeLanguage(selectedLang);
                }}
                value={i18n.language}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium bg-white text-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="ne">नेपाली</option>
              </select>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
}

export default Navbar;
