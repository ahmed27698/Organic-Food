"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaStar, FaEye, FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../lib/redux/addShoppingCart";
import { addWhish } from "../../../lib/redux/wishlist";

import {useTranslations} from "next-intl";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddingPageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTap, setActiveTap] = useState("");
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [ratingFilter, setRatingFilter] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const dispatch = useDispatch();
    const totalStars = 5;

    const t = useTranslations("shop");
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/gettingProducts");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = Array.from(
        new Set(products.map((product) => product.category))
    );

    if (loading) {
        return (
            <section className="flex gap-5 w-full">
                <div className="w-1/4 flex flex-col gap-5 p-4 rounded">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <div className="gap-5 w-3/4 grid grid-cols-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton key={i} className="h-80 w-full rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    const filteredProducts = products.filter((product) => {
        const inCategory = activeTap ? product.category === activeTap : true;
        const inPrice =
            (minPrice === "" || product.price >= Number(minPrice)) &&
            (maxPrice === "" || product.price <= Number(maxPrice));
        const inRating = ratingFilter === 0 || product.rate >= ratingFilter;
        return inCategory && inPrice && inRating;
    });

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleCategoryClick = (cat) => {
        setActiveTap((prev) => (prev === cat ? "" : cat));
        setCurrentPage(1);
    };
    
    return (
        <section className="flex gap-5 w-full">
            <div className="w-1/4 flex flex-col gap-5 p-4 rounded">
                <h2 className="font-semibold text-lg">{t("Categories")}</h2>
                <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`px-3 py-2 cursor-pointer rounded-full border text-left ${
                                activeTap === cat
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-black"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <h2 className="font-semibold text-lg mt-4">{t("PriceFilter")}</h2>
                <div className="flex flex-col gap-2">
                    <input
                        type="number"
                        placeholder={t("MinPrice")}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                    <input
                        type="number"
                        placeholder={t("MaxPrice")}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </div>

                <h2 className="font-semibold text-lg mt-4">{t("RatingFilter")}</h2>
                <div className="flex flex-col gap-2">
                    <select
                        value={ratingFilter}
                        onChange={(e) =>
                            setRatingFilter(Number(e.target.value))
                        }
                        className="border px-2 py-1 rounded"
                    >
                        <option value={0}>{t("AllRatings")}</option>
                        <option value={1}>{t("oneStarUp")}</option>
                        <option value={2}>{t("twoStarsUp")}</option>
                        <option value={3}>{t("threeStarsUp")}</option>
                        <option value={4}>{t("fourStarsUp")}</option>
                        <option value={5}>{t("fiveStars")}</option>
                    </select>
                </div>
                <Image
                    src="https://broccolisite.netlify.app/assets/banner1-CZr5JFCI.webp"
                    alt="advertise"
                    height={300}
                    width={300}
                />
            </div>

            <div className="gap-5 w-3/4 flex md:flex-row flex-col justify-center items-center flex-wrap">
                {currentProducts.map((product) => (
                    <div
                        key={product.id}
                        className="relative lg:w-[calc(33.33%-1rem)] md:w-[calc(50%-1rem)] flex-col w-full shadow flex justify-center items-center"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        <Link
                            href={`/products/${product.id}`}
                            className="flex justify-center items-center py-5 flex-col"
                        >
                            <span
                                className={`absolute top-0 right-0 p-3 text-white rounded-br-2xl rounded-tl-2xl flex justify-center items-center ${
                                    product.stock <= 100
                                        ? "bg-red-600"
                                        : product.stock < 300
                                        ? "bg-amber-600"
                                        : "bg-green-600"
                                }`}
                            >
                                {product.stock <= 100
                                    ? "Out Of Stock"
                                    : product.stock < 300
                                    ? "Low Stock"
                                    : "In Stock"}
                            </span>

                            <Image
                                src={product.image}
                                alt={product.title}
                                width={500}
                                height={500}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <div className="flex flex-col items-center gap-2 mt-10 mb-5">
                                <p className="mt-2 font-semibold">
                                    {product.title}
                                </p>
                                <p>${product.price}</p>
                                <div className="flex justify-center">
                                    {Array.from({ length: totalStars }).map(
                                        (_, i) => (
                                            <span
                                                key={i}
                                                className={
                                                    i < product.rate
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            >
                                                <FaStar />
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </Link>
                        <div
                            className={`absolute z-1 bottom-0 grow flex justify-center gap-5 transition-all duration-500 ${
                                hoveredProduct === product.id
                                    ? "opacity-100 translate-y-[-290%]"
                                    : "opacity-0 translate-y-0"
                            }`}
                        >
                            <Dialog>
                                <DialogTrigger className="bg-white shadow h-12 w-12 flex justify-center items-center hover:text-white hover:bg-green-600 rounded-full">
                                    <FaEye />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            {product.title}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {product.description}
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="bg-white shadow h-12 w-12 flex justify-center items-center hover:text-white hover:bg-green-600 rounded-full"
                            >
                                <FaShoppingCart />
                            </button>
                            <button
                                onClick={() => dispatch(addWhish(product))}
                                className="bg-white shadow h-12 w-12 flex justify-center items-center hover:text-white hover:bg-green-600 rounded-full"
                            >
                                <CiHeart />
                            </button>
                        </div>
                    </div>
                ))}

                <div className="w-full flex justify-center gap-2 mt-5">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${
                                currentPage === i + 1
                                    ? "bg-green-600 text-white"
                                    : "bg-white"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
