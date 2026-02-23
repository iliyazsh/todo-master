import { useState } from "react";
import { CheckSquare } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";
import { AddTodoForm } from "@/components/AddTodoForm";
import { TodoItem } from "@/components/TodoItem";
import { TodoFilter } from "@/components/TodoFilter";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [filter, setFilter] = useState<boolean | null>(null);
  const { todosQuery, addTodo, updateTodo, deleteTodo } = useTodos(filter);
  const { toast } = useToast();

  // For counts, fetch all todos
  const allTodos = useTodos(null).todosQuery.data ?? [];
  const counts = {
    all: allTodos.length,
    active: allTodos.filter((t) => !t.completed).length,
    completed: allTodos.filter((t) => t.completed).length,
  };

  const handleAdd = (title: string, description: string) => {
    addTodo.mutate(
      { title, description },
      {
        onSuccess: () => toast({ title: "Todo added" }),
        onError: () => toast({ title: "Failed to add todo", variant: "destructive" }),
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Todo App</h1>
            <p className="text-sm text-muted-foreground">Stay organized, get things done</p>
          </div>
        </div>

        {/* Add Form */}
        <div className="mb-6">
          <AddTodoForm onAdd={handleAdd} isLoading={addTodo.isPending} />
        </div>

        {/* Filter */}
        <div className="mb-4">
          <TodoFilter filter={filter} onChange={setFilter} counts={counts} />
        </div>

        {/* List */}
        <div className="space-y-2">
          {todosQuery.isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : todosQuery.data?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {filter === null
                  ? "No todos yet. Add one above!"
                  : filter
                  ? "No completed todos"
                  : "No active todos"}
              </p>
            </div>
          ) : (
            todosQuery.data?.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={(updates) =>
                  updateTodo.mutate(updates, {
                    onError: () =>
                      toast({ title: "Failed to update", variant: "destructive" }),
                  })
                }
                onDelete={(id) =>
                  deleteTodo.mutate(id, {
                    onSuccess: () => toast({ title: "Todo deleted" }),
                    onError: () =>
                      toast({ title: "Failed to delete", variant: "destructive" }),
                  })
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
