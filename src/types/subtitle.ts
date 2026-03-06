export interface Subtitle {
  id: string
  videoId: string
  startTime: number
  endTime: number
  text: string
}

export interface SubtitleResponse {
  subtitles: Subtitle[]
}

export interface CurrentSubtitle {
  index: number
  subtitle: Subtitle | null
}