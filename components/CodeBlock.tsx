import React, { Children, isValidElement } from "react";
import { codeToHtml } from "shiki";
import CopyButton from "./CopyButton";

type PreProps = React.HTMLAttributes<HTMLPreElement>;

function extractCode(children: React.ReactNode): { code: string; language: string } {
  let code = "";
  let language = "";
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const el = child as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
    const match = (el.props.className ?? "").match(/language-(\w+)/);
    if (match) language = match[1];
    code = String(el.props.children ?? "").trimEnd();
  });
  return { code, language };
}

export default async function CodeBlock({ children, ...props }: PreProps) {
  const { code, language } = extractCode(children);

  if (language) {
    const html = await codeToHtml(code, {
      lang: language,
      theme: "one-dark-pro",
    });
    return (
      <div className="relative group my-5 rounded-lg overflow-hidden code-block-shiki">
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <CopyButton code={code} />
      </div>
    );
  }

  return (
    <div className="relative group my-5">
      <pre {...props}>{children}</pre>
      <CopyButton code={code} />
    </div>
  );
}
