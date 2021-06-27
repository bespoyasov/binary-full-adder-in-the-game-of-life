export function extractSignalValues() {
  const searchParams = new URLSearchParams(window.location.search);
  const a = searchParams.get("a") ?? "01";
  const b = searchParams.get("b") ?? "11";
  const speed = searchParams.get("speed") ?? 1;
  return { a, b, speed };
}
