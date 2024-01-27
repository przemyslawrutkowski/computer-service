import React, { useState } from 'react'
import { login } from '../services/AuthService'
import { useNavigate } from "react-router-dom";
import '../styles/login.css'

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigation = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const user = await login(email, password)
			navigation('/reports')
			console.log(user)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<section className="login">
			<form onSubmit={handleSubmit}>
				<p>Computer Service</p>
				<div>
					<label>Email</label>
					<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
				</div>
				<div>
					<label>Password</label>
					<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				<a href="/registration">Don't have account? Register me.</a>
				<button type="submit">Login</button>
			</form>
		</section>
	)
}

export default LoginForm
