// Mock data for demonstration purposes
// This simulates what your Python backend would return

export const mockUsers = {
  trainee: {
    id: 1,
    email: 'john.doe@example.com',
    full_name: 'John Doe',
    role: 'trainee' as const,
  },
  admin: {
    id: 2,
    email: 'admin@academy.com',
    full_name: 'Admin User',
    role: 'admin' as const,
  },
};

export const mockTracks = [
  {
    id: 1,
    title: 'Leadership Fundamentals',
    description: 'Core leadership skills and principles for emerging leaders',
    order_index: 1,
  },
  {
    id: 2,
    title: 'Advanced Leadership',
    description: 'Advanced techniques for experienced leaders',
    order_index: 2,
  },
  {
    id: 3,
    title: 'Executive Leadership',
    description: 'Strategic leadership for executives and senior managers',
    order_index: 3,
  },
];

export const mockModules = {
  1: [ // Leadership Fundamentals
    {
      id: 1,
      track_id: 1,
      title: 'Introduction to Leadership',
      description: 'Understanding what makes a great leader and the fundamental principles of effective leadership',
      content_type: 'video' as const,
      content_url: 'https://example.com/videos/intro-to-leadership.mp4',
      order_index: 1,
      completed: true,
      completed_at: '2026-01-15T10:30:00Z',
      locked: false,
    },
    {
      id: 2,
      track_id: 1,
      title: 'Leadership Styles',
      description: 'Exploring different leadership approaches: autocratic, democratic, transformational, and servant leadership',
      content_type: 'reading' as const,
      content_url: null,
      order_index: 2,
      completed: true,
      completed_at: '2026-01-17T14:20:00Z',
      locked: false,
    },
    {
      id: 3,
      track_id: 1,
      title: 'Communication Skills',
      description: 'Effective communication techniques for leaders including active listening and clear messaging',
      content_type: 'video' as const,
      content_url: 'https://example.com/videos/communication-skills.mp4',
      order_index: 3,
      completed: false,
      completed_at: null,
      locked: false,
    },
    {
      id: 4,
      track_id: 1,
      title: 'Team Building',
      description: 'Creating and managing effective teams through trust, collaboration, and shared goals',
      content_type: 'activity' as const,
      content_url: null,
      order_index: 4,
      completed: false,
      completed_at: null,
      locked: true,
    },
    {
      id: 5,
      track_id: 1,
      title: 'Conflict Resolution',
      description: 'Managing and resolving team conflicts constructively and maintaining team harmony',
      content_type: 'reading' as const,
      content_url: null,
      order_index: 5,
      completed: false,
      completed_at: null,
      locked: true,
    },
  ],
  2: [ // Advanced Leadership
    {
      id: 6,
      track_id: 2,
      title: 'Strategic Thinking',
      description: 'Developing strategic mindset and long-term planning capabilities',
      content_type: 'video' as const,
      content_url: 'https://example.com/videos/strategic-thinking.mp4',
      order_index: 1,
      completed: false,
      completed_at: null,
      locked: false,
    },
    {
      id: 7,
      track_id: 2,
      title: 'Change Management',
      description: 'Leading organizational change and managing resistance effectively',
      content_type: 'reading' as const,
      content_url: null,
      order_index: 2,
      completed: false,
      completed_at: null,
      locked: true,
    },
    {
      id: 8,
      track_id: 2,
      title: 'Decision Making',
      description: 'Advanced decision-making frameworks and analytical approaches',
      content_type: 'activity' as const,
      content_url: null,
      order_index: 3,
      completed: false,
      completed_at: null,
      locked: true,
    },
    {
      id: 9,
      track_id: 2,
      title: 'Coaching and Mentoring',
      description: 'Developing others through effective coaching and mentoring techniques',
      content_type: 'video' as const,
      content_url: 'https://example.com/videos/coaching.mp4',
      order_index: 4,
      completed: false,
      completed_at: null,
      locked: true,
    },
  ],
  3: [ // Executive Leadership
    {
      id: 10,
      track_id: 3,
      title: 'Vision and Mission',
      description: 'Creating compelling organizational vision and mission statements',
      content_type: 'reading' as const,
      content_url: null,
      order_index: 1,
      completed: false,
      completed_at: null,
      locked: false,
    },
    {
      id: 11,
      track_id: 3,
      title: 'Organizational Culture',
      description: 'Building and maintaining strong organizational culture',
      content_type: 'video' as const,
      content_url: 'https://example.com/videos/org-culture.mp4',
      order_index: 2,
      completed: false,
      completed_at: null,
      locked: true,
    },
    {
      id: 12,
      track_id: 3,
      title: 'Executive Presence',
      description: 'Developing executive presence and influential leadership',
      content_type: 'activity' as const,
      content_url: null,
      order_index: 3,
      completed: false,
      completed_at: null,
      locked: true,
    },
  ],
};

