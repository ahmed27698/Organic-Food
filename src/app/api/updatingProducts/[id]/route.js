import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import cloudinary from "../../../../lib/cloudinary";
import { ObjectId } from "mongodb"; // اضيف دي

export async function PATCH(req, { params }) {
  try {
    const formData = await req.formData();
    const id = params.id;
    if (!id) throw new Error("Product ID is required");

    const updates = {};

    if (formData.has("title")) updates.title = formData.get("title");
    if (formData.has("price")) updates.price = parseFloat(formData.get("price"));
    if (formData.has("rate")) updates.rate = parseFloat(formData.get("rate"));
    if (formData.has("category")) updates.category = formData.get("category");
    if (formData.has("description")) updates.description = formData.get("description");
    if (formData.has("stock")) updates.stock = parseInt(formData.get("stock"));
    if (formData.has("isFeatured")) updates.isFeatured = formData.get("isFeatured") === "true";

    const imageFile = formData.get("image");
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            use_filename: false,
            unique_filename: true,
            overwrite: false,
            public_id: `${updates.title?.replace(/\s+/g, "_") || "product"}_${Date.now()}`,
          },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(buffer);
      });

      updates.image = uploadRes.secure_url;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: new ObjectId(id) },
      data: updates,
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    if (!id) throw new Error("Product ID is required");

    // نحذف المنتج
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, product: deletedProduct });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}