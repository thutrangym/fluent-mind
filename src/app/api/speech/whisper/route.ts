import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getCurrentUser } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const subtitleId = formData.get("subtitleId") as string | null;
    const reference = formData.get("reference") as string | null;

    if (!file || !subtitleId || !reference) {
      return NextResponse.json(
        { error: "Missing file, subtitleId or reference" },
        { status: 400 },
      );
    }
    const subtitle = await prisma.subtitleSentence.findUnique({
      where: { id: subtitleId },
    });

    if (!subtitle) {
      return NextResponse.json(
        { error: "Subtitle not found" },
        { status: 404 },
      );
    }

    const whisperUrl =
      process.env.LOCAL_WHISPER_URL || "http://127.0.0.1:8001/transcribe-score";

    const forward = new FormData();
    forward.append("file", file, file.name || "shadowing.webm");
    forward.append("reference", reference);

    /* ADD TIMEOUT */
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 20000);

    const whisperRes = await fetch(whisperUrl, {
      method: "POST",
      body: forward,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    
    if (!whisperRes.ok) {
      const detail = await whisperRes.text();
      return NextResponse.json(
        { error: "Local whisper service failed", detail },
        { status: 500 },
      );
    }

    const result = await whisperRes.json();

    await prisma.speechAttempt.create({
      data: {
        userId: user.id,
        subtitleId,
        audioUrl: "",
        transcript: result.transcript ?? "",
        reference,
        wer: result.wer ?? 1,
        score: result.score ?? 0,
      },
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/speech/whisper error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
