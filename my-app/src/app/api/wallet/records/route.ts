import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { WalletCategory } from "@/types/wallet";

// GET - List all records with optional category filter
export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as WalletCategory | null;
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: Record<string, unknown> = { userId: "default-user" };
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { tags: { hasSome: [search] } },
      ];
    }

    const [records, total] = await Promise.all([
      prisma.walletRecord.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.walletRecord.count({ where }),
    ]);

    return NextResponse.json({ records, total });
  } catch (error) {
    console.error("Wallet records GET error:", error);
    return NextResponse.json({ error: "Failed to fetch records" }, { status: 500 });
  }
}

// POST - Create new record
export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { category, title, data, fileLinks, tags } = body;

    if (!category || !title) {
      return NextResponse.json({ error: "Category and title required" }, { status: 400 });
    }

    const record = await prisma.walletRecord.create({
      data: {
        userId: "default-user",
        category,
        title,
        data: data || {},
        fileLinks: fileLinks || [],
        tags: tags || [],
      },
    });

    return NextResponse.json({ record }, { status: 201 });
  } catch (error) {
    console.error("Wallet record CREATE error:", error);
    return NextResponse.json({ error: "Failed to create record" }, { status: 500 });
  }
}