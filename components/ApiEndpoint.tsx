"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";

// ─── types ────────────────────────────────────────────────────────────────────

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiResponse = {
  status: number;
  label: string;
  body: object;
};

export type ApiEndpointProps = {
  method: HttpMethod;
  path: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  requestBody?: object;
  responses: ApiResponse[];
};

type Lang = "http" | "curl" | "javascript" | "python";

const LANGS: { id: Lang; label: string }[] = [
  { id: "http",       label: "HTTP"       },
  { id: "curl",       label: "cURL"       },
  { id: "javascript", label: "JavaScript" },
  { id: "python",     label: "Python"     },
];

// ─── color palette (one-dark-pro) ─────────────────────────────────────────────

const C = {
  kw:  "#c678dd", // keywords
  str: "#98c379", // strings
  fn:  "#61afef", // functions / builtins
  url: "#e5c07b", // URLs / paths
  flg: "#56b6c2", // flags / header names
  dim: "#5c6370", // comments / dimmed
  num: "#d19a66", // numbers
  def: "#abb2bf", // default text
  mth: { GET: "#98c379", POST: "#61afef", PUT: "#e5c07b", PATCH: "#d19a66", DELETE: "#e06c75" },
} as const;

// ─── helpers ──────────────────────────────────────────────────────────────────

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET:    "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  POST:   "bg-blue-500/15    text-blue-400    ring-1 ring-blue-500/30",
  PUT:    "bg-amber-500/15   text-amber-400   ring-1 ring-amber-500/30",
  PATCH:  "bg-orange-500/15  text-orange-400  ring-1 ring-orange-500/30",
  DELETE: "bg-red-500/15     text-red-400     ring-1 ring-red-500/30",
};

function statusColor(s: number) {
  if (s < 300) return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30";
  if (s < 400) return "bg-blue-500/15    text-blue-400    ring-1 ring-blue-500/30";
  if (s < 500) return "bg-amber-500/15   text-amber-400   ring-1 ring-amber-500/30";
  return              "bg-red-500/15     text-red-400     ring-1 ring-red-500/30";
}

// ─── plain-text generators (for copy) ─────────────────────────────────────────

function buildHttpText(method: HttpMethod, path: string, host: string, headers: Record<string, string>, body?: object) {
  return [
    `${method} ${path} HTTP/1.1`,
    `Host: ${host}`,
    ...Object.entries(headers).map(([k, v]) => `${k}: ${v}`),
    ...(body ? ["", "Content-Type: application/json", "", JSON.stringify(body, null, 2)] : []),
  ].join("\n");
}

function buildCurlText(method: HttpMethod, baseUrl: string, path: string, headers: Record<string, string>, body?: object) {
  const lines = [`curl ${baseUrl}${path}`];
  if (method !== "GET") lines.push(`  -X ${method}`);
  for (const [k, v] of Object.entries(headers)) lines.push(`  -H "${k}: ${v}"`);
  if (body) lines.push(`  -d '${JSON.stringify(body)}'`);
  return lines.join(" \\\n");
}

function buildJsText(method: HttpMethod, baseUrl: string, path: string, headers: Record<string, string>, body?: object) {
  const headerLines = Object.entries(headers).map(([k, v]) => `    "${k}": "${v}",`).join("\n");
  const bodyLine = body ? `  body: JSON.stringify(${JSON.stringify(body)}),\n` : "";
  return `const response = await fetch("${baseUrl}${path}", {\n  method: "${method}",\n  headers: {\n${headerLines}\n  },\n${bodyLine}});\nconst data = await response.json();`;
}

function buildPythonText(method: HttpMethod, baseUrl: string, path: string, headers: Record<string, string>, body?: object) {
  const headerLines = Object.entries(headers).map(([k, v]) => `        "${k}": "${v}",`).join("\n");
  const bodyLine = body ? `,\n    json=${JSON.stringify(body, null, 4).split("\n").join("\n    ")}` : "";
  return `import requests\n\nresponse = requests.${method.toLowerCase()}(\n    "${baseUrl}${path}",\n    headers={\n${headerLines}\n    }${bodyLine}\n)\ndata = response.json()`;
}

// ─── syntax-highlighted React renderers ───────────────────────────────────────

function HttpHighlight({ method, path, host, headers }: {
  method: HttpMethod; path: string; host: string; headers: Record<string, string>;
}) {
  return (
    <code style={{ color: C.def }}>
      <span style={{ color: C.mth[method] }}>{method}</span>
      {" "}<span style={{ color: C.url }}>{path}</span>
      {" "}<span style={{ color: C.dim }}>HTTP/1.1</span>
      {"\n"}
      <span style={{ color: C.flg }}>Host</span>{`: ${host}\n`}
      {Object.entries(headers).map(([k, v]) => (
        <span key={k}>
          <span style={{ color: C.flg }}>{k}</span>{`: ${v}\n`}
        </span>
      ))}
    </code>
  );
}

