import { useState } from 'react'
import './App.css'
import Profile from './Profile'

function App() {
	const [userName, setUserName] = useState('')
	const [errorText, setErrorText] = useState('')
	const [hasErrors, setHasErrors] = useState(false)
	const [profile, setProfile] = useState({})
	const [repositores, setRespositores] = useState([])
	const [searchWasMade, setSearchWasMade] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()
		setHasErrors(false)
		setErrorText('')

		fetch(`https://api.github.com/users/${userName}`)
			.then((res) => {
				switch (res.status) {
					case 200:
						return res.json()
					case 404:
						throw new Error('There were not matches for the user searched.')
					default:
						console.log(res)
						throw new Error(
							'An unknown error has ocurred while fetching the user data.'
						)
				}
			})
			.then((profileResult) => {
				setProfile(profileResult)
				fetch(`https://api.github.com/users/${userName}/repos`)
					.then((res) => {
						switch (res.status) {
							case 200:
								return res.json()
							default:
								console.log(res)
								throw new Error(
									'An unknown error has ocurred while fetching the user repositores.'
								)
						}
					})
					.then((res) => {
						setRespositores(res)
						setSearchWasMade(true)
					})
					.catch((err) => {
						throw err
					})
			})
			.catch((err) => {
				setSearchWasMade(true)
				setErrorText(err.message)
				setHasErrors(true)
			})
	}

	function getContent() {
		if (!searchWasMade) {
			return <div></div>
		}
		if (hasErrors) {
			return <div className="errorsDiv">{errorText}</div>
		}
		return <Profile userData={profile} userRepos={repositores} />
	}

	return (
		<div className="App">
			<h1>GitHub User Fetcher</h1>
			<form className="userForm">
				<label>
					User Name:
					<input
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className="input"
						onSelect={() => {}}
					/>
				</label>
				<button className="button" onClick={handleSubmit}>
					Fetch
				</button>
			</form>
			<main className="content">{getContent()}</main>
		</div>
	)
}

export default App
