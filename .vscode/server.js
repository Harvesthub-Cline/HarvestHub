const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Load the JSON data
const data = require('./harvestHubData.json');

// Homepage endpoint
app.get('/api/v1/homepage', (req, res) => {
  res.json({
    status: 'success',
    message: 'Homepage data retrieved successfully',
    data: data.homepage,
    timestamp: new Date().toISOString()
  });
});

// About page endpoint
app.get('/api/v1/about', (req, res) => {
  res.json({
    status: 'success',
    message: 'About page data retrieved successfully',
    data: data.about,
    timestamp: new Date().toISOString()
  });
});

// How It Works endpoint
app.get('/api/v1/how-it-works', (req, res) => {
  res.json({
    status: 'success',
    message: 'How it works data retrieved successfully',
    data: data.howItWorks,
    timestamp: new Date().toISOString()
  });
});

// Signup endpoint
app.post('/api/v1/auth/signup', (req, res) => {
  const userData = req.body;
  
  // Validate required fields
  if (!userData.email || !userData.password) {
    return res.status(400).json({
      status: 'error',
      message: 'Email and password are required',
      code: 'VALIDATION_ERROR',
      timestamp: new Date().toISOString()
    });
  }
  
  // Simulate user creation
  const newUser = {
    id: `user_${Date.now()}`,
    email: userData.email,
    fullName: userData.fullName,
    onboardingData: userData.onboardingAnswers || {},
    createdAt: new Date().toISOString(),
    profileComplete: false
  };
  
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    data: {
      user: newUser,
      authToken: 'simulated_jwt_token_here',
      nextSteps: data.auth.userProfile.nextSteps
    },
    timestamp: new Date().toISOString()
  });
});

// Login endpoint
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Email and password are required',
      code: 'VALIDATION_ERROR',
      timestamp: new Date().toISOString()
    });
  }
  
  // Simulate authentication
  res.json({
    status: 'success',
    message: 'Login successful',
    data: {
      user: {
        id: 'user_12345',
        email: email,
        fullName: 'Sample User',
        onboardingComplete: false
      },
      authToken: 'simulated_jwt_token_here',
      dashboardUrl: '/dashboard'
    },
    timestamp: new Date().toISOString()
  });
});

// Serve static pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/how-it-works', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'how-it-works.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`HarvestHub server running on port ${PORT}`);
});