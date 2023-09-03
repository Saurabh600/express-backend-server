import { Request, Response } from "express";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const checkAuthController = (req: Request, res: Response) => {
  if (req.cookies.sessionId) {
    return res.status(200).json({
      isAuthenticated: true,
      message: "user authenticated",
    });
  }

  return res.status(200).json({
    isAuthenticated: false,
    message: "user not authenticated",
  });
};

const loginController = (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: false,
      message: "bad input",
      data: req.body,
      errors: result.error.flatten(),
    });
  }

  return res.status(200).json({
    status: true,
    message: "request passed!",
    data: result.data,
  });
};

export { loginController, checkAuthController };
