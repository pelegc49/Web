import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ open, onClose, onSignUpClick }) {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
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
            }} onSubmit={handleLogin}>
                <h2 style={{ color: "#222", marginBottom: "1rem" }}>Login</h2>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.3rem", color: "#222", fontWeight: 500 }}>Login name:</label>
                    <input
                        type="text"
                        placeholder="Login Name"
                        value={loginName}
                        onChange={e => setLoginName(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            background: "#f9f9f9",
                            color: "#222"
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.3rem", color: "#222", fontWeight: 500 }}>Password:</label>
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
                    />
                </div>
                <button type="submit" style={{ marginRight: "1rem" }}>Login</button>
                <button type="button" onClick={onClose} style={{ marginRight: "1rem" }}>Cancel</button>
                <button type="button" onClick={onSignUpClick} style={{ background: "transparent", color: "#007bff", border: "none", textDecoration: "underline", cursor: "pointer" }}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}