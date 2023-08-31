import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { createBook } from '../services/BooksAPI'

const useCreateBook = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createBook,
		onError: () => {
			// 😳
			toast.warning(
				<>
					<strong>Something bad happened 😳!</strong><br />
					It was not possible to create the book. Please try again later.
				</>
			)
		},
		onSuccess: (newBook) => {
			// invalidate list of all books
			queryClient.invalidateQueries({
				queryKey: ["books"],
			})

			// invalidate the author that we created the book for
			queryClient.invalidateQueries({
				queryKey: ["author", { id: newBook.authorId }]
			})

			// 🥂
			toast.success(`Book "${newBook.title}" created 🤩`)
		}
	})
}

export default useCreateBook
