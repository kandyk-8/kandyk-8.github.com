import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Progress } from '@/app/components/ui/progress';
import { ArrowLeft, CheckCircle2, Lock, Video, BookOpen, FileText } from 'lucide-react';

interface Module {
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

interface TrackViewProps {
  track: {
    id: number;
    title: string;
    description: string;
  };
  modules: Module[];
  onBack: () => void;
  onCompleteModule: (moduleId: number) => void;
  onViewCertificate: () => void;
  allCompleted: boolean;
}

const getContentIcon = (contentType: string) => {
  switch (contentType) {
    case 'video':
      return <Video className="h-5 w-5" />;
    case 'reading':
      return <BookOpen className="h-5 w-5" />;
    case 'activity':
      return <FileText className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

export function TrackView({ 
  track, 
  modules, 
  onBack, 
  onCompleteModule, 
  onViewCertificate,
  allCompleted 
}: TrackViewProps) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const completedCount = modules.filter(m => m.completed).length;
  const progressPercentage = (completedCount / modules.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{track.title}</h1>
            <p className="text-gray-600 mt-1">{track.description}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm text-gray-600">
                {completedCount}/{modules.length} modules completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            {allCompleted && (
              <div className="mt-4 flex items-center justify-between bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Congratulations!</p>
                    <p className="text-sm text-green-700">You've completed this track</p>
                  </div>
                </div>
                <Button onClick={onViewCertificate}>View Certificate</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Modules</CardTitle>
                <CardDescription>Complete modules in order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => !module.locked && setSelectedModule(module)}
                    disabled={module.locked}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      module.locked
                        ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
                        : selectedModule?.id === module.id
                        ? 'bg-blue-50 border-blue-300 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {module.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : module.locked ? (
                            <Lock className="h-5 w-5 text-gray-400" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {module.title}
                          </p>
                          <p className="text-xs text-gray-500">Module {module.order_index}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2 text-gray-400">
                        {getContentIcon(module.content_type)}
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedModule ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedModule.title}</CardTitle>
                      <CardDescription>Module {selectedModule.order_index}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
                      {getContentIcon(selectedModule.content_type)}
                      <span>{selectedModule.content_type}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700">{selectedModule.description}</p>

                  {selectedModule.content_type === 'video' && selectedModule.content_url && (
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm opacity-75">Video Player</p>
                        <p className="text-xs opacity-50 mt-1">{selectedModule.content_url}</p>
                      </div>
                    </div>
                  )}

                  {selectedModule.content_type === 'reading' && (
                    <div className="prose max-w-none">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Reading Material</h3>
                        <p className="text-gray-700 mb-4">
                          This module contains important reading materials about leadership concepts.
                          In a real implementation, the full content would be displayed here.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Key concept 1 about {selectedModule.title.toLowerCase()}</li>
                          <li>Key concept 2 about {selectedModule.title.toLowerCase()}</li>
                          <li>Key concept 3 about {selectedModule.title.toLowerCase()}</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedModule.content_type === 'activity' && (
                    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                      <div className="flex items-start gap-3">
                        <FileText className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-amber-900 mb-2">Activity</h3>
                          <p className="text-gray-700 mb-4">
                            Complete the following activity to demonstrate your understanding of{' '}
                            {selectedModule.title.toLowerCase()}.
                          </p>
                          <p className="text-sm text-gray-600">
                            In a real implementation, this would include interactive exercises,
                            quizzes, or assignments related to the module topic.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedModule.completed ? (
                    <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Module Completed</p>
                        <p className="text-sm text-green-700">
                          Completed on {new Date(selectedModule.completed_at!).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <Checkbox
                        id="complete"
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onCompleteModule(selectedModule.id);
                          }
                        }}
                      />
                      <label
                        htmlFor="complete"
                        className="text-sm font-medium cursor-pointer select-none"
                      >
                        Mark this module as complete
                      </label>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a module to begin</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
