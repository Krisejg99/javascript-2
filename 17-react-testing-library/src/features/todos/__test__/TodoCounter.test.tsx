import { render, screen } from "@testing-library/react"
import TodoCounter from "../TodoCounter"
import { describe, it, expect } from "vitest"

describe("Todo Counter", () => {
	it("Shows correct count with no todos", () => {
		render(<TodoCounter count={0} />)
		const textElement = screen.getByText(/0 todos/i)
		expect(textElement).toBeInTheDocument()
	})

	it("Shows correct count with a single todo", () => {
		render(<TodoCounter count={1} />)
		const textElement = screen.getByText(/1 todo left/i)
		expect(textElement).toBeInTheDocument()
	})

	it("Shows correct count with multiple todos", () => {
		render(<TodoCounter count={5} />)
		const textElement = screen.getByText(/5 todos/i)
		expect(textElement).toBeInTheDocument()
	})
})
