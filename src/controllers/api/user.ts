import { Request, Response } from "express"
import { hash } from "bcryptjs"
import { z } from "zod"
import {
  dbGetAllUsers,
  dbGetUser,
  dbGetUserById,
  dbInsertSimpleUser,
} from "../../models/user"

const registerEmailPasswordSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(7).max(15),
})

export const createUserWithEmailAndPassword = async (
  req: Request,
  res: Response,
) => {
  const result = await registerEmailPasswordSchema.safeParseAsync(req.body)
  if (!result.success) {
    return res.status(400).json({
      status: false,
      message: "bad input",
      data: req.body,
      errors: result.error.flatten(),
    })
  }

  try {
    const passwordHash = await hash(result.data.password, 10)
    await dbInsertSimpleUser(
      result.data.email,
      result.data.password,
      passwordHash,
    )
    const user = await dbGetUser(result.data.email)

    return res.status(201).json({
      status: true,
      message: "user created successfully",
      data: [{ ...user, passwordHash }],
    })
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "some error occured",
      error: err,
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const users = await dbGetUserById(Number(userId))
    return res.status(200).json({
      status: true,
      message: "retrived successfully:)",
      data: [users],
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "request failed!",
      error: error,
    })
  }
}

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await dbGetAllUsers()
    return res.status(200).json({
      status: true,
      message: "retrived successfully",
      data: users,
      tatal: users.length,
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "request failed!",
      error: error,
    })
  }
}
