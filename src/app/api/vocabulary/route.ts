import { NextResponse } from "next/server"
import prisma from "@/src/lib/prisma"

export async function GET() {
  try {
    const vocabulary = await prisma.vocabulary.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(vocabulary)
  } catch (error) {
    return NextResponse.json(
      { error: "Cannot fetch vocabulary" },
      { status: 500 }
    )
  }
}