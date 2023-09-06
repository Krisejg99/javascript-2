import { NewTodo } from '../types/Todo.types'
import { todosCol } from '../services/firebase'
import { addDoc } from 'firebase/firestore'

const useAddTodo = () => {
	const addTodo = async (todo: NewTodo) => {
		return await addDoc(todosCol, todo)
	}

	return {
		addTodo
	}
}

export default useAddTodo
