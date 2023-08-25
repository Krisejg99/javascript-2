import { Todo } from "../types"

const sortTodos = (todos: Todo[]) => {
	todos.sort((a, b) => a.title.localeCompare(b.title))
	return todos.sort((a, b) => Number(a.completed) - Number(b.completed))
}

export default sortTodos
