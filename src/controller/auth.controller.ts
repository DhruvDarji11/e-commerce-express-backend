import { Request, Response } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const registerController = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res
      .status(201)
      .json({ success: true, message: "User registered", data: user });
  } catch (error) {
    console.log("ERROR: ", (error as any).message);
    res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Something went wrong while registering user",
          (error as any).message
        )
      );
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", data: user });
  } catch (error) {
    console.log("ERROR: ", (error as any).message);
    res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Something went wrong while registering user",
          (error as any).message
        )
      );
  }
};

export const getLoggedInUserController = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(200).json({
      success: true,
      message: "Fetched current user",
      data: (req as any).user,
    });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching current user",
    });
  }
};

export const refreshAccessTokenController = async (
  req: Request,
  res: Response
) => {
  try {
    const { refreshToken } = req.body;
    const data = await refreshAccessToken(refreshToken);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while refresh access token",
    });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    await logoutUser(userId);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while refresh access token",
    });
  }
};
