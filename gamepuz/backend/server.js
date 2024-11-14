const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // Use any port not occupied by your React app

// Connect to MongoDB (replace <YOUR_MONGO_URI> with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

// Define User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    time: { type: Number, required: true }
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API route to save username and time
app.post('/api/saveProgress', async (req, res) => {
    const { username, time } = req.body;

    try {
        const user = new User({ username, time });
        await user.save();
        res.status(201).json({ message: 'Progress saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving progress' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
