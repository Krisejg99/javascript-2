import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface IProps {
	children: React.ReactNode
	show: boolean
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmationModal: React.FC<IProps> = ({ children, show, onConfirm, onCancel }) => {
	return (
		<Modal show={show} onHide={onCancel}>
			<Modal.Header closeButton>
				<Modal.Title>Are you sure?</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onCancel}>
					Cancel
				</Button>
				<Button variant="danger" onClick={onConfirm}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ConfirmationModal
