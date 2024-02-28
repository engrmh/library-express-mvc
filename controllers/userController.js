const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");
const usersModel = require("../models/users");
const registerValidator = require("../Validators/register");

exports.getAll = async (req, res) => {
  try {
    const users = await usersModel.find({}).lean();
    res.status(200).json({ message: "OK", data: users });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.removeOne = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return res.status(400).json("Invalid ID");
    }

    const removeUser = usersModel.deleteOne({ _id: id });
    if (!removeUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json("User deleted successfully");
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return res.status(400).json("Invalid ID");
    }
    const getOneUser = await usersModel.findOne({ _id: id });

    if (!getOneUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(getOneUser);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.upgradeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidID = isValidObjectId(id);

    if (!isValidID) {
      return req.status(400).json("Invalid ID");
    }

    const upgradeUser = await usersModel.updateOne(
      { _id: id },
      { $set: { role: "ADMIN" } }
    );

    if (!upgradeUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(upgradeUser);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.crimingUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { crimeValue } = req.body;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return res.status(400).json("Invalid ID");
    }

    const crimingUser = await usersModel.updateOne(
      { _id: id },
      { $set: { crime: +crimeValue } }
    );

    if (!crimingUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json("Criming Successfully");
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.register = async (req, res) => {
  try {
    const isValidRegisterData = registerValidator(req.body);

    if (!isValidRegisterData) {
      res.status(400).json("Invalid Data");
    }

    const { name, username, email, password } = req.body;
    const registerUser = await usersModel.create({
      name,
      username,
      email,
      password,
    });

    if (registerUser) {
      return res.status(200).json("User created successfully");
    } else {
      return res.status(400).json({ message: "Data is Note Valid!!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};
