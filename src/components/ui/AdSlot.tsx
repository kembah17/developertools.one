export default function AdSlot({ slot = "default" }: { slot?: string }) {
  return (
    <div className="w-full bg-surface-alt dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl flex items-center justify-center py-8 text-sm" data-ad-slot={slot}>
      <span className="text-muted dark:text-[#CBD5E1]">Advertisement</span>
    </div>
  );
}
