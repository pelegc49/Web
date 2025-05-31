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
        <div className="fixed top-[60px] right-[30px] z-50 flex flex-col items-end">
            <form onSubmit={handleSignUp} className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-72">
                <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

                <label className="block mb-1 font-medium">Username:</label>
                <input
                    type="text"
                    className="w-full p-2 mb-3 border border-gray-300 rounded bg-gray-50"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label className="block mb-1 font-medium">Email:</label>
                <input
                    type="email"
                    className="w-full p-2 mb-3 border border-gray-300 rounded bg-gray-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className="block mb-1 font-medium">Password:</label>
                <input
                    type="password"
                    className="w-full p-2 mb-3 border border-gray-300 rounded bg-gray-50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label className="block mb-1 font-medium">Confirm Password:</label>
                <input
                    type="password"
                    className="w-full p-2 mb-3 border border-gray-300 rounded bg-gray-50"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />

                <label className="block mb-1 font-medium">Captcha:</label>
                <canvas ref={canvasRef} width="120" height="40" className="mb-2 bg-gray-100 border rounded"></canvas>
                <input
                    type="text"
                    className="w-full p-2 mb-3 border border-gray-300 rounded bg-gray-50"
                    placeholder="Enter CAPTCHA"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                />

                {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
                {success && <div className="text-green-600 text-sm mb-3">{success}</div>}

                <div className="flex flex-wrap gap-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-4 py-2 text-white rounded ${
                            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
