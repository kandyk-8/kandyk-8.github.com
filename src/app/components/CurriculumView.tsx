import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { ArrowLeft, BookOpen, ExternalLink, Clock } from 'lucide-react';
import { allLeadershipRoles, curriculumIntro, type Role, type Attribute } from '@/app/services/curriculumComplete';

interface CurriculumViewProps {
  onBack: () => void;
}

export function CurriculumView({ onBack }: CurriculumViewProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button variant="ghost" onClick={() => setSelectedRole(null)} className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Roles
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedRole.title}</h1>
              <p className="text-gray-600 mt-1">{selectedRole.description}</p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {selectedRole.attributes.map((attribute, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{attribute.name}</CardTitle>
                  <CardDescription>{attribute.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attribute.courses.map((course, courseIndex) => (
                      <div
                        key={courseIndex}
                        className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{course.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {course.platform}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {course.duration}
                            </span>
                          </div>
                        </div>
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 flex-shrink-0"
                        >
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Course
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{curriculumIntro.title}</h1>
            <p className="text-lg text-blue-600 mb-4">{curriculumIntro.subtitle}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About This Curriculum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {curriculumIntro.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Leadership Roles & Training</h2>
          <p className="text-gray-600">
            Select a role to view the curriculum and course recommendations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allLeadershipRoles.map((role) => (
            <Card
              key={role.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedRole(role)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{role.title}</CardTitle>
                <CardDescription className="line-clamp-3">{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    {role.attributes.length} Key Attributes
                  </p>
                  <p className="text-sm text-gray-600">
                    {role.attributes.reduce((sum, attr) => sum + attr.courses.length, 0)} Courses
                  </p>
                  <Button className="w-full mt-4" variant="outline">
                    View Curriculum
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
