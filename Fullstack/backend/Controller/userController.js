const User = require("../Model/User");

const createUser = async (req, res) => {
  try {
    const { name, age } = req.body;

    if ( name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const parsedAge = Number(age);
    if (age === undefined || !Number.isFinite(parsedAge) || parsedAge < 1) {
      return res.status(400).json({ message: "Age must be a valid positive number" });
    }

    const user = await User.create({
      name: name.trim(),
      age: parsedAge,
    });

    return res.status(201).json({
      message: "User saved successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save user",
      error: error.message,
    });
  }
};

module.exports = { createUser };
