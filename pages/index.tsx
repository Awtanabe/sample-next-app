import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useStore , todoStore} from '../libs/store';
import { use, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const store = useStore();
  const [todos, setTodos] = useState<todoStore['todos']>()
  const { fetchTodos, addTodo} = useStore((state) => state)

  useEffect(() => {
    const getTodos = async ()=> {
      const todos = await fetchTodos()
      if (todos) {
        setTodos(todos)
      }
    }
    getTodos()
  }, [todos])

  return (
    <>
    <div>home</div>
    {todos?.map((todo) => {
      return (<li key={todo.id}>{todo.title}</li>)
    })}

    </>
  )
}
