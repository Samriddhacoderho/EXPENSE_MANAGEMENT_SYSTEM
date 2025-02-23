import authModel from "../../models/Authmodel.js"
import jwt from "jsonwebtoken"

const registerControllers = async (req, res) => {
    try {
        // Create a new user in the database with the request body
        const result = await authModel.create(req.body);
        
        // Prepare user data for JWT token
        const data = {
            user: {
                id: result._id
            }
        };

        // Generate JWT token
        const token = jwt.sign(data, process.env.SECRET);
        
        // Check if token generation was successful
        if (!token) {
            return res.status(500).send("Internal Server Error");
        }

        // Store token in an HTTP cookie with security settings
        res.cookie("loginToken", token, {
            secure: process.env.NODE_ENV === 'production', // Ensures secure cookies in production
            sameSite: "strict" // Prevents CSRF attacks
        });

        // Respond with success message and user first name
        res.json({
            "message": "Registration Successful",
            "firstname": result.firstname
        });
    } catch (error) {
        // Handle errors such as validation issues or database failures
        res.status(400).send(error.message);
    }
};

export default registerControllers;