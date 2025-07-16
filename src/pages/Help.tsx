
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Help = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [supportForm, setSupportForm] = useState({
    name: '',
    category: '',
    message: ''
  });
  const [enableBugReport, setEnableBugReport] = useState(false);

  const faqs = [
    {
      question: "How do I join a pickup game?",
      answer: "Browse games on the main dashboard and click 'Join Game' on any game that has available spots. You'll be added to the participants list immediately!"
    },
    {
      question: "Can I create private games for my friend group?",
      answer: "Yes! When creating a game, you can toggle the 'Private Game' option. Private games are only visible to people you invite directly."
    },
    {
      question: "What happens if I need to cancel last minute?",
      answer: "We understand things come up! Just go to 'My Games' and click 'Leave Game'. Please try to give as much notice as possible so others can join."
    },
    {
      question: "How do I report inappropriate behavior?",
      answer: "You can report users or games through the 'Report' button on any game page, or contact our support team directly through this page."
    },
    {
      question: "Are games only for students at my university?",
      answer: "Yes, for safety and community reasons, games are limited to verified students from your university using your .edu email address."
    }
  ];

  const handleSubmitSupport = () => {
    if (!supportForm.name || !supportForm.category || !supportForm.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // TODO: Implement support form submission
    toast.success('Support request submitted! We\'ll get back to you within 24 hours.');
    setSupportForm({ name: '', category: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-[hsl(var(--university-primary))] to-[hsl(var(--university-secondary))] text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Help & Support</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg">
                  <button
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={supportForm.name}
                onChange={(e) => setSupportForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Issue Category</Label>
              <Select
                value={supportForm.category}
                onValueChange={(value) => setSupportForm(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an issue category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="account">Account Problem</SelectItem>
                  <SelectItem value="game">Game Related</SelectItem>
                  <SelectItem value="report">Report User/Content</SelectItem>
                  <SelectItem value="feedback">General Feedback</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Describe Your Issue</Label>
              <Textarea
                id="message"
                value={supportForm.message}
                onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Please provide as much detail as possible..."
                rows={5}
              />
            </div>

            <Button onClick={handleSubmitSupport} className="w-full">
              Send Support Request
            </Button>
          </CardContent>
        </Card>

        {/* Bug Report */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report a Bug</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Bug Reporting</Label>
                <p className="text-sm text-muted-foreground">
                  Help us improve the app by automatically sending bug reports
                </p>
              </div>
              <Switch
                checked={enableBugReport}
                onCheckedChange={setEnableBugReport}
              />
            </div>
            
            {enableBugReport && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  📱 Bug reporting is now enabled. If you encounter an issue, you can take a screenshot 
                  and it will be automatically included with your bug report.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Helpful Message */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground">
                Need immediate help? Our support team typically responds within 24 hours! 
                We're here to make your pickup game experience awesome. 🏀⚽🏈
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
