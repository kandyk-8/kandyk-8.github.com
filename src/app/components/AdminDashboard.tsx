import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Progress } from '@/app/components/ui/progress';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Users, BarChart3, Clock, Award, BookOpen } from 'lucide-react';

interface Trainee {
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

interface Track {
  id: number;
  title: string;
}

interface CompletionReport {
  overall_completions: number;
  by_track: Array<{
    track_id: number;
    track_title: string;
    completions: number;
  }>;
}

interface TimeReport {
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

interface AdminDashboardProps {
  user: {
    full_name: string;
  };
  trainees: Trainee[];
  tracks: Track[];
  completionReport: CompletionReport | null;
  timeReport: TimeReport | null;
  onGenerateCompletionReport: (startDate: string, endDate: string, trackId?: string) => void;
  onGenerateTimeReport: (trackId?: string) => void;
  onLogout: () => void;
}

export function AdminDashboard({
  user,
  trainees,
  tracks,
  completionReport,
  timeReport,
  onGenerateCompletionReport,
  onGenerateTimeReport,
  onLogout
}: AdminDashboardProps) {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-01-31');
  const [selectedTrackForCompletion, setSelectedTrackForCompletion] = useState<string>('all');
  const [selectedTrackForTime, setSelectedTrackForTime] = useState<string>('all');

  const totalTrainees = trainees.length;
  const totalCompletions = trainees.reduce(
    (sum, trainee) => sum + trainee.tracks.filter(t => t.completed).length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Leadership Academy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user.full_name}</span>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Trainees</CardTitle>
              <Users className="h-5 w-5 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalTrainees}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Tracks</CardTitle>
              <BookOpen className="h-5 w-5 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{tracks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Completions</CardTitle>
              <Award className="h-5 w-5 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalCompletions}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trainees" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trainees">
              <Users className="h-4 w-4 mr-2" />
              Trainees
            </TabsTrigger>
            <TabsTrigger value="completions">
              <BarChart3 className="h-4 w-4 mr-2" />
              Completion Reports
            </TabsTrigger>
            <TabsTrigger value="time">
              <Clock className="h-4 w-4 mr-2" />
              Time Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trainees">
            <Card>
              <CardHeader>
                <CardTitle>All Trainees</CardTitle>
                <CardDescription>View the progress of all trainees across all tracks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trainees.map((trainee) => (
                    <div key={trainee.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{trainee.full_name}</h3>
                          <p className="text-sm text-gray-600">{trainee.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Completed Tracks</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {trainee.tracks.filter(t => t.completed).length}/{trainee.tracks.length}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {trainee.tracks.map((track) => (
                          <div key={track.track_id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">{track.track_title}</span>
                              <span className="text-sm text-gray-600">
                                {track.completed_modules}/{track.total_modules} modules
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Progress value={track.progress_percentage} className="flex-1" />
                              <span className="text-sm text-gray-600 w-12 text-right">
                                {track.progress_percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {trainees.length === 0 && (
                    <div className="text-center py-12 text-gray-600">
                      No trainees registered yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completions">
            <Card>
              <CardHeader>
                <CardTitle>Completion Reports</CardTitle>
                <CardDescription>
                  View the number of completions for a given time period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trackFilter">Track (Optional)</Label>
                    <Select value={selectedTrackForCompletion} onValueChange={setSelectedTrackForCompletion}>
                      <SelectTrigger id="trackFilter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tracks</SelectItem>
                        {tracks.map((track) => (
                          <SelectItem key={track.id} value={track.id.toString()}>
                            {track.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    onGenerateCompletionReport(
                      startDate,
                      endDate,
                      selectedTrackForCompletion === 'all' ? undefined : selectedTrackForCompletion
                    )
                  }
                >
                  Generate Report
                </Button>

                {completionReport && (
                  <div className="space-y-4 pt-6 border-t">
                    <Card className="bg-blue-50">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Total Completions</p>
                          <p className="text-4xl font-bold text-gray-900">
                            {completionReport.overall_completions}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Track</TableHead>
                          <TableHead className="text-right">Completions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {completionReport.by_track.map((track) => (
                          <TableRow key={track.track_id}>
                            <TableCell className="font-medium">{track.track_title}</TableCell>
                            <TableCell className="text-right">{track.completions}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time">
            <Card>
              <CardHeader>
                <CardTitle>Time to Complete Reports</CardTitle>
                <CardDescription>
                  View average time required to complete training tracks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="trackFilterTime">Track (Optional)</Label>
                    <Select value={selectedTrackForTime} onValueChange={setSelectedTrackForTime}>
                      <SelectTrigger id="trackFilterTime">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tracks</SelectItem>
                        {tracks.map((track) => (
                          <SelectItem key={track.id} value={track.id.toString()}>
                            {track.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    onGenerateTimeReport(
                      selectedTrackForTime === 'all' ? undefined : selectedTrackForTime
                    )
                  }
                >
                  Generate Report
                </Button>

                {timeReport && (
                  <div className="space-y-4 pt-6 border-t">
                    <Card className="bg-purple-50">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Overall Average Time</p>
                          <p className="text-4xl font-bold text-gray-900">
                            {timeReport.overall_average_days.toFixed(1)} days
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Track</TableHead>
                          <TableHead className="text-right">Avg Days</TableHead>
                          <TableHead className="text-right">Min Days</TableHead>
                          <TableHead className="text-right">Max Days</TableHead>
                          <TableHead className="text-right">Completions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeReport.by_track.map((track) => (
                          <TableRow key={track.track_id}>
                            <TableCell className="font-medium">{track.track_title}</TableCell>
                            <TableCell className="text-right">{track.average_days.toFixed(1)}</TableCell>
                            <TableCell className="text-right">{track.min_days}</TableCell>
                            <TableCell className="text-right">{track.max_days}</TableCell>
                            <TableCell className="text-right">{track.total_completions}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
