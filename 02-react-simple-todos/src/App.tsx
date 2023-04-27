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

	const handleToggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed
		setTodos([...todos])
	}

	return (
		<div className="App">
			<h1>Todos</h1>

			<ul>
				{todos.map(todo => (
					<li
						className={todo.completed ? 'completed' : ''}
						onClick={() => handleToggleTodo(todo)}
					>{todo.title}
					</li>
				))}
			</ul>

			<form>
				<input
					type="text"
					placeholder='Create a todo...'
					required
				/>

				<button>Create</button>
			</form>
		</div>
	)
}

export default App
