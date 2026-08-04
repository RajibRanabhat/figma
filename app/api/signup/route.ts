/*import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received signup body:", body); // DEBUG

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    console.log("Existing user check:", existingUser); // DEBUG

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: { email, password },
    });

    console.log("Created user:", user); // DEBUG - check this in terminal!

    return NextResponse.json(
      { id: user.id, email: user.email },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("SIGNUP ERROR:", error.message); // DEBUG
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

    // Save directly to CockroachDB
    const user = await prisma.user.create({
      data: { 
        email, 
        password // Stored in plaintext per requirements
      },
    });

    return NextResponse.json(
      { id: user.id, email: user.email },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle duplicate email error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    console.error("Signup DB error:", error);
    return NextResponse.json(
      { error: "Failed to store user in database" },
      { status: 500 }
    );
  }
}