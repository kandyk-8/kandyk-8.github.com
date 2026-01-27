import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Button } from '@/app/components/ui/button';
import { BookOpen, Award, User, GraduationCap } from 'lucide-react';

interface Track {
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

interface TraineeDashboardProps {
  user: {
    full_name: string;
    email: string;
  };
  tracks: Track[];
  onSelectTrack: (trackId: number) => void;
  onViewCurriculum: () => void;
  onLogout: () => void;
}

export function TraineeDashboard({ user, tracks, onSelectTrack, onViewCurriculum, onLogout }: TraineeDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Leadership Academy</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onViewCurriculum}>
              <GraduationCap className="h-5 w-5 mr-2" />
              View Curriculum
            </Button>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">{user.full_name}</span>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.full_name}!</h2>
          <p className="text-gray-600">Continue your leadership journey</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <Card key={track.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{track.title}</CardTitle>
                    <CardDescription>{track.description}</CardDescription>
                  </div>
                  {track.progress_percentage === 100 && (
                    <Award className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">
                      {track.completed_modules}/{track.total_modules} modules
                    </span>
                  </div>
                  <Progress value={track.progress_percentage} className="h-2" />
                  <p className="text-sm text-gray-600 mt-1">{track.progress_percentage}% complete</p>
                </div>

                {track.current_module && track.progress_percentage < 100 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Current Module</p>
                    <p className="text-sm font-medium text-gray-900">{track.current_module.title}</p>
                  </div>
                )}

                {track.progress_percentage === 100 ? (
                  <Button className="w-full" variant="outline" onClick={() => onSelectTrack(track.id)}>
                    View Certificate
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => onSelectTrack(track.id)}>
                    Continue Learning
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {tracks.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No training tracks available yet.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}