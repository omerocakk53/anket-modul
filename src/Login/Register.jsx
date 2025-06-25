// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // authService import ediyoruz
import { FaUserAlt, FaLock } from 'react-icons/fa'; // React Icons

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const result = await authService.register(email, password);

        if (result.success) {
            setMessage('Registration successful. Please log in.');
            navigate('/login', { replace: true });
        } else {
            setMessage(result.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">Email</label>
                        <div className="flex items-center border-b-2 border-gray-300 p-2">
                            <FaUserAlt className="text-gray-500 mr-2" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 focus:outline-none bg-transparent"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">Password</label>
                        <div className="flex items-center border-b-2 border-gray-300 p-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="flex-1 focus:outline-none bg-transparent"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium">Confirm Password</label>
                        <div className="flex items-center border-b-2 border-gray-300 p-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="flex-1 focus:outline-none bg-transparent"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        Register
                    </button>
                    <h1 className='mt-3'><Link to={'/Login'}>Login</Link></h1>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Register;
