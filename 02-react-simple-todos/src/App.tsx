import { useEffect, useState } from 'react'
import { Todo } from './types'
import './assets/scss/App.scss'
import TodoCounter from './components/TodoCounter'
import TodoList from './components/TodoList'

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([
		{ title: 'Eat', completed: true, id: 1 },
		{ title: 'Sleep', completed: true, id: 2 },
		{ title: 'Game', completed: false, id: 3 },
		{ title: 'Repeat', completed: false, id: 4 },
	])
	const [newTodoTitle, setNewTodoTitle] = useState('')

	const completeTodos = todos.filter(todo => todo.completed)
	const incompleteTodos = todos.filter(todo => !todo.completed)

	useEffect(() => {
		document.title = `${completeTodos.length} / ${todos.length}`
	}, [completeTodos.length, todos.length])

	const handleDeleteTodo = (clickedTodo: Todo) => setTodos(todos.filter(todo => todo !== clickedTodo))

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault()

		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
			id: todos.reduce((maxId, todo) => todo.id > maxId ? todo.id : maxId, 0) + 1,
		}

		setTodos(todos => [...todos, newTodo])
		setNewTodoTitle('')
	}

	const handleToggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed
		setTodos([...todos])
	}

	return (
		<div className="App">
			<div className='lists-container'>
				<div className='list-wrapper'>
					<h1>Todos</h1>

					{incompleteTodos.length > 0
						? <TodoList
							todos={todos}
							handleToggleTodo={handleToggleTodo}
							handleDeleteTodo={handleDeleteTodo}
							completed={false}
						/>

						: <p>Nothing to see here...</p>
					}
				</div>

				<div className='list-wrapper'>
					<h1>Completed</h1>

					{completeTodos.length > 0
						? <TodoList
							todos={todos}
							handleToggleTodo={handleToggleTodo}
							handleDeleteTodo={handleDeleteTodo}
							completed={true}
						/>

						: <p>I'm too good!</p>
					}
				</div>
			</div>

			<form
				className='todo-form'
				onSubmit={handleSubmitForm}
			>
				<input
					type="text"
					placeholder='Create a todo...'
					required
					onChange={e => setNewTodoTitle(e.target.value)}
					value={newTodoTitle}
					className='new-todo-input'
				/>

				<button className='create-todo-btn' type='submit'>Create</button>
			</form>

			{todos.length > 0 &&
				<TodoCounter
					todos={todos.length}
					completeTodos={completeTodos.length}
				/>}
		</div>
	)
}

export default App
