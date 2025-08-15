import {
    ProductSlider,
    NavBar,
    ProductsTabs,
    CountDown,
    Count_Up,
    FeaturedProducts,
    Blogs,
} from "./clientPage";
import AddingAdminProducts from "../components/AddingAdminProducts";
import { CiMail } from "react-icons/ci";
import { BsTwitterX, BsInstagram } from "react-icons/bs";
import { FaLocationArrow, FaFacebookF, FaTiktok } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default async function Home() {
    const response = await fetch("http://localhost:3000/api/prices");
    const pricesData = await response.json();
    const t = await getTranslations("Home");
             
    return (
        <main>
            <div>
                <h1>{t("title")}</h1>
                <Link href="/About">{t("about")}</Link>
            </div>
            <header className='flex relative justify-between bg-[#F7F5EB] lg:px-20 md:px-10 px-4 after:content-[""] py-5 after:bg-gray-200 after:h-0.5 after:w-screen after:absolute after:bottom-0 after:right-0 '>
                <div className="md:flex gap-10 hidden md:items-center">
                    <p className="flex gap-3 items-center">
                        <IoLocationOutline className="text-green-600 text-xl" />
                        15/A, Nest Tower, NYC
                    </p>
                    <p className="flex gap-3 items-center">
                        <CiMail className="text-green-600 text-xl" />
                        info@gmail.com
                    </p>
                </div>
                <div className="flex gap-10 items-center">
                    <div>
                        <LanguageSwitcher />
                    </div>
                    <div className="gap-4 hidden md:flex">
                        <a href="https://www.facebook.com/?locale=ar_AR">
                            <FaFacebookF className="hover:text-green-600" />
                        </a>
                        <a href="https://www.tiktok.com/">
                            <FaTiktok className="hover:text-green-600" />
                        </a>
                        <a href="https://www.instagram.com/">
                            <BsInstagram className="hover:text-green-600" />
                        </a>
                        <a href="https://x.com/home?lang=ar">
                            <BsTwitterX className="hover:text-green-600" />
                        </a>
                    </div>
                </div>
            </header>
            <NavBar />
            <ProductSlider />
            <section className="lg:px-20 md:px-10 px-4 flex md:flex-row flex-col gap-5 mt-20">
                <div className="flex items-stretch overflow-hidden">
                    <img
                        className="hover:scale-110 duration-2000"
                        src="https://broccolisite.netlify.app/assets/sectionTwo_1-CZr5JFCI.webp"
                        alt="image"
                    />
                </div>
                <div className="flex flex-col overflow-hidden gap-5">
                    <img
                        className="hover:scale-105 duration-2000"
                        src="https://broccolisite.netlify.app/assets/sectionTwo_2-61bValKl.webp"
                        alt="image"
                    />
                    <img
                        className="hover:scale-105 duration-2000"
                        src="https://broccolisite.netlify.app/assets/sectionTwo_3-YnnszplM.webp"
                        alt="image"
                    />
                </div>
            </section>
            <ProductsTabs />
            <AddingAdminProducts />
            <section className="flex md:flex-row flex-col mx-3 px-5 lg:mx-20 lg:px-10 py-20 bg-[#F7F5EB]">
                <Image
                    width={360}
                    height={200}
                    src="https://broccolisite.netlify.app/assets/section4-CEx2_n7H.webp"
                    alt="image"
                />
                <div className="flex flex-col gap-10">
                    <p className="text-green-600">Todays Hot Deals</p>
                    <p className="lg:text-5xl md:text-4xl text-3xl font-bold">
                        Original Stock Honey Combo Package
                    </p>
                    <CountDown />
                </div>
            </section>
            <section className="my-10 px-5 py-52 " id="countUpSection">
                <Count_Up />
            </section>
            <section>
                <h2 className="font-bold text-3xl text-center">
                    Featured Products
                </h2>
                <FeaturedProducts />
            </section>
            <section
                className="flex justify-around my-10 py-10 items-center"
                id="worldSection"
            >
                <img
                    loading="lazy"
                    className="w-3/12 md:block hidden"
                    src="https://broccolisite.netlify.app/assets/imgsec7_1-DssVxtu4.webp"
                    alt="image"
                />
                <div className="flex flex-col gap-5 items-center ">
                    <p className="text-green-600 font-bold">
                        // any question you have //
                    </p>
                    <p className="text-white font-bold text-4xl">
                        897-876-987-90
                    </p>
                    <div className="flex gap-3">
                        <button className="text-white bg-green-600 md:py-4 py-1 md:px-8 px-2 rounded-lg ">
                            Make A Call
                        </button>
                        <button className="text-white bg-transparent border-1 border-white md:py-4 py-1 md:px-8 px-2 rounded-lg ">
                            Contact Us
                        </button>
                    </div>
                </div>
                <img
                    loading="lazy"
                    className="w-3/12 md:block hidden"
                    src="https://broccolisite.netlify.app/assets/imgsec7_2-BJLCDp_o.webp"
                    alt="image"
                />
            </section>
            <section className="lg:px-10 md:px-7 px-4 my-10 text-center">
                <p className="text-green-600">// Our Price</p>
                <p className="font-extrabold text-2xl">
                    Pricing Plan<span className="text-green-600">.</span>
                </p>
                <div className="flex justify-center flex-col md:flex-row mt-10 gap-8">
                    {pricesData.map((item) => (
                        <div
                            key={item.price}
                            className="flex flex-col group gap-5 items-center hover:scale-110 duration-500 md:w-3/12 py-8 w-full shadow-2xl"
                        >
                            <p className="font-bold text-xl ">Gardening</p>
                            <p className="group-hover:text-green-600 bg-[#F7F5EB] w-full h-16 flex justify-center items-center font-bold text-xl">
                                <sup>$</sup>
                                {item.price}/M
                            </p>
                            <p>Lorem, ipsum.</p>
                            <p>Alias, tempora?</p>
                            <p>Id, repellendus!</p>
                            <p>Quae, possimus!</p>
                            <p>Eos, molestias?</p>
                            <p>Architecto, natus?</p>
                            <button className="px-10 py-3 bg-green-600 text-white">
                                purchase
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="font-bold text-4xl text-black text-center py-8">
                    Our Trusted Partners
                </h2>
                <Marquee speed={100} gradient={true}>
                    <img
                        className="mx-10"
                        alt="image"
                        src="data:image/webp;base64,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"
                    />
                    <img
                        className="mx-10"
                        alt="image"
                        src="data:image/webp;base64,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"
                    />
                    <img
                        className="mx-10"
                        alt="image"
                        src="data:image/webp;base64,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"
                    />
                    <img
                        className="mx-10"
                        alt="image"
                        src="data:image/webp;base64,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"
                    />
                    <img
                        className="mx-10"
                        alt="image"
                        src="data:image/webp;base64,UklGRuIFAABXRUJQVlA4WAoAAAAQAAAAlAAAXwAAQUxQSOAEAAAB8Bttexzptq09Y7YqTMCUW3hAGDAbarOfBQ+KEdOAhAcfPUjMTk5qQ5pBqLMlHZhBeEDMRn8EvgBYWZU5WyEiJgAfrln2Hk+n2tc0PR8hqxifj90jTtLLbXaPzt3MoafG7g8vGyP9g3PM0yGsUOwBPTNqT/3YNIPjYR/gqNHvqccnDnjstwR76KkxrbgwKLtwwGPXdFJYoemu9C8LJ40HP2ZgOGwjAjfuZLB4+FsAwgpo9pokp0Hh8Wv2wDYCjmrhavEcOioY9kBYR64KT2JYgZAAbDuX73ddp5+CbYSjA15Z3m8v6tFp9o5BX3Ym8mYAbX3kflGPbeTMfWEeNfqJ3G6XTkN57vZR6a57vWwkuTvI1sdMMfUPaGcxxTAx5/2ihKOy1lqNR2ysCDHQ+by70tMYdqNG3tSTgbD3sHlRTwYCHUwenw0EvsLRPBsYeFMpPB3o8zYvzwfUxOkJAYx6Sv6r01xeJHu5XKzgDHoraFewl4t9KLmfBkFbWi3NateCjQUfrP54vvjVxi9XrTeDIlFMt4Cma1f1la82fvZefsHGz6vUkHybo26L3taw9evv5cd/aByrpj5MbZYoLJ2Wrp2u+f0fGr/2Xt7UTEEVYsnEgonRCS5GV/N/tG3XdZ0q2a7rOtOius402O7EgunKGoDtuq4zBdPVqhbdtRr0E8lFFdxERtsSSKo6ksxj5DGOmWQsjRTTcHCBXPvSSDFan8n5RVUNmcfVe59IjoAiyUVJQMgKjWonOTRFBS946LUGiIKD7LNC5SpYwJLkZiqAUfAAMJAewIHXko1odSS51WWuChVQ+QRbsBG1sYREkruq8TUYa3gtmLFpPdBURVpUwb2BOms60J2lcg2vEnyLyUKoi2hAOg/+JC/4sxCqeD1p7IVdVbmm4SPRCu6wrhKv5wSkA12VajJ3FwVzTrDQFkBUWeL1DNdjEJYahya4e0uHCacYWogRJkscTpgALdBUyHW192FJclKnmKUGJkt0TXoEMAnho3jtLjvzZFEvzbedVTAFupZRA3DC/lEMbuV86XCKt2MDXIGuYe26rvu+QHcf09tZqExyM6cArgGuwDrn7XES5vvw94BAkrs+B9ECfQXcKUHh2AvU70CfNBwYTuoNEGswnqAD5CSM78AO51hhPwmAYhVCm+8Lo7DfhW0Y7DlKoD7NNSA0JV0wAt09KGEoRJyDLPSnJQJqr8DU4IjyKsz3gHCYJevPmoTxrEACnpcKtVaZnUMpCrRVq3BrUytJvh76CfVJ6AE4Yf/+SykIIwB1JalXkpsvQK0V/U5y8Qc/U977gps3ystsGwCXSG63OQ6o9hvFfdbAeGAyUr9Qnud5J0mLD1lba63BmyprrcH/Mf/+X+t/+yz84J/1nz8L/8d8SvmTZHPMRvLMsyqsU8EvsFH63XekkflTg80x9RJjLAzUko0ApZjTKNgEF5uGCSr1UoT3gkkKg5HMmnQh+6Y+KQTbEOF9AeUUhxMQPeTokm0KHvBe2j4lK/iIODtpHMahMKahxXs02xyzKTBKZjXpTQwjmocbsDop+hGiSQp+kPKybAVvc0u/KQTbEDFMBRTDNtMIOsGkNsS+TcVtG1FAsgLGtEQl9CuQTAFjC8a0RTTs8+4K8yxljSEICNvuzrBtgMK5CveqcOcKbwpWUDgg3AAAAFANAJ0BKpUAYAA+fTKTR6SjIaE3aACQD4lpbt/UB+lf8AM5AE0b/wD8L/0A/JHuoNyI2nnXs1we6hnwgFYwwAGh1lKNxajVNdzsl+UZYAlsM/SKNG7QUouxXTLUzceMt6M8tQkJ9mneozEY0rLkD6VlXYAA/vp3mfYbYmxryaQACPw7D/8tEHtJPL6PP/LwxTA0hppj+QYaVY6M3cCs//0XEx/8tn//+ZhtVcXKG7afyTf/8eP/+QG/8eY7HEc2mz//+YgoZX9su0Jn6mdDCPG0C/kyoTmQShwAAAA="
                    />
                    <img
                        className="mx-10"
                        alt="image"
                        src="data:image/webp;base64,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"
                    />
                </Marquee>
            </section>
            <Blogs />

            <footer className="lg:mt-30 relative">
                <div className="flex flex-wrap lg:px-10 md:px-7 px-4 lg:absolute lg:-top-20">
                    <div className="flex items-center bg-white gap-5 w-full sm:w-6/12 lg:w-3/12 p-7 shadow-[0_0_1px_gray]">
                        <img
                            className="w-10 h-10"
                            src="data:image/webp;base64,UklGRtAEAABXRUJQVlA4WAoAAAAQAAAAMgAAMQAAQUxQSOICAAABgFXbVt1qSUACEnBQHFwcFAeNg+DgxkFx0DgIDhIHiQNwsD/y6ENBREwAlx+z1qfll82sbSyq7nfs46UOcG39mVilwj5qft1/ImgJHBuVptn8wLoZLvZVqv23/KSOi08tKRW9vhPVBnNi+1kZICt+w2sxnMaqrZgdTXr5j03NcGq1OE6HXJrih6wGzl9yXLaL/Ge8wombtADuAlYZzP/08p9ytSULSf4CW8GsWprCNafhwNTmAKymnZksUAtRHWabr7FUs0vyHCYFMLMCBHUkWSh6w2s2wLxwbNoKgyKYKkOSh9LeIKoG0AjY282SFL1GgKRI2M3lHbI8qABeUp00TbI7NOIVQe/NC1CqARtTGiUpA+bRr8X8K4FWj+97e6EVIKrj2AxSADdLqlVKWEmzJMWzsRqg6HEEowyuto5BzWvEa8iqxi56ngRNBsyi8SSoM2tzmLU5r4LXk6wOMyockZWBoHRCmwcFyApWrcMVZRZZzFbNkVcHJFlgmPo/k6URrEa8nhb+NOKUwWv4iCTNkoMsB1n75mCUgaUeoQkISuxNHKUNWBeAQSlFA0QFiPJHSU8Di+IO8BrBKO1GcWyVwKs7Ikuzd62ZI6cE/qicoQxG6QSflVHh2H+qAFdgrGabfy0qZvkjvmCvmTbaVu8n42dG8OqukBVekur039/mCu4tqwSD3KUgaSmlbNrPU6/ZAEnmKKiDdeOqW5Uthy6kXJr203PS4yjLkhR39+n1uGHWFnjT+JjGRft1+u9vKjgtAEGbJK0KfNj6NJRN+7nK75IMrhuV+bIPKRdpdXCf9Or7fpL71nFsK0nn/GinWBfDvpRfMUrber/t5/lXnFJoOjU/8pKDrM57nxR+wf69NAJJ979+ktavmNu9f82SNADYJmkbs56fcX/9c6ral5yC4dDEYIGsp7lkb49+WrVfSuq84aOD6sMCt3v/mrRvZUje8dWw6LyMKXp+03Upp85bvgtWUDggyAEAALALAJ0BKjMAMgA+fTiUR6SjoiE19d5gkA+JbAC9E8LJl7l+M3FBRTP/+VP0M8gHz0zHL1Afrv+oHvX+iX0AP2S9HL2E/QA/YD0tP2j+CD9p/239poHkbs/lwtVPogHPZVxHbqOCwAD+3UR/U9IT+vGBTSEx9eXiSnRp6l+otu9lr3BP/45w3ZXtXe5+TGmVBe4kpU18oJofv9Xp5G4NcgNDWOEqsP/M5kpDbyxq/5qAMZu8z4cHlbf9FUVvVkbi9oP9CouodxydIeerq0W9Oi0tW2RKnoIgAoW0QMQCiQyS8w8CF3JhymTGlVSXmRNwZPdP1m5YX2Xr+DfDrah0t+0zOp0iLqv5l4X7GmuUbrT/06exmIml4Pmea+B3AH9cJ6gV9bn60mMj2445PlRSxVfOx6Q8FziVFegxZODw0sQa74bf0FTNshaTBPzDuWU9T2l0OmtnqbkaTLIfZ0yXoEsLic/G71shDUvvfH7XX6dLGg30CQ8jd4e8fv3vKHNa4+Qx4MP/UW4/bbTXZn++A13+ygF/Eb0elv/V79uS38p++TX//58UJVpu+sNDwXf1w5CEswCqE25e2MxTypw4Xv/E3isQZbgAAA=="
                            alt="image"
                        />
                        <div>
                            <p className="font-bold">Curated Products</p>
                            <p>
                                Provide free home delivery for all product over
                                $100
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center bg-white gap-5 w-full sm:w-6/12 lg:w-3/12 p-7 shadow-[0_0_1px_gray]">
                        <img
                            className="w-10 h-10"
                            src="data:image/webp;base64,UklGRr4FAABXRUJQVlA4WAoAAAAQAAAAMQAAMQAAQUxQSMoDAAABsCRtf1t7ylu9Am2gq7UEkaZtEUZZRc+5qv8C+po0ShaZ2TF5BMcr4JhptMiZY3LGLkYZeQffwDrh9goiYgJ4UneYJuk8Hd/BK9N0i6Scc96kcrSvgFg0J0fVtlmle7JBW+RqP+tsnsScNRggHKZpmg4PAEmLe4qgHoiLtOW8SaUzELWYu3RFSwALMK+tBbBx1eIgarrBNBZ/1jpuOllcA9Zwud2Kg17tVQdVE5hR+xIB7PHoAdxWHKzFXJE0ppSSZe9TSmmWB1MkOQCnM0SlS6as3Ow0gVcMSjuSIqzLpaRYMU3z2DQVBnmcppPaitkW6GUr9qgZIJxULUcL2K08ml7K1Hs5vNrdQcoG3CSNyfuQZulowK8qwTpwp5MHrxaUgF6zB0JRb6jbrLMD4iYPtkiyGPWgDJQZwGtzALYxAFHFAEYjRIWgBMqw7pQBWzYLEKXiAKLOAMrgdD4pgkbQFaM8+21tNe5IirsR6KUBnBJoBJYMTgNVnUzJFday6wGMBaICVgmsRuhla6OkttYqwLbsqlnQKsAkD+sK2MZg2jGAawxYDZCULngNMAqiekA9RKk49q1UHKwZmGUr5rxZrEbImwGnBNvaKle0thohL4BXqgxqYZCHeQH8TpNd5p3RyZYMWYBVD5hJAziNQFIAdqOkdscoKcCcgV4e81A0gCmbBcxWDGwZaPsArrHQ9gGMRvDK9lS0BjBnBfZBCUYZqq1UPNWgCOfNeOVowJ7VUt8yRKWa1la5lmVBI4Z9LIpcXDKwFlObXKl5DYAG9vGsNXBZu6BzZZTU7mzZzC4TumORkuEWep0MQJsCgDvLU5M0R8PVozoDDDp7LseiCNiTWoLjZjurPAKtND0YwD4u2hzQSyNXNu/oTge/g7iqB+ygi1syAG32ALbpDtOieqxgsjyAiWnMQwrUTfPQnc7ab3lIwWHnUsNq2F3pmu44Fe3nnKI3ALbzJPkanvoLD+/vpkX7LX/xi2+2XOuVzCSubN7RnSZV8/i/P3jgJb2Ny03zeNRSlHbu8TAt2q/5a3rZAn/5ATXbPHTf/NOkizkCbpK05SEFBzzTiwB/+03TddNvdXHOffrIr7+kBBClPhguNp/WV47Tovq/9ePUev/z3wK8SZ+oFR0ttnnoDtOk+pbz//4RvOElvQ3gprDp8pz79GU9A/jLD4Bbnn/5XYo7CCml1nuqz/TiHV7zuh2c5Go3vvN3r22apvn6V5umad67PDZXPkzqufOk+/fcOWj09zbcO6rlxuee46nNpusT/8xPhk356sjnP3ATVlA4IM4BAABwCgCdASoyADIAPnkwkEekoyGhO/ksAJAPCWwAvJwhE6OSYgzyFw/+jZzN6gP2S/Sv32fQdzwHsAftV7AHlBftn8B/7b/tJ7Rv//BDSMr+W58gmCiIfi+0e7T3wAD+5k//+PH//HM//+NbL999hcf/3eDNSnq60rmVw6aNmzm/P0YOw20pMLMCBJ/uWj3p3fik69pfkjvFQGVrjc6ek+QYyrTZn9sM4kbmcE9o2GW1FNxOW5kz0r8/IsJ6Qnv+EAE3/wv619/5IPW/6CrtjLVtezl+acB9eJij/z7wT0hUzzmWii/yXkNt4UBR5BkEXHALtV0gVI0AZWl+tv7Xmw8Bc6W9fheA/2Hua64qMGu/YyNWv5mh9Zm9Cfm/J9cdGwxN0JWJekFFVM/9Pr8hq0ooNWyjrRdxvoFMEYz/mL++eq9MqNBj8mHdkMsLkH+x5CDH6lEzInad7SAA2sHVW8l9AaQ/7IeqC2ocpSuIFdwksQ35oBxDBUKzn8JISj92b15cgdufm5F09dsQmJ/6h9RdbN3iBQff8Hf//KVa+pGDXZ13Sg0SF//2JeA1oTxyjsEt0X0pn//KSuffx58N+omvf48+G/Op06pgAAAAAAA="
                            alt="image"
                        />
                        <div>
                            <p className="font-bold">Handmade</p>
                            <p>
                                We ensure the product quality that is our main
                                goal
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center bg-white gap-5 w-full sm:w-6/12 lg:w-3/12 p-7 shadow-[0_0_1px_gray]">
                        <img
                            className="w-10 h-10"
                            src="data:image/webp;base64,UklGRqADAABXRUJQVlA4WAoAAAAQAAAAMAAALgAAQUxQSCcCAAABoFttm9vK+Ur4O9gpYTq4KAH5GiKWXReLo2yz6wogQmXEUQGLkfcCI3kJkI0MR97rDWAIoIKImACtMN9zrjVbDQd2K7KGyqkkX08kSLJ0XE1BpX4gX0uXbMATVpJzoWHiSkr8SFrLoZNsn0tiLUQpI/SqFQUyKSesJEWpxKQSv4ibEFup6SQ7dlrQN7SbkQu8iFJFsYA/UiZqG/CUGUEFUfNbSyEraaynyCPyQLIFAkGSCuoBl/7kaw5OC6ZkPZUUPfk/ScG0YM6FBi21A45aywbyIQXy3h5vm/O6buv6WTdLhY04SkkZL+6AFOMBqP0MEY13raRXgKow9bMS7s6U701ShfQERK+J7kBxUsCkgiAp4G78yyNNt46T7pJL6toB/xkvqO/8GPEkz4WkC7xU8pDvJb85b2EkUJyk7mhSRpAOv/zNBy1Ad+GHcg46/S5BElFGgo9jFXKn0YLkZ1B3dFI86i48l3hWE92e5DVnRmOK2F+U8h3Ns65nmz1UpnkL2izwA48lWUhA2wBUmWYvEi38qOE8xBjjRWFa0pXQ2cg6bcc7WrU1lFq1b7k+Oztb0fP8x2C9WYe9Cd9d3M2yUCXabAX5b/x6U8MWEsVSbg+taaJPZMtsjzwmaLKjXWLT0mXq8JN0gZ8tq0l3JWUc/RR/7GymTUMKpn4BOzdkW5LXnG7bkoJp1B+g2W232xoOXnOeQ3fXNDkrE/0q17xVlWtGyzLNDwBWUDggUgEAAFAIAJ0BKjEALwA+gTaUR6UjIiE1WA34oBAJbADFtRZaGEA/VX9gOEA/qv8z6yD0AP2A9KP2FP2y9gX9av/qFxuWy0GgOfPWRD6sEAD++gJ//2w//9rsf/9pj2tiTHqV6dQey//+H7//Dkf/+GH3BjbGkbTN1dU78vAqKd3TvpWh/1dMnY/vWn/w5fj3+O3k+VZZPEi4gr8p/4W68fLRVajTuvVN2tN/uy3FXM9RwrVZLgMdb96WHKYvAEv5G3456+1YLfiKi/fGioKPtmGyhObC2tJkiotxhlro+/i88A7+xwN0uVnR+JW3rIBsgPnF6kvcKoX325jHzvQjiRL6Ki+vtzyAANckPu8ZdxXNR1bupLLfY//hdFA05zK/S5cfu3jhN2nCBAAo8DMxGXlEZdYCFr63B54rQR3CWyBlwYHYyqYO8/+AW7cbFKrqJwbgAAAA"
                            alt="image"
                        />
                        <div>
                            <p className="font-bold">Natural Food</p>
                            <p>
                                Return product within 3 days for any product you
                                buy
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center bg-white gap-5 w-full sm:w-6/12 lg:w-3/12 p-7 shadow-[0_0_1px_gray]">
                        <img
                            className="w-10 h-10"
                            src="data:image/webp;base64,UklGRuYCAABXRUJQVlA4WAoAAAAQAAAAMgAAJQAAQUxQSHEBAAABkKPtnxsnvxt4bJNKx1432P8JyFGVs11uR4YhZ1BPciwJbdb/AAR1ULGpJEg3+BXSjkbjhz4iJoCvsEPXAwjx/WWcfe86GsSuPHy1ceOBzVsfmTTb9qMYOdDkUV87bNbT2maT73w1K0yvDo2CWaJjbkJp87tUW66HoxiqlIDWObQTkFIr39KGhOouJ8ITpuFhnXPhmSI3wWGO68G0HL9TQnHvhDFhnd9Sgqgp/yPTipqIWsbl59zc3DHAvCTZOQzMzrm/qDjcIfnSACfm7lJY/gWTM7PrBeewRPc/Jcti3WbsGAxICn/EcXwQb9kGMNHlxHTs/pSKCXYnAFiu41B8k0IFAENFWZigZpuKhIKy0gBC4VCL/X/uAvQMPPyzB5aVkmg5o8Web2cB5lr39xctCFz4NgrLTFV1ApWGKcpztPCYUFDuEu7rfAIgyosJHxPsRADWuV7DZOykKTkHr3NkmnaYmRowSUGqwLMoWViDXQwAVlA4IE4BAABQCgCdASozACYAPpE6mEeloyKhLVzLaLASCWwAuzOvv/fDfiNxCELJBrgk6NX+AegD9UP0g99jngOsl9ADysP2Z+Cj9tfSvCEnzXCJ92BvpFp3cwIEDIz/+/QAAP7e1j/7Wh1Y4J8HX6HM0uKnqcmyp2f5MlZeV1JmVZa5LqTMqyw3P94IdXxt9Ex+rqkZGkL15H/Eca69Arl31u7/qbQ+oChRcof5aM0dJX+jiuJ2//56ijSxiYAiTVYuEmxEgpXJ//N/+N1G+69kHLpCxdQZPK2gspsH/hpcbM8Hwrx3pgSuV4UnNLmmJdHG8+Ica7yBgqyzCGX9GyvAcVLvPPkqj0fFYeEPyBoV4emDvn41hJoTDezHvnm4cb8Ka/hOhZmWOyRKW7TW/zXCQPVLbUS/xViLD/nj9aEPUs3/ovD0ETpTkswhScMqKzxZYAAA"
                            alt="image"
                        />
                        <div>
                            <p className="font-bold">Free home delivery</p>
                            <p>
                                We ensure the product quality that you can trust
                                easily
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-8 bg-[#F7F5EB] lg:px-10 md:px-7 px-4 lg:pt-30 pb-8">
                    <div className="flex flex-col gap-5 md:w-2/12">
                        <img
                            className="w-8/12"
                            src="data:image/webp;base64,UklGRiwEAABXRUJQVlA4WAoAAAAQAAAAmQAAKQAAQUxQSO0CAAABkNva2p1YX+7EGaklcsv5fTlzeOfhfCw3YBpA1w2goQFr6AA6mBc5FGAJOsAdHIn/+7//MMDcVxIRENxIUiRF9jDF6pruC/L/NNnNVVMDQMoSH3afAzNgPQ6xBSYMHYwsZ2V0BZQAMAswB3CIKQKpL58GLoGblMncJ8lZ0F08BbHaQiXXe09Y0aC++NNNj1lkUkGzEZH4EcCLTZm6NIr11T22B/ZwqSTbwMY0LZVZdA0Et1vFTgbwCDwJXdHTGVA6xtOlE2lGBlHZ9cB6VrAiAdkQabARbYHFAL1phwUAnECkWX/xans0g5/G40tvNNSIEwnJUgTe0vqX4wo0qX9aifWaaAkrU0VhmqwjSiQoy3Fj9aE38JIsWEZF7/jiA0Ww02icYG+bTCmRsCzFsHuIRSRuh23uMwmvgvYm3bpO9esiGel6MRKZqoEqlajUJowIIcsA4PD00+1Ulc8iOwH0X8RhOqifVFuKjURKKjKqRkmIMLIk7sRjIpIPHi/i2LKrvjRIzcaoW7n6k8gXq6KP1C8nRBhZDm/nl0g22Kxslp3LWmnVPiJiN2FDpzZHqPSYESHCyDIM8LPJ/LJRVNRjha6MBFPbcUT01bYIL0vwAhgnj0WxdwwSwJaoCeqAYxOmMeFlOfbGTiatcdByaO2OoLEZn7jiZQkWwMraTWTvyNzdJ/Exp8swpcnHnK6AZ+uuZzVutxWGjKUJoxV6s3mv7cekO6YgRBhZhgTABEbyGMDNApWQRD1x2u4SZ0Q/WqiOnBBhZMN4U4i5wUJWQLy/kSPMvFCPihgHKPixZyyiRceECCNL0QLIt8ZlafGSJBIgmE4CfMB43REi1HhNEQ/ALjO60yR3t51GH4W42DmOt3kySp7v5US6SEJc8rwwdlcrv1RSnQD6rhmLEIik/Fx6mhIilCyJOqWKfmAun0vUHU280P99fDKJXwAsY/XFRD6btHvgcCP5C5by+aR6AZ4fJJkk8hkln7THvX9UEQBWUDggGAEAALAJAJ0BKpoAKgA+kUiZSiWkoiGmeAwAsBIJYwB4ZkQIANstdju8qgRbkc0FH/EKSxwe06B4nD9qPnxOl0b2m/v/oL5eJzVhvvpRsmCUwjsLXMkSpHrAAP7zf//+GH8A/ICZI7kOH7h/AKZXBlLwuvFYWf37FI10gPXv+fwf04tN0oQVT/vjZ//yPibis6WQLBu0Zq+w//9Oqq7hzK6/LTkGxB/9/Z8wt8UKEhBfe2UFFxOnForPVlGMn1J9VA+HnKHO+mzPgjd8gTlkIfbpyMVzsN4DlTH0cHfsfJF31/gNfC/+5xkFtc5mK54DKeUNo++6y4I3Zeqv/GO0VmT1qdhR8eOvAwBEwSap//8dEdHPidMySzhAAAA="
                            alt=""
                        />
                        <p>
                            Lorem Ipsum is simply dummy text of the and
                            typesetting industry. Lorem Ipsum is dummy text of
                            the printing.
                        </p>
                        <div className="flex gap-4 items-center">
                            <IoLocationOutline />
                            Brooklyn, New York, United States
                        </div>
                        <div className="flex gap-4 items-center">
                            <FiPhoneCall />
                            +0123-456789
                        </div>
                        <div className="flex gap-4 items-center">
                            <CiMail />
                            example@example.com
                        </div>
                        <div className="flex gap-2">
                            <FaFacebookF />
                            <FaTiktok />
                            <BsInstagram />
                            <BsTwitterX />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:w-2/12">
                        <p className="font-bold">Company</p>
                        <Link href="/About" className="hover:text-green-600">
                            About
                        </Link>
                        <Link href="/News" className="hover:text-green-600">
                            Blog
                        </Link>
                        <Link href="/Shop" className="hover:text-green-600">
                            AllProducts
                        </Link>
                        <Link
                            href="/Google_Map"
                            className="hover:text-green-600"
                        >
                            Location Map
                        </Link>
                        <Link href="/FAQ" className="hover:text-green-600">
                            FAQ
                        </Link>
                        <Link href="/Contact" className="hover:text-green-600">
                            Contact us
                        </Link>
                    </div>
                    <div className="flex flex-col gap-5 md:w-2/12">
                        <p className="font-bold">Services</p>
                        <Link
                            href="/Order_Tracking"
                            className="hover:text-green-600"
                        >
                            Order tracking
                        </Link>
                        <Link href="/" className="hover:text-green-600">
                            Wish List
                        </Link>
                        <Link href="/" className="hover:text-green-600">
                            Login
                        </Link>
                        <Link href="/" className="hover:text-green-600">
                            My Account
                        </Link>
                        <Link href="/About" className="hover:text-green-600">
                            Terms & Conditions
                        </Link>
                        <Link href="/Shop" className="hover:text-green-600">
                            Promotional Offers
                        </Link>
                    </div>
                    <div className="flex flex-col gap-5 md:w-2/12">
                        <p className="font-bold">Customer Care</p>
                        <Link href="/" className="hover:text-green-600">
                            Wishlist
                        </Link>
                        <Link href="/" className="hover:text-green-600">
                            Login
                        </Link>
                        <Link href="/" className="hover:text-green-600">
                            My Account
                        </Link>
                        <Link href="/" className="hover:text-green-600">
                            Order tracking
                        </Link>
                        <Link href="/FAQ" className="hover:text-green-600">
                            FAQ
                        </Link>
                        <Link href="/Contact" className="hover:text-green-600">
                            Contact us
                        </Link>
                    </div>
                    <div className="flex flex-col gap-5 md:w-2/12">
                        <p className="font-bold">Newsletter</p>
                        <p>
                            Subscribe to our weekly Newsletter and receive
                            updates via email.
                        </p>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Email*"
                                className="border-2 border-gray-50 outline-0 p-4 focus:border-green-600"
                            />
                            <button className="p-4 text-white bg-green-600">
                                <FaLocationArrow />
                            </button>
                        </div>
                        <p className="font-bold">We Accept</p>
                        <img
                            src="data:image/webp;base64,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"
                            alt="visa image"
                        />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col justify-around bg-black p-8">
                    <p className="text-white">
                        All Rights Reserved @ Company 2025
                    </p>
                    <div className="flex gap-4 md:flex-row flex-col">
                        <a href="#" className="hover:text-green-500 text-white">
                            Terms & Conditions
                        </a>
                        <a href="#" className="hover:text-green-500 text-white">
                            Claim
                        </a>
                        <a href="#" className="hover:text-green-500 text-white">
                            Privacy & Policy
                        </a>
                    </div>
                </div>
            </footer>
            <Link href={"/tag"}>تجربه</Link>
        </main>
    );
}
