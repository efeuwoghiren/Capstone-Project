const express = require("express");
const app = express();
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

let users = [];

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Get all users (for testing purposes)
app.get('/api/users', async (req, res) => {
    return res.status(200).json(users); // Changed to 200
});

// Register route
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' }); // Added return to prevent further execution
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: `Somebody has used ${email} to create an account` }); // Added return
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        };
        users.push(newUser);
        return res.status(201).json({ message: 'Account successfully created', user: newUser }); // Added return
    } catch (error) {
        return res.status(500).json({ message: "There is an error from our end" });
    }
});

// Serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// Serve the registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Serve the login page 
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the main page 
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = users.find(user => user.email === email);
    if (!existingUser) {
        return res.status(400).json({ message: "You have not created an account with us" });
    }

    try {
        const correctPassword = await bcrypt.compare(password, existingUser.password);
        if (!correctPassword) {
            return res.status(400).json({ message: "Password is not correct" });
        }

        // Create JWT token
        try {
            const token = jwt.sign(
                {
                    email: existingUser.email,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: process.env.JWT_DURATION } 
            );
            return res.status(200).json({ message: "Login Successful", token });
        } catch (error) {
            return res.status(500).json({ message: "Error creating JWT token" });
        }
    } catch (error) {
        return res.status(500).json({ message: "There was an error during login" });
    }
});



// Create task
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update task status
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});


// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});