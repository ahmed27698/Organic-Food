import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const price = parseFloat(formData.get("price"));
    const rate = parseFloat(formData.get("rate")) || 0;
    const category = formData.get("category");
    const description = formData.get("description") || "";
    const stock = parseInt(formData.get("stock")) || 0;
    const isFeatured = formData.get("isFeatured") === "true";

    const imageFile = formData.get("image");
    if (!imageFile) throw new Error("No image file provided");

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadRes = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const imageUrl = uploadRes.secure_url;

    const existingProduct = await prisma.product.findUnique({
      where: { title },
    });

    if (existingProduct) {
      const updated = await prisma.product.update({
        where: { id: existingProduct.id },
        data: {
          price,
          rate,
          category,
          description,
          stock: existingProduct.stock + stock,
          isFeatured,
          image: imageUrl,
        },
      });
      return NextResponse.json({ success: true, product: updated });
    }

    const product = await prisma.product.create({
      data: {
        title,
        price,
        rate,
        category,
        description,
        stock,
        isFeatured,
        image: imageUrl,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err), stack: err.stack },
      { status: 500 }
    );
  }
}
