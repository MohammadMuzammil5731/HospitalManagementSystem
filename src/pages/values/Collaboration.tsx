import React from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  Share2,
  Activity,
  Clock,
  FileText,
  Bell,
  ArrowRight,
  Award,
  Target,
  Stethoscope,
  Building
} from "lucide-react";
import { Link } from "react-router-dom";

const CollaborationPage = () => {
  const collaborationFeatures = [
    {
      icon: MessageSquare,
      title: "Real-Time Communication",
      description: "Secure messaging and communication tools that connect healthcare teams instantly",
      benefits: ["Instant Messaging", "Video Conferencing", "File Sharing", "Team Channels"]
    },
    {
      icon: Calendar,
      title: "Shared Scheduling",
      description: "Collaborative scheduling system that ensures optimal coordination between departments",
      benefits: ["Multi-Department Scheduling", "Resource Allocation", "Conflict Resolution", "Availability Management"]
    },
    {
      icon: FileText,
      title: "Collaborative Documentation",
      description: "Shared patient records and documentation that multiple providers can access and update",
      benefits: ["Shared Patient Records", "Real-time Updates", "Version Control", "Collaborative Notes"]
    },
    {
      icon: Bell,
      title: "Team Notifications",
      description: "Intelligent notification system that keeps all team members informed of important updates",
      benefits: ["Smart Alerts", "Priority Notifications", "Escalation Rules", "Custom Preferences"]
    }
  ];

  const collaborationStats = [
    { label: "Team Members", value: "500+", description: "Active healthcare professionals" },
    { label: "Departments", value: "15+", description: "Integrated departments" },
    { label: "Communication", value: "99%", description: "Reduced miscommunication" },
    { label: "Efficiency", value: "40%", description: "Improved workflow efficiency" }
  ];

  const teamRoles = [
    {
      role: "Doctors",
      description: "Access to patient records, diagnostic tools, and collaboration features",
      icon: Stethoscope,
      features: ["Patient Records", "Diagnostic Tools", "Treatment Planning", "Peer Consultation"]
    },
    {
      role: "Nurses",
      description: "Patient care coordination, medication management, and care team communication",
      icon: Users,
      features: ["Care Coordination", "Medication Management", "Patient Monitoring", "Shift Handoffs"]
    },
    {
      role: "Administrators",
      description: "System management, reporting, and operational oversight capabilities",
      icon: Building,
      features: ["System Administration", "Reporting", "Resource Management", "Performance Monitoring"]
    },
    {
      role: "Specialists",
      description: "Specialized tools and workflows for different medical specialties",
      icon: Target,
      features: ["Specialty Workflows", "Advanced Diagnostics", "Treatment Protocols", "Research Tools"]
    }
  ];

  const successStories = [
    {
      hospital: "City General Hospital",
      challenge: "Poor communication between departments",
      solution: "Implemented real-time messaging and shared scheduling",
      result: "50% reduction in communication delays"
    },
    {
      hospital: "Regional Medical Center",
      challenge: "Fragmented patient care coordination",
      solution: "Deployed collaborative documentation system",
      result: "35% improvement in care continuity"
    },
    {
      hospital: "University Hospital",
      challenge: "Complex multi-department scheduling",
      solution: "Integrated scheduling with resource optimization",
      result: "60% reduction in scheduling conflicts"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <Users className="h-4 w-4 mr-2" />
              Collaboration
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Healthcare Teams Working Together
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We work closely with healthcare professionals to understand their needs and create 
              tools that enhance teamwork, communication, and patient care coordination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="gap-2">
                  <Users className="h-5 w-5" />
                  Start Collaborating
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg">
                  View All Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Collaboration Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Measurable improvements in healthcare team collaboration
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {collaborationStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Collaboration Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tools designed to enhance teamwork and communication across healthcare teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {collaborationFeatures.map((feature, index) => (
              <Card key={index} className="group shadow-md border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Roles */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Role-Based Collaboration
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored collaboration tools for different healthcare roles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamRoles.map((role, index) => (
              <Card key={index} className="shadow-md border-border hover:shadow-lg transition-smooth text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <role.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{role.role}</CardTitle>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Collaboration Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from healthcare teams using our collaboration tools
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {successStories.map((story, index) => (
                <Card key={index} className="shadow-md border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{story.hospital}</CardTitle>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Success Story
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Challenge:</h4>
                        <p className="text-sm">{story.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Solution:</h4>
                        <p className="text-sm">{story.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Result:</h4>
                        <p className="text-sm font-medium text-green-600">{story.result}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Enhance Your Team Collaboration
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join healthcare teams who have transformed their collaboration and improved patient care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button variant="secondary" size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Start Collaborating
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Team Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollaborationPage;
