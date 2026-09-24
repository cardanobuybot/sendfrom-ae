import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="muted mt-2">The page you asked for doesn't exist here.</p>
      <div className="mt-6"><Link href="/" className="btn btn-primary">← Back home</Link></div>
    </>
  );
}
