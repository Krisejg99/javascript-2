import { z } from 'zod'

export const resetPasswordSchema = z.object({
	email: z
		.string()
		.min(5, { message: 'Minimun length of 5 characters' })
		.max(40, { message: 'Maximum length of 40 characters' }),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
