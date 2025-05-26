import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp({ open, onClose, onSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    // For demonstration, a simple static captcha
    const captchaText = "5gT9b";

    const handleSignUp = async (e) => {
        
        e.preventDefault();
        setError('');
        setSuccess('');
        // Validation
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        if (captcha !== captchaText) {
            setError("Invalid captcha");
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
        
        setIsLoading(true);
        
        try {
            let email = 'pelegc49@gmail.com';
            axios.post("/api/users/signup", { email, password }).then((response) => {
                setUser(response.data.user);
            }).catch((error) => {
                console.error("Signup error:", error);
                setError(error.response?.data?.message || 'Signup failed. Please check your connection.');
            });
            //const userCredential = await createUserWithEmailAndPassword(auth, username, password);צריכה להיות בבאק 
            // Call backend API to add client
            //await axios.post("/api/users/clients", {
                //     name: username,
                //     email: userCredential.user.email,
                // });
                setSuccess('Signup successful! You can now log in.');
                
                // Clear form
                setUsername('');
                setPassword('');
                setConfirm('');
                setCaptcha('');
                setError('');
                
                // Call success callback with user data
                if (onSuccess) {
                    onSuccess(user);
                }
                
                // Close modal after a short delay to show success message
                setTimeout(() => {
                    onClose();
                }, 1500);
            } catch (err) {
                console.error('Signup error:', err);
                setError(err.response?.data?.message || 'Signup failed. Please check your connection.');
            } finally {
                setIsLoading(false);
            }
        };
        
        const handleClose = () => {
            // Clear form when closing
            setUsername('');
            setPassword('');
            setConfirm('');
            setCaptcha('');
        setError('');
        setSuccess('');
        onClose();
    };

    if (!open) return null;

    return (
        <div style={{
            position: "fixed",
            top: "60px",
            right: "30px",
            background: "rgba(0,0,0,0.0)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
        }}>
            <form style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                minWidth: "260px",
                color: "#222"
            }} onSubmit={handleSignUp}>
                <h2 style={{ color: "#222", marginBottom: "1rem" }}>Sign Up</h2>
                
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ 
                        display: "block", 
                        marginBottom: "0.3rem", 
                        color: "#222", 
                        fontWeight: 500 
                    }}>
                        Username:
                    </label>
                    <input
                        type="text"
                        placeholder="Your Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            background: "#f9f9f9",
                            color: "#222"
                        }}
                        required
                        disabled={isLoading}
                        minLength={3}
                    />
                </div>
                
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ 
                        display: "block", 
                        marginBottom: "0.3rem", 
                        color: "#222", 
                        fontWeight: 500 
                    }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            background: "#f9f9f9",
                            color: "#222"
                        }}
                        required
                        disabled={isLoading}
                        minLength={6}
                    />
                </div>
                
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ 
                        display: "block", 
                        marginBottom: "0.3rem", 
                        color: "#222", 
                        fontWeight: 500 
                    }}>
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            background: "#f9f9f9",
                            color: "#222"
                        }}
                        required
                        disabled={isLoading}
                    />
                </div>
                
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ 
                        display: "block", 
                        marginBottom: "0.3rem", 
                        color: "#222", 
                        fontWeight: 500 
                    }}>
                        Captcha:
                    </label>
                    <div style={{ 
                        marginBottom: "0.3rem", 
                        fontWeight: "bold", 
                        letterSpacing: "2px", 
                        background: "#eee", 
                        padding: "0.5rem", 
                        borderRadius: "4px", 
                        width: "fit-content" 
                    }}>
                        {captchaText}
                    </div>
                    <input
                        type="text"
                        placeholder="Enter captcha"
                        value={captcha}
                        onChange={e => setCaptcha(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            background: "#f9f9f9",
                            color: "#222"
                        }}
                        required
                        disabled={isLoading}
                    />
                </div>
                
                {error && (
                    <div style={{ 
                        color: 'red', 
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}
                
                {success && (
                    <div style={{ 
                        color: 'green', 
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        {success}
                    </div>
                )}
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: isLoading ? '#ccc' : '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={handleClose}
                        disabled={isLoading}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}