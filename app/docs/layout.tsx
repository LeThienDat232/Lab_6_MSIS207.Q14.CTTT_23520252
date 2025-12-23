import AskWidget from "./AskWidget";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-10">
      {children}
      <AskWidget />
    </div>
  );
}
