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

	const handleDeleteTodo = (ClickedTodo: Todo) => setTodos(todos.filter(todo => todo !== ClickedTodo))

	const handleRenderList = (completed: boolean) => {
		return (
			<ul>
				{todos
					.filter(todo => todo.completed === completed)
					.map(todo => (
						<li key={todo.id}>
							<button
								className='check-mark'
								onClick={() => handleToggleTodo(todo)}
							>
								{todo.completed ? '☑' : '☐'}
							</button>

							<p
								className={todo.completed ? 'completed' : ''}
								onClick={() => handleToggleTodo(todo)}
							>
								{todo.title}
							</p>

							<button
								className='deleteBtn'
								onClick={() => handleDeleteTodo(todo)}
							>
								❌
							</button>
						</li>
					))}
			</ul>
		)
	}

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault()

		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
			id: todos.reduce((maxId, todo) => todo.id > maxId ? todo.id : maxId, 0) + 1,
		}

		setTodos(prevTodos => [...prevTodos, newTodo])
		setNewTodoTitle('')
	}

	const handleToggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed
		setTodos([...todos])
	}

	return (
		<div className="App">
			<div className='container'>
				<div>
					<h1>Todos</h1>

					{todos.filter(todo => !todo.completed).length > 0
						? handleRenderList(false)
						: <p>Nothing to see here...</p>
					}
				</div>

				<div>
					<h1>Completed</h1>

					{todos.filter(todo => todo.completed).length > 0
						? handleRenderList(true)
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
				/>

				<button>Create</button>
			</form>

			{todos.length > 0 && <p>{todos.filter(todo => todo.completed).length} / {todos.length} COMPLETED</p>}
		</div >
	)
}

export default App
