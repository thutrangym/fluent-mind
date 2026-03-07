import os
import re
import tempfile
from typing import List

from fastapi import FastAPI, UploadFile, File, Form
from faster_whisper import WhisperModel

app = FastAPI(title="Local Whisper Shadowing Service")

WHISPER_MODEL = os.getenv("WHISPER_MODEL", "small.en")
WHISPER_DEVICE = os.getenv("WHISPER_DEVICE", "cpu")
WHISPER_COMPUTE_TYPE = os.getenv("WHISPER_COMPUTE_TYPE", "int8")

model = WhisperModel(
    WHISPER_MODEL,
    device=WHISPER_DEVICE,
    compute_type=WHISPER_COMPUTE_TYPE,
)

def normalize_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^\w\s']", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def tokenize(text: str) -> List[str]:
    normalized = normalize_text(text)
    return normalized.split() if normalized else []

def calculate_wer(reference: str, hypothesis: str) -> float:
    ref_words = tokenize(reference)
    hyp_words = tokenize(hypothesis)

    if not ref_words:
        return 0.0

    dp = [[0] * (len(hyp_words) + 1) for _ in range(len(ref_words) + 1)]

    for i in range(len(ref_words) + 1):
        dp[i][0] = i
    for j in range(len(hyp_words) + 1):
        dp[0][j] = j

    for i in range(1, len(ref_words) + 1):
        for j in range(1, len(hyp_words) + 1):
            if ref_words[i - 1] == hyp_words[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = min(
                    dp[i - 1][j] + 1,      # delete
                    dp[i][j - 1] + 1,      # insert
                    dp[i - 1][j - 1] + 1,  # replace
                )

    return dp[len(ref_words)][len(hyp_words)] / len(ref_words)

def get_word_diff(reference: str, hypothesis: str):
    ref_words = tokenize(reference)
    hyp_words = tokenize(hypothesis)

    missing = [w for w in ref_words if w not in hyp_words]
    extra = [w for w in hyp_words if w not in ref_words]

    return {
        "missingWords": missing,
        "extraWords": extra,
    }

def calculate_fluency(reference: str, hypothesis: str) -> float:
    ref_len = max(len(tokenize(reference)), 1)
    hyp_len = len(tokenize(hypothesis))

    ratio = hyp_len / ref_len

    if 0.9 <= ratio <= 1.1:
        return 100.0
    if 0.8 <= ratio <= 1.2:
        return 85.0
    if 0.7 <= ratio <= 1.3:
        return 70.0
    return 50.0

@app.get("/health")
def health():
    return {
        "ok": True,
        "model": WHISPER_MODEL,
        "device": WHISPER_DEVICE,
        "compute_type": WHISPER_COMPUTE_TYPE,
    }

@app.post("/transcribe-score")
async def transcribe_score(
    file: UploadFile = File(...),
    reference: str = Form(...),
):
    suffix = os.path.splitext(file.filename or "audio.webm")[1] or ".webm"

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        content = await file.read()
        tmp.write(content)
        temp_path = tmp.name

    try:
        segments, info = model.transcribe(
            temp_path,
            language="en",
            beam_size=5,
            vad_filter=True,
            word_timestamps=True,
        )

        transcript = " ".join(seg.text.strip() for seg in segments).strip()

        wer = calculate_wer(reference, transcript)
        accuracy = max(0.0, 100.0 * (1.0 - wer))
        fluency = calculate_fluency(reference, transcript)
        score = round(accuracy * 0.85 + fluency * 0.15, 2)

        diff = get_word_diff(reference, transcript)

        return {
            "transcript": transcript,
            "reference": reference,
            "normalizedTranscript": normalize_text(transcript),
            "normalizedReference": normalize_text(reference),
            "wer": round(wer, 4),
            "accuracy": round(accuracy, 2),
            "fluency": round(fluency, 2),
            "score": score,
            "missingWords": diff["missingWords"],
            "extraWords": diff["extraWords"],
            "language": info.language,
            "languageProbability": getattr(info, "language_probability", None),
        }
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)