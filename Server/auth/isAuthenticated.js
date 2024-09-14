import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;

    // If no token is found, respond with 401 Unauthorized
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // If token is invalid or verification fails, respond with 401 Unauthorized
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Attach user ID to request object
    req.userId = decoded.userId;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log error and respond with 500 Internal Server Error
    console.error('Authentication error:', error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export default isAuthenticated;
