export default function AdSlot({ slot = "default" }: { slot?: string }) {
  return (
    <div className="w-full bg-surface-alt dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl flex items-center justify-center py-8 text-text-dark-muted text-sm" data-ad-slot={slot}>
      <span>Advertisement</span>
    </div>
  );
}
