import { useState } from 'react'
import './App.css'

type Todo = {
	title: string
	id: number
}

const todoList: Todo[] = [
	{ title: 'Eat', id: 1 },
	{ title: 'Sleep', id: 2 },
	{ title: 'Game', id: 3 },
	{ title: 'Repeat', id: 4 },
]

function App() {
	const [todos, setTodos] = useState(todoList)

	return (
		<div className="App">
			<h1>Todos</h1>

			<ul>

			</ul>
		</div>
	)
}

export default App
