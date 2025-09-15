"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function OfferDialog() {
    const t = useTranslations("adminoffers");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        originalPrice: "",
        discountedPrice: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/offers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: formData.title,
                description: formData.description,
                originalPrice: parseFloat(formData.originalPrice),
                discountedPrice: parseFloat(formData.discountedPrice),
            }),
        });

        if (res.ok) {
            toast(t("success"));
            setFormData({ title: "", description: "", originalPrice: "", discountedPrice: "" });
        } else {
            toast(t("error"));
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{t("addOffer")}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{t("dialogTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("dialogDescription")}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <label>{t("title")}</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            className="border rounded p-2"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>{t("description")}</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            className="border rounded p-2"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>{t("originalPrice")}</label>
                        <input
                            type="number"
                            value={formData.originalPrice}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    originalPrice: e.target.value,
                                })
                            }
                            className="border rounded p-2"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>{t("discountedPrice")}</label>
                        <input
                            type="number"
                            value={formData.discountedPrice}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    discountedPrice: e.target.value,
                                })
                            }
                            className="border rounded p-2"
                        />
                    </div>

                    <Button type="submit">{t("saveOffer")}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
