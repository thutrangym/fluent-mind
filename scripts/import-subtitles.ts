import fs from "fs"
import path from "path"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function timeToSeconds(time: string) {
  const [h, m, s] = time.replace(",", ".").split(":")
  return Number(h) * 3600 + Number(m) * 60 + Number(s)
}

function parseSRT(content: string) {
  const blocks = content.split("\n\n")

  return blocks.map((block) => {
    const lines = block.split("\n")

    if (lines.length < 3) return null

    const [start, end] = lines[1].split(" --> ")

    return {
      startTime: timeToSeconds(start),
      endTime: timeToSeconds(end),
      text: lines.slice(2).join(" ")
    }
  }).filter(Boolean)
}

async function main() {

  const youtubeId = "ZAnS4B2KH1M" 

  const filePath = path.join("data/subtitles", `${youtubeId}.srt`)

  const content = fs.readFileSync(filePath, "utf8")

  const subtitles = parseSRT(content)

  const video = await prisma.video.findUnique({
    where: { youtubeId }
  })

  if (!video) {
    console.log("Video not found")
    return
  }

  for (const s of subtitles) {
    await prisma.subtitleSentence.create({
      data: {
        videoId: video.id,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text
      }
    })
  }

  console.log("Imported:", subtitles.length)
}

main()