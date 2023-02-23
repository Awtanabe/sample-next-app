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
  return (
    <>
    <div className={styles.main}>
      <div>TodoApp</div>
      {todos?.map((todo) => {
        return (<li key={todo.id}>{todo.title}</li>)
      })}
    </div>
    </>
  )
}
