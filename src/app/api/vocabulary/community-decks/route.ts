import prisma from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const decks = await prisma.deck.findMany({
        where: {
            isPublic: true
        },
        include: {
            vocabularies: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return NextResponse.json(decks)
}
