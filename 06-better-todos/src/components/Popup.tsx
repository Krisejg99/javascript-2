import React from 'react'

interface IProps {
	msg: string
	type: 'success' | 'danger'
}

const Popup: React.FC<IProps> = ({ msg, type }) => {
	return <div className={`alert alert-${type}`} role='alert'>{msg}</div>
}

export default Popup
