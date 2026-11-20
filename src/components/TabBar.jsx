// Reusable tab strip. `tabs` is a list of { id, label }; `active` is the id of the tab showing now.
// The parent decides what each tab shows, so this component only draws the buttons and reports clicks.
export default function TabBar({ tabs, active, onChange }) {
  return (
    <div role="tablist" className="flex gap-6 border-b-2 border-ink">
      {tabs.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={`font-display text-lg font-semibold pb-3 -mb-[2px] border-b-4 transition-colors ${
              selected ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
