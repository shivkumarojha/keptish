import z from "zod"

// category schema
export const categorySchemaValidator = z.object({
    categoryName: z.string(),
})


// note Schema
export const noteSchemaValidator = z.object({
    title: z.string(),
    description: z.string(),
    images: z.string().array().optional(),
    categories: z.string().array().optional()
}) 