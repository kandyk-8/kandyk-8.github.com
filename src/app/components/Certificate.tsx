import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Award, Download, ArrowLeft } from 'lucide-react';

interface CertificateProps {
  certificate: {
    certificate_number: string;
    issued_at: string;
    user_name: string;
    track_title: string;
    completion_date: string;
  };
  onBack: () => void;
}

export function Certificate({ certificate, onBack }: CertificateProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Track
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-end gap-3 print:hidden">
          <Button onClick={handlePrint}>
            <Download className="h-4 w-4 mr-2" />
            Download / Print
          </Button>
        </div>

        <Card className="certificate-card bg-white shadow-xl border-8 border-blue-600">
          <CardContent className="p-12">
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <Award className="h-24 w-24 text-yellow-500" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  Certificate of Completion
                </h1>
                <p className="text-xl text-gray-600">Leadership Academy</p>
              </div>

              <div className="py-8">
                <p className="text-lg text-gray-600 mb-4">This is to certify that</p>
                <h2 className="text-4xl font-bold text-blue-600 mb-6">
                  {certificate.user_name}
                </h2>
                <p className="text-lg text-gray-600 mb-4">has successfully completed</p>
                <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                  {certificate.track_title}
                </h3>
              </div>

              <div className="flex justify-between items-end pt-8 border-t-2 border-gray-300">
                <div className="text-left">
                  <p className="text-sm text-gray-600">Date of Completion</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(certificate.completion_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">Certificate Number</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {certificate.certificate_number}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-16 pt-8">
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
                  <p className="text-sm text-gray-600">Program Director</p>
                </div>
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
                  <p className="text-sm text-gray-600">Academy Director</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <style>{`
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .certificate-card {
              box-shadow: none;
              page-break-inside: avoid;
            }
          }
        `}</style>
      </main>
    </div>
  );
}
