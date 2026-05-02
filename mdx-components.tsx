import type { MDXComponents } from "mdx/types";
import React from "react";
import { slugify } from "@/lib/slugify";
import {
  TableWrapper,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  DataTable,
} from "@/components/DocTable";
import CodeBlock from "@/components/CodeBlock";
import ApiEndpoint from "@/components/ApiEndpoint";

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node))
    return extractText(
      (node.props as { children?: React.ReactNode }).children
    );
  return "";
}

function makeHeading(Tag: "h2" | "h3") {
  return function Heading({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    const id = (props.id as string) ?? slugify(extractText(children));
    return (
      <Tag id={id} {...props}>
        {children}
      </Tag>
    );
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: makeHeading("h2"),
    h3: makeHeading("h3"),
    pre: (props) => <CodeBlock {...props} />,
    table: ({ children }) => <TableWrapper>{children}</TableWrapper>,
    thead: ({ children }) => <Thead>{children}</Thead>,
    tbody: ({ children }) => <Tbody>{children}</Tbody>,
    tr: ({ children }) => <Tr>{children}</Tr>,
    th: ({ children }) => <Th>{children}</Th>,
    td: ({ children }) => <Td>{children}</Td>,
    DataTable,
    ApiEndpoint,
  };
}
