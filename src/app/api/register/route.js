import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("API HIT");

  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    console.log("Request body:", body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName, 
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
