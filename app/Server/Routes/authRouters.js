import express from "express"
import bcrypt from "bcrypt"
import { userCreationSchema,createAccessToken,createRefreshToken, loginSchema, verifyToken, verifyRefreshToken, verifyResetToken } from "../Middlewares/auth.js"
import { checkSchema,validationResult,matchedData,body } from "express-validator"
import { User } from "../Models/User.js"
import nodemailer from 'nodemailer';
import otpGenerator from "otp-generator"
import jwt from "jsonwebtoken"



const authRouter = express.Router();
const isProduction = process.env.NODE_ENV === "production" && process.env.IS_LIVE === "true"



const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com', // Yahoo's SMTP server
    port: 465, // Secure port
    secure: true, // SSL/TLS
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.YAHOO_APP_PASSWORD, 
    },
});

const generateOTP = () => {
    const generatedOTP = otpGenerator.generate(6, 
    { 
      upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    });
    return generatedOTP
}

authRouter.post("/register", 
    checkSchema(userCreationSchema),
    async (request, response) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty())
                return response.status(401).send({ success: false, errors: errors.array() })

            const validatedData = matchedData(request);
            const extractedFullname = validatedData.fullname
            const extactedEmail = validatedData.email
            const extractedPassword = validatedData.password

            // Check if information exists in database
            const exisistingUser = await User.findOne({ $or: [ {fullname: extractedFullname}, {email: extactedEmail}  ] })
            if (exisistingUser)
                return response.status(400).send({ success: false, msg: "Account already exists. Please Log in" })

            const hashedPassword = await bcrypt.hash(extractedPassword, 12)
            // Add user to database
            const informationToAdd = {
                fullname: extractedFullname,
                email: extactedEmail,
                password: hashedPassword,
            }

            const addedUser = await User.create(informationToAdd)
            if (!addedUser)
                return response.status(500).send({ success: false, msg: "Error occured in account creation" })

            // create jwt token and refresh token
            const accessToken = createAccessToken(addedUser._id);
            const refreshToken = createRefreshToken(addedUser._id);

            // create cookies to send to the client
            response.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: isProduction ? true : false,
                sameSite: isProduction ? "strict" : "lax",
                maxAge: 900000
            })

            response.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: isProduction ? true : false,
                sameSite: isProduction ? "strict" : "lax",
                maxAge: 4 * 24 * 60 * 60 * 1000
            })

            return response.status(200).send({ success: true, msg: "Account created successfully", accessToken: accessToken })
            
        } catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, msg: "Server Error" })
        }
})

authRouter.post("/login", 
    checkSchema(loginSchema),
    async (request, response) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty())
                return response.status(401).send({ success: false, errors: errors.array() })

            const validatedData = matchedData(request)
            const extractedEmail = validatedData.email
            const extractedPassword = validatedData.password

            // Check if user exists
            const exisistingUser = await User.findOne({ email: extractedEmail })
            if (!exisistingUser)
                return response.status(404).send({ success: false, msg: "Account was not found. Please sign up" })

            // Check for password validity
            const passwordValidity = await bcrypt.compare(extractedPassword, exisistingUser.password)

            if (!passwordValidity)
                return response.status(400).send({ success: false, msg: "Invalid Credentials" })

            const accessToken = createAccessToken(exisistingUser._id)
            const refreshToken = createRefreshToken(exisistingUser._id);

            // create cookies to send to the client
            response.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: isProduction ? true : false,
                sameSite: isProduction ? "strict" : "lax",
                maxAge: 900000
            })

            response.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: isProduction ? true : false,
                sameSite: isProduction ? "strict" : "lax",
                maxAge: 4 * 24 * 60 * 60 * 1000
            })

            return response.status(200).send({ success: true, msg: "Log in successfull", accessToken: accessToken });
        } catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, msg: "Server Error" })
        }
})

authRouter.get("/verify-user", 
    verifyToken,
    async (request ,response) => {
        try {
            // find user if token is verified
            const exisistingUser = await User.findById(request.userId);
            if (!exisistingUser)
                return response.status(404).send({ success: false, msg: "Account was not found" })

            return response.status(200).send({ success: true, 
                payload: { 
                  fullname: exisistingUser.fullname, 
                  email: exisistingUser.email
                } 
            })
        } catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, msg: "Server Error" })
        }
})

authRouter.post("/generate-accessToken", 
    verifyRefreshToken,
    async (request, response) => {
        
        try {
            const exisistingUser = await User.findById(request.userId);
            if (!exisistingUser)
                return response.status(404).send({ success: false, msg: "Account was not found" })
            const accessToken = createAccessToken(request.userId)

            response.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: isProduction ? true : false,
                sameSite: isProduction ? "strict" : "lax",
                maxAge: 900000
            })

            return response.status(200).send({ success: true, msg: "Token Refreshed", accessToken: accessToken })
        
        } catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, msg: "Server Error" })
        }
})

authRouter.post("/forgot-password", 
    body("email")
    .notEmpty().withMessage("Email address is required")
    .isEmail().withMessage("Invalid email address"),
    async (request, response) => {
      try {
        // Validation
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.status(400).json({
            success: false, 
            errors: errors.array() 
          });
        }
  
        const { email } = matchedData(request);
  
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          return response.status(404).json({ 
            success: false,
            msg: "If this email exists, a reset link has been sent"
          });
        }
  
        // Generate and save OTP to DB (with expiry)
        const otp = generateOTP();
        user.passwordResetToken = otp;
        user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 mins expiry
        await user.save();
  
        // Send email (HTML + plaintext fallback)
        await transporter.sendMail({
          from: `"WhatsApp Clone" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Password Reset OTP',
          text: `Your OTP is: ${otp}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="https://img.icons8.com/color/48/whatsapp--v1.png" width="24"/>
                <span style="font-size: 14px; color: #228BE6;">WhatsApp Clone</span>
              </div>
              <h2 style="color: #333;">Password Reset Code</h2>
              <p style="font-size: 18px; font-weight: bold;">${otp}</p>
              <p style="font-size: 12px; color: #666;">
                This code expires in 15 minutes.
              </p>
            </div>
          `
        });
  
        return response.status(200).json({
          success: true,
          msg: "Reset OTP sent if email exists"
        });
  
      } catch (error) {
        console.error("Forgot password error:", error);
        return response.status(500).json({
          success: false,
          msg: "Internal server error"
        });
      }
    }
);

authRouter.post("/verify-reset-otp", 
    body("email").isEmail(),
    body("otp").notEmpty(),
    async (request, response) => {
      try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  
        const { email, otp } = matchedData(request);
  
        // Check if OTP matches and isn't expired
        const user = await User.findOne({
          email,
          passwordResetToken: otp,
          passwordResetExpires: { $gt: Date.now() } // Check expiry
        });
  
        if (!user) {
          return response.status(400).json({ 
            success: false, 
            msg: "Invalid or expired OTP" 
          });
        }
  
        const resetToken = jwt.sign(
          { userId: user._id, purpose: "password_reset" },
          process.env.RESET_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
  
        return response.status(200).json({ 
          success: true,
          resetToken: resetToken // Send this to frontend
        });
  
      } catch (error) {
        console.error("OTP verification error:", error);
        return response.status(500).json({ success: false, msg: "Server error" });
      }
    }
);
authRouter.patch("/reset-password",
  verifyResetToken, 
  body("newPassword").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const { newPassword } = matchedData(req);
      const user = await User.findById(req.userId);
      user.password = await bcrypt.hash(newPassword, 12);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false });
    }
  }
);

export default authRouter

