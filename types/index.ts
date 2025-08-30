
export interface Category {
  id: string;
  name: string;
  type: 'subject' | 'competitive';
  created_at: string;
}

export interface Question {
  id: string;
  category_id: string;
  question: string;
  question_type: 'text' | 'mathematical';
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  student_name: string;
  student_email: string;
  student_mobile: string;
  category_id: string;
  quiz_type: 'short' | 'full';
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  time_taken: number;
  score: number;
  accuracy: number;
  started_at: string;
  completed_at: string;
  categories?: Category;
}

export interface QuizAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_answer: 'A' | 'B' | 'C' | 'D';
  is_correct: boolean;
  created_at: string;
}


export interface Notice {
  id: string
  title: string
  content: string
  file_url?: string
  file_name?: string
  file_type?: string
  file_size?: number
  created_at: string
  updated_at: string
}

export interface FileUploadResponse {
  fileUrl: string
  directUrl: string
  fileName: string
  fileId: string
  fileType: string
  fileSize: number
  fileCategory: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}