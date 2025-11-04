"use client";

import { PortableText as BasePortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      console.log(value);
      return (
        <>
          {value?.url ? (
            <div className="my-6">
              <Image
                src={value.url}
                alt={value.alt || "Project image"}
                width={800}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
          ) : null}
        </>
      );
    },

    // ✅ Sanity Table Renderer
    table: ({ value }) => {
      const rows = value?.rows || value || [];
      if (!rows?.length) return null;

      // Sanity tables are array of { _type: "tableRow", cells: [] }
      const hasHeader = rows[0]?.cells?.every((cell: string) => cell.trim() !== "");

      return (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-border text-sm">
            <thead>
              {hasHeader && (
                <tr className="bg-muted/40 border-b border-border">
                  {rows[0].cells.map((cell: string, i: number) => (
                    <th
                      key={i}
                      className="px-4 py-2 text-left font-semibold text-foreground border-r border-border"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {rows
                .slice(hasHeader ? 1 : 0)
                .map((row: { _key: string; cells: string[] }, rowIndex: number) => (
                  <tr
                    key={row._key || rowIndex}
                    className="border-b border-border even:bg-muted/10"
                  >
                    {row.cells.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-2 border-r border-border text-muted-foreground"
                      >
                        {cell || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:no-underline"
      >
        {children}
      </a>
    ),
  },
};

// ✅ Named export
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PortableBlock({ value }: { value: any }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <BasePortableText value={value} components={components} />
    </div>
  );
}

// ✅ Default export for convenience
export const PortableText = BasePortableText;
