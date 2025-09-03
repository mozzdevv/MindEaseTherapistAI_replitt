import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function Resources() {
  return (
    <section id="resources" className="py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Mental Health Resources
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            While MindEase can help with processing your thoughts, sometimes you might need
            additional support. Here are trusted resources that can provide professional help when
            needed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Crisis Hotlines Card */}
          <Card>
            <CardHeader className="bg-primary-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Crisis Hotlines</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  National Suicide Prevention Lifeline
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  24/7, free and confidential support for people in distress.
                </p>
                <a
                  href="tel:1-800-273-8255"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  1-800-273-8255
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Crisis Text Line</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Free 24/7 support via text message.
                </p>
                <a
                  href="sms:741741?&body=HOME"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Text HOME to 741741
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  SAMHSA's National Helpline
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Treatment referral and information service (English and Spanish).
                </p>
                <a
                  href="tel:1-800-662-4357"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  1-800-662-4357
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Mental Health Organizations */}
          <Card>
            <CardHeader className="bg-primary-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Mental Health Organizations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  National Alliance on Mental Illness (NAMI)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  The nation's largest grassroots mental health organization.
                </p>
                <a
                  href="https://www.nami.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Mental Health America
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Nation's leading community-based nonprofit dedicated to mental health.
                </p>
                <a
                  href="https://www.mhanational.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Anxiety and Depression Association of America
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Dedicated to the prevention and treatment of anxiety, depression, and related
                  disorders.
                </p>
                <a
                  href="https://adaa.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Self-Help Resources */}
          <Card>
            <CardHeader className="bg-primary-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span>Self-Help Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">PsychCentral</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Mental health information and resources.
                </p>
                <a
                  href="https://www.psychcentral.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Mindful.org</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Resources on mindfulness meditation and practices.
                </p>
                <a
                  href="https://www.mindful.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">7 Cups</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Online therapy and free support chat with trained listeners.
                </p>
                <a
                  href="https://www.7cups.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Meditation Apps */}
          <Card>
            <CardHeader className="bg-primary-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span>Meditation Apps</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Headspace</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Guided meditation and mindfulness techniques.
                </p>
                <a
                  href="https://www.headspace.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Calm</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  App for sleep, meditation and relaxation.
                </p>
                <a
                  href="https://www.calm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Insight Timer</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Free meditation app with thousands of guided meditations.
                </p>
                <a
                  href="https://insighttimer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-primary-50 dark:bg-gray-900 border border-primary-100 dark:border-gray-700 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300">
          <p>
            <strong>Disclaimer:</strong> MindEase provides these resources for informational purposes
            only and does not endorse specific services or treatments. These resources are not
            substitutes for professional mental health care. If you're experiencing a mental health
            emergency, please call your local emergency services immediately.
          </p>
        </div>
      </div>
    </section>
  );
}
