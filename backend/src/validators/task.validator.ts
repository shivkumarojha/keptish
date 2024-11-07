import z from 'zod'

export const taskSchema = z.object({
    title: z.string().min(1).max(500),
    description: z.string().min(1).max(1000)
})

export const taskListSchema = z.object({
    listName: z.string().min(1).max(500)
})