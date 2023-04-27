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

	const handleAddLike = (post: Post) => {
		post.likes++
		setPosts([...posts])
	}

	const handleDeletePost = (clickedPost: Post) => {
		setPosts(posts.filter(post => post !== clickedPost))
	}

	return (
		<>
			<h2>Posts</h2>

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
