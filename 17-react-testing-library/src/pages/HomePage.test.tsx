import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HomePage from './HomePage'

describe('HomePage', () => {
	it('Welcomes the user on the home page', () => {
		render(<HomePage />)

		const headingElement = screen.getByText('Welcome!')

		expect(headingElement).exist
	})
})
