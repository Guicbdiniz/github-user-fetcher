import React from 'react'
import './Profile.css'

export default function Profile({ userData, userRepos }) {
	const { avatar_url, name, bio } = userData

	return (
		<div className="profile">
			<div className="profileData">
				<img src={avatar_url} alt="Avatar" />
				<div className="userData">
					<p className="propertyName">Name:</p>
					<p className="propertyValue">{name}</p>
					<p className="propertyName">Bio:</p>
					<p className="propertyValue">{bio}</p>
				</div>
			</div>
			<div className="profileRepos">
				<h3>Repositories:</h3>

				<ul>
					{userRepos.map((repo, index) => {
						const { name, html_url, description } = repo
						return (
							<li key={index} className="repo">
								{name}:
								<ul>
									<li>
										<span className="repoPropertyName">Url:</span>{' '}
										<a href={html_url}>{html_url}</a>
									</li>
									<li>
										<span className="repoPropertyName">Description:</span>{' '}
										{description}
									</li>
								</ul>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
