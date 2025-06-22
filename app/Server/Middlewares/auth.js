import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ 
    path: path.join(__dirname, '../.env') 
})


export const userCreationSchema = {
    fullname: {
        notEmpty: {
            errorMessage: "A fullname must be provided"
        },
        isString: {
            errorMessage: "Fullname must be a string"
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Fullname must be at least 3 characters"
        }
    },
    email: {
        notEmpty: {
            errorMessage: "An email address must be provided"
        },
        isEmail: {
            errorMessage: "Invalid email address"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "A password must be provided"
        },
        isString: {
            errorMessage: "Password must be a string"
        },
        isLength: {
            options: { min: 5 },
            errorMessage: "Passwod must be at leat 5 characters"
        },
    },
}

export const loginSchema = {
    email: {
        notEmpty: {
            errorMessage: "An email address must be provided"
        },
        isEmail: {
            errorMessage: "Invalid email address"
        }
    },

    password: {
        notEmpty: {
            errorMessage: "A password must be provided"
        },
        isString: {
            errorMessage: "Password must be a string"
        },
        isLength: {
            options: { min: 5 },
            errorMessage: "Passwod must be at leat 5 characters"
        },
    }
}

export const createAccessToken = (id) => {
    return jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "15m" });
}

export const createRefreshToken = (id) => {
    return jwt.sign({ userId: id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "4d" })
}

export const verifyToken = (request, response, next) => {

    const extractedToken = request.cookies.accessToken;
    

    if (!extractedToken)
        return response.status(401).send({ success: false, msg: "Unauthorized Access" })

    jwt.verify(extractedToken, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
        if (error)
            return response.status(403).send({ success: false, msg: "Invalid token" })

        request.userId = decoded.userId
        next();
    })
}

export const verifyRefreshToken = (request, response,next) => {
    const extractedRefreshToken = request.cookies.refreshToken;

    if (!extractedRefreshToken)
        return response.status(401).send({ success: false, msg: "Unauthorized Access" })

    jwt.verify(extractedRefreshToken, process.env.REFRESH_TOKEN_KEY, (error, decoded) => {
        if (error)
            return response.status(403).send({ success: false, msg: "Invalid refresh token" })
        
        request.userId = decoded.userId;
        next();
    })
}

export const verifyResetToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    }
  
    jwt.verify(token, process.env.RESET_TOKEN_SECRET, (err, decoded) => {
      if (err || decoded.purpose !== "password_reset") {
        return res.status(403).json({ success: false, msg: "Invalid token" });
      }
      req.userId = decoded.userId;
      next();
    });
};