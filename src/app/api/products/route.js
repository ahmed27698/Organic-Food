import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, price, rate, category, description, stock, isFeatured, imageUrl } = body;

    if (!title || !price || !category || !stock || !imageUrl) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({ where: { title } });

    if (existingProduct) {
      const updated = await prisma.product.update({
        where: { id: existingProduct.id },
        data: {
          price: parseFloat(price),
          rate: parseFloat(rate) || 0,
          category,
          description: description || "",
          stock: existingProduct.stock + parseInt(stock),
          isFeatured: Boolean(isFeatured),
          image: imageUrl,
        },
      });
      return NextResponse.json({ success: true, product: updated });
    }

    const product = await prisma.product.create({
      data: {
        title,
        price: parseFloat(price),
        rate: parseFloat(rate) || 0,
        category,
        description: description || "",
        stock: parseInt(stock),
        isFeatured: Boolean(isFeatured),
        image: imageUrl,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
