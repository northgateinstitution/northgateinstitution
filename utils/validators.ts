import { z } from 'zod'

export const questionSchema = z.object({
  subject_id: z.string().min(1, 'Subject is required'),
  title: z.string().min(1, 'Title is required'),
  question_text: z.string().optional(),
  solution_text: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
})

export const studentSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  full_name: z.string().min(1, 'Full name is required'),
})

export const materialSchema = z.object({
  subject_id: z.string().min(1, 'Subject is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})