import Alert from "react-bootstrap/Alert"

const NotFound = () => {
	return (
		<Alert variant="danger" className="text-center">
			Page not found<br />
			Error: 404
		</Alert>
	)
}

export default NotFound
