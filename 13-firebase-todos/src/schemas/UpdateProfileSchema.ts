import { z } from 'zod'

export const updateProfileSchema = z
	.object({
		displayName: z
			.string()
			.min(3, { message: 'Minimun length of 3 characters' })
			.max(40, { message: 'Maximum length of 40 characters' }),

		email: z
			.string()
			.min(5, { message: 'Minimun length of 5 characters' })
			.max(40, { message: 'Maximum length of 40 characters' }),

		password: z
			.string()
			.min(8, { message: 'Minimun length of 8 characters' })
			.max(30, { message: 'Maximum length of 40 characters' }),

		confirmPassword: z
			.string()
			.min(8, { message: 'Minimun length of 8 characters' })
			.max(30, { message: 'Maximum length of 40 characters' }),

		profileImage: z
			.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ['confirmPassword'],
	})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
