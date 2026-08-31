export async function simulateVerification(
  fileName: string
): Promise<"verified" | "suspicious" | "fake"> {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay
  if (fileName.toLowerCase().includes("genuine")) return "verified";
  if (fileName.toLowerCase().includes("suspicious")) return "suspicious";
  return "fake";
}
