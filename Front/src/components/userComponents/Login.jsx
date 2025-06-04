import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ open, onClose, onSignUpClick, onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotMsg, setForgotMsg] = useState('');

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
                setError(res.data.message || 'Login failed');
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setForgotMsg('');
        try {
            const res = await axios.post('/api/users/forgot-password', { email: forgotEmail });
            setForgotMsg(res.data.message);
        } catch (err) {
            setForgotMsg(err.response?.data?.message || "Failed to send reset email.");
        }
    };

    const handleClose = () => {
        setEmail('');
        setPassword('');
        setError('');
        setShowForgot(false);
        setForgotEmail('');
        setForgotMsg('');
        onClose();
    };

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
        <div className="fixed top-16 right-6 z-50 flex flex-col items-end">
            <form
                onSubmit={showForgot ? handleForgotPassword : handleLogin}
                className="bg-white p-6 rounded-xl shadow-xl w-72 text-gray-800 space-y-4"
            >
                <h2 className="text-xl font-semibold">
                    {showForgot ? "Reset Password" : "Login"}
                </h2>

                {!showForgot && (
                    <>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </>
                )}

                {showForgot && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Enter your email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                <div className="flex flex-wrap gap-2">
                    <button
                        type="submit"
                        className={`flex-1 py-2 px-4 rounded-md text-white text-sm font-medium ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                        disabled={isLoading}
                    >
                        {showForgot ? "Send reset email" : isLoading ? "Logging in..." : "Login"}
                    </button>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                </div>

                {!showForgot && (
                    <>
                        <button
                            type="button"
                            onClick={handleSignUpClick}
                            className="text-blue-600 hover:underline text-sm"
                            disabled={isLoading}
                        >
                            Sign Up
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForgot(true)}
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Forgot password?
                        </button>
                    </>
                )}

                {showForgot && (
                    <button
                        type="button"
                        onClick={() => setShowForgot(false)}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Back to login
                    </button>
                )}
            </form>
        </div>
    );

}