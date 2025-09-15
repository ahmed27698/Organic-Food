"use client";

import Link from "next/link";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingOffcanvas } from "../clientPage";
import { navBar } from "../../../lib/navbar";
import { useTranslations } from "next-intl";
import SearchButton from "./SearchButton";

export default function NavBar() {
    const t = useTranslations("navBar");
    const [dropdownIndex, setDropdownIndex] = useState(null);

    const dropdownLinks = [
        navBar.aboutLinks,
        navBar.shopLinks,
        navBar.newsLinks,
        navBar.pagesLinks,
    ];

    if (!navBar || Object.keys(navBar).length === 0) {
        return (
            <nav className="lg:px-20 md:px-10 px-4 pb-5 py-5 flex items-center justify-between bg-[#F7F5EB] animate-pulse">
                <div className="h-10 w-32 bg-gray-300 rounded" />
                <div className="lg:flex hidden gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-6 w-20 bg-gray-300 rounded" />
                    ))}
                </div>
                <div className="flex gap-5">
                    <div className="h-10 w-10 bg-gray-300 rounded-full" />
                    <div className="h-10 w-10 bg-gray-300 rounded-full" />
                    <div className="h-10 w-10 bg-gray-300 rounded-full" />
                </div>
            </nav>
        );
    }

    return (
        <nav className="lg:px-20 md:px-10 px-4 pb-5 flex md:flex-row flex-col items-center justify-between bg-[#F7F5EB]">
            <Link href="/">
                <img src={navBar.mainLogo} alt="logo image" />
            </Link>
            <div className="lg:flex hidden">
                {navBar.mainLinks.map((link, index) => (
                    <div
                        key={link.labelKey}
                        onMouseEnter={() => setDropdownIndex(index)}
                        onMouseLeave={() => setDropdownIndex(null)}
                        className="inline-block relative"
                    >
                        <button className="p-5 font-medium hover:text-green-600">
                            <Link href={`/${link.link}`}>
                                {t(link.labelKey)}
                            </Link>
                        </button>

                        {dropdownIndex === index &&
                            dropdownLinks[index - 1] && (
                                <ul className="absolute border-green-600 border-t-4 top-15 left-0 z-10 bg-white shadow-xl px-10 w-52 py-3 flex flex-col gap-3">
                                    {dropdownLinks[index - 1].map((ddLink) => (
                                        <Link
                                            href={`/${ddLink.link}`}
                                            className="hover:text-green-600 duration-200 cursor-pointer font-medium"
                                            key={ddLink.labelKey}
                                        >
                                            {t(ddLink.labelKey)}
                                        </Link>
                                    ))}
                                </ul>
                            )}
                    </div>
                ))}
            </div>
            <div className="flex gap-5">
                <SearchButton/>

                <DropdownMenu>
                    <DropdownMenuTrigger className="h-10 w-10 shadow-lg bg-white hover:bg-green-600 hover:text-white text-xl text-black flex justify-center items-center">
                        <FaUser />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="flex justify-center items-center">
                            <Link
                                href="/Sign_In"
                                className="block py-1 hover:text-green-600 font-bold"
                            >
                                {t("signIn")}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex justify-center items-center">
                            <Link
                                href="/Register"
                                className="block py-1 hover:text-green-600 font-bold"
                            >
                                {t("register")}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex justify-center items-center">
                            <Link
                                href="/Wishlist"
                                className="block py-1 hover:text-green-600 font-bold"
                            >
                                {t("wishlist")}
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <ShoppingOffcanvas />

                <Sheet>
                    <SheetTrigger className="h-10 w-10 md:hidden bg-white shadow-lg hover:bg-green-600 hover:text-white text-xl text-black flex justify-center items-center">
                        <CiMenuBurger />
                    </SheetTrigger>
                    <SheetContent className="md:hidden w-full">
                        <SheetHeader>
                            <SheetTitle>{t("menu")}</SheetTitle>
                            <div className="flex flex-col">
                                {navBar.mainLinks.map((link, index) => {
                                    const hasSubLinks =
                                        dropdownLinks[index - 1]?.length > 0;
                                    return (
                                        <div
                                            key={index}
                                            className="border-b border-gray-200"
                                        >
                                            {hasSubLinks ? (
                                                <Accordion
                                                    type="single"
                                                    collapsible
                                                >
                                                    <AccordionItem
                                                        value={`item-${index}`}
                                                        className="border-0"
                                                    >
                                                        <AccordionTrigger className="hover:text-green-600 p-4 font-medium flex items-center justify-between">
                                                            <Link
                                                                href={`/${link.link}`}
                                                            >
                                                                {t(
                                                                    link.labelKey
                                                                )}
                                                            </Link>
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <ul className="flex flex-col gap-2 pl-4 pb-2">
                                                                {dropdownLinks[
                                                                    index - 1
                                                                ].map(
                                                                    (
                                                                        ddLink,
                                                                        i
                                                                    ) => (
                                                                        <Link
                                                                            key={
                                                                                i
                                                                            }
                                                                            href={`/${ddLink.link}`}
                                                                            className="hover:text-green-600 duration-200 cursor-pointer font-medium py-2"
                                                                        >
                                                                            {t(
                                                                                ddLink.labelKey
                                                                            )}
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            ) : (
                                                <Link
                                                    href={`/${link.link}`}
                                                    className="hover:text-green-600 p-4 font-medium flex items-center"
                                                >
                                                    {t(link.labelKey)}
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
