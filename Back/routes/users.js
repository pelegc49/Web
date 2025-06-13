// users.js
// This file defines Express routes for user authentication and client management using Firebase Auth and Firestore.
// It handles login, signup, password reset, password change, and adding clients.

import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
import { addClient } from '../services/firebase.js'; // Firestore function to add a client
import {auth} from '../services/firebase.js'; // Firebase Auth instance
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
export const Router = express.Router()

// Dummy in-memory users (not used in production)
const users = []

// Example of a local signup route (commented out, replaced by Firebase Auth)
// Router.post('/signup', (req, res) => {
//     const { username, password } = req.body
//     if (users.find(u => u.username === username)) {
//         return res.json({ success: false, message: 'User already exists' })
//     }
//     users.push({ username, password })
//     res.json({ success: true, user: { username } })
// })

// Login route: authenticates user with Firebase Auth
Router.post('/login', (req, res) => {
    const { email, password } = req.body
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.json({ success: true, user: { email: user.email, uid: user.uid } });
        })
        .catch((error) => {
            res.status(400).json({ success: false, message: error.message });
        });
})

// Add client route: adds a client to Firestore
Router.post('/clients', async (req, res) => {
    const { name, email } = req.body;
    try {
        await addClient(name, email); // Actually add to Firestore
        res.status(201).json({ 
            message: "Client created successfully", 
            client: { name, email }
        });
    } catch (e) {
        console.error('Error adding client:', e);
        res.status(500).json({ message: "Failed to create client" });
    }
});


// Signup route: creates a new user in Firebase Auth
Router.post('/signup', async (req, res) => {
    const { email,password } = req.body;
    createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
            res.status(201).json({ success: true, user: user });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(400).json({ success: false, message: errorMessage });
        });

});


// Forgot password route: sends a password reset email using Firebase Auth
Router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        await sendPasswordResetEmail(auth, email);
        res.json({ success: true, message: "Password reset email sent." });
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            res.status(400).json({ success: false, message: "This email is not registered." });
        } else {
            res.status(400).json({ success: false, message: error.message });
        }
    }
});

// Change password route: re-authenticates and updates the user's password
Router.post('/change-password', async (req, res) => {
    const { uid, oldPassword, newPassword } = req.body;
    try {
        // Find user by uid
        const user = auth.currentUser;
        if (!user || user.uid !== uid) {
            return res.status(401).json({ success: false, message: "Unauthorized." });
        }
        // Re-authenticate
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);

        if (oldPassword === newPassword) {
            return res.status(400).json({ success: false, message: "New password must be different from the old password." });
        }

        await updatePassword(user, newPassword);
        res.json({ success: true, message: "Password changed successfully." });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
