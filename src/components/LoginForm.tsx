import React, { useState } from 'react'
import { login } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { RegistrationErrors } from '../models/interfaces/RegistrationErrors'
import { UserLocalStorage } from '../services/UserLocalStorage'
import '../styles/login.css'
import Header from '../reusableComponents/header'
import Link from '../reusableComponents/link'

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState<RegistrationErrors>({})
	const navigation = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const user = await login(email, password)
			const localStorage = new UserLocalStorage()
			console.log(user.getId());
			localStorage.setUserData(user.getId(), user.isServiceman())
			console.log(localStorage.getUserData()?.userId);
			navigation('/reports')
		} catch (error) {
			let newErrors: RegistrationErrors = {}
			newErrors.email = 'Incorrect login details. Please enter correct data!'
			setErrors(newErrors)
		}
	}

	return (
		<section className="login">
			<form onSubmit={handleSubmit}>
			<Header content={'Computer Service'} />
				<div>
					<label>Email</label>
					<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
				</div>
				<div>
					<label>Password</label>
					<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				{errors.email && <div className="err">{errors.email}</div>}
				<Link content={'Don\'t have account? Register me.'} link={'registration'} />
				<button type="submit">Login</button>
			</form>
		</section>
	)
}

export default LoginForm
