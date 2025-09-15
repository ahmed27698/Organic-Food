"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FaEye } from "react-icons/fa";

export default async function Preview({ params }) {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            id: params.id,
        },
    });
    return (
    );
}
