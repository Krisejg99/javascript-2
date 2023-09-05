import { doc, updateDoc } from "firebase/firestore"
import { PartialTodo } from "../types/Todo.types"
import { db } from "../services/firebase"

const useEditTodo = (refetch: () => void) => {
	const editTodo = async (id: string, data: PartialTodo) => {
		await updateDoc(doc(db, 'todos', id), data)
		refetch()
	}

	return {
		editTodo
	}
}

export default useEditTodo
