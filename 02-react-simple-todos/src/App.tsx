import { useEffect, useState } from 'react'
import { Todo } from './types'
import './assets/scss/App.scss'
import TodoCounter from './components/TodoCounter'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import * as TodosAPI from './services/TodosAPI'

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([])

	const getTodos = async () => {
		const data = await TodosAPI.getTodos()
		setTodos(data)
	}

	const completeTodos = todos.filter(todo => todo.completed)
	const incompleteTodos = todos.filter(todo => !todo.completed)

	const handleAddTodo = async (newTodo: Todo) => {
		await TodosAPI.createTodo(newTodo)
		getTodos()
	}

	const handleDeleteTodo = async (todo: Todo) => {
		if (!todo.id) return

		await TodosAPI.deleteTodo(todo.id)
		getTodos()
	}

	const handleToggleTodo = async (todo: Todo) => {
		if (!todo.id) return

		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})
		getTodos()
	}

	useEffect(() => {
		document.title = `${completeTodos.length} / ${todos.length}`
	}, [completeTodos.length, todos.length])

	useEffect(() => {
		getTodos()
	}, [])

	return (
		<div className="App">
			<div className='lists-container'>
				<div className='list-wrapper'>
					<h1>Todos</h1>

					{incompleteTodos.length > 0
						? <TodoList
							todos={incompleteTodos}
							onToggle={handleToggleTodo}
							onDelete={handleDeleteTodo}
						/>

						: <p>Nothing to see here...</p>
					}
				</div>

				<div className='list-wrapper'>
					<h1>Completed</h1>

					{completeTodos.length > 0
						? <TodoList
							todos={completeTodos}
							onToggle={handleToggleTodo}
							onDelete={handleDeleteTodo}
						/>

						: <p>I'm too good!</p>
					}
				</div>
			</div>

			<AddTodoForm
				onAddTodo={handleAddTodo}
			/>

			{todos.length > 0 &&
				<TodoCounter
					todos={todos.length}
					completeTodos={completeTodos.length}
				/>}
		</div>
	)
}

export default App
