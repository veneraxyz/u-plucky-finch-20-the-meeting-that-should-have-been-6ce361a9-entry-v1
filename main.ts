import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "We spent 47 minutes in a meeting about having too many meetings, then booked another one to decide who should've just sent the email.";

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return fromEnv;
  }
  return "/output";
}

function validateEntry(line: string): void {
  const lines = line.split("\n").filter((part) => part.trim() !== "");
  if (lines.length !== 1) {
    throw new Error("entry must be exactly one non-blank line");
  }
  const single = lines[0];
  if (single.length < 1 || single.length > 200) {
    throw new Error("entry line must be 1-200 characters");
  }
}

function main(): void {
  validateEntry(ENTRY_LINE);
  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ENTRY_LINE + "\n", "utf8");
}

main();
