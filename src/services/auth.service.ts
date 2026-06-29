import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { ApiErrors } from "../utils/ApiErrors";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const registerUser = async (payload: any) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });
  if (existingUser) {
    throw new ApiErrors(400, "User Already Exists");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiErrors(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiErrors(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id.toString(), user.role);

  const refreshToken = generateRefreshToken(user._id.toString(), user.role);

  user.refreshToken = refreshToken;

  await user.save();
  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const user = await User.findOne({
    refreshToken,
  });

  if (!user) {
    throw new ApiErrors(401, "Invalid refresh token");
  }

  const accessToken = await generateAccessToken(user._id.toString(), user.role);
  return accessToken;
};

export const logoutUser = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};
