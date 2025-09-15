"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { FaStar } from "react-icons/fa6";

import { IoMdClose, IoMdRemoveCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import CountUp from "react-countup";

import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { clearWhishes } from "../../lib/redux/wishlist";
import {
    removeFromCart,
    decreaseQuantity,
    clearCart,
    increaseQuantity,
} from "../../lib/redux/addShoppingCart";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function ProductSlider() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchSwiperData() {
            try {
                const res = await fetch("/api/swiper");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        }
        fetchSwiperData();
    }, []);
    if (!products || products.length === 0) {
        return (
            <div className="px-20 py-26 bg-[#F7F5EB]">
                <div className="animate-pulse flex flex-col md:flex-row gap-10">
                    <div className="md:w-5/12 w-full space-y-4">
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-8 bg-gray-400 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="flex gap-4">
                            <div className="h-10 w-24 bg-gray-400 rounded"></div>
                            <div className="h-10 w-24 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                    <div className="md:w-5/12 w-full h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <Swiper
            className="lg:px-20 md:px-10 px-4 bg-[#F7F5EB]"
            modules={[Navigation, Autoplay, Pagination]}
            navigation
            speed={1000}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            rewind={true}
        >
            {products.map((product) =>
                product ? (
                    <SwiperSlide
                        key={product.id}
                        className="!flex justify-center items-center flex-col md:flex-row"
                    >
                        <div className="md:w-5/12 w-full flex flex-col gap-5">
                            <p>{product.supText}</p>
                            <p className="font-bold text-4xl">
                                {product.mainText}
                            </p>
                            {product.supParagraph && (
                                <p>{product.supParagraph}</p>
                            )}
                            <div className="flex gap-3">
                                <button className="bg-green-600 text-white p-3 rounded">
                                    {product.buttonOne}
                                </button>
                                {product.buttonTwo && (
                                    <button className="bg-white text-black p-3 rounded">
                                        {product.buttonTwo}
                                    </button>
                                )}
                            </div>
                        </div>
                        <img
                            src={product.image}
                            alt="product"
                            className="md:w-5/12 w-full"
                        />
                    </SwiperSlide>
                ) : null
            )}
        </Swiper>
    );
}

