const userModel = require("../model/userModel.js");

/**

 * CRUD

 * CREATE USER (POST)

 * READ USER (GET): GENERAL GET< SINGLE GET

 * UPDATE USER (PUT)

 * DELETE USER (DELETE)

 */

//CREATE USER

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",

      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GENERAL GET;
const getAllUsers = async (req, res) => {
  try {
    const getAll = await userModel.find();
    return res.status(200).json({
      message: "All users fetched Successfully",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//SINGLE GET;

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const getSingle = await userModel.findById(id);

    if (!getSingle) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",

      data: getSingle,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(id, { name, email, password }, { new: true});
        return res.status(200).json({
            message: "User updated successfully.",
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// DELETE USER
const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const deletedUser = await userModel.findByIdAndDelete(userId);
        return res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateEntry = async (req, res) => {
  let userId;
  
  try {
    userId = req.params.userId;
    const {update} = req.body;
    const updatedEntry = await userModel.findOneAndUpdate( { _id : userId }, update, { returnDocument: 'after' } );

    if (!updatedEntry) {
      res.status(404).json({
        message: `User with id: ${userId}, not found.`
      });
    }
    res.status(200).json({
      message: `User (id: ${userId}) details updated successfully.`,
      data: updatedEntry
    });
    console.log(`User with id: ${userId} just updated their details.`);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
    console.log(`Error during update. User: ${userId || 'unknown'}`);
  }
};

const getUserProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const getSingle = await userModel.findById(id).populate('products', 'name price category image');

    if (!getSingle) {
      return res.status(404).json({
        message: `No products found for user with this id: ${id}.`
      });
    }

    res.status(200).json({
      message: "User products fetched successfully",

      data: getSingle,
    });
    console.log(`User with ID: ${id} fetched products successfully.`);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createUser, updateUser, getAllUsers, getSingleUser, deleteUser, updateEntry, getUserProducts };