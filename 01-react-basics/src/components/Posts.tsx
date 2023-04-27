import { useState } from 'react'

type Post = {
	id: number
	title: string
	likes: number
}

const Posts = () => {
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: 'React Rocks!', likes: 420 },
		{ id: 2, title: 'TypeScript is lit!', likes: 1337 },
		{ id: 3, title: 'CSS?...', likes: 69 },
	])
	const [newPostTitle, setNewPostTitle] = useState('')

	const handleAddLike = (post: Post) => {
		post.likes++
		setPosts([...posts])
	}

	const handleDeletePost = (clickedPost: Post) => {
		setPosts(posts.filter(post => post !== clickedPost))
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		e.target.input

		const newPost: Post = {
			id: 4,
			title: newPostTitle,
			likes: 0,
		}

		setPosts([...posts, newPost])
		setNewPostTitle('')
	}

	return (
		<>
			<h2>Posts</h2>

			<form onSubmit={handleFormSubmit} className="mb-3">
				<div className="input-group mb-3">
					<input
						required
						type="text"
						className="form-control"
						placeholder="Post title"
						onChange={e => setNewPostTitle(e.target.value)}
						value={newPostTitle}
					/>

					<button type="submit" className="btn btn-primary">Create</button>
				</div>

				{newPostTitle.length > 0 && newPostTitle.length < 5 && (
					<div className="form-text text-warning">Title has to be at least 5 chars.</div>
				)}
			</form>

			{
				posts.length > 0
					? (
						<ul>
							{posts.map((post, index) => (
								<li key={index} className='my-2'>
									{post.title} ({post.likes} likes)
									<button
										onClick={() => handleAddLike(post)}
										className="btn btn-success btn-sm ms-1"
									>❤️</button>

									<button
										onClick={() => handleDeletePost(post)}
										className="btn btn-danger btn-sm ms-1"
									>🗑️</button>
								</li>
							))}
						</ul>
					)
					: (<p>These are not the posts you're looking for</p>)
			}
		</>
	)
}

export default Posts
