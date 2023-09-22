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
})
