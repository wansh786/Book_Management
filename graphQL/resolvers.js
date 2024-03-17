const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BookModel } = require("../models/book.model");
const { BlacklistModel } = require("../models/blacklist.model");

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await UserModel.find();
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    books: async () => {
      try {
        return await BookModel.find();
      } catch (error) {
        throw new Error("Failed to fetch books");
      }
    }
  },
  Mutation: {
    registerUser: async (_, { name, email, pass, city, age }) => {
      try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(pass, 10);

        // Create and save the new user
        const newUser = new UserModel({
          name,
          email,
          pass: hashedPassword,
          city,
          age
        });
        await newUser.save();

        return newUser;
      } catch (error) {
        throw new Error("Failed to register user: " + error.message);
      }
    },
    loginUser: async (_, { email, pass }) => {
      try {
        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("Invalid credentials");
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(pass, user.pass);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });

        return { token };
      } catch (error) {
        throw new Error("Failed to login: " + error.message);
      }
    },
    logoutUser: async (_, __, { req }) => {
      try {
        const token = req.headers.authorization.split(" ")[1];

        // Add token to blacklist
        const blacklistToken = new BlacklistModel({ token });
        await blacklistToken.save();

        return "User logged out successfully";
      } catch (error) {
        throw new Error("Failed to logout user: " + error.message);
      }
    },
    addBook: async (_, { title, genre, author, publishingYear }) => {
      try {
        const newBook = new BookModel({
          title,
          genre,
          author,
          publishing_year: publishingYear
        });
        await newBook.save();

        return newBook;
      } catch (error) {
        throw new Error("Failed to add book: " + error.message);
      }
    },
    updateBook: async (_, { id, title, genre, author, publishingYear }) => {
      try {
        const updatedBook = await BookModel.findByIdAndUpdate(
          id,
          { title, genre, author, publishing_year: publishingYear },
          { new: true }
        );

        return updatedBook;
      } catch (error) {
        throw new Error("Failed to update book: " + error.message);
      }
    },
    deleteBook: async (_, { id }) => {
      try {
        await BookModel.findByIdAndDelete(id);
        return "Book deleted successfully";
      } catch (error) {
        throw new Error("Failed to delete book: " + error.message);
      }
    }
  }
};

module.exports = resolvers;
