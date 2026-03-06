export function parseSRT(data: string) {
  const blocks = data.split("\n\n");

  return blocks.map((block) => {
    const lines = block.split("\n");

    const time = lines[1];
    const text = lines.slice(2).join(" ");

    const [start, end] = time.split(" --> ");

    const toSeconds = (t: string) => {
      const [h, m, s] = t.replace(",", ".").split(":");
      return (
        parseFloat(h) * 3600 +
        parseFloat(m) * 60 +
        parseFloat(s)
      );
    };

    return {
      startTime: toSeconds(start),
      endTime: toSeconds(end),
      text,
    };
  });
}