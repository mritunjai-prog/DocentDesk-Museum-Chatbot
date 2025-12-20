import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import supabase from "../config/supabase.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user.id);

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    return next(new ErrorResponse("Email already registered", 400));
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const { data: user, error } = await supabase
    .from("users")
    .insert([
      {
        name,
        email,
        password: hashedPassword,
        auth_provider: "local",
        is_email_verified: false,
        role: "user",
        last_login: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Registration error:", error);
    return next(new ErrorResponse("Failed to create user", 500));
  }

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  // Check for user
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if user has password (local auth)
  if (!user.password) {
    return next(
      new ErrorResponse(
        "This account uses Google sign-in. Please login with Google.",
        401
      )
    );
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Update last login
  await supabase
    .from("users")
    .update({ last_login: new Date().toISOString() })
    .eq("id", user.id);

  sendTokenResponse(user, 200, res);
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", req.user.id)
    .single();

  if (error || !user) {
    return next(new ErrorResponse("User not found", 404));
  }

  // Remove password from response
  delete user.password;

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", req.body.email)
    .single();

  if (error || !user) {
    return next(new ErrorResponse("No user found with that email", 404));
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save hashed token and expiry to database
  await supabase
    .from("users")
    .update({
      reset_password_token: hashedToken,
      reset_password_expire: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    })
    .eq("id", user.id);

  // Create reset url
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const message = `
    <h1>Password Reset Request</h1>
    <p>You requested a password reset. Please click the link below to reset your password:</p>
    <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
    <p>This link will expire in 10 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request - DocentDesk",
      html: message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (err) {
    console.error(err);
    // Clear reset token fields on error
    await supabase
      .from("users")
      .update({
        reset_password_token: null,
        reset_password_expire: null,
      })
      .eq("id", user.id);

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  // Find user with valid token
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("reset_password_token", resetPasswordToken)
    .gt("reset_password_expire", new Date().toISOString())
    .single();

  if (error || !user) {
    return next(new ErrorResponse("Invalid or expired token", 400));
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Update user with new password and clear reset fields
  await supabase
    .from("users")
    .update({
      password: hashedPassword,
      reset_password_token: null,
      reset_password_expire: null,
    })
    .eq("id", user.id);

  // Get updated user
  const { data: updatedUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  sendTokenResponse(updatedUser, 200, res);
});

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", req.user.id)
    .single();

  if (error || !user) {
    return next(new ErrorResponse("User not found", 404));
  }

  // Check current password
  const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!isMatch) {
    return next(new ErrorResponse("Current password is incorrect", 401));
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  // Update password
  await supabase
    .from("users")
    .update({ password: hashedPassword })
    .eq("id", user.id);

  // Get updated user
  const { data: updatedUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  sendTokenResponse(updatedUser, 200, res);
});

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
export const googleAuthCallback = asyncHandler(async (req, res, next) => {
  const token = generateToken(req.user.id);

  // Redirect to frontend with token
  res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
});
