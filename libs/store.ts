import create from "zustand";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  completed: boolean
}

export type todoStore = {
  todos: Todo[];
  fetchTodos: () => Promise<Todo[]>;
  addTodo: (todo: Todo) => void;
}

export const useStore = create<todoStore>((set, get) => ({
  todos: [],
  fetchTodos: async () => {
    const response = await axios('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.data)
    return response
  },
  addTodo: (todo) => {
    const newTodo = {...todo}
    set((state) => ({ todos: [...state.todos, newTodo] }))
  },
}))