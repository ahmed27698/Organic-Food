"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

export default function AdminProductForm() {
  const t = useTranslations("addingproducts");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !category || !stock || !imageUrl) {
      toast("Please fill all required fields including the image URL");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price, rate, category, description, stock, isFeatured, imageUrl }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast(t("productSaved"));
        setTitle(""); setPrice(""); setRate(""); setCategory("");
        setDescription(""); setStock(""); setIsFeatured(false); setImageUrl("");
      } else {
        toast(`${t("productSaveFailed")}: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      toast(t("somethingWentWrong"));
      console.error(err);
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-1 flex gap-4 flex-wrap overflow-y-auto max-h-[480px]">

      <div className="w-full">
        <label className="block mb-1 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
          Image URL
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-500 hover:text-blue-700 inline-flex items-center gap-1 normal-case font-normal"
          >
            Browse Unsplash <FiExternalLink className="text-xs" />
          </a>
        </label>
        <input
          type="url"
          placeholder="https://images.unsplash.com/photo-..."
          className="w-full border rounded p-2 text-sm"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        {imageUrl && (
          <div className="mt-2 relative w-24 h-24 rounded overflow-hidden border">
            <Image
              src={imageUrl}
              alt="preview"
              fill
              className="object-cover"
              onError={() => {}}
            />
          </div>
        )}
      </div>

      <div className="w-5/12">
        <label className="block mb-1 font-semibold">{t("productName")}</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="w-3/12">
        <label className="block mb-1 font-semibold">{t("price")}</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required min="0" step="0.01"
        />
      </div>

      <div className="w-3/12">
        <label className="block mb-1 font-semibold">{t("rate")}</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          min="0" max="5" step="0.1"
        />
      </div>

      <div className="w-3/12">
        <label className="block mb-1 font-semibold">{t("stock")}</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required min="0"
        />
      </div>

      <div className="w-5/12">
        <label className="block mb-1 font-semibold">{t("category")}</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <label className="block mb-1 font-semibold">{t("description")}</label>
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 w-full">
        <input
          type="checkbox"
          id="isFeatured"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <label htmlFor="isFeatured" className="font-semibold">{t("featured")}</label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {saving ? t("pleaseWait") : t("save")}
      </button>
    </form>
  );
}
