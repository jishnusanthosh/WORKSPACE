import { stat } from "node:fs";
import User from "../model/userModel.js";
import { rawListeners } from "node:cluster";

export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist.." });
    }
    const saveData = await newUser.save();
    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
export const getAllusers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length == 0) {
      return res.status(404).json({ message: "user data not found" }); //data not found in databse
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message }); //internal server error
  }
};

export const gerUserByid = async (req, res) => {
  try {
    const id = req.param.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" }); //data not found in databse
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message }); //internal server error
  }
};
export const update = async (req, res) => {
  try {
    const id = req.param.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" }); //data not found in databse
    }
    res.status(200).json(userExist);

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message }); //internal server error
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message }); //internal server error
  }
};
