import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const offers = await prisma.offer.findMany();
    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching offers:", error.message, error);
    return NextResponse.json(
      { error: "Failed to fetch offers", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, originalPrice, discountedPrice } = body;

    if (
      typeof originalPrice !== "number" ||
      typeof discountedPrice !== "number" ||
      isNaN(originalPrice) ||
      isNaN(discountedPrice)
    ) {
      return NextResponse.json(
        { error: "Prices must be valid numbers" },
        { status: 400 }
      );
    }

    const offer = await prisma.offer.create({
      data: {
        title,
        description,
        originalPrice,
        discountedPrice,
      },
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating offer:", error.message, error);
    return NextResponse.json(
      { error: "Failed to create offer", details: error.message },
      { status: 500 }
    );
  }
}
