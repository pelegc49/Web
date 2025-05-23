// import { auth, db } from './firebase';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
import React, { useState } from 'react';
export default function SignUp({ open, onClose }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [captcha, setCaptcha] = useState('');
  // For demonstration, a simple static captcha
  const captchaText = "5gT9b";

const handleSignUp = async (e) => {
  e.preventDefault();

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  if (captcha !== captchaText) {
    alert("Invalid captcha");
    return;
  }

  const email = `${name.replace(/\s+/g, '').toLowerCase()}@example.com`;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "clients", user.uid), {
      name,
      dob,
      signupDate: new Date().toISOString(),
      userId: user.uid
    });

    alert("Sign up successful!");
    onClose();
  } catch (error) {
    alert("Sign up failed: " + error.message);
    console.error("SignUp Error:", error);
  }
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
          <label style={{ display: "block", marginBottom: "0.3rem", color: "#222", fontWeight: 500 }}>Name:</label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
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
          <label style={{ display: "block", marginBottom: "0.3rem", color: "#222", fontWeight: 500 }}>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
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
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.3rem", color: "#222", fontWeight: 500 }}>Confirm Password:</label>
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
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.3rem", color: "#222", fontWeight: 500 }}>Captcha:</label>
          <div style={{ marginBottom: "0.3rem", fontWeight: "bold", letterSpacing: "2px", background: "#eee", padding: "0.5rem", borderRadius: "4px", width: "fit-content" }}>{captchaText}</div>
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
          />
        </div>
        <button type="submit" style={{ marginRight: "1rem" }}>Sign Up</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}