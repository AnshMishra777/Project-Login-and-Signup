const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 6969;

// ── MongoDB ───────────────────────────────────────────────
mongoose
  .connect("mongodb://127.0.0.1:27017/login")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ── SIGNUP ────────────────────────────────────────────────
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashed }).save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ── LOGIN ─────────────────────────────────────────────────
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ── LEETCODE (Direct GraphQL) ─────────────────────────────
const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        realName
        userAvatar
        ranking
        reputation
        starRating
        aboutMe
        school
        company
        countryName
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      badges {
        id
        displayName
        icon
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

const cache = {};

app.get("/api/leetcode/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // 5-minute cache
    if (cache[username] && Date.now() - cache[username].ts < 5 * 60 * 1000) {
      console.log("Cache hit:", username);
      return res.json(cache[username].data);
    }

    console.log("Fetching LeetCode data for:", username);

    const response = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { username },
      }),
    });

    const json = await response.json();

    if (json.errors || !json.data?.matchedUser) {
      return res.status(404).json({ message: "LeetCode user not found" });
    }

    const user = json.data.matchedUser;
    const allQ = json.data.allQuestionsCount;

    const stats = user.submitStats?.acSubmissionNum || [];
    const totalSolved = stats.find(s => s.difficulty === "All")?.count || 0;
    const easySolved  = stats.find(s => s.difficulty === "Easy")?.count || 0;
    const medSolved   = stats.find(s => s.difficulty === "Medium")?.count || 0;
    const hardSolved  = stats.find(s => s.difficulty === "Hard")?.count || 0;

    const totalEasy   = allQ.find(q => q.difficulty === "Easy")?.count || 0;
    const totalMedium = allQ.find(q => q.difficulty === "Medium")?.count || 0;
    const totalHard   = allQ.find(q => q.difficulty === "Hard")?.count || 0;

    const result = {
      username: user.username,
      name: user.profile.realName || user.username,
      avatar: user.profile.userAvatar,
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      starRating: user.profile.starRating,
      aboutMe: user.profile.aboutMe,
      school: user.profile.school,
      company: user.profile.company,
      country: user.profile.countryName,
      totalSolved,
      easySolved,
      medSolved,
      hardSolved,
      totalEasy,
      totalMedium,
      totalHard,
      badges: user.badges || [],
    };

    cache[username] = { ts: Date.now(), data: result };
    res.json(result);
  } catch (err) {
    console.error("LeetCode fetch error:", err);
    res.status(500).json({ message: "Error: " + err.message });
  }
});

app.listen(PORT, () =>
  console.log("Server running on http://localhost:" + PORT)
);