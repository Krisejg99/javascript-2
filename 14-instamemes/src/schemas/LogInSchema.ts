import { z } from 'zod'

export const logInSchema = z.object({
	email: z
		.string()
		.min(5, { message: 'Minimun length of 5 characters' })
		.max(40, { message: 'Maximum length of 40 characters' }),

	password: z
		.string()
		.min(8, { message: 'Minimun length of 8 characters' })
		.max(30, { message: 'Maximum length of 40 characters' }),
})

export type LogInSchema = z.infer<typeof logInSchema>
