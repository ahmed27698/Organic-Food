"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function AdminProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !category || !stock || !image) {
      toast("Please fill all required fields");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("rate", rate || 0);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("isFeatured", isFeatured);
    formData.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        toast("Product saved successfully!");
        // Reset form
        setTitle("");
        setPrice("");
        setRate("");
        setCategory("");
        setDescription("");
        setStock("");
        setIsFeatured(false);
        setImage(null);
      } else {
        const errData = await res.json();
        toast(`Failed to save product: ${errData.error || "Unknown error"}`);
      }
    } catch (err) {
      toast("Something went wrong.");
      console.error(err);
    }

    setUploading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-1 flex gap-5 flex-wrap"
      encType="multipart/form-data"
    >
      <div className="w-8/12">
        <label htmlFor="title" className="block mb-1 font-semibold">
          Product Name
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="lg:w-3/12">
        <label htmlFor="price" className="block mb-1 font-semibold">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="w-full border rounded p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="lg:w-3/12">
        <label htmlFor="rate" className="block mb-1 font-semibold">
          Rate
        </label>
        <input
          type="number"
          id="rate"
          name="rate"
          className="w-full border rounded p-2"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      <div className="lg:w-3/12">
        <label htmlFor="stock" className="block mb-1 font-semibold">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          className="w-full border rounded p-2"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          min="0"
        />
      </div>

      <div className="lg:w-5/12">
        <label htmlFor="category" className="block mb-1 font-semibold">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className="w-full border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div className="lg:w-full">
        <label htmlFor="description" className="block mb-1 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="lg:w-7/12">
        <label htmlFor="image" className="block mb-1 font-semibold">
          Choose Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <div className="flex items-center space-x-2 lg:w-4/12">
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <label htmlFor="isFeatured" className="font-semibold">
          Featured
        </label>
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="bg-green-600 text-white m-auto px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {uploading ? "...Please Wait" : "Save"}
      </button>
    </form>
  );
}