export const mockTraineeDashboard = {
  user: mockUsers.trainee,
  tracks: [
    {
      id: 1,
      title: 'Leadership Fundamentals',
      description: 'Core leadership skills and principles for emerging leaders',
      total_modules: 5,
      completed_modules: 2,
      progress_percentage: 40,
      current_module: {
        id: 3,
        title: 'Communication Skills',
        order_index: 3,
      },
    },
    {
      id: 2,
      title: 'Advanced Leadership',
      description: 'Advanced techniques for experienced leaders',
      total_modules: 4,
      completed_modules: 0,
      progress_percentage: 0,
      current_module: {
        id: 6,
        title: 'Strategic Thinking',
        order_index: 1,
      },
    },
    {
      id: 3,
      title: 'Executive Leadership',
      description: 'Strategic leadership for executives and senior managers',
      total_modules: 3,
      completed_modules: 0,
      progress_percentage: 0,
      current_module: {
        id: 10,
        title: 'Vision and Mission',
        order_index: 1,
      },
    },
  ],
};

export const mockTrainees = [
  {
    id: 1,
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    tracks: [
      {
        track_id: 1,
        track_title: 'Leadership Fundamentals',
        completed_modules: 2,
        total_modules: 5,
        progress_percentage: 40,
        completed: false,
      },
      {
        track_id: 2,
        track_title: 'Advanced Leadership',
        completed_modules: 0,
        total_modules: 4,
        progress_percentage: 0,
        completed: false,
      },
    ],
  },
  {
    id: 3,
    full_name: 'Jane Smith',
    email: 'jane.smith@example.com',
    tracks: [
      {
        track_id: 1,
        track_title: 'Leadership Fundamentals',
        completed_modules: 5,
        total_modules: 5,
        progress_percentage: 100,
        completed: true,
      },
      {
        track_id: 2,
        track_title: 'Advanced Leadership',
        completed_modules: 2,
        total_modules: 4,
        progress_percentage: 50,
        completed: false,
      },
    ],
  },
  {
    id: 4,
    full_name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    tracks: [
      {
        track_id: 1,
        track_title: 'Leadership Fundamentals',
        completed_modules: 5,
        total_modules: 5,
        progress_percentage: 100,
        completed: true,
      },
      {
        track_id: 3,
        track_title: 'Executive Leadership',
        completed_modules: 1,
        total_modules: 3,
        progress_percentage: 33,
        completed: false,
      },
    ],
  },
];

export const mockCompletionReport = {
  period: {
    start_date: '2026-01-01',
    end_date: '2026-01-31',
  },
  overall_completions: 45,
  by_track: [
    {
      track_id: 1,
      track_title: 'Leadership Fundamentals',
      completions: 20,
    },
    {
      track_id: 2,
      track_title: 'Advanced Leadership',
      completions: 15,
    },
    {
      track_id: 3,
      track_title: 'Executive Leadership',
      completions: 10,
    },
  ],
};

export const mockTimeReport = {
  overall_average_days: 45.5,
  by_track: [
    {
      track_id: 1,
      track_title: 'Leadership Fundamentals',
      average_days: 30.2,
      min_days: 15,
      max_days: 60,
      total_completions: 50,
    },
    {
      track_id: 2,
      track_title: 'Advanced Leadership',
      average_days: 52.8,
      min_days: 25,
      max_days: 90,
      total_completions: 30,
    },
    {
      track_id: 3,
      track_title: 'Executive Leadership',
      average_days: 65.3,
      min_days: 40,
      max_days: 120,
      total_completions: 15,
    },
  ],
};

export const mockCertificate = {
  id: 1,
  certificate_number: 'CERT-2026-001001',
  issued_at: '2026-01-23T15:00:00Z',
  user_name: 'John Doe',
  track_title: 'Leadership Fundamentals',
  completion_date: '2026-01-23',
};
