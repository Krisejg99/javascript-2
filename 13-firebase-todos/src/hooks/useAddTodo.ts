import { NewTodo } from '../types/Todo.types'
import { db } from '../services/firebase'
import { addDoc, collection } from 'firebase/firestore'

const useAddTodo = () => {
	const addTodo = async (todo: NewTodo) => {
		await addDoc(collection(db, 'todos'), todo)
	}

	return {
		addTodo
	}
}

export default useAddTodo
