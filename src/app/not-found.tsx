import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-4">Page Not Found</h2>
        <p className="text-text-light dark:text-text-dark-muted mb-8 max-w-md mx-auto">The page you are looking for does not exist or has been moved. Try one of our developer tools instead.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-surface font-medium rounded-lg transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
