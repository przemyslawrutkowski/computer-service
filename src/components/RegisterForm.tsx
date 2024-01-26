import React, { useState } from 'react';
import { register } from '../services/AuthService';
import { RegistrationErrors } from '../models/interfaces/RegistrationErrors';
import { Client } from '../models/Client';

const RegistrationForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [errors, setErrors] = useState<RegistrationErrors>({});

    const validateForm = () => {
        let newErrors: RegistrationErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!firstName) {
            newErrors.firstName = 'First name is required';
        } else if (!/^[A-Z][a-zA-Z]{1,}$/.test(firstName)) {
            newErrors.firstName = 'First name must start with a capital letter and contain only letters';
        }

        if (!lastName) {
            newErrors.lastName = 'Last name is required';
        } else if (!/^[A-Z][a-zA-Z]{2,}$/.test(lastName)) {
            newErrors.lastName = 'Last name must start with a capital letter, contain only letters and be at least 3 characters long';
        }

        if (!phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{9}$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be exactly 9 digits';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const newClient = new Client(0, firstName, lastName, email, password, phoneNumber);
                const newUser = await register(newClient);
                console.log(newUser);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <div>{errors.email}</div>}
            </label>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                {errors.firstName && <div>{errors.firstName}</div>}
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                {errors.lastName && <div>{errors.lastName}</div>}
            </label>
            <label>
                Phone Number:
                <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                {errors.phoneNumber && <div>{errors.phoneNumber}</div>}
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <div>{errors.password}</div>}
            </label>
            <button type="submit" style={{ alignSelf: 'flex-start' }}>Register</button>
        </form>
    );
};

export default RegistrationForm;