import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ open, onClose, onSignUpClick, onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const res = await axios.post('/api/users/login', { email, password }); // <-- add await

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
            ); // <-- fix error property
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        // Clear form when closing
        setEmail('');
        setPassword('');
        setError('');
        onClose();
    };

    const handleSignUpClick = () => {
        // Clear form when switching to signup
        setEmail('');
        setPassword('');
        setError('');
        onSignUpClick();
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
            }} onSubmit={handleLogin}>
                <h2 style={{ color: "#222", marginBottom: "1rem" }}>Login</h2>
                
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ 
                        display: "block", 
                        marginBottom: "0.3rem", 
                        color: "#222", 
                        fontWeight: 500 
                    }}>
                        Email:
                    </label>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: isLoading ? '#ccc' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
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
                    
                    <button 
                        type="button" 
                        onClick={handleSignUpClick}
                        disabled={isLoading}
                        style={{ 
                            background: "transparent", 
                            color: "#007bff", 
                            border: "none", 
                            textDecoration: "underline", 
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            padding: '0.5rem'
                        }}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}