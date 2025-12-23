import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <p className="opacity-80">That page doesn't exist.</p>
      <Link className="underline" href="/">Go home</Link>
    </div>
  );
}
