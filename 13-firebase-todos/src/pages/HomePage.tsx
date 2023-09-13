import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { toast } from "react-toastify"
import useAuth from "../hooks/useAuth"

const HomePage = () => {
	const { currentUser } = useAuth()

	return (
		<>
			<h1>Firebase Todos</h1>
			<h2>Because when you're life is on fire, you need a todo list</h2>

			{currentUser
				? <p>You are logged in as {currentUser.email}</p>
				: <p>You are anonymous</p>
			}

			<ButtonGroup>
				<Button
					variant="danger"
					size="lg"
					onClick={() => {
						toast.error(
							"🚂 CHOO-CHOO, GET ON DA HYPE TRAIINNNN!!111"
						)
					}}
				>
					HYPE ME 🔥
				</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage
