import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useStore , todoStore} from '../libs/store';
import { use, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const store = useStore();
  const { todos, addTodo, setSelectedTodo, updateTodo} = useStore((state) => state)
  const [ todoForm, setTodoForm ] = useState<todoStore['todos'][0] | null>()

  const [ title, setTitle ] = useState<string>("");
  const [ completed, setCompleted ] = useState<boolean>(false);
  const [ onEdit, setOnEdit ] = useState<boolean>(false)
  const [ editedTitle, setEditedTitle ] = useState<string>("");

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

  const handleEditedTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value)
  }

  const handleSelectedTodo = (todo: todoStore['todos'][0]) => {
    setSelectedTodo(todo.id)
    setEditedTitle(todo.title)
  }

  const Todo = (todo: todoStore['todos'][0]) => {
    if (todo.isSelected) {
      return <>
        <input type="text" value={editedTitle} onChange={(e) => handleEditedTodo(e)}/>
        <input type="submit" onClick={() => updateTodo(todo.id, editedTitle)}/>
      </>
    } else {
      return <>
        <li key={todo.id}>{todo.title}</li>
        <button onClick={() => handleSelectedTodo(todo)}>編集</button>
      </>
    }
  }

  const renderTodos = (todos: todoStore['todos']) => {
    if (todos.length == 0) {
      return "Todoを登録してください"
    } else {
      const newTodos = todos.filter(v => v)
      return newTodos.map((todo) => (Todo(todo)))
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
