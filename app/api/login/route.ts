/*import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ id: user.id, email: user.email });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Upsert: Creates the user if they don't exist, or updates their password if they do
    const user = await prisma.user.upsert({
      where: { email },
      update: { password },
      create: { email, password },
    });

    return NextResponse.json({ id: user.id, email: user.email }, { status: 200 });
  } catch (error) {
    console.error("Login DB error:", error);
    return NextResponse.json(
      { error: "Failed to process request in database" },
      { status: 500 }
    );
  }
}