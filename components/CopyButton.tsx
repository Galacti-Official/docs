"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (e.g. non-https)
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/50 opacity-0 transition group-hover:opacity-100 hover:border-white/20 hover:bg-white/10 hover:text-white/80 focus:opacity-100"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </button>
  );
}
