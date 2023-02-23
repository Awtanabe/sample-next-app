import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useStore , todoStore} from '../libs/store';
import { use, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const store = useStore();
  const { todos, fetchTodos, addTodo} = useStore((state) => state)

  const renderTodos = (todos: todoStore['todos']) => {
    if (todos.length == 0) {
      return "Todoを登録してください"
    } else {
      todos?.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>
      })
    }
  }
  return (
    <>
    <div className={styles.main}>
      <div>TodoApp</div>
      <form>
        <input type="text" />
        <br />
        <input type="text" name="title"/>
        <br />
        <input type="submit"/>
      </form>
      {renderTodos(todos)}
    </div>
    </>
  )
}
