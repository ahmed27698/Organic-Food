"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function SearchButton() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/gettingProducts");
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setProducts([]);
            }
        };
        fetchProducts();
    }, []);

    const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild className="h-10 w-10 shadow-lg bg-white p-3 hover:bg-green-600 hover:text-white  text-black flex justify-center items-center cursor-pointer">
                    <FaSearch className="inline-block"/>
                </PopoverTrigger>
                <PopoverContent className="w-72 h-52 overflow-auto">
                    <Input
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="mt-2 min-h-60 overflow-y-auto">
                        {filtered.length > 0 ? (
                            filtered.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/products/${p.id}`}
                                    className="p-2 hover:bg-gray-100 block rounded cursor-pointer"
                                >
                                    <div className="flex justify-between items-center">
                                        <Image
                                            src={p.image}
                                            alt={p.title}
                                            width={50}
                                            height={50}
                                            className="h-15 object-cover w-15"
                                        />
                                        {p.title}
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 mt-2">
                                No products found
                            </p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
