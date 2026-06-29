import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { success } from "zod";
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
