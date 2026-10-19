import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET - Get single record
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const record = await prisma.walletRecord.findUnique({
      where: { id, userId: "default-user" },
    });

    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ record });
  } catch (error) {
    console.error("Wallet record GET error:", error);
    return NextResponse.json({ error: "Failed to fetch record" }, { status: 500 });
  }
}

// PUT - Update record
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, data, fileLinks, tags } = body;

    const record = await prisma.walletRecord.update({
      where: { id, userId: "default-user" },
      data: {
        title,
        data,
        fileLinks,
        tags,
      },
    });

    return NextResponse.json({ record });
  } catch (error) {
    console.error("Wallet record UPDATE error:", error);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}

// DELETE - Delete record
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.walletRecord.delete({
      where: { id, userId: "default-user" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wallet record DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}