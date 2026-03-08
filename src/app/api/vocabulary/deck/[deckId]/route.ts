import prisma from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ deckId: string }> }
) {
  try {
    const { deckId } = await params

    const deck = await prisma.deck.findUnique({
      where: {
        id: deckId
      },
      include: {
        vocabularies: true
      }
    })

    if (!deck) {
      return NextResponse.json(
        { error: "Deck not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(deck)
  } catch (error) {
    console.error("[DECK_GET]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
export async function POST(
  req: Request,
  { params }: { params: Promise<{ deckId: string }> }
) {
  try {
    const { deckId } = await params

    const body = await req.json()
    const { word, meaning, example, pronunciation } = body

    if (!word || !meaning) {
      return NextResponse.json(
        { error: "Word and meaning are required" },
        { status: 400 }
      )
    }

    const vocabulary = await prisma.vocabulary.create({
      data: {
        deckId,
        word,
        meaning,
        example,
        pronunciation
      }
    })

    return NextResponse.json(vocabulary)

  } catch (error) {
    console.error("[DECK_POST]", error)

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}