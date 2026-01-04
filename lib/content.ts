import { promises as fs } from "fs";
import path from "path";

export async function loadJson<T>(relPath: string): Promise<T> {
  const fullPath = path.join(process.cwd(), relPath);
  const raw = await fs.readFile(fullPath, "utf-8");
  return JSON.parse(raw) as T;
}
