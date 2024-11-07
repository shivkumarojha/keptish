import z from "zod"

// User schema
export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
})

// signup user schema
export const signupUserSchema = userSchema.pick({ email: true, password: true })

// schema for password change
export const changePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmNewPassword: z.string(),
})