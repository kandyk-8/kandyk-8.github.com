// API Service for Leadership Academy
// This file contains all the API calls that your Python backend should implement

const API_BASE_URL = 'http://localhost:5000/api'; // Change this to your backend URL

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'trainee' | 'admin';
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export interface Track {
  id: number;
  title: string;
  description: string;
  total_modules: number;
  completed_modules: number;
  progress_percentage: number;
  current_module?: {
    id: number;
    title: string;
    order_index: number;
  };
}

export interface Module {
  id: number;
  title: string;
  description: string;
  content_type: 'video' | 'reading' | 'activity';
  content_url: string | null;
  order_index: number;
  completed: boolean;
  completed_at: string | null;
  locked: boolean;
}

export interface Certificate {
  id: number;
  certificate_number: string;
  issued_at: string;
  user_name: string;
  track_title: string;
  completion_date: string;
}

export interface Trainee {
  id: number;
  full_name: string;
  email: string;
  tracks: Array<{
    track_id: number;
    track_title: string;
    completed_modules: number;
    total_modules: number;
    progress_percentage: number;
    completed: boolean;
  }>;
}

export interface CompletionReport {
  period: {
    start_date: string;
    end_date: string;
  };
  overall_completions: number;
  by_track: Array<{
    track_id: number;
    track_title: string;
    completions: number;
  }>;
}

export interface TimeReport {
  overall_average_days: number;
  by_track: Array<{
    track_id: number;
    track_title: string;
    average_days: number;
    min_days: number;
    max_days: number;
    total_completions: number;
  }>;
}

// Authentication APIs
export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (email: string, password: string, full_name: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name }),
    });
    return response.json();
  },
};

// Trainee APIs
export const traineeAPI = {
  getDashboard: async () => {
    const response = await fetch(`${API_BASE_URL}/trainee/dashboard`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getTrack: async (trackId: number) => {
    const response = await fetch(`${API_BASE_URL}/trainee/track/${trackId}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  completeModule: async (moduleId: number) => {
    const response = await fetch(`${API_BASE_URL}/trainee/complete-module`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ module_id: moduleId }),
    });
    return response.json();
  },

  getCertificate: async (trackId: number) => {
    const response = await fetch(`${API_BASE_URL}/trainee/certificate/${trackId}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Admin APIs
export const adminAPI = {
  getTrainees: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/trainees`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getTracks: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/tracks`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getCompletionReport: async (startDate: string, endDate: string, trackId?: string) => {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
      ...(trackId && { track_id: trackId }),
    });
    const response = await fetch(`${API_BASE_URL}/admin/reports/completions?${params}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getTimeReport: async (trackId?: string) => {
    const params = new URLSearchParams({
      ...(trackId && { track_id: trackId }),
    });
    const response = await fetch(`${API_BASE_URL}/admin/reports/completion-time?${params}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Storage helpers
export const storage = {
  setToken: (token: string) => localStorage.setItem('auth_token', token),
  getToken: () => localStorage.getItem('auth_token'),
  removeToken: () => localStorage.removeItem('auth_token'),
  setUser: (user: User) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('user'),
  clear: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};
