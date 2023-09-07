import { z } from 'zod'

export const todoSchema = z.object({
	title: z
		.string()
		.min(2, { message: 'Minimun length of 2 characters' })
		.max(30, { message: 'Maximum length of 40 characters' }),

	completed: z
		.boolean()
})

export type TodoSchema = z.infer<typeof todoSchema>
