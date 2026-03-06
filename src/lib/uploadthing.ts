import { generateReactHelpers } from "@uploadthing/react"
import type { UploadRouter } from "@/src/app/api/uploadthing/core"

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<UploadRouter>()