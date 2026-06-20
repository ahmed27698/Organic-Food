"use client";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

export default function AdminProductUpdateForm({ product }) {
  if (!product) return <p>Select a product to update</p>;

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [rate, setRate] = useState(product.rate || 0);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [stock, setStock] = useState(product.stock);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);
  const [imageUrl, setImageUrl] = useState(product.image || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const body = {};
    if (title !== product.title)           body.title       = title;
    if (price !== product.price)           body.price       = price;
    if (rate !== product.rate)             body.rate        = rate;
    if (category !== product.category)     body.category    = category;
    if (description !== product.description) body.description = description;
    if (stock !== product.stock)           body.stock       = stock;
    if (isFeatured !== product.isFeatured) body.isFeatured  = isFeatured;
    if (imageUrl && imageUrl !== product.image) body.imageUrl = imageUrl;

    try {
      const res = await fetch(`/api/updatingProducts/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast("Product updated successfully ✅");
      } else {
        toast(`Update failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      toast("Something went wrong");
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex gap-4 flex-wrap overflow-y-auto max-h-[480px]">

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

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 flex-1 min-w-[140px]"
        placeholder="Title"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded p-2 w-28"
        placeholder="Price"
      />
      <input
        type="number"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className="border rounded p-2 w-24"
        placeholder="Rate"
        min="0" max="5" step="0.1"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded p-2 flex-1 min-w-[140px]"
        placeholder="Category"
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="border rounded p-2 w-28"
        placeholder="Stock"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded p-2 w-full"
        rows={3}
        placeholder="Description"
      />
      <label className="flex items-center gap-2 w-full">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        Featured
      </label>

      <button
        type="submit"
        disabled={saving}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {saving ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}
