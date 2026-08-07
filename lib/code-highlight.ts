import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-batch";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-css";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";

const languageAliases: Record<string, string> = {
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  html: "markup",
  xml: "markup",
  svg: "markup",
  md: "markdown",
  yml: "yaml",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  bat: "batch",
  batchfile: "batch",
  cmd: "batch",
  ps1: "powershell",
  pwsh: "powershell",
};

type HighlightedCodeResult = {
  language: string;
  highlighted: string;
};

function escapeHtml(code: string) {
  return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function normalizeCodeLanguage(language?: string) {
  if (!language) return "text";

  const lower = language.toLowerCase();
  return languageAliases[lower] || lower;
}

export function highlightCode(code: string, language?: string): HighlightedCodeResult {
  const normalizedLanguage = normalizeCodeLanguage(language);
  const grammar = Prism.languages[normalizedLanguage];

  if (!grammar) {
    return {
      language: normalizedLanguage,
      highlighted: escapeHtml(code),
    };
  }

  return {
    language: normalizedLanguage,
    highlighted: Prism.highlight(code, grammar, normalizedLanguage),
  };
}
