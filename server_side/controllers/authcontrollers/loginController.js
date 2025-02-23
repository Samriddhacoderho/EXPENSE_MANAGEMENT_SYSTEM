import authModel from "../../models/Authmodel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const loginControllers = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(401).send("Incorrect Email ID or Password");
        }

        // Find user in database by email
        const result = await authModel.findOne({ email: email });
        
        // If user not found or password does not match, return error
        if (!result || !await bcrypt.compare(password, result.password)) {
            return res.status(401).send("Incorrect Email ID or Password");
        }

        // Generate payload for JWT token
        const data = {
            user: {
                id: result._id
            }
        };

        // Sign JWT token with secret key
        const token = jwt.sign(data, process.env.SECRET);
        
        // If token generation fails, return server error
        if (!token) {
            return res.status(500).send("Internal Server Error");
        }

        // Set token in HTTP cookie with security settings
        res.cookie('loginToken', token, {
            secure: process.env.NODE_ENV === "production", // Ensures secure cookies in production
            sameSite: "strict" // Prevents CSRF attacks
        });

        // Send success response with user's first name
        res.json({
            "message": "Logged In Successfully",
            "firstname": result.firstname
        });
    } catch (error) {
        // Handle errors (e.g., database issues, unexpected failures)
        return res.status(401).send("Incorrect Email ID or Password");
    }
};

export default loginControllers;