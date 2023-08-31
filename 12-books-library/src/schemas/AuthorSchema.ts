import { z } from 'zod'

export const authorSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Name must be at least 3 characters' })
		.max(20, { message: 'Too long, max 20 characters' }),

	date_of_birth: z
		.string(),
})

export type AuthorSchema = z.infer<typeof authorSchema>
