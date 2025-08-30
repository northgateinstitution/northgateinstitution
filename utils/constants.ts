export const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
}

export const FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  pdf: ['application/pdf'],
  all: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'],
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ADMIN: '/admin',
  ADMIN_QUESTIONS: '/admin/questions',
  ADMIN_STUDENTS: '/admin/students',
  ADMIN_MATERIALS: '/admin/materials',
  STUDENT: '/student',
  STUDENT_SOLVE: '/student/solve',
  STUDENT_MATERIALS: '/student/materials',
} as const