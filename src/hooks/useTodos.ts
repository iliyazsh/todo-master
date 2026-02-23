import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export function useTodos(filterCompleted?: boolean | null) {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos", filterCompleted],
    queryFn: async () => {
      let query = supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (filterCompleted === true) query = query.eq("completed", true);
      if (filterCompleted === false) query = query.eq("completed", false);

      const { data, error } = await query;
      if (error) throw error;
      return data as Todo[];
    },
  });

  const addTodo = useMutation({
    mutationFn: async ({ title, description }: { title: string; description: string }) => {
      const { data, error } = await supabase
        .from("todos")
        .insert({ title, description })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateTodo = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Todo> & { id: string }) => {
      const { data, error } = await supabase
        .from("todos")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return { todosQuery, addTodo, updateTodo, deleteTodo };
}
