import { useState } from 'react'
import ClickCounter from './components/ClickCounter'
import Salary from './components/Salary'
import Posts from './components/Posts'
import './App.css'

const App = () => {
	return (
		<div className="App">
			<h1>React Basics</h1>

			<ClickCounter />

			<hr />

			<Salary />

			<hr />

			<Posts />
		</div >
	)
}

export default App
