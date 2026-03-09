import "dotenv/config"

import fs from "fs"
import path from "path"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter
})

const subtitlesDir = path.join(process.cwd(), "data/subtitles")

function timeToSeconds(time: string) {
  const [h, m, s] = time.replace(",", ".").split(":")
  return Number(h) * 3600 + Number(m) * 60 + Number(s)
}

function parseSRT(content: string) {
  const blocks = content.split("\n\n")

  return blocks
    .map((block) => {
      const lines = block.trim().split("\n")

      if (lines.length < 3) return null

      const [start, end] = lines[1].split(" --> ")

      return {
        startTime: timeToSeconds(start),
        endTime: timeToSeconds(end),
        text: lines.slice(2).join(" "),
      }
    })
    .filter(Boolean)
}

async function main() {
  const files = fs.readdirSync(subtitlesDir).filter((f) => f.endsWith(".srt"))

  console.log("Found", files.length, "subtitle files")

  for (const file of files) {
    const youtubeId = file.replace(".srt", "")

    const video = await prisma.video.findUnique({
      where: { youtubeId }
    })

    if (!video) {
      console.log(" Video not found:", youtubeId)
      continue
    }

    const content = fs.readFileSync(path.join(subtitlesDir, file), "utf8")

    const subtitles = parseSRT(content)

    await prisma.subtitleSentence.createMany({
      data: subtitles.map((s: any) => ({
        videoId: video.id,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text
      })),
      skipDuplicates: true
    })

    console.log(`${youtubeId}: ${subtitles.length} subtitles`)
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })