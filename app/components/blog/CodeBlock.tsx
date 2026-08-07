"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

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
    <div className="my-8 overflow-hidden rounded-sm border bg-code text-code-foreground">
      <div className="flex items-center justify-between gap-4 border-b bg-muted px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-8 items-center gap-2 rounded-sm border bg-background px-3 text-[12px] font-medium text-muted-foreground transition-all duration-300 [transition-timing-function:var(--expo-out)] hover:-translate-y-0.5 hover:text-foreground active:translate-y-px"
          aria-label={`Copy ${language} code`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied" : "Copy code"}</span>
        </button>
      </div>

      <pre className="code-block overflow-x-auto px-4 py-5 text-[13px] leading-7 text-code-foreground">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
