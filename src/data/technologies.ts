/**
 * Technology marquee.
 *
 * RULE: only list technology Velorex genuinely uses. Each entry is grouped by
 * where it is actually in use, so nothing here is an unsupported claim.
 * Add or remove a string — the marquee re-flows automatically.
 */

export type TechGroup = {
  label: string;
  items: string[];
};

export const techGroups: TechGroup[] = [
  {
    label: "Desktop & mobile products",
    items: [
      "C++20",
      "Qt 6",
      "libmpv",
      "FFmpeg",
      "SQLite",
      "CMake",
      "MSVC",
      "Raw disk I/O",
      "NTFS / FAT32 / exFAT",
      "Electron",
      "Capacitor",
      "Android",
      "C# / .NET 8",
      "tsMuxeR",
      "IMAPI2",
      "Flutter",
      "Dart",
      "Expo (React Native)",
    ],
  },
  {
    label: "Web & product",
    items: [
      "TypeScript",
      "Vite",
      "WebGL2",
      "ONNX Runtime Web",
      "Python",
      "FastAPI",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "NestJS",
      "Fastify",
      "Drizzle ORM",
      "Express",
      "Shopify Liquid",
      "Whisper",
      "Tesseract",
      "Ollama",
    ],
  },
];

/** Flattened list for the marquee rows. */
export const technologies = techGroups.flatMap((g) => g.items);
