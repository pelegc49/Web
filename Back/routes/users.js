const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { addClient } = require('../services/firebase'); // Import your Firestore function

const Router = express.Router()

// Dummy in-memory users
const users = []

Router.post('/signup', (req, res) => {
    const { username, password } = req.body
    if (users.find(u => u.username === username)) {
        return res.json({ success: false, message: 'User already exists' })
    }
    users.push({ username, password })
    res.json({ success: true, user: { username } })
})

Router.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password)
    if (!user) {
        return res.json({ success: false, message: 'Invalid credentials' })
    }
    res.json({ success: true, user: { username } })
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

module.exports = Router