import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, ExternalLink, Brain, Zap } from "lucide-react";

interface APIConfigProps {
  onKeysSet: () => void;
}

export function APIConfig({ onKeysSet }: APIConfigProps) {
  const [claudeKey, setClaudeKey] = useState(import.meta.env.VITE_ANTHROPIC_API_KEY || "");
  const [deepseekKey, setDeepseekKey] = useState(import.meta.env.VITE_DEEPSEEK_API_KEY || "");
  const [showKeys, setShowKeys] = useState({ claude: false, deepseek: false });

  const hasClaudeKey = Boolean(import.meta.env.VITE_ANTHROPIC_API_KEY || claudeKey);
  const hasDeepSeekKey = Boolean(import.meta.env.VITE_DEEPSEEK_API_KEY || deepseekKey);
  
  const handleSaveKeys = () => {
    // Note: In a real app, these would be stored securely
    // For privacy, we only store them in memory during the session
    if (claudeKey) {
      import.meta.env.VITE_ANTHROPIC_API_KEY = claudeKey;
    }
    if (deepseekKey) {
      import.meta.env.VITE_DEEPSEEK_API_KEY = deepseekKey;
    }
    onKeysSet();
  };

  const canProceed = hasClaudeKey || hasDeepSeekKey;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              <Brain className="w-6 h-6 text-purple-600" />
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            Smart AI Configuration
          </CardTitle>
          <CardDescription>
            MindEase uses intelligent AI routing between Claude and DeepSeek to provide the best therapeutic responses. Configure at least one API key to get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="claude">Claude Setup</TabsTrigger>
              <TabsTrigger value="deepseek">DeepSeek Setup</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-purple-50 border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Claude AI</h3>
                  </div>
                  <p className="text-sm text-purple-700 mb-3">
                    Best for complex emotional processing, trauma work, and philosophical questions
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-600">
                      {hasClaudeKey ? "✓ Configured" : "Not configured"}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">DeepSeek AI</h3>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Excellent for practical advice, CBT techniques, and structured support
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600">
                      {hasDeepSeekKey ? "✓ Configured" : "Not configured"}
                    </span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  The system automatically chooses the best AI for each message based on content analysis. Having both APIs provides the most comprehensive therapeutic support.
                </AlertDescription>
              </Alert>

              {canProceed && (
                <div className="text-center pt-4">
                  <Button onClick={handleSaveKeys} className="w-full">
                    Start Therapeutic Chat
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="claude" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="claude-key">Anthropic API Key</Label>
                  <div className="relative mt-1">
                    <Input
                      id="claude-key"
                      type={showKeys.claude ? "text" : "password"}
                      value={claudeKey}
                      onChange={(e) => setClaudeKey(e.target.value)}
                      placeholder="sk-ant-api03-..."
                      className="pr-20"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowKeys(prev => ({ ...prev, claude: !prev.claude }))}
                    >
                      {showKeys.claude ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">How to get your Claude API key:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Visit the Anthropic Console</li>
                    <li>Sign in or create an account</li>
                    <li>Navigate to API Keys section</li>
                    <li>Generate a new API key</li>
                    <li>Copy and paste it above</li>
                  </ol>
                  <Button variant="outline" size="sm" className="mt-3">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Anthropic Console
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deepseek" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deepseek-key">DeepSeek API Key</Label>
                  <div className="relative mt-1">
                    <Input
                      id="deepseek-key"
                      type={showKeys.deepseek ? "text" : "password"}
                      value={deepseekKey}
                      onChange={(e) => setDeepseekKey(e.target.value)}
                      placeholder="sk-..."
                      className="pr-20"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowKeys(prev => ({ ...prev, deepseek: !prev.deepseek }))}
                    >
                      {showKeys.deepseek ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">How to get your DeepSeek API key:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Visit the DeepSeek Platform</li>
                    <li>Sign in or create an account</li>
                    <li>Go to API Keys management</li>
                    <li>Create a new API key</li>
                    <li>Copy and paste it above</li>
                  </ol>
                  <Button variant="outline" size="sm" className="mt-3">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open DeepSeek Platform
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {!canProceed && (
            <Alert className="mt-4">
              <AlertDescription>
                Please configure at least one API key to start your therapeutic chat session.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}