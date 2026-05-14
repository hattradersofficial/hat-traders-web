import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="text-center px-4 py-20">
        <div className="text-8xl font-black text-orange-500 mb-4">404</div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-500 font-bold px-6 py-3 rounded-lg transition-all"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
