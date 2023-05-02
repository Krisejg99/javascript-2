import { useState } from 'react'
import { Todo } from './types'
import './assets/scss/App.scss'

const App = () => {
	const [todos, setTodos] = useState([
		{ title: 'Eat', completed: true, id: 1 },
		{ title: 'Sleep', completed: true, id: 2 },
		{ title: 'Game', completed: false, id: 3 },
		{ title: 'Repeat', completed: false, id: 4 },
	])
	const [newTodoTitle, setNewTodoTitle] = useState('')

	const handleDeleteTodo = (clickedTodo: Todo) => setTodos(todos.filter(todo => todo !== clickedTodo))

	const handleRenderList = (completed: boolean) => {
		return (
			<ul className='list'>
				{todos
					.filter(todo => todo.completed === completed)
					.map(todo => (
						<li
							key={todo.id}
							className='list-item'
						>
							<span
								className='check-mark'
								onClick={() => handleToggleTodo(todo)}
								role='button'
							>
								{todo.completed ? '☑' : '☐'}
							</span>

							<p
								className={todo.completed ? 'todo-title completed' : 'todo-title'}
							>
								{todo.title}
							</p>

							<span
								className='delete-item'
								onClick={() => handleDeleteTodo(todo)}
								role='button'

							>
								❌
							</span>
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

					{todos.filter(todo => !todo.completed).length > 0
						? handleRenderList(false)
						: <p>Nothing to see here...</p>
					}
				</div>

				<div className='list-wrapper'>
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
					className='new-todo-input'
				/>

				<button className='create-todo-btn' type='submit'>Create</button>
			</form>

			{todos.length > 0 && (
				<p>{todos.filter(todo => todo.completed).length} / {todos.length} COMPLETED</p>
			)}
		</div>
	)
}

export default App