function CurlHighlight({ method, baseUrl, path, headers, requestBody }: {
  method: HttpMethod; baseUrl: string; path: string; headers: Record<string, string>; requestBody?: object;
}) {
  return (
    <code style={{ color: C.def }}>
      <span style={{ color: C.kw }}>curl</span>
      {" "}<span style={{ color: C.str }}>{baseUrl}{path}</span>
      {method !== "GET" && (
        <>{" \\\n  "}<span style={{ color: C.flg }}>-X</span>{" "}<span style={{ color: C.str }}>{method}</span></>
      )}
      {Object.entries(headers).map(([k, v]) => (
        <span key={k}>
          {" \\\n  "}<span style={{ color: C.flg }}>-H</span>
          {" "}<span style={{ color: C.str }}>{`"${k}: ${v}"`}</span>
        </span>
      ))}
      {requestBody && (
        <>{" \\\n  "}<span style={{ color: C.flg }}>-d</span>{" "}<span style={{ color: C.str }}>{`'${JSON.stringify(requestBody)}'`}</span></>
      )}
    </code>
  );
}

function JsHighlight({ method, baseUrl, path, headers, requestBody }: {
  method: HttpMethod; baseUrl: string; path: string; headers: Record<string, string>; requestBody?: object;
}) {
  return (
    <code style={{ color: C.def }}>
      <span style={{ color: C.kw }}>const</span>{" response = "}
      <span style={{ color: C.kw }}>await</span>{" "}
      <span style={{ color: C.fn }}>fetch</span>{"("}
      <span style={{ color: C.str }}>{`"${baseUrl}${path}"`}</span>{", {\n  "}
      <span style={{ color: C.flg }}>method</span>{": "}
      <span style={{ color: C.str }}>{`"${method}"`}</span>{",\n  "}
      <span style={{ color: C.flg }}>headers</span>{": {\n"}
      {Object.entries(headers).map(([k, v]) => (
        <span key={k}>
          {"    "}<span style={{ color: C.str }}>{`"${k}"`}</span>
          {": "}<span style={{ color: C.str }}>{`"${v}"`}</span>{",\n"}
        </span>
      ))}
      {"  },"}
      {requestBody && (
        <>
          {"\n  "}<span style={{ color: C.flg }}>body</span>{": "}
          <span style={{ color: C.fn }}>JSON</span>{"."}<span style={{ color: C.fn }}>stringify</span>
          {"("}<span style={{ color: C.str }}>{JSON.stringify(requestBody)}</span>{"),"}
        </>
      )}
      {"\n});\n"}
      <span style={{ color: C.kw }}>const</span>{" data = "}
      <span style={{ color: C.kw }}>await</span>{" response."}
      <span style={{ color: C.fn }}>json</span>{"();"}
    </code>
  );
}

function PyHighlight({ method, baseUrl, path, headers, requestBody }: {
  method: HttpMethod; baseUrl: string; path: string; headers: Record<string, string>; requestBody?: object;
}) {
  return (
    <code style={{ color: C.def }}>
      <span style={{ color: C.kw }}>import</span>{" "}
      <span style={{ color: C.fn }}>requests</span>
      {"\n\nresponse = "}
      <span style={{ color: C.fn }}>requests</span>{"."}<span style={{ color: C.fn }}>{method.toLowerCase()}</span>
      {"(\n    "}<span style={{ color: C.str }}>{`"${baseUrl}${path}"`}</span>{",\n    headers={\n"}
      {Object.entries(headers).map(([k, v]) => (
        <span key={k}>
          {"        "}<span style={{ color: C.str }}>{`"${k}"`}</span>
          {": "}<span style={{ color: C.str }}>{`"${v}"`}</span>{",\n"}
        </span>
      ))}
      {"    }"}
      {requestBody && (
        <>
          {",\n    json={\n"}
          {Object.entries(requestBody as Record<string, unknown>).map(([k, v]) => (
            <span key={k}>
              {"        "}<span style={{ color: C.str }}>{`"${k}"`}</span>
              {": "}
              <span style={{ color: typeof v === "string" ? C.str : C.num }}>
                {typeof v === "string" ? `"${v}"` : String(v)}
              </span>{",\n"}
            </span>
          ))}
          {"    }"}
        </>
      )}
      {"\n)\ndata = response."}<span style={{ color: C.fn }}>json</span>{"()"}
    </code>
  );
}

