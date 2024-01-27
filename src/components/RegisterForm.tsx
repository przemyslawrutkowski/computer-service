import React, { useState } from 'react'
import { register } from '../services/AuthService'
import { RegistrationErrors } from '../models/interfaces/RegistrationErrors'
import { Client } from '../models/Client'
import '../styles/registration.css'

const RegistrationForm: React.FC = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const [errors, setErrors] = useState<RegistrationErrors>({})

	const validateForm = () => {
		let newErrors: RegistrationErrors = {}

		if (!email) {
			newErrors.email = 'Email is required'
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Email address is invalid'
		}
		if (!firstName) {
			newErrors.firstName = 'First name is required'
		} else if (!/^[A-Z][a-zA-Z]{1,}$/.test(firstName)) {
			newErrors.firstName = 'First name must start with a capital letter and contain only letters'
		}

		if (!lastName) {
			newErrors.lastName = 'Last name is required'
		} else if (!/^[A-Z][a-zA-Z]{2,}$/.test(lastName)) {
			newErrors.lastName =
				'Last name must start with a capital letter, contain only letters and be at least 3 characters long'
		}

		if (!phoneNumber) {
			newErrors.phoneNumber = 'Phone number is required'
		} else if (!/^\d{9}$/.test(phoneNumber)) {
			newErrors.phoneNumber = 'Phone number must be exactly 9 digits'
		}

		if (!password) {
			newErrors.password = 'Password is required'
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (validateForm()) {
			try {
				const newClient = new Client(0, firstName, lastName, email, password, phoneNumber)
				const newUser = await register(newClient)
				console.log(newUser)
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<section className="register">
			<form onSubmit={handleSubmit}>
				<p>Computer Service</p>

				<div>
					<label>Email</label>
					<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
					{errors.email && <div className="err">{errors.email}</div>}
				</div>

				<div>
					<label>First Name</label>
					<input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
					{errors.firstName && <div className="err">{errors.firstName}</div>}
				</div>

				<div>
					<label>Last Name</label>
					<input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
					{errors.lastName && <div className="err">{errors.lastName}</div>}
				</div>

				<div>
					<label>Phone Number</label>
					<input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
					{errors.phoneNumber && <div className="err">{errors.phoneNumber}</div>}
				</div>

				<div>
					<label>Password</label>
					<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
					{errors.password && <div className="err">{errors.password}</div>}
				</div>
				<button type="submit">Register</button>
			</form>
		</section>
	)
}

export default RegistrationForm
