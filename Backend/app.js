const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

const port = 6969;

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/login")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


// 🔐 SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔐 LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.get("/api/leetcode/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);

    const text = await response.text(); // ✅ read once only

    console.log("API RESPONSE:", text);

    // ❗ Handle rate limit
    if (text.includes("Too many request")) {
      return res.status(429).json({
        message: "API limit reached. Try again later."
      });
    }

    const data = JSON.parse(text);

    res.json(data);

  } catch (err) {
    console.error("LeetCode API Error:", err);
    res.status(500).json({ message: "Error fetching LeetCode data" });
  }
});
let cache = {};

app.get("/api/leetcode/:username", async (req, res) => {
  const username = req.params.username;

  if (cache[username]) {
    return res.json(cache[username]); // 🔥 use cached
  }

  const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
  const data = await response.json();

  cache[username] = data;

  res.json(data);
});