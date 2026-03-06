import { createUploadthing, type FileRouter } from "uploadthing/server"

const f = createUploadthing()

export const uploadRouter = {
  audioUploader: f({
    audio: { maxFileSize: "8MB" },
  })
  .onUploadComplete(async ({ file }) => {
    return {
      url: file.url
    }
  })

} satisfies FileRouter

export type UploadRouter = typeof uploadRouter