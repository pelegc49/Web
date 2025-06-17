import React, { useState, useContext } from 'react';
import axios from 'axios';
import { darkModeContext } from '../../App.jsx';

/**
 * Login modal for user authentication.
 * Handles login, forgot password, and dark mode styling.
 */
export default function Login({ open, onClose, onSignUpClick, onSuccess }) {
    const { darkMode } = useContext(darkModeContext);

    // State for login form fields and UI
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // State for forgot password flow
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotMsg, setForgotMsg] = useState('');

    /**
     * Handles user login.
     * Sends email and password to backend, handles errors and success.
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await axios.post('/api/users/login', { email, password });
            if (res.data && res.data.success) {
                setEmail('');
                setPassword('');
                setError('');
                if (onSuccess) {
                    onSuccess(res.data.user);
                }
                onClose();
            } else {
                setError('Login failed');
            }
        } catch (err) {
            setError("Login failed.");
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles forgot password request.
     * Sends email to backend to trigger password reset email.
     */
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setForgotMsg('');
        try {
            const res = await axios.post('/api/users/forgot-password', { email: forgotEmail });
            setForgotMsg(res.data.message);
        } catch (err) {
            setForgotMsg("Failed to send reset email.");
        }
    };

    /**
     * Resets all form fields and closes the modal.
     */
    const handleClose = () => {
        setEmail('');
        setPassword('');
        setError('');
        setShowForgot(false);
        setForgotEmail('');
        setForgotMsg('');
        onClose();
    };

    /**
     * Switches to the sign up modal and resets form fields.
     */
    const handleSignUpClick = () => {
        setEmail('');
        setPassword('');
        setError('');
        setShowForgot(false);
        setForgotEmail('');
        setForgotMsg('');
        onSignUpClick();
    };

    if (!open) return null;

    return (
        // Responsive: full screen overlay and centered content on mobile, floating bubble on desktop
        <div
            className="fixed z-50 inset-0 flex items-center justify-center w-screen h-screen bg-black/30 sm:bg-transparent sm:top-[60px] sm:right-[30px] sm:left-auto sm:bottom-auto sm:w-auto sm:h-auto sm:items-end sm:justify-end"
        >
            <form
                onSubmit={showForgot ? handleForgotPassword : handleLogin}
                className={`
                    w-full max-w-sm sm:w-96 rounded-xl shadow-xl p-6 sm:p-8
                    ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}
                `}
            >
                <h2 className="text-2xl font-bold mb-4">
                    {showForgot ? "Reset Password" : "Login"}
                </h2>

                {!showForgot && (
                    <>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`
                                w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                ${darkMode
                                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                                    : "bg-gray-50 border-gray-300 text-gray-800"}
                            `}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={`
                                w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                ${darkMode
                                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                                    : "bg-gray-50 border-gray-300 text-gray-800"}
                            `}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </>
                )}

                {showForgot && (
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Enter your email</label>
                        <input
                            type="email"
                            className={`
                                w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                ${darkMode
                                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                                    : "bg-gray-50 border-gray-300 text-gray-800"}
                            `}
                            value={forgotEmail}
                            onChange={e => setForgotEmail(e.target.value)}
                            required
                        />
                    </div>
                )}

                {(error || forgotMsg) && (
                    <div className={`text-sm ${error || (forgotMsg && forgotMsg.toLowerCase().includes("fail")) ? "text-red-600" : "text-green-600"}`}>
                        {error || forgotMsg}
                    </div>
                )}

                <div className="flex gap-2 mt-4">
                    <button
                        type="submit"
                        className={`
                            flex-1 py-2 px-4 rounded-md text-white text-sm font-medium
                            ${darkMode ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"}
                        `}
                        disabled={isLoading}
                    >
                        {showForgot ? "Send reset email" : isLoading ? "Logging in..." : "Login"}
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className={`
                            flex-1 py-2 px-4 rounded-md text-white text-sm font-medium
                            ${darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-600"}
                        `}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                </div>

                {!showForgot && (
                    <div className="flex gap-4 mt-4">
                        <button
                            type="button"
                            onClick={handleSignUpClick}
                            className="text-blue-500 hover:underline text-sm"
                            disabled={isLoading}
                        >
                            Sign Up
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForgot(true)}
                            className="text-blue-500 hover:underline text-sm"
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                {showForgot && (
                    <button
                        type="button"
                        onClick={() => {
                            setShowForgot(false);
                            setForgotMsg('');
                        }}
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Back to login
                    </button>
                )}
            </form>
        </div>
    );
}