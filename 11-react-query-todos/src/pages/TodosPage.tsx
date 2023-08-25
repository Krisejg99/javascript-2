import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TodoCounter from '../components/TodoCounter'
import ListGroup from 'react-bootstrap/ListGroup'
import AutoDismissingAlert from '../components/AutoDismissingAlert'
import { Alert } from 'react-bootstrap'
import useTodos from '../hooks/useTodos'

const TodosPage = () => {
	const { data: todos, isError } = useTodos()
	const location = useLocation()
	const completeTodos = todos?.filter(todo => todo.completed)

	useEffect(() => {
		if (!todos || !completeTodos) return

		document.title = `${completeTodos.length} / ${todos.length}`
	}, [todos, completeTodos])

	if (isError) {
		return <Alert variant='error'>Something went wrong, refresh the page.</Alert>
	}
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

					{todos && todos.length > 0 && (
						<ListGroup className="todolist">
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
					)}
				</div>
			</div>

			{todos && completeTodos && todos.length > 0 &&
				<TodoCounter
					todos={todos.length}
					completeTodos={completeTodos.length}
				/>}
		</>
	)
}

export default TodosPage
