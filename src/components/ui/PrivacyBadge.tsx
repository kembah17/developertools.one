export default function PrivacyBadge() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-accent/10 dark:bg-accent/20 border border-accent/30 rounded-xl text-sm">
      <span className="text-lg">🔒</span>
      <span className="text-text-light dark:text-text-dark">All processing happens in your browser. No data is sent to any server.</span>
    </div>
  );
}
