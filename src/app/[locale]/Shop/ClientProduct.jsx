"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaStar, FaEye, FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../lib/redux/addShoppingCart";
import { addWhish } from "../../../lib/redux/wishlist";

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
    const dispatch = useDispatch();
    const totalStars = 5;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/gettingProducts");
                const data = await response.json();
                setProducts(data);
                if (data.length > 0) {
                    setActiveTap(data[0]?.category || "");
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <section className="">
                <div className="flex justify-center items-center gap-5 flex-wrap">
                    <Skeleton className="h-80 w-80" />
                    <Skeleton className="h-80 w-80" />
                    <Skeleton className="h-80 w-80" />
                    <Skeleton className="h-80 w-80" />
                    <Skeleton className="h-80 w-80" />
                    <Skeleton className="h-80 w-80" />
                    <Skeleton className="h-80 w-80" />
                    <Skeleton className="h-80 w-80" />
                </div>
            </section>
        );
    }

    return (
        <section className="gap-5 w-9/12 flex md:flex-row flex-col justify-center items-center flex-wrap">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="relative lg:w-[calc(25%-1rem)] md:w-[calc(50%-1rem)] flex-col w-full shadow flex justify-center items-center"
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
                                    <DialogTitle>{product.title}</DialogTitle>
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
        </section>
    );
}
