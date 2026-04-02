"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const languageTints: Record<string, string> = {
  javascript: "var(--chart-2)",
  jsx: "var(--chart-2)",
  typescript: "var(--secondary)",
  tsx: "var(--secondary)",
  java: "var(--primary)",
  go: "var(--secondary)",
  python: "var(--chart-3)",
  rust: "var(--primary)",
  bash: "var(--foreground)",
  json: "var(--secondary)",
  yaml: "var(--chart-3)",
  sql: "var(--primary)",
  markup: "var(--secondary)",
  css: "var(--chart-2)",
  markdown: "var(--chart-3)",
  text: "var(--muted-foreground)",
};

export default function CodeBlock({
  code,
  language,
  highlighted,
}: {
  code: string;
  language: string;
  highlighted: string;
}) {
  const [copied, setCopied] = useState(false);
  const tint = languageTints[language] || "var(--primary)";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="my-8 overflow-hidden rounded-[1.6rem] border"
      style={{
        borderColor: `color-mix(in oklch, var(--border) 58%, ${tint} 42%)`,
        background:
          "linear-gradient(180deg, color-mix(in oklch, var(--background) 60%, transparent), color-mix(in oklch, var(--background) 94%, transparent))",
      }}
    >
      <div
        className="flex items-center justify-between gap-4 border-b px-4 py-3"
        style={{
          borderColor: `color-mix(in oklch, var(--border) 66%, ${tint} 34%)`,
          background: `linear-gradient(135deg, color-mix(in oklch, var(--background) 86%, ${tint} 14%), color-mix(in oklch, var(--background) 96%, ${tint} 4%))`,
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: `color-mix(in oklch, ${tint} 82%, var(--background) 18%)` }}
          />
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-foreground/88">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
          aria-label={`Copy ${language} code`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied" : "Copy code"}</span>
        </button>
      </div>

      <pre className="code-block overflow-x-auto px-4 py-5 text-[0.92rem] leading-7 text-foreground">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
