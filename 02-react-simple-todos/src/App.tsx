import { useEffect, useState } from 'react'
import { Todo } from './types'
import TodoListItem from './components/TodoListItem'
import './assets/scss/App.scss'
import TodoCounter from './components/TodoCounter'

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
	const todoCount = `${completeTodos.length} / ${todos.length} COMPLETED`

	useEffect(() => {
		document.title = todoCount
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
						? (
							<ul className='list'>
								{todos
									.filter(todo => todo.completed === false)
									.map(todo => (
										<TodoListItem
											todo={todo}
											handleToggleTodo={handleToggleTodo}
											handleDeleteTodo={handleDeleteTodo}
											key={todo.id}
										/>
									))}
							</ul>
						)
						: <p>Nothing to see here...</p>
					}
				</div>

				<div className='list-wrapper'>
					<h1>Completed</h1>

					{completeTodos.length > 0
						? (
							<ul className='list'>
								{todos
									.filter(todo => todo.completed === true)
									.map(todo => (
										<TodoListItem
											todo={todo}
											handleToggleTodo={handleToggleTodo}
											handleDeleteTodo={handleDeleteTodo}
											key={todo.id}
										/>
									))}
							</ul>
						)
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

			<TodoCounter todoCount={todoCount} />
		</div>
	)
}

export default App
