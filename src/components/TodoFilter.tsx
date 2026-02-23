import { Button } from "@/components/ui/button";

type FilterValue = null | boolean;

interface TodoFilterProps {
  filter: FilterValue;
  onChange: (filter: FilterValue) => void;
  counts: { all: number; active: number; completed: number };
}

const filters: { label: string; value: FilterValue }[] = [
  { label: "All", value: null },
  { label: "Active", value: false },
  { label: "Completed", value: true },
];

export function TodoFilter({ filter, onChange, counts }: TodoFilterProps) {
  const getCount = (v: FilterValue) =>
    v === null ? counts.all : v ? counts.completed : counts.active;

  return (
    <div className="flex gap-1 bg-muted rounded-lg p-1">
      {filters.map((f) => (
        <Button
          key={f.label}
          variant={filter === f.value ? "default" : "ghost"}
          size="sm"
          onClick={() => onChange(f.value)}
          className={
            filter === f.value
              ? "bg-card text-card-foreground shadow-sm hover:bg-card"
              : "text-muted-foreground hover:text-foreground"
          }
        >
          {f.label}
          <span className="ml-1.5 text-xs opacity-60">{getCount(f.value)}</span>
        </Button>
      ))}
    </div>
  );
}
