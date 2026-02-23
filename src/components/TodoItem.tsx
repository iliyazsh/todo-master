import { useState } from "react";
import { Check, Pencil, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/hooks/useTodos";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updates: Partial<Todo> & { id: string }) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate({ id: todo.id, title: title.trim(), description: description.trim() });
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setEditing(false);
  };

  const formattedDate = new Date(todo.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (editing) {
    return (
      <div className="p-4 rounded-xl bg-card border border-primary/20 todo-card-shadow space-y-3 animate-in fade-in duration-200">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-medium bg-background border-border"
          autoFocus
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="bg-background border-border resize-none"
          rows={2}
        />
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X className="w-4 h-4 mr-1" /> Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!title.trim()} className="bg-primary text-primary-foreground">
            <Save className="w-4 h-4 mr-1" /> Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group p-4 rounded-xl bg-card border border-border todo-card-shadow hover:todo-card-shadow-hover transition-all duration-200 ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={(checked) =>
            onUpdate({ id: todo.id, completed: checked === true })
          }
          className="mt-1 h-5 w-5 rounded-full border-2 data-[state=checked]:bg-success data-[state=checked]:border-success"
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-card-foreground leading-snug ${
              todo.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {todo.description}
            </p>
          )}
          <span className="text-xs text-muted-foreground mt-2 block">{formattedDate}</span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setEditing(true)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(todo.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
