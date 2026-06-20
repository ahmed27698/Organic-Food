"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { BsArrowLeft } from "react-icons/bs";
import NavBarPages from "./components/NavbarPages";

export default function NotFound() {
    const locale = useLocale();
    const t = useTranslations("error404");

    return (
        <section dir={locale === "ar" ? "rtl" : "ltr"}>
            <NavBarPages navLink="/" />

            <div className="relative">
                <img
                    src="/vegetables.jpg"
                    alt=""
                    className="z-0 md:h-[600px] h-[400px] w-full object-cover"
                />
                <div className="absolute w-full bottom-0 lg:p-20 md:p-10 p-5 flex flex-col md:flex-row md:justify-between items-start md:items-center">
                    <div>
                        <p className="text-green-600 font-bold">// {t("WelcomeToOurCompany")}</p>
                        <p className="text-white font-bold lg:text-6xl md:text-4xl text-2xl">{t("404")}</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/" className="text-white font-bold">{t("Home")}</Link>
                        <span className="text-white">|</span>
                        <p className="text-green-600 font-bold">{t("404")}</p>
                    </div>
                </div>
            </div>

            <div className="py-30 text-center">
                <h2 className="font-extrabold text-9xl text-green-600">404</h2>
                <p className="font-bold mt-4 text-xl">{t("PageNotFound")}</p>
                <p className="mt-2 text-gray-500">{t("OopsMessage")}</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mt-8 px-8 py-4 border border-black font-bold bg-white text-black hover:text-white hover:bg-green-600 transition-colors"
                >
                    <BsArrowLeft /> {t("BackToHome")}
                </Link>
            </div>
        </section>
    );
}
