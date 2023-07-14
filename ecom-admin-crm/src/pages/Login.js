import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import store from '../store/store.js';
import { loginUser } from '../store/userSlice';
import FormSection from '../components/FormSection.js';

export default function LoginPage() {
    const { user } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        email: 'testing@email.com',
        password: 'testing'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the HTTP request to the login endpoint
            //const response = await axios.post('http://localhost:3001/api/v1/auth/login', formData);
            // Process the response data or handle success
            await store.dispatch(loginUser(formData));

            setFormData({ email: '', password: '' });
        } catch (error) {
            // Handle error, display error message, etc.
            console.error(error);
        }
    };

    return (
        user && user.roles.includes('admin') ? <Navigate to='/add-product' /> :
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <FormSection title="Credentials">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormSection>
                    <button type="submit">Login</button>
                </form>
            </div>
    );
}
