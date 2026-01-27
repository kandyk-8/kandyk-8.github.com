import { useState, useEffect } from 'react';
import { LoginForm } from '@/app/components/LoginForm';
import { RegisterForm } from '@/app/components/RegisterForm';
import { TraineeDashboard } from '@/app/components/TraineeDashboard';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { TrackView } from '@/app/components/TrackView';
import { Certificate } from '@/app/components/Certificate';
import { CurriculumView } from '@/app/components/CurriculumView';
import { Toaster } from '@/app/components/ui/sonner';
import { toast } from 'sonner';

// Import mock data for demonstration
import {
  mockUsers,
  mockTracks,
  mockModules,
  mockTraineeDashboard,
  mockTrainees,
  mockCompletionReport,
  mockTimeReport,
  mockCertificate,
} from '@/app/services/mockData';

type ViewType = 'login' | 'register' | 'trainee-dashboard' | 'admin-dashboard' | 'track' | 'certificate' | 'curriculum';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'trainee' | 'admin';
}

function App() {
  const [view, setView] = useState<ViewType>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [completionReport, setCompletionReport] = useState<any>(null);
  const [timeReport, setTimeReport] = useState<any>(null);
  
  // Simulated state for trainee progress
  const [moduleProgress, setModuleProgress] = useState(mockModules);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setView(parsedUser.role === 'admin' ? 'admin-dashboard' : 'trainee-dashboard');
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - replace with real API call
    // Example: const result = await authAPI.login(email, password);
    
    let authenticatedUser: User | null = null;

    // Demo credentials
    if (email === 'john.doe@example.com' && password === 'user123') {
      authenticatedUser = mockUsers.trainee;
    } else if (email === 'admin@academy.com' && password === 'admin123') {
      authenticatedUser = mockUsers.admin;
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      localStorage.setItem('auth_token', 'mock-token-123');
      
      if (authenticatedUser.role === 'admin') {
        setView('admin-dashboard');
      } else {
        setView('trainee-dashboard');
      }
      
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials. Try john.doe@example.com / user123 or admin@academy.com / admin123');
    }
  };

  const handleRegister = (email: string, password: string, fullName: string) => {
    // Mock registration - replace with real API call
    // Example: const result = await authAPI.register(email, password, fullName);
    
    const newUser: User = {
      id: Date.now(),
      email,
      full_name: fullName,
      role: 'trainee',
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('auth_token', 'mock-token-123');
    setView('trainee-dashboard');
    
    toast.success('Registration successful!');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    setSelectedTrackId(null);
    setCompletionReport(null);
    setTimeReport(null);
    toast.info('Logged out successfully');
  };

  const handleSelectTrack = (trackId: number) => {
    setSelectedTrackId(trackId);
    
    // Check if track is completed
    const trackModules = moduleProgress[trackId as keyof typeof moduleProgress] || [];
    const allCompleted = trackModules.every(m => m.completed);
    
    if (allCompleted) {
      setView('certificate');
    } else {
      setView('track');
    }
  };

  const handleCompleteModule = (moduleId: number) => {
    // Mock module completion - replace with real API call
    // Example: const result = await traineeAPI.completeModule(moduleId);
    
    setModuleProgress((prev) => {
      const newProgress = { ...prev };
      
      // Find and update the module
      for (const trackId in newProgress) {
        const trackModules = newProgress[trackId as keyof typeof newProgress];
        const moduleIndex = trackModules.findIndex(m => m.id === moduleId);
        
        if (moduleIndex !== -1) {
          const updatedModules = [...trackModules];
          updatedModules[moduleIndex] = {
            ...updatedModules[moduleIndex],
            completed: true,
            completed_at: new Date().toISOString(),
          };
          
          // Unlock next module
          if (moduleIndex + 1 < updatedModules.length) {
            updatedModules[moduleIndex + 1] = {
              ...updatedModules[moduleIndex + 1],
              locked: false,
            };
          }
          
          newProgress[trackId as keyof typeof newProgress] = updatedModules as any;
          
          // Check if track is completed
          const allCompleted = updatedModules.every(m => m.completed);
          if (allCompleted) {
            toast.success('Congratulations! You completed the track!', {
              description: 'Your certificate is ready to view.',
            });
          } else {
            toast.success('Module completed!');
          }
          
          break;
        }
      }
      
      return newProgress;
    });
  };

  const handleGenerateCompletionReport = (startDate: string, endDate: string, trackId?: string) => {
    // Mock report generation - replace with real API call
    // Example: const result = await adminAPI.getCompletionReport(startDate, endDate, trackId);
    
    setCompletionReport(mockCompletionReport);
    toast.success('Completion report generated');
  };

  const handleGenerateTimeReport = (trackId?: string) => {
    // Mock report generation - replace with real API call
    // Example: const result = await adminAPI.getTimeReport(trackId);
    
    setTimeReport(mockTimeReport);
    toast.success('Time report generated');
  };

  const getCurrentTrack = () => {
    if (!selectedTrackId) return null;
    return mockTracks.find(t => t.id === selectedTrackId);
  };

  const getCurrentModules = () => {
    if (!selectedTrackId) return [];
    return moduleProgress[selectedTrackId as keyof typeof moduleProgress] || [];
  };

  const isTrackCompleted = () => {
    if (!selectedTrackId) return false;
    const modules = getCurrentModules();
    return modules.every(m => m.completed);
  };

  const getCurrentCertificate = () => {
    const track = getCurrentTrack();
    if (!track) return mockCertificate;
    
    return {
      ...mockCertificate,
      track_title: track.title,
      user_name: user?.full_name || 'User',
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {view === 'login' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setView('register')}
          />
        </div>
      )}

      {view === 'register' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setView('login')}
          />
        </div>
      )}

      {view === 'trainee-dashboard' && user && (
        <TraineeDashboard
          user={{
            full_name: user.full_name,
            email: user.email,
          }}
          tracks={mockTraineeDashboard.tracks.map(track => {
            const modules = moduleProgress[track.id as keyof typeof moduleProgress] || [];
            const completedCount = modules.filter(m => m.completed).length;
            const progressPercentage = (completedCount / modules.length) * 100;
            
            return {
              ...track,
              completed_modules: completedCount,
              progress_percentage: progressPercentage,
            };
          })}
          onSelectTrack={handleSelectTrack}
          onViewCurriculum={() => setView('curriculum')}
          onLogout={handleLogout}
        />
      )}

      {view === 'admin-dashboard' && user && (
        <AdminDashboard
          user={{
            full_name: user.full_name,
          }}
          trainees={mockTrainees}
          tracks={mockTracks}
          completionReport={completionReport}
          timeReport={timeReport}
          onGenerateCompletionReport={handleGenerateCompletionReport}
          onGenerateTimeReport={handleGenerateTimeReport}
          onLogout={handleLogout}
        />
      )}

      {view === 'track' && selectedTrackId && (
        <TrackView
          track={getCurrentTrack()!}
          modules={getCurrentModules()}
          onBack={() => setView('trainee-dashboard')}
          onCompleteModule={handleCompleteModule}
          onViewCertificate={() => setView('certificate')}
          allCompleted={isTrackCompleted()}
        />
      )}

      {view === 'certificate' && selectedTrackId && (
        <Certificate
          certificate={getCurrentCertificate()}
          onBack={() => setView('track')}
        />
      )}

      {view === 'curriculum' && (
        <CurriculumView
          onBack={() => setView('trainee-dashboard')}
        />
      )}

      {/* Development Helper */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs text-xs">
        <p className="font-semibold mb-2">Demo Credentials:</p>
        <p className="mb-1">
          <strong>Trainee:</strong><br />
          john.doe@example.com / user123
        </p>
        <p>
          <strong>Admin:</strong><br />
          admin@academy.com / admin123
        </p>
      </div>
    </div>
  );
}

export default App;