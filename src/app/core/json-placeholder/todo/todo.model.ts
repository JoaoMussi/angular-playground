export interface JsonPlaceholderTodo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}

type JsonPlaceholderTodoFilterKeys = keyof JsonPlaceholderTodo;

export type JsonPlaceholderTodoFilter = Record<
  JsonPlaceholderTodoFilterKeys,
  string | number | boolean
>;
