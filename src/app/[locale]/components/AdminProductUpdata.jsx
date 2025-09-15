"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function AdminProductUpdateForm({ product }) {
  if (!product) return <p>Select a product to update</p>;

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [rate, setRate] = useState(product.rate || 0);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [stock, setStock] = useState(product.stock);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("id", product.id);

    if (title !== product.title) formData.append("title", title);
    if (price !== product.price) formData.append("price", price);
    if (rate !== product.rate) formData.append("rate", rate);
    if (category !== product.category) formData.append("category", category);
    if (description !== product.description) formData.append("description", description);
    if (stock !== product.stock) formData.append("stock", stock);
    if (isFeatured !== product.isFeatured) formData.append("isFeatured", isFeatured);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`/api/updatingProducts/${product.id}`, {
        method: "PATCH",
        body: formData,
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON response:", text);
        toast("Server returned invalid response");
        setUploading(false);
        return;
      }

      if (res.ok && data.success) {
        toast("Product updated successfully ✅");
      } else {
        toast(`Update failed  ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      toast("Something went wrong");
    }

    setUploading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-2 flex gap-5 flex-wrap"
      encType="multipart/form-data"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2"
        placeholder="Title"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded p-2"
        placeholder="Price"
      />
      <input
        type="number"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className="border rounded p-2"
        placeholder="Rate"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded p-2"
        placeholder="Category"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded p-2"
        placeholder="Description"
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="border rounded p-2"
        placeholder="Stock"
      />
      <input type="file" onChange={handleFileChange} className="border rounded p-2" />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        Featured
      </label>
      <button
        type="submit"
        disabled={uploading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {uploading ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}
