import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    if (!id) throw new Error("Product ID is required");

    const body = await req.json();
    const updates = {};

    if (body.title !== undefined)       updates.title       = body.title;
    if (body.price !== undefined)       updates.price       = parseFloat(body.price);
    if (body.rate !== undefined)        updates.rate        = parseFloat(body.rate);
    if (body.category !== undefined)    updates.category    = body.category;
    if (body.description !== undefined) updates.description = body.description;
    if (body.stock !== undefined)       updates.stock       = parseInt(body.stock);
    if (body.isFeatured !== undefined)  updates.isFeatured  = Boolean(body.isFeatured);
    if (body.imageUrl)                  updates.image       = body.imageUrl;

    const updatedProduct = await prisma.product.update({
      where: { id },
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
    const { id } = await params;
    if (!id) throw new Error("Product ID is required");

    const deletedProduct = await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true, product: deletedProduct });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
