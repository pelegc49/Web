import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { darkModeContext } from '../../App.jsx';

/**
 * SignUp modal for user registration.
 * Handles username, email, password, password confirmation, and captcha.
 * Supports dark mode styling.
 */
export default function SignUp({ open, onClose, onSuccess }) {
    const { darkMode } = useContext(darkModeContext);

    // State for form fields and UI
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    // Ref for captcha canvas
    const canvasRef = useRef(null);

    /**
     * Generates a random captcha string.
     * @returns {string} - The captcha text.
     */
    const generateCaptchaText = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let text = '';
        for (let i = 0; i < 5; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return text;
    };

    /**
     * Draws the captcha text on the canvas.
     * @param {string} text - The captcha text to draw.
     */
    const drawCaptcha = (text) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // set font and fill style for the captcha text
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#333';
        let x, y, dx, dy;
        x = 10;
        // draw each letter of the captcha text with random rotation and position
        for (let letter of text) {
            let alpha = Math.random() * Math.PI / 2 - Math.PI / 4;
            let y = Math.random() * 20 + 20;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(alpha);
            ctx.fillText(letter, 0, 0, 24);
            ctx.restore();
            x += 20;
        }
        // draw random lines for added complexity
        x = 0;
        y = 0;
        dx = 0;
        dy = 0;
        for (let i = 0; i < 20; i++) {
            // generate random coordinates for the line endpoints with a minimum distance
            while ((x - dx) ** 2 + (y - dy) ** 2 < 1000) {
                x = Math.random() * canvas.width;
                y = Math.random() * canvas.height;
                dx = Math.random() * canvas.width;
                dy = Math.random() * canvas.height;
            }
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(dx, dy);
            ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.5 + 0.2})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            x = 0;
            y = 0;
            dx = 0;
            dy = 0;
        }
        // draw random characters for added complexity
        ctx.font = 'bold 10px Arial';
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        for (let i = 0; i < 20; i++) {
            let x = Math.random() * canvas.width
            let y = Math.random() * canvas.height;
            // ctx.fillStyle = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
            ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), x, y)
        }
    };

    /**
     * Refreshes the captcha with a new random string.
     */
    const refreshCaptcha = () => {
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
    };

    // Generate new captcha when modal opens
    useEffect(() => {
        if (open) {
            refreshCaptcha();
        }
    }, [open]);

    // Draw captcha when text changes
    useEffect(() => {
        if (open && canvasRef.current && captchaText) {
            drawCaptcha(captchaText);
        }
    }, [open, captchaText]);

    /**
     * Handles user registration.
     * Validates passwords and captcha, sends data to backend.
     */
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        if (captchaInput !== captchaText) {
            setError("Captcha is incorrect");
            refreshCaptcha();
            setCaptchaInput('');
            return;
        }
        setIsLoading(true);
        try {
            const res = await axios.post('/api/users/signup', { email, password, username });
            if (res.data && res.data.success) {
                setSuccess("Sign up successful!");
                setError('');
                if (onSuccess) onSuccess(res.data.user);
                onClose();
            } else {
                setError(res.data.message || "Sign up failed");
            }
        } catch (err) {
            setError("Sign up failed.");
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
        // Responsive: full screen overlay and centered content on mobile, floating bubble on desktop
        <div className="fixed z-50 inset-0 flex items-center justify-center w-screen h-screen bg-black/30 sm:bg-transparent sm:top-[60px] sm:right-[30px] sm:left-auto sm:bottom-auto sm:w-auto sm:h-auto sm:items-end sm:justify-end">
            <form
                onSubmit={handleSignUp}
                className={`
                    w-full max-w-sm sm:w-72 rounded-lg shadow-lg p-6
                    ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}
                `}
            >
                <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

                <label className="block mb-1 font-medium">Username:</label>
                <input
                    type="text"
                    className={`
                        w-full p-2 mb-3 border rounded
                        ${darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-800"}
                    `}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label className="block mb-1 font-medium">Email:</label>
                <input
                    type="email"
                    className={`
                        w-full p-2 mb-3 border rounded
                        ${darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-800"}
                    `}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className="block mb-1 font-medium">Password:</label>
                <input
                    type="password"
                    className={`
                        w-full p-2 mb-3 border rounded
                        ${darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-800"}
                    `}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label className="block mb-1 font-medium">Confirm Password:</label>
                <input
                    type="password"
                    className={`
                        w-full p-2 mb-3 border rounded
                        ${darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-800"}
                    `}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />

                <label className="block mb-1 font-medium">Captcha:</label>
                {/* DO NOT CHANGE THE CANVAS OR ITS CLASSES */}
                <canvas ref={canvasRef} width="120" height="40" className="mb-2 bg-gray-100 border rounded" onClick={refreshCaptcha}></canvas>
                <input
                    type="text"
                    className={`
                        w-full p-2 mb-3 border rounded
                        ${darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-800"}
                    `}
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
