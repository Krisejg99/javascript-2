import { useEffect, useState } from 'react'
import { Todo } from '../types'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TodoCounter from '../components/TodoCounter'
import * as TodosAPI from '../services/TodosAPI'
import ListGroup from 'react-bootstrap/ListGroup'
import Success from '../components/Sucess'

const TodosPage = () => {
	const [todos, setTodos] = useState<Todo[]>([])
	const [deletedTodo, setDeletedTodo] = useState<Todo | null>(null)


	const location = useLocation()
	const navigate = useNavigate()

	const getTodos = async () => {
		const data = await TodosAPI.getTodos()
		setTodos(data)
	}

	const completeTodos = todos.filter(todo => todo.completed)
	const incompleteTodos = todos.filter(todo => !todo.completed)

	useEffect(() => {
		document.title = `${completeTodos.length} / ${todos.length}`
	}, [completeTodos.length, todos.length])

	useEffect(() => {
		getTodos()

		if (location.state) {
			setDeletedTodo(location.state)

			navigate(location.pathname, { state: null })

			setTimeout(() => {
				setDeletedTodo(null)
			}, 5000)
		}
	}, [])

	return (
		<>
			{deletedTodo &&
				<Success successMsg={`Deleted todo: ${deletedTodo.title}`} />
			}

			<div className='lists-container'>
				<div className='list-wrapper'>
					<h1>Todos</h1>

					{incompleteTodos.length > 0
						? <ListGroup className="todolist">
							{incompleteTodos.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									key={todo.id}
									to={`/todos/${todo.id}`}
								>
									{todo.title}
								</ListGroup.Item>
							))}
						</ListGroup>

						: <p>Nothing to see here...</p>
					}
				</div>

				<div className='list-wrapper'>
					<h1>Completed</h1>

					{completeTodos.length > 0
						? <ListGroup className="todolist">
							{completeTodos.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									key={todo.id}
									to={`/todos/${todo.id}`}
								>
									{todo.title}
								</ListGroup.Item>
							))}
						</ListGroup>

						: <p>I'm too good!</p>
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
