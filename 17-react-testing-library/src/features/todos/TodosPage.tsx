import Container from "react-bootstrap/Container"
import { TodoFormData } from "../../types/Todo.types"
import { toast } from "react-toastify"
import TodoForm from "./TodoForm"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { add, toggle, remove } from "./todosSlice"
import { v4 as uuid } from 'uuid'
import TodoCounter from "./TodoCounter"
import TodoList from "./TodoList"

const TodosPage = () => {
	const todos = useAppSelector((state) => state.todos)
	const dispatch = useAppDispatch()

	const handleAddTodo = (data: TodoFormData) => {
		dispatch(add({ ...data, id: uuid() }))

		toast.success("Yay, even MORE stuff to do... 😁")
	}

	const handleToggle = (id: string) => {
		dispatch(toggle(id))

		toast.success("Yay, you did something... 😁")
	}

	const handleDelete = (id: string) => {
		dispatch(remove(id))

		toast.success("Deleting stuff instead of doing them still counts... 🏆")
	}

	return (
		<Container className="py-3">
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
			</div>

			<TodoForm onSave={handleAddTodo} />

			{todos && todos.length > 0 && (
				<TodoList
					todos={todos}
					onToggle={handleToggle}
					onDelete={handleDelete}
				/>
			)}

			{todos && <TodoCounter count={todos.filter(todo => !todo.completed).length} />}
		</Container>
	)
}

export default TodosPage
