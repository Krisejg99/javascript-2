import { render, screen } from "@testing-library/react"
import TodoForm from "../TodoForm"
import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"

const fakeOnSave = async () => {
	return
}

const todoTitle = "This is my todo title"

const renderWithUserInteraction = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: React.ReactElement<any, string | React.JSXElementConstructor<any>>
) => {
	return {
		user: userEvent.setup(),
		...render(component)
	}
}

describe("Todo Form", () => {
	it('Renders input field initially empty', () => {
		render(<TodoForm onSave={fakeOnSave} />)
		const inputElement = screen.getByRole('textbox')
		expect(inputElement).toHaveValue('')
	})

	it("Can type into input field", async () => {
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		const inputElement: HTMLInputElement = screen.getByRole("textbox")

		await user.type(inputElement, todoTitle)

		expect(inputElement).toHaveValue(todoTitle)
	})

	it("Empties input field after clicking on the 'Save' button", async () => {
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		const inputElement: HTMLInputElement = screen.getByRole('textbox')
		const btnSaveElement: HTMLInputElement = screen.getByRole('button', {
			name: /save/i,
		})

		await user.type(inputElement, todoTitle)
		await user.click(btnSaveElement)

		expect(inputElement).toHaveValue('')
	})

	it("Empties input field after pressing enter", async () => {
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		const inputElement: HTMLInputElement = screen.getByRole('textbox')

		await user.type(inputElement, todoTitle)
		await user.type(inputElement, '{Enter}')

		expect(inputElement).toHaveValue('')
	})
})


describe("Todo Form validation", () => {
	it('Shows validation error if input is empty', async () => {
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		const inputElement: HTMLInputElement = screen.getByRole('textbox')

		await user.type(inputElement, '{Enter}')
		const errorMsgElement = screen.getByText(/write something at least/i || /Invalid value/i)

		expect(errorMsgElement).toBeInTheDocument()
	})

	it('Does not show validation error if input is valid', async () => {
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		const inputElement: HTMLInputElement = screen.getByRole('textbox')

		await user.type(inputElement, 'LOL')
		await user.type(inputElement, '{Enter}')
		const errorMsgElement = screen.getByText(/too short/i || /Invalid value/i)

		expect(errorMsgElement).toBeInTheDocument()
	})

	it('Does not show validation error if input is valid', async () => {
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		const inputElement = screen.getByRole('textbox')

		await user.type(inputElement, '{Enter}')
		const validationErrorElement = screen.queryByText(/too short/i || /Invalid value/i)

		expect(validationErrorElement).not.toBeInTheDocument()
	})
})
