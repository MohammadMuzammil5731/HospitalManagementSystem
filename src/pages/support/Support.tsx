import React from "react";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactInfoCard } from "@/components/contact";
import { 
  MessageSquare,
  Phone,
  Mail,
  Headphones,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Video,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

const SupportPage = () => {
  const supportChannels = [
    {
      icon: MessageSquare,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      details: ["Available 24/7", "Average response time: 2 minutes"],
      action: {
        label: "Start Chat",
        onClick: () => console.log("Starting live chat")
      },
      available: "Available Now",
      badge: "Recommended"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM EST"],
      action: {
        label: "Call Now",
        href: "tel:+15551234567"
      },
      available: "Mon-Fri 9AM-6PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message and we'll respond quickly",
      details: ["support@medicarehospital.com", "Response within 24 hours"],
      action: {
        label: "Send Email",
        href: "mailto:support@medicarehospital.com"
      },
      available: "Response within 24h"
    },
    {
      icon: Headphones,
      title: "Emergency Support",
      description: "24/7 emergency technical support for critical issues",
      details: ["+1 (555) 911-TECH", "Critical system issues only"],
      action: {
        label: "Emergency Line",
        href: "tel:+15559118324"
      },
      available: "24/7 Emergency",
      badge: "Critical Only"
    }
  ];

  const helpResources = [
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Comprehensive guides and documentation",
      action: {
        label: "Browse Articles",
        onClick: () => console.log("Opening knowledge base")
      }
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      action: {
        label: "Watch Videos",
        onClick: () => console.log("Opening video tutorials")
      }
    },
    {
      icon: FileText,
      title: "User Manual",
      description: "Complete user manual and best practices",
      action: {
        label: "Download PDF",
        onClick: () => console.log("Downloading manual")
      }
    },
    {
      icon: HelpCircle,
      title: "FAQ Section",
      description: "Answers to frequently asked questions",
      action: {
        label: "View FAQs",
        onClick: () => console.log("Opening FAQ")
      }
    }
  ];

  const commonIssues = [
    {
      issue: "Login Problems",
      solution: "Reset your password or contact support for account recovery",
      severity: "Low"
    },
    {
      issue: "System Performance",
      solution: "Clear browser cache or try accessing from a different device",
      severity: "Medium"
    },
    {
      issue: "Data Sync Issues",
      solution: "Check your internet connection and try refreshing the page",
      severity: "Medium"
    },
    {
      issue: "Payment Processing",
      solution: "Contact billing support immediately for payment-related issues",
      severity: "High"
    },
    {
      issue: "Patient Data Access",
      solution: "Verify your permissions and contact your system administrator",
      severity: "High"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <Headphones className="h-4 w-4 mr-2" />
              Support Center
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              We're Here to Help
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get the support you need to make the most of MediCare HMS. 
              Our dedicated support team is ready to assist you 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the support method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {supportChannels.map((channel, index) => (
              <ContactInfoCard
                key={index}
                icon={channel.icon}
                title={channel.title}
                description={channel.description}
                details={channel.details}
                action={channel.action}
                available={channel.available}
                badge={channel.badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Self-Service Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers and learn how to use MediCare HMS effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {helpResources.map((resource, index) => (
              <ContactInfoCard
                key={index}
                icon={resource.icon}
                title={resource.title}
                description={resource.description}
                details={[]}
                action={resource.action}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Common Issues & Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quick solutions to frequently encountered problems
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {commonIssues.map((item, index) => (
                <Card key={index} className="shadow-md border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.issue}</CardTitle>
                      <Badge 
                        variant={item.severity === 'High' ? 'destructive' : 
                                item.severity === 'Medium' ? 'default' : 'secondary'}
                      >
                        {item.severity} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.solution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Status & Maintenance */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              System Status
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Current system status and scheduled maintenance
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-md border-border text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 font-semibold">All Systems Operational</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Last updated: 2 minutes ago
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md border-border text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 font-semibold">Under 2 seconds</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Average response time
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md border-border text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <CardTitle>Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-600 font-semibold">Scheduled Maintenance</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Next: Sunday 2AM-4AM EST
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our support team is standing by to assist you with any questions or issues
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="gap-2">
              <MessageSquare className="h-5 w-5" />
              Start Live Chat
            </Button>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SupportPage;
