import create from "zustand";
import axios, { AxiosResponse } from "axios";
import { SetStateAction } from "react";

type bearStore = {
	bears: number;
	increasePopulation: () => void;
	removeAllBears: () => void;
}




// export const useBearStore = create<bearStore>((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}

export type todoStore = {
  todos: Todo[];
  fetchTodos: () => Promise<Todo[]>;
  addTodo: (todo: Todo) => void;
}
// Promise<Response>

// https://jsonplaceholder.typicode.com/todos
const fetchTodos = async () => {
  // axios('https://jsonplaceholder.typicode.com/todos')
  // .then((res) => res.data)
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