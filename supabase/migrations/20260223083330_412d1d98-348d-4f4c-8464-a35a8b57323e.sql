
CREATE TABLE public.todos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.todos FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.todos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.todos FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.todos FOR DELETE USING (true);
