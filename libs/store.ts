import create from "zustand";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  completed: boolean
}

export type todoStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
}

export const useStore = create<todoStore>((set, get) => ({
  todos: [],
  addTodo: (todo) => {
    const newTodo = {...todo}
    set((state) => {
      return { todos: [...state.todos, newTodo] }
    })
  },
}))