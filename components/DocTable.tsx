import React from "react";

export function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 w-full overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function Thead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-b border-white/10 bg-white/[0.03]">{children}</thead>
  );
}

export function Tbody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Tr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-white/[0.06] last:border-0 transition-colors hover:bg-white/[0.025]">
      {children}
    </tr>
  );
}

export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="font-subheading px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-white/45 whitespace-nowrap">
      {children}
    </th>
  );
}

export function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-white/70 align-top">{children}</td>
  );
}

// --- DataTable ---

type Column =
  | string
  | { label: string; align?: "left" | "center" | "right" };

type DataTableProps = {
  columns: Column[];
  rows: (React.ReactNode)[][];
};

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function DataTable({ columns, rows }: DataTableProps) {
  const cols = columns.map((c) =>
    typeof c === "string" ? { label: c, align: "left" as const } : c
  );

  return (
    <div className="not-prose my-6 w-full overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10 bg-white/[0.03]">
          <tr>
            {cols.map((col) => (
              <th
                key={col.label}
                className={`font-subheading px-4 py-3 text-[10px] font-medium uppercase tracking-[0.15em] text-white/45 whitespace-nowrap ${
                  alignClass[col.align ?? "left"]
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/[0.06] last:border-0 transition-colors hover:bg-white/[0.025]"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 text-white/70 align-top ${
                    alignClass[cols[j]?.align ?? "left"]
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