function JsonHighlight({ value }: { value: object }) {
  const raw = JSON.stringify(value, null, 2)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(
      /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (m) => {
        if (/^"/.test(m)) return /:$/.test(m) ? `<span style="color:#61afef">${m}</span>` : `<span style="color:#98c379">${m}</span>`;
        if (/true|false/.test(m)) return `<span style="color:#c678dd">${m}</span>`;
        if (/null/.test(m))       return `<span style="color:#e06c75">${m}</span>`;
        return `<span style="color:#d19a66">${m}</span>`;
      },
    );
  return <code style={{ color: C.def }} dangerouslySetInnerHTML={{ __html: raw }} />;
}

// ─── main component ───────────────────────────────────────────────────────────

export default function ApiEndpoint({
  method,
  path,
  baseUrl = "https://api.galacti.org",
  headers = { Authorization: "Bearer YOUR_API_KEY", Accept: "*/*" },
  requestBody,
  responses,
}: ApiEndpointProps) {
  const [lang, setLang] = useState<Lang>("http");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedRes, setCopiedRes] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = responses[selectedIdx];
  const host = baseUrl.replace(/^https?:\/\//, "");

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const requestText: Record<Lang, string> = {
    http:       buildHttpText(method, path, host, headers, requestBody),
    curl:       buildCurlText(method, baseUrl, path, headers, requestBody),
    javascript: buildJsText(method, baseUrl, path, headers, requestBody),
    python:     buildPythonText(method, baseUrl, path, headers, requestBody),
  };

  const requestHighlight: Record<Lang, React.ReactNode> = {
    http:       <HttpHighlight method={method} path={path} host={host} headers={headers} />,
    curl:       <CurlHighlight method={method} baseUrl={baseUrl} path={path} headers={headers} requestBody={requestBody} />,
    javascript: <JsHighlight   method={method} baseUrl={baseUrl} path={path} headers={headers} requestBody={requestBody} />,
    python:     <PyHighlight   method={method} baseUrl={baseUrl} path={path} headers={headers} requestBody={requestBody} />,
  };

  async function handleCopy() {
    await navigator.clipboard.writeText(requestText[lang]).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopyRes() {
    await navigator.clipboard.writeText(JSON.stringify(selected.body, null, 2)).catch(() => {});
    setCopiedRes(true);
    setTimeout(() => setCopiedRes(false), 2000);
  }

  return (
    <div className="not-prose my-6 rounded-xl border border-white/10 bg-[#0d0f14] overflow-hidden font-mono text-sm">

      {/* ── header ── */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-white/[0.02]">
        <span className={`px-2 py-0.5 rounded text-xs font-bold tracking-wide ${METHOD_COLORS[method]}`}>
          {method}
        </span>
        <span className="flex-1 text-white/80 text-sm truncate">{path}</span>
      </div>

      {/* ── language tabs ── */}
      <div className="flex items-center gap-1 px-3 border-b border-white/8 bg-white/[0.01]">
        {LANGS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => { setLang(id); setCopied(false); }}
            className={`px-3 py-2 text-xs transition border-b-2 -mb-px ${
              lang === id
                ? "text-white/90 border-white/25"
                : "text-white/35 border-transparent hover:text-white/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── request preview ── */}
      <div className="relative group px-5 py-4 bg-[#0d0f14]">
        <pre className="overflow-x-auto text-sm leading-relaxed">
          {requestHighlight[lang]}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition px-2 py-1 rounded border border-white/8 hover:border-white/15 bg-[#0d0f14] opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* ── response section ── */}
      <div className="border-t border-white/8">

        {/* status selector */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/6 bg-white/[0.015]">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 px-2.5 py-1 rounded border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition"
            >
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${statusColor(selected.status)}`}>
                {selected.status}
              </span>
              <span className="text-white/60 text-xs">{selected.label}</span>
              <ChevronDown className={`h-3 w-3 text-white/30 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 z-10 min-w-[180px] rounded-lg border border-white/10 bg-[#13151c] shadow-xl overflow-hidden">
                {responses.map((r, i) => (
                  <button
                    key={r.status}
                    onClick={() => { setSelectedIdx(i); setDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-white/[0.06] transition ${i === selectedIdx ? "bg-white/[0.04]" : ""}`}
                  >
                    <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold shrink-0 ${statusColor(r.status)}`}>
                      {r.status}
                    </span>
                    <span className="text-white/60 text-xs">{r.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* response body */}
        <div className="relative group px-5 py-4 overflow-x-auto">
          <pre className="text-sm leading-relaxed">
            <JsonHighlight value={selected.body} />
          </pre>
          <button
            onClick={handleCopyRes}
            className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition px-2 py-1 rounded border border-white/8 hover:border-white/15 bg-[#0d0f14] opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            {copiedRes ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copiedRes ? "Copied" : "Copy"}
          </button>
        </div>

      </div>
    </div>
  );
}
