import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function SignUp({ open, onClose, onSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const canvasRef = useRef(null);

    const generateCaptchaText = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let text = '';
        for (let i = 0; i < 5; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return text;
    };

    const drawCaptcha = (text) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#333';
        ctx.fillText(text, 10, 30);
    };

    const refreshCaptcha = () => {
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
        drawCaptcha(newCaptcha);
    };

    useEffect(() => {
        if (open) {
            refreshCaptcha();
        }
    }, [open]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        if (captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
            setError("Invalid captcha");
            refreshCaptcha();
            return;
        }

        if (username.length < 3) {
            setError("Username must be at least 3 characters long");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post("/api/users/signup", {
                email,
                password,
            });

            setSuccess("Signup successful!");
            setUsername('');
            setPassword('');
            setConfirm('');
            setCaptchaInput('');
            setEmail('');
            setError('');
            refreshCaptcha();

            if (onSuccess) onSuccess(response.data.user);

            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setConfirm('');
        setCaptchaInput('');
        setEmail('');
        setError('');
        setSuccess('');
        onClose();
    };

    if (!open) return null;

    return (
    <div className="fixed top-[60px] right-0 h-[calc(100vh-60px)] z-50 bg-white shadow-lg w-full sm:w-96 md:w-96 p-6 overflow-y-auto transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Captcha</label>
                    <canvas
                        ref={canvasRef}
                        width={120}
                        height={40}
                        className="border border-gray-300 rounded cursor-pointer my-2"
                        onClick={refreshCaptcha}
                    />
                    <input
                        type="text"
                        value={captchaInput}
                        onChange={e => setCaptchaInput(e.target.value)}
                        required
                        placeholder="Enter captcha"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}
                <div className="flex justify-between mt-4 space-x-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 bg-gray-300 text-gray-800 rounded-md py-2 font-semibold hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
