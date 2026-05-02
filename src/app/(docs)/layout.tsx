import DocSidebar from "@/components/DocSidebar";
import TableOfContents from "@/components/TableOfContents";
import DocPagination from "@/components/DocPagination";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DocSidebar />
      <div className="flex flex-1 min-w-0">
        <article className="flex-1 min-w-0 px-6 py-10 md:px-10">
          <div className="prose prose-invert docs-prose max-w-none xl:max-w-3xl">
            {children}
          </div>
          <DocPagination />
        </article>
        <TableOfContents />
      </div>
    </div>
  );
}
