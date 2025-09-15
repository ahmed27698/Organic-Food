import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../../lib/prisma";
import { FaStar } from "react-icons/fa";
export default async function FeaturedProducts() {
    const products = await prisma.product.findMany({
        where: { isFeatured: true },
        orderBy: { rate: "desc" },
    });
    const limitedFeaturedProducts = products.slice(0, 8);
    const totalStars = 5;
    return (
        <div className="flex flex-wrap gap-5 mt-10">
            {limitedFeaturedProducts.map((product) => (
                <div
                    key={product.id}
                    className="relative lg:w-[calc(25%-1rem)] md:w-[calc(50%-1rem)] w-full shadow flex flex-col justify-center items-center"
                >
                    <span
                        className={`absolute top-0 right-0 p-3 rounded-br-2xl rounded-tl-2xl flex justify-center items-center ${
                            product.stock <= 150
                                ? "bg-red-600"
                                : product.stock < 250
                                ? "bg-amber-600"
                                : "bg-green-600"
                        }`}
                    >
                        {product.stock <= 150
                            ? "Out Of Stock"
                            : product.stock < 250
                            ? "Low Stock"
                            : "In Stock"}
                    </span>

                    <Link
                        href={`products/${product.id}`}
                        className="flex justify-center items-center py-5 flex-col"
                    >
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
                </div>
            ))}
        </div>
    );
}
