import { create } from "zustand";
import { postAPI, getAPI } from "@/services/fetchAPI";

interface Todo {
  id: string;
  content: string;
}

interface TodoStore {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (content: string) => Promise<void>;
  updateTodo: (id: string, content: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  fetchTodos: async () => {
    const data = await getAPI("/api/todo");
    set({ todos: data.data });
  },

  addTodo: async (content) => {
    await postAPI("/api/addtodo", content);
    await useTodoStore.getState().fetchTodos();
  },

  updateTodo: async (id, content) => {
    await postAPI(`/api/updatetodo/${id}`, content, "PUT");
    await useTodoStore.getState().fetchTodos();
  },

  deleteTodo: async (id) => {
    await postAPI(`/api/deletetodo/${id}`, "" , "DELETE");
    await useTodoStore.getState().fetchTodos();
  },
}));
