import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddTodoFormProps {
  onAdd: (title: string, description: string) => void;
  isLoading: boolean;
}

export function AddTodoForm({ onAdd, isLoading }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    setShowDescription(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 h-12 text-base bg-card border-border focus-visible:ring-primary"
        />
        <Button
          type="submit"
          disabled={!title.trim() || isLoading}
          className="h-12 px-5 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add
        </Button>
      </div>
      {!showDescription ? (
        <button
          type="button"
          onClick={() => setShowDescription(true)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          + Add description
        </button>
      ) : (
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-card border-border focus-visible:ring-primary resize-none"
          rows={2}
        />
      )}
    </form>
  );
}
