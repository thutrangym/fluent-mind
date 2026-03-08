import prisma from "@/src/lib/prisma"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/src/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decks = await prisma.deck.findMany({
      where: {
        userId: user.id
      },
      include: {
        vocabularies: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(decks)
  } catch (error) {
    console.error("[DECKS_GET]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description } = await req.json()

    if (!title) {
      return NextResponse.json(
        { error: "Title required" },
        { status: 400 }
      )
    }

    const deck = await prisma.deck.create({
      data: {
        userId: user.id,
        title,
        description
      }
    })

    return NextResponse.json(deck)
  } catch (error) {
    console.error("[DECKS_POST]", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}