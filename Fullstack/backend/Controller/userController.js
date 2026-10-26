
import User from "../Model/User.js";

const createUser = async (req, res) => {
  try {
    const { name, age } = req.body;

    // Validate name
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    // Validate age
    const parsedAge = Number(age);

    if (
      age === undefined ||
      age === null ||
      age === "" ||
      !Number.isFinite(parsedAge) ||
      parsedAge < 1
    ) {
      return res.status(400).json({
        message: "Age must be a valid positive number",
      });
    }

    // Save user to MongoDB
    const user = await User.create({
      name: name.trim(),
      age: parsedAge,
    });

    return res.status(201).json({
      success: true,
      message: "User saved successfully",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save user",
      error: error.message,
    });
  }
};

export default { createUser };