export function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    return (
        <div className=" mt-10 ">
            {cartItems.length === 0 ? (
                <div className="ml-10 font-bold text-3xl text-green-600">
                    <p>Cart is Empty</p>
                </div>
            ) : (
                cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center w-10/12 gap-4 my-5 py-10 px-5 rounded shadow mx-auto"
                    >
                        <img
                            src={item.thumbnail}
                            alt="Product"
                            className="w-2/12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold mb-2">
                                {item.title}
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    id="decreaseBtn"
                                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                    onClick={() =>
                                        dispatch(decreaseQuantity(item.id))
                                    }
                                >
                                    -
                                </button>
                                <span id="quantity" className="w-6 text-center">
                                    {item.quantity}
                                </span>
                                <button
                                    id="increaseBtn"
                                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                    onClick={() =>
                                        dispatch(increaseQuantity(item.id))
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div>
                            <p>{item.price}</p>
                        </div>
                        <div>
                            <button
                                onClick={() =>
                                    dispatch(removeFromCart(item.id))
                                }
                            >
                                <RiDeleteBin6Line />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export function WhishList() {
    const wishListItems = useSelector((state) => state.wishList.wishListItems);
    const dispatch = useDispatch();
    return (
        <div className=" mt-10 ">
            {wishListItems.length === 0 ? (
                <div className="ml-10 font-bold text-3xl text-green-600">
                    <p>Whishlist is Empty</p>
                </div>
            ) : (
                wishListItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center w-10/12 gap-4 my-5 py-10 px-5 rounded shadow mx-auto"
                    >
                        <Image
                            src={item.image}
                            alt="Product"
                            width={150}
                            height={150}
                            className=" rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold mb-2">
                                {item.title}
                            </h2>
                        </div>
                        <div>
                            <p>{item.price}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => dispatch(clearWhishes(item.id))}
                            >
                                <RiDeleteBin6Line />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export function ShoppingOffcanvas() {
    const [isOpen, setIsOpen] = useState(false);
    const openOffCanvas = () => setIsOpen(true);
    const closeOffCanvas = () => setIsOpen(false);

    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    return (
        <>
            <button
                onClick={openOffCanvas}
                className="z-50 h-10 w-10 bg-white hover:bg-green-600 hover:text-white text-xl text-black flex justify-center items-center shadow-lg"
            >
                <MdShoppingCart />
            </button>

            {isOpen && (
                <div
                    onClick={closeOffCanvas}
                    className="fixed inset-0 bg-black opacity-50 z-40"
                ></div>
            )}

            <div
                className={`fixed overflow-auto top-0 right-0 h-full lg:w-[35%] md:w-[50%] w-[90%] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold mb-4">Cart</h2>
                    <button onClick={closeOffCanvas} className="text-2xl">
                        <IoMdClose className="text-xl cursor-pointer" />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="p-4">
                        <p>Cart is empty</p>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <Link
                                    href={`/${item.id}`}
                                    className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center"
                                >
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-xs">
                                            No Image
                                        </span>
                                    )}
                                </Link>
                                <div>
                                    <h2 className="font-medium text-gray-800">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-700">
                                        {item.price} Egp
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <button
                                    onClick={() =>
                                        dispatch(decreaseQuantity(item.id))
                                    }
                                    className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                    aria-label="Decrease Quantity"
                                >
                                    <IoMdRemoveCircleOutline className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={() =>
                                        dispatch(removeFromCart(item.id))
                                    }
                                    className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                    aria-label="Delete Item"
                                >
                                    <RiDeleteBin6Line className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {cartItems.length > 0 && (
                    <div className="flex justify-around mt-4 p-4 border-t">
                        <button
                            className="text-white bg-red-600 px-4 py-2 rounded cursor-pointer"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear Items
                        </button>
                        <button className="text-white bg-green-600 px-4 py-2 rounded">
                            <Link className="block" href="./Cart">
                                View Cart
                            </Link>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export function CountDown() {
    const t = useTranslations("Home");
    const [days, setDays] = useState(725);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev > 0) return prev - 1;
                else {
                    setMinutes((m) => {
                        if (m > 0) return m - 1;
                        else {
                            setHours((h) => {
                                if (h > 0) return h - 1;
                                else {
                                    setDays((d) => (d > 0 ? d - 1 : 0));
                                    return 23;
                                }
                            });
                            return 59;
                        }
                    });
                    return 59;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-wrap justify-start gap-10">
            <div className="flex flex-col items-center gap-5">
                <span className="h-20 w-20 rounded-full bg-white text-black flex justify-center items-center">
                    {days}
                </span>
                <p>{t("days")}</p>
            </div>
            <div className="flex flex-col items-center gap-5">
                <span className="h-20 w-20 rounded-full bg-white text-black flex justify-center items-center">
                    {hours}
                </span>
                <p>{t("hours")}</p>
            </div>
            <div className="flex flex-col items-center gap-5">
                <span className="h-20 w-20 rounded-full bg-white text-black flex justify-center items-center">
                    {minutes}
                </span>
                <p>{t("minutes")}</p>
            </div>
            <div className="flex flex-col items-center gap-5">
                <span className="h-20 w-20 rounded-full bg-white text-black flex justify-center items-center">
                    {seconds}
                </span>
                <p>{t("seconds")}</p>
            </div>
        </div>
    );
}

export function Count_Up() {
    const t = useTranslations("Home");
    return (
        <div className="bg-transparent flex flex-col md:flex-row justify-around gap-5">
            <div className="flex flex-col items-center gap-7">
                <img
                    loading="lazy"
                    src="data:image/webp;base64,UklGRgYFAABXRUJQVlA4WAoAAAAQAAAAQQAARAAAQUxQSJQCAAABkCNtexwpilnFDpF9BGdEFDoB3RnhOCLFxQVmj1lDqqwTsOd2SNa+wSw4t27wVbV//b9+iQNEhARHkhRJ8ohULV82JNwXDNGm3wG7fmP2EjPJJHeBSEOTkkkWWrBqUzLJQAdBbUImWzUNyc47Y5ynbsVMllrLsCfEtz2Q62UzaQIArz2jNNlEhUwcACiPD3uOjOEcBSO/p9MxipfWxsEfP3QACOI7FRo5s1HNaCS3RmaRyJFXCgPV4eFBk/plHQ6Slt4l/ZoOjwRdHCSUQpPv5Opc/HRRuFkA/HBU7dGHMcR1Lh47q4ogPJ+tp+65VFrq1EjrCfUo+0O67S65L7kg2lNnDGOaS5KS7JTQdBQ7kQcvuleG/CcCgMHoHIVCW/HhHkF0T0Lf0S44FlAL8cPosAGAi2kR6YiNyRqljvi78wNAN5E3QwjtAWDhP7c2RP4QhV4T96mjHbKhbnMFnYhH3HeO2CEDXGpCagYj9yy24pzKo7iC6A130pzKB7juFiXrong+z/OflVfzPH9deTPP87nEpUAtzakXAP6uvAbwbeUdgC8SI4fwVjuTDzAcERjlJUQkjZqqqp6t3Kiq6tHKnaqq7kvFwP0hp1tOtI3Fs5VVAg+gZSurKcDCvjofynzqAEzCuKuzMwhb1Vji2AIIVhrsTV7sBQAvD36ble/k5OfOegw56ZCwW3bENhtvwSyGCVM7Ez3tn2kjGMtBlhdwiNtforHbaKl7TQO2Pl4TN03yq/Py/QWIpuTMusBueavi/EgSCxh5q7g14tK5RIagS6e8vT5ITmBsM9TJ1o+8eS5/dBkLv3bOddSUyTWmhFpq5r8mJU0pbEJhEwqbUNIxRR1R1pTCJpT2SnHvKe//AFOnYgBWUDggTAIAABASAJ0BKkIARQA+eTSTR6SjIaE3Gq2wkA8JbADL2AVLj8ByqG1UONET+39Bv9y5wr9XP6h1APQP+rv7Ae+B6FvQA/VrrAPQA/Yj0lvYc/cT9u/aP///WAdT/wg/AD9APy77/BgEudATBGrtWmMgqfHqieBeHCVQuZpKKKL++zQwwaF30G8pgPDjVt/hk1X5chdsMO0LlPJHAAD8pXleUv/87hHK8Srry/zE784ayn89wvUK7NFAfFSTu0+hOvYGh4vhyQLanziQk+t7CtcdyFiPq/Aj9oe3YHIqepOl02pTkO1ZPBe6cAsAGpzzEG8uGPoNnUYjoGw/yf+8XpnPttQafvkA9Eq3/xHpxm0NiLd41LUBtd/nDK8pVN5K6boNuKY6aUYvk4c2jYg4Eq0+8bLQE9r2n/+0+//5zH/84h//5uWnGaf42WgSOMFVgwPdqYJMDoqNl5rTJHFhjP6uguyyqH/UJcAhkUdTElCCWfaXXQf3NvRDU4HJU6JU9Fr7RWP3k8kg4mCSJjAcLL87bdAzA7XcnLDr0I3P2/OR+m/lIHe27l7yB56uNhIYbJSD2eyTC8La9TsZjaAdH7xdtKR0aiSWlolQGcz/IJ3JzzyEP6/P/Rh3//6atUq07NSKQjWz7pv7vOQBiP8bCAmlMU55o2xTx240KKKHgyuqYqExWqAn++ke/lVFRXNgNI9/+3WTxSnX5U6c6JhyRaxYFD1kP/DOJfRVYBC92PYbXKE4A5wACSdgJ71kqxIT9ryzrrjn9cS1dPkAAAAAAA=="
                    alt="image"
                />
                <p className="text-white text-5xl font-bold">
                    <CountUp
                        end={733}
                        duration={5}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                    />
                    +
                </p>
                <p className="text-white text-2xl font-bold">
                    {t("activeClients")}
                </p>
            </div>
            <div className="flex flex-col items-center gap-7">
                <img
                    loading="lazy"
                    src="data:image/webp;base64,UklGRmQEAABXRUJQVlA4WAoAAAAQAAAANgAAPQAAQUxQSJECAAABkFVbexBXn4RfQiTEQXFQHBQHFwfgoOMAHAwOwAE4AAeJg/OQEAa67ntETIA+71dm0x+cgPYvLED/99yXe9xXt5LOz/rZOa8e5FdKH7SSjcvrYdmllqpEj4q1JI3A8ajoJckDtI/ykmQrEO1JvSTZCtDqSSap2gFGPWmR/cykmz1qX8mPpkedHrUeXHA0enQSl7F1ur+b53nuflxBr8v23b3neR6sqOV0//lUNXM6FfVnEJpP+J3C5VKMGXivlzpOj0s1gKxZkmzRQHq0TgswFfmkklRtHxgAYiPJAtAWaQNmpeOlGmAzSeoBXFkLUCeaLlgADpMkF4BJFw8g+MSOsgbAS5KtAO5KBRD+SVJbtgKTJFU7QKvLDen8LVkZQC35gXSUJP/19eXO1ETSMHR7iU+6353sS5JeZOfOZeS35PSkTk5jrZTCoUqk5rhUhZLgdAm6jFS9jqKG8tAUjP2UYbVM6raTgXzfbwkMyZJI1keA1c60ZGzmtJbcmDBI6oFgkmwCmK/4FSAewCxJ/gDoJQfQKx0B2rJ3ANisAagkyTYAL00AVaINCFaUHU0Wgd0kyUVgllwEQpU4gOZSL0k1wOokqQFwUk36a5ImYLoQG2VHgPBPkkWgldQkhOFbLbCXRa/TkXTvvCZgkqQqkg8ARZupsE3SACyJbMxlm5JexdWSS3PuXcTvp6RqPBuTOpA/MrztU5JV/bgsy2iSGtL48mpzrO5jxQ1pb5LmE4K/zwUgVpLkANqRtLntDeCVrkCU+oRwkwPolQ4AraQmkr/jBUSTZDPAotTH+xbgJVkXADbLyG23Aby7mexmOrXpCecvFW+PmZzKl5tembi0Tlfvkq+qyumTt33+f+Mjm/2FuwEAVlA4IKwBAAAQCwCdASo3AD4APpE+mEglo6KhMfOZILASCWwAwRXaWd+AYF58kY9xm37H8O9AH6ifrB7Gfqg9AD+n9Qh6AHmm/5b9zPgX/cT0cAv130FR4OSogGDCH8FknBy2OmhbvskAAP79tOqA6Eb/n/s7MD5OO//l+5/meOvMUi3Zv1FWwyDfxQCZ1lKRDUdQ5bi1Zsnx6Wqf/hB3DjBfzxwtxSvd+7l7006vf7nRB5GzxR/uMPrVEPR26BsC9y7reOK6OfNNp9KANHS0qZmx/yI6LbCtGtDkEaDbdCoCrESf8l3ewGWT7l8YWswC6k0WH8/0svgVTEwzUs/yPTiQ/oCaAAoGOnLO87IPX8O1Fc3ugxqhz/6uf/MBGbktUi1XevLIS+UCEFJGK+evysBOk9TpaB8C17w/j8Bnedtgi7J0Y5LOlzKkIo+luN5tW/8n6ApAhdebt94GpJU7+/8uTqoXbmuCxN4pv/mi+KLQeUTmTgQ+jACIv/M9lXxUsFq9OgVQV/+sHvYKgH6BnCh7nqq8+rL7+yfwgH4WLoI9j/oLQUHm3WvX/zBCVIdAYPQAAA=="
                    alt="image"
                />
                <p className="text-white text-5xl font-bold">
                    <CountUp
                        scrollSpyOnce={true}
                        enableScrollSpy={true}
                        end={33}
                        duration={5}
                    />
                    +
                </p>
                <p className="text-white text-2xl font-bold">
                    {t("cupOfCoffee")}
                </p>
            </div>
            <div className="flex flex-col items-center gap-7">
                <img
                    loading="lazy"
                    src="data:image/webp;base64,UklGRooFAABXRUJQVlA4WAoAAAAQAAAAQQAAQAAAQUxQSAYDAAABkFXbdtZqW0IkREIcNA4uDoqD1gFxUBwUB60DcAAOqIPEwXpICJT7/bxGxASofOleYwTGsfux+pUv6uerOZ9nd+zM2e77IN5ONgCDN5Lxbb8UYLSnmoBW2zakjOjO5iskExJAbE+07pLsRO4q7M9jHFfWcXxc7RGfA6Qhi65gbiv1a2d3TYeoBZiNZJ8cOboD7vs0APSm4+inqeqB4QC9AVbKS994L+ebMJWYTc0dmLcCdKZgEpufYFRr2k+Gr3EAdgMg3jK1pdRqf7tLH+C+kchfRpI+2WC0+fN82JLNVN0D60aTMmYjqQcmle1jBdZSCyx1FqAtyYQEMBupqXBPyqUBeNdpAlZTktwCMBv5DfNicyiYCDQ7PEC/JbMA9LqXbpHyu1GxBZL2vgH8lswC4AdgMCPFz92obFZg2GUTEN2WbALWCPQr+adVZQBwu9QARLclT30KqnUAgw4cAKLf0rtqcao1M5DsERrIH1s2VQxG1SPAXccOGevVZO7FdlC1eQG8dfSQAeM4rlQOqjYzwMccpjYVdg6qbiLAx+mLZqhKWbQ1fiRfjL5r+0/p3bqMeC2Z60hxMvq+9d57SUoZxGfXdTObQaeeSvWT07nDvsnr7NnSp40lOJ3fA5Pk7yGExupXZlG/O+M/If0BZvc7LtduHGeqx/Fxu9iTuNtr5Ytj92O+Y2+vyAnnx89R7rFy7LIPiM+ffbZbqf5MofVeioCXJOOb8J4qgPjyVeZBZXrfvTYtgKptOywbwOy3msjm++5U3QJLXW6aIZXgaQot5XdrtDcAw768GVKB2UhqyVMwOtAD/hhJfsqYJROzXgf74PVF/wEI6gFa/U6zAFErEPRbLYAHcL9GE3DP/O+ZgeYNvH6NB3AtwPOX+Ags0gIw+19gHuRecol8vppzXZ6RvJcklzJgftwu5gzup3tFyr2KZioV4/jsrhd7iLlcum6cqU2Ntv1UUTvWrxyYglG17Zd9X07vVgeaJryXU6Spvzt90/kQpumgZRpC643Oa30xNL6oLwJWUDggXgIAAFARAJ0BKkIAQQA+iTqYR6UjoqErlx54oBEJbAC816sJz8h+LnRI8G+G+fMPr2S/svQ//Xfal4p/Tj8w/6cfrX7+HoN9AD+e/4DrAPQA8rv2HP25/bn2r///rR/h3+QfgB9fvf4RPT6EkFNBunCxkr116aEB98BbaRXgWiApoWYC6YDyhmDCigP6ttd+WhT/tom13AD+21H/9zJkebNjEO0kpsLmTirkex29zEABYi7vh/rzhxfY+Se35vAWdUKO59ImBcrYvaSrxnruIdOzJfAVMkS186xrSavSWDflyXxMRIaAcA+b+f9JcL6RInQ+154/eqPBnoePFDqCAWu1mE+fZljCtFj/5RzCBt0Shl0unwJCVEimKWqBPCHjAzxjKi907gS0SK1dROIkM1cxlCXJOvWId6fYIfw3nl1q1DkOKFVUjL8mToCZobjMZ2sU7Ws67kMUrAcX11L6ZVHKusQLasq8Eh6G7ZHQ5Po5SoG+H//sDoIDs2lDPi0Od070efphp/fUFIevMMror+MgV9HsotBipFMDetU66g0OqwvlwFHtnITtJDvi/G2Zw8ITI3Bfz5uv39qyf//mZFF/9rcFz2Myv5dIEPiv2RwLzmQG4cviCI25wb+dY53GdDsW1Wv/PIjk5N7XiqE7qgdugE6YP98qL0vn8jaNpoVxRtnAnbGUPTDQH35o8Q+sk3qjFQz5th4RELURUGj//eD35IrmAlJ2I8k1X3FzdkHmVuwwaxndCHNw3hzEr6Ca2Wur/9iy1ojMSaOgtJK/0qAnqGz0iF5L3NtCBEcvRAAAAA=="
                    alt="image"
                />
                <p className="text-white text-5xl font-bold">
                    <CountUp
                        scrollSpyOnce={true}
                        enableScrollSpy={true}
                        end={100}
                        duration={5}
                    />
                    +
                </p>
                <p className="text-white text-2xl font-bold">
                    {t("getRewards")}
                </p>
            </div>
            <div className="flex flex-col items-center gap-7">
                <img
                    loading="lazy"
                    src="data:image/webp;base64,UklGRnwEAABXRUJQVlA4WAoAAAAQAAAARgAARQAAQUxQSFACAAABkFZtWxVdRCCCEWjw0WDTYGwwNhgabBuMDbQBNJAG2gAavGsh78vh3Ye/EeFAkqSE2YXaiyMnkCeIfsr3HiHuL8FMc0HJS7FiBoozpw0kIp8pi1cPPRkPmY7vOWoNV8hkk+Ox0RjuDMuFUG4oIQcXIEMj2AzPBZ+xIGwZ63CQQ46ygGL1WA2Zp3pGcGUkKfgeFoY7AYpP8vn9DRSD4IONdBC+2ewdavwy9RMKeGutR43tWyFZWc5lLdrClZxuRXldgsxpPO7HpnOJerDxqKn5C2RKjtdDda8Tx8uhaajb85AlOVWxAIDnwK+fGt8saONfjNSMYzSUb+QhxX+e6r2783T7a2LF6wKCTvcO8QSIX9X2jhMqdFMHpOs4cM1QZzQ9uR3TVPGFAsFqrc0aoOBv2YidnGJbBfLERugAdV67JmcatFhIUZ/PR8kToJ7cVmihk7gnhSq6rftE0tUcnpoa0fEZztJWvXaginY3NL1SY1TFQBRtQZADKkwAgKvsxOn2piqyH3ZwMsTby98ph5sIn3jaNeqsRc10QanPEiVYDxK5011D8RyqeZsQXSK/jmLFlhGd0sfIATRpn3Z4DGPEN8CKAhbXhEFiKFSCVGPXHCaTpjnh8UYUJhVhOHSfeJAVIc/xg7ACOo80yTTw2G1wzDKLwm9iFhXx7vGKiYDuUazycoC/oVs+HdxdBKJ3ygDiheqVIQjP3Ztd0tZUeVsj+rDt1FoU7BQc6przAlnK5NDNhvkfjC/yIk6icoqu1pxCu9EfIPcsuDlji79tbJYAVlA4IAYCAABQDQCdASpHAEYAPoU6lUelI6IhNHgMcKAQiWwIcAGNd0KND2L8ivZour9k4Ig1XXr+d2kDcAfqT+wHvQei30AP1p6wD0APKt/cn4Ff3J/cL2quoAC6h18/4C5AKcpn/KIFVdCt4bKCVVCYAD8R4qUMh7vwAP7Vy/ToZP9+VHug0bcveJ5xyoLot2aLj8F391Xjl30w11NCqL49+rZi8t1n6/5FVbTe+TvfqH1kyZXhdEmXyHNJfc9Xm67w1e+Kf/Z1+ROmc3J/JUOeLihmrePwJaBKC4fdSx0C1CUSCcTHB5xcshvVuSv6HuHVD8USadOXHhiVWjtmmxUgs3Y32yK3WF/QqwFDwwJ1DvNG3BQtNg5+s8BD0k97y1Ftv8Nyo0TZPke/05ar//O6ob8biKbn5dihRQkNBZNjZ/h6bGkd2+33hUsF/FMg3yvVhCcRQcwBs5E5yp3rBv/YAScaQQ2pBTsXeO1UtMqGE02R2bMu0NXA47th7b3T4tq1orvnyv+EOxH5QdLbyQFqm9YJ/dRrgdG1Evl1bMhQm75NSrmZBjvDWWmS70SX/79A/8o0ODOkeTbATgCz/JGJXhzui7nyHf56Xzb45Uy//+YmV7i//rI7OxfD20I///Mv7qXEAHo9p++DgPURLRO/5eH//mJH5N6akf4cvEjbg5q/OC0y3iQgAAAAAA=="
                    alt="image"
                />
                <p className="text-white text-5xl font-bold">
                    <CountUp
                        scrollSpyOnce={true}
                        enableScrollSpy={true}
                        end={21}
                        duration={5}
                    />
                    +
                </p>
                <p className="text-white text-2xl font-bold">
                    {t("countryCover")}
                </p>
            </div>
        </div>
    );
}

export function FeaturedProducts() {
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const fetchingCategories = async function () {
            const res = await fetch(
                "https://dummyjson.com/products?limit=8&skip=100"
            );
            const data = await res.json();
            setAllData(data.products);
        };
        fetchingCategories();
    }, []);
    const totalStars = 5;

    return (
        <div className="flex flex-wrap justify-center items-center gap-5 lg:px-16 md:px-10 px-4 pt-10 relative">
            {allData.map((item) => (
                <div
                    className="border-1 border-gray-100 flex flex-col justify-between lg:w-72 md:w-5/12 w-full p-5"
                    key={item.id}
                >
                    <span
                        className={`absolute p-3 rounded-br-2xl rounded-tl-2xl flex justify-center items-center ${
                            item.stock <= 0
                                ? "bg-red-600"
                                : item.stock < 2
                                ? "bg-amber-600"
                                : "bg-green-600"
                        }`}
                    >
                        {item.stock <= 0
                            ? "Out Of Stock"
                            : item.stock < 2
                            ? "Low Stock"
                            : "In Stock"}
                    </span>
                    <img src={item.thumbnail} alt="image" />
                    <div className="flex justify-center">
                        {Array.from({ length: totalStars }).map((_, i) => (
                            <span
                                key={i}
                                className={
                                    i < item.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }
                            >
                                <FaStar />
                            </span>
                        ))}
                    </div>
                    <p>{item.title}</p>
                    <div className="flex justify-center gap-10 ">
                        <p className="text-green-600 font-semibold text-xl">
                            $ {item.price}
                        </p>
                        <del className="text-green-300 font-semibold text-xl">
                            ${" "}
                            {Math.floor(
                                item.price -
                                    (item.price * item.discountPercentage) / 100
                            )}
                        </del>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function Blogs() {
    const t = useTranslations('blogsSlider.blogs');
    
    const blogCount = t('blogCount');
    const blogs = [];

    for (let i = 1; i <= blogCount; i++) {
        const blogKey = 'blog' + i;
        blogs.push({
            id: t(blogKey + '.id'),
            image: t(blogKey + '.image'),
            subText: t(blogKey + '.subText'),
            mainText: t(blogKey + '.mainText'),
            date: t(blogKey + '.date'),
            readMore: t(blogKey + '.readMore')
        });
    }

    return (
        <div className="lg:px-20 md:px-10 px-4">
            <h2 className="font-bold text-4xl text-black text-center py-8">
                Latest Blog
            </h2>
            <Swiper
                className="flex gap-10"
                modules={[Autoplay, Navigation]}
                speed={1000}
                spaceBetween={20}
                autoplay={{ delay: 5000 }}
                rewind={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {blogs.map((blog) => (
                    <SwiperSlide key={blog.id} className="flex flex-col group ">
                        <div className="overflow-hidden">
                            <Image
                                src={blog.image}
                                width={500}
                                height={500}
                                alt={`image slide ${blog.id}`}
                                className="group-hover:scale-110"
                            />
                        </div>
                        <p className="text-gray-600">{blog.subText}</p>
                        <p className="hover:text-green-600 text-2xl font-bold">
                            {blog.mainText}
                        </p>
                        <div className="flex justify-between">
                            <p>{blog.date}</p>
                            <p className="text-green-600 ">{blog.readMore}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const text = await res.text();

            if (!text) {
                toast("failed to login");
                setIsLoading(false);
                return;
            }

            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                toast("failed to login");
                setIsLoading(false);
                return;
            }

            if (!res.ok) {
                toast("failed to login");
                setIsLoading(false);
                return;
            }

            toast(data.message);

            if (data.user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold text-green-600 text-center">
                    Sign In
                </h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg flex justify-center items-center gap-2 ${
                        isLoading ? "cursor-not-allowed opacity-70" : ""
                    }`}
                >
                    {isLoading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    ) : null}
                    Login
                </button>
                <p>
                    Don't Have An Account ?{" "}
                    <Link className="text-green-600 " href="/Register">
                        Sign Up Here
                    </Link>
                </p>
            </form>
        </div>
    );
}

export function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Server error:", errorText);
                toast("user already exist");
                return;
            }

            const data = await res.json();
        } catch (err) {
            console.error("Fetch error:", err);
            toast("Something went wrong while sending request.");
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center py-20 justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
                    Create Account
                </h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-green-600 font-semibold mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-green-200 rounded-lg"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-green-600 font-semibold mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-green-200 rounded-lg"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-green-600 font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-green-200 rounded-lg"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-green-600 font-semibold mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 border border-green-200 rounded-lg"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-green-600 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
export function ProgressExperts() {
    const containerRef = useRef(null);

    useEffect(() => {
        const progressContainer = containerRef.current;
        const progressBars =
            progressContainer.querySelectorAll("[data-target]");

        function handleScroll() {
            const rect = progressContainer.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;

            progressBars.forEach((bar) => {
                const target = bar.getAttribute("data-target");
                if (inView) {
                    bar.style.width = target + "%";
                } else {
                    bar.style.width = "0%";
                }
            });
        }

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("load", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("load", handleScroll);
        };
    }, []);

    return (
        <div ref={containerRef} className="space-y-6 mt-[50px]">
            <div>
                <p className="mb-1">Gardening</p>
                <div className="w-full bg-gray-300 h-4 rounded">
                    <div
                        className="h-4 bg-blue-500 rounded transition-all duration-700 ease-in-out"
                        data-target="72"
                    ></div>
                </div>
            </div>
            <div>
                <p className="mb-1">Landscaping</p>
                <div className="w-full bg-gray-300 h-4 rounded">
                    <div
                        className="h-4 bg-green-500 rounded transition-all duration-700 ease-in-out"
                        data-target="74"
                    ></div>
                </div>
            </div>
            <div>
                <p className="mb-1">Vegetable Growing</p>
                <div className="w-full bg-gray-300 h-4 rounded">
                    <div
                        className="h-4 bg-yellow-500 rounded transition-all duration-700 ease-in-out"
                        data-target="82"
                    ></div>
                </div>
            </div>
        </div>
    );
}

export function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [FAQData, setFAQData] = useState([]);

    useEffect(() => {
        async function fetchFAQData() {
            const res = await fetch("/api/FAQ");
            const data = await res.json();
            setFAQData(data);
        }
        fetchFAQData();
    }, []);

    const toggleQuestion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="lg:px-20 md:px-10 px-4 my-10">
            {FAQData.map((item, index) => (
                <div key={item.question} className="mb-4 shadow">
                    <div
                        onClick={() => toggleQuestion(index)}
                        className="w-full flex justify-between items-center px-4 py-2 font-medium bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    >
                        <span>{item.question}</span>
                        <span className="text-xl">
                            {activeIndex === index ? "−" : "+"}
                        </span>
                    </div>

                    {activeIndex === index && (
                        <div className="px-4 py-2 bg-white text-gray-700">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export function Tabs() {
    const [tab, setTab] = useState("2000");
    const years = ["1900", "1950", "2000", "2010", "2024"];
    return (
        <div className="my-16 lg:px-24 md:px-14 px-4">
            <div className="mb-10 flex flex-wrap justify-center gap-10">
                {years.map((year) => (
                    <button
                        key={year}
                        className={`p-4 ${
                            tab === year ? "bg-green-600" : "bg-white"
                        }`}
                        onClick={() => setTab(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>
            <div>
                {tab === "1900" && (
                    <div className="flex md:flex-row flex-col gap-15">
                        <div className="relative flex grow">
                            <img
                                src="https://broccolisite.netlify.app/assets/his1-Bv3slxLm.webp"
                                alt="image"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <p>// Our History</p>
                            <p>Started Journey</p>
                            <p className='after:content-[""] after:h-12 after:w-1 after:bg-green-600 after:absolute after:left-0 after:top-0  relative px-5 my-10'>
                                In 1900, we started our journey with a vision to
                                provide quality organic products.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipis
                                icing elit, sed do eius mod tempor incididunt ut
                                labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                )}
                {tab === "1950" && (
                    <div className="flex md:flex-row flex-col gap-15">
                        <div className="relative flex grow">
                            <img
                                src="https://broccolisite.netlify.app/assets/his2-DS67SOog.webp"
                                alt="image"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <p>// Get rewards</p>
                            <p>Get Rewards</p>
                            <p className='after:content-[""] after:h-12 after:w-1 after:bg-green-600 after:absolute after:left-0 after:top-0  relative px-5 my-10'>
                                In 1950, we received prestigious awards for our
                                excellence in organic farming.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipis
                                icing elit, sed do eius mod tempor incididunt ut
                                labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                )}
                {tab === "2000" && (
                    <div className="flex md:flex-row flex-col gap-15">
                        <div className="relative flex grow">
                            <img
                                src="https://broccolisite.netlify.app/assets/his3-D4Vo1GKj.webp"
                                alt="image"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <p>// Get rewards</p>
                            <p>Top Winner</p>
                            <p className='after:content-[""] after:h-12 after:w-1 after:bg-green-600 after:absolute after:left-0 after:top-0  relative px-5 my-10'>
                                By 2000, we were recognized as the top organic
                                food provider globally.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipis
                                icing elit, sed do eius mod tempor incididunt ut
                                labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                )}
                {tab === "2010" && (
                    <div className="flex md:flex-row flex-col gap-15">
                        <div className="relative flex grow">
                            <img
                                src="https://broccolisite.netlify.app/assets/his1-Bv3slxLm.webp"
                                alt="image"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <p>// Get rewards</p>
                            <p>Get Title</p>
                            <p className='after:content-[""] after:h-12 after:w-1 after:bg-green-600 after:absolute after:left-0 after:top-0  relative px-5 my-10'>
                                In 2010, we earned the title of the most trusted
                                organic food store.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipis
                                icing elit, sed do eius mod tempor incididunt ut
                                labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                )}
                {tab === "2024" && (
                    <div className="flex md:flex-row flex-col gap-15">
                        <div className="relative flex grow">
                            <img
                                src="https://broccolisite.netlify.app/assets/his2-DS67SOog.webp"
                                alt="image"
                            />
                        </div>
                        <div className="flex flex-col">
                            <p>// Get rewards</p>
                            <p>Number 1</p>
                            <p className='after:content-[""] after:h-12 after:w-1 after:bg-green-600 after:absolute after:left-0 after:top-0  relative px-5 my-10'>
                                In 2024, we became the number one choice for
                                organic food worldwide.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipis
                                icing elit, sed do eius mod tempor incididunt ut
                                labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
