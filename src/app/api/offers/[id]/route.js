import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(req, { params }) {
    const { id } = await params;
    try {
        await prisma.offer.delete({ where: { id } });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete offer" }, { status: 500 });
    }
}
