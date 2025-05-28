import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
import { addClient } from '../services/firebase.js'; // Import your Firestore function
import {auth} from '../services/firebase.js'; // Import Firebase auth functions
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
export const Router = express.Router()

// Dummy in-memory users
const users = []

// Router.post('/signup', (req, res) => {
//     const { username, password } = req.body
//     if (users.find(u => u.username === username)) {
//         return res.json({ success: false, message: 'User already exists' })
//     }
//     users.push({ username, password })
//     res.json({ success: true, user: { username } })
// })
//nw
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

Router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        await sendPasswordResetEmail(auth, email);
        res.json({ success: true, message: "Password reset email sent." });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
