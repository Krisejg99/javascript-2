import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TodoCounter from '../components/TodoCounter'
import * as TodosAPI from '../services/TodosAPI'
import ListGroup from 'react-bootstrap/ListGroup'
import AutoDismissingAlert from '../components/AutoDismissingAlert'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert } from 'react-bootstrap'
import AddTodoForm from '../components/AddTodoForm'
import { Todo } from '../types'

const TodosPage = () => {
	const { data: todos, isError } = useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			const todos = await TodosAPI.getTodos()
			todos.sort((a, b) => a.title.localeCompare(b.title))
			return todos.sort((a, b) => Number(a.completed) - Number(b.completed))
		},
	})

	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (newTodo: Todo) => {
			return TodosAPI.createTodo(newTodo)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})

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
			<AddTodoForm
				onAddTodo={(newTodo) => mutation.mutate(newTodo)}
			/>

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
