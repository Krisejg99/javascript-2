import { useEffect, useState } from 'react'
import { Todo } from '../types'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TodoCounter from '../components/TodoCounter'
import * as TodosAPI from '../services/TodosAPI'
import ListGroup from 'react-bootstrap/ListGroup'
import AutoDismissingAlert from '../components/AutoDismissingAlert'

const TodosPage = () => {
	const [todos, setTodos] = useState<Todo[]>([])

	const location = useLocation()
	// const navigate = useNavigate()

	const getTodos = async () => {
		const data = await TodosAPI.getTodos()

		data.sort((a, b) => a.title.localeCompare(b.title))
		data.sort((a, b) => Number(a.completed) - Number(b.completed))

		setTodos(data)
	}

	const completeTodos = todos.filter(todo => todo.completed)

	useEffect(() => {
		document.title = `${completeTodos.length} / ${todos.length}`
	}, [completeTodos.length, todos.length])

	useEffect(() => {
		getTodos()

		// if (location.state?.message) {
		// 	setTimeout(() => {
		// 		navigate(location.pathname, { state: null })
		// 	}, 3000)
		// }
	}, [])

	return (
		<>
			{location.state?.message && (
				<AutoDismissingAlert
					variant='success'
					hideAfter={3}
				>
					{location.state.message}
				</AutoDismissingAlert>
			)}

			<div className='lists-container'>
				<div className='list-wrapper'>
					<h1>Todos</h1>

					{todos && todos.length > 0
						? <ListGroup className="todolist">
							{todos.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									key={todo.id}
									to={`/todos/${todo.id}`}
									className={todo.completed ? 'completed' : ''}
								>
									{todo.title}
								</ListGroup.Item>
							))}
						</ListGroup>

						: <p>Nothing to see here...</p>
					}
				</div>
			</div>

			{todos.length > 0 &&
				<TodoCounter
					todos={todos.length}
					completeTodos={completeTodos.length}
				/>}
		</>
	)
}

export default TodosPage
