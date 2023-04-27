import { useState } from 'react'
import './App.css'

type Todo = {
	title: string
	completed: boolean
	id: number
}

function App() {
	const [todos, setTodos] = useState([
		{ title: 'Eat', completed: true, id: 1 },
		{ title: 'Sleep', completed: true, id: 2 },
		{ title: 'Game', completed: false, id: 3 },
		{ title: 'Repeat', completed: false, id: 4 },
	])
	const [newTodoTitle, setNewTodoTitle] = useState('')

	const handleToggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed
		setTodos([...todos])
	}

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault()

		const newTodoId = todos.reduce((maxId, todo) => (todo.id > maxId) ? todo.id : maxId, 0) + 1

		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
			id: newTodoId,
		}

		setTodos([...todos, newTodo])
		setNewTodoTitle('')
	}

	return (
		<div className="App">
			<h1>Todos</h1>

			<ul>
				{todos.map(todo => (
					<li
						key={todo.id}
						className={todo.completed ? 'completed' : ''}
						onClick={() => handleToggleTodo(todo)}
					>
						{todo.title}
					</li>
				))}
			</ul>

			<form onSubmit={handleSubmitForm}>
				<input
					type="text"
					placeholder='Create a todo...'
					required
					onChange={e => setNewTodoTitle(e.target.value)}
					value={newTodoTitle}
				/>

				<button>Create</button>
			</form>
		</div>
	)
}

export default App
