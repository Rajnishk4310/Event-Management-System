const User = require("../models/User");
const Event = require("../models/Event");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // For token generation

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, address, password, confirmPassword } =
      req.body;

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phoneNumber,
      address,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).json({ error: error.message || "Error registering user" });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).json({ error: error.message || "Error logging in user" });
  }
};

// logoutController.js (or any appropriate filename)
exports.logout = async (req, res) => {
  try {
    // Handle logout logic here
    // For example, clearing cookies or destroying sessions
    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).json({ error: error.message || "Error logging out user" });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("registeredEvents");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "registeredEvents"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// Update a user's details
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
