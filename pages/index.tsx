import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useStore , todoStore} from '../libs/store';
import { use, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const store = useStore();
  const { todos, addTodo} = useStore((state) => state)
  const [ todoForm, setTodoForm ] = useState<todoStore['todos'][0] | null>()

  const [ title, setTitle ] = useState<string>("");
  const [ completed, setCompleted ] = useState<boolean>(false);

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const changeCompletedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked)
  }

  const submitTodo = (e: React.FormEvent<HTMLFormElement>, addTodo: todoStore['addTodo'], todos: todoStore['todos'], title: todoStore['todos'][0]['title'], completed: todoStore['todos'][0]['completed']) => {
    e.preventDefault();
    const id = todos.length += 1;
    const newTodo = { id, title, completed }
    addTodo(newTodo)
    setTitle('')
    setCompleted(false)
  }

  const renderTodos = (todos: todoStore['todos']) => {
    if (todos.length == 0) {
      return "Todoを登録してください"
    } else {
      const newTodos = todos.filter(v => v)
      return newTodos.map((todo) => (<li key={todo.id}>{todo.title}</li>))
    }
  }
  return (
    <>
    <div className={styles.main}>
      <div>TodoApp</div>
      <form onSubmit={(e) => submitTodo(e,addTodo, todos, title, completed)}>
        <input type="text"  value={title} onChange={changeTitleHandler}/>
        <br />
        <input type="checkbox" checked={completed} onChange={changeCompletedHandler}/>
        <br />
        <input type="submit"/>
      </form>

      <ul>
        {renderTodos(todos)}
      </ul>
    </div>
    </>
  )
}
