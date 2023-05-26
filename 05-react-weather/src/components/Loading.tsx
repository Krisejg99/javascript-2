interface IProps {
	img: string
}

const Loading: React.FC<IProps> = ({ img }) => {
	return (
		<img src={img} alt="Airplane animation" className='img-fluid py-5 w-100' />
	)
}

export default Loading
