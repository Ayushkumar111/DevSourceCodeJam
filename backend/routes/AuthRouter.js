const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const UserDetailsModel = require("../models/userDetails");

const router = express.Router();
const JWT_SECRET = "test1232";  

router.post("/register", [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Enter a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array(),
                message: "Validation failed. Please check your input." 
            });
        }

        console.log("Received registration request:", {
            username: req.body.username,
            email: req.body.email
        });

        const { username, email, password } = req.body;

        let user = await UserDetailsModel.findOne({ email });
        if (user) {
            return res.status(409).json({ 
                success: false, 
                message: "User already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new UserDetailsModel({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ 
            success: true, 
            message: "User registered successfully" 
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
});

router.post("/login", [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required")
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        const { email, password } = req.body;

        const user = await UserDetailsModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ 
            success: true, 
            token, 
            userId: user._id 
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
});

module.exports = router;
