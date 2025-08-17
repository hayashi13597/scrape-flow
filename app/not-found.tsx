"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-tr from-primary/40 via-muted to-accent/40 rounded-full w-[22rem] h-[22rem] mx-auto" />
        <span className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          404 • Page not found
        </span>
      </div>

      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        This page has gone missing
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          Go to dashboard
        </Link>
        <button
          type="button"
          onClick={() =>
            typeof window !== "undefined" ? window.history.back() : null
          }
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          Go back
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 w-full max-w-3xl">
        <div className="rounded-lg border p-4 text-left">
          <div className="text-sm font-semibold">Check the URL</div>
          <div className="text-sm text-muted-foreground">
            Make sure there are no typos.
          </div>
        </div>
        <div className="rounded-lg border p-4 text-left">
          <div className="text-sm font-semibold">Use navigation</div>
          <div className="text-sm text-muted-foreground">
            Explore sections from the sidebar.
          </div>
        </div>
        <div className="rounded-lg border p-4 text-left">
          <div className="text-sm font-semibold">Return home</div>
          <div className="text-sm text-muted-foreground">
            Start fresh from the dashboard.
          </div>
        </div>
      </div>
    </div>
  );
}
