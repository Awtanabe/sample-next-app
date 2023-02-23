import create from "zustand";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  completed: boolean
  isSelected?: boolean
}

export type todoStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  setSelectedTodo: (id: number) => void;
  updateTodo: (id: number, title: Todo['title']) => void;
  updateCompletedTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const useStore = create<todoStore>((set, get) => ({
  todos: [],
  addTodo: (todo) => {
    const newTodo = {...todo}
    set((state) => {
      return { todos: [...state.todos, newTodo] }
    })
  },
  setSelectedTodo: (id: number) => {
    set(({ todos }) => ({
      todos: todos.filter(v=>v).map((t) => {
        if (t.id == id) {
          const newTodo = { ...t, isSelected: true}
          return newTodo
        } 

        return { ...t, isSelected: false}
      })
    }))
  },
  updateTodo:(id: number, title: Todo['title']) => {
    set(({todos}) => ({
      todos: todos.filter(v=>v).map((t) => {
        if (t.id == id) {
          const newTodo = { ...t, title, isSelected: false}
          return newTodo
        } 

        return t
      })
    }))
  },
  updateCompletedTodo: (id: number) => {
    set(({ todos }) => ({
      todos: todos.filter(v=>v).map((t) => {
        if (t.id == id) {
          const newTodo = { ...t, completed: !t.completed}
          return newTodo
        } 

        return t
      })
    }))
  },
  deleteTodo: (id: number) => {
    // ({ todos }) は、const { todos } = storeなんじゃないか？
    set(({ todos }) => ({
      todos: todos.filter(todo => todo && todo.id != id)
    }))
  }
}))