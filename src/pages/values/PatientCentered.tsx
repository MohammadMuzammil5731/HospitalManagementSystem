import React from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Shield, 
  CheckCircle, 
  Stethoscope,
  Activity,
  Clock,
  FileText,
  Bell,
  ArrowRight,
  Star,
  Award,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const PatientCenteredPage = () => {
  const patientFeatures = [
    {
      icon: Users,
      title: "Patient Portal",
      description: "Empower patients with secure access to their health records, appointment scheduling, and communication with healthcare providers",
      benefits: ["24/7 Access to Records", "Appointment Booking", "Secure Messaging", "Prescription Refills"]
    },
    {
      icon: Stethoscope,
      title: "Clinical Decision Support",
      description: "AI-powered tools that help healthcare providers make informed decisions based on patient history and best practices",
      benefits: ["Evidence-Based Recommendations", "Drug Interaction Alerts", "Diagnostic Assistance", "Treatment Guidelines"]
    },
    {
      icon: FileText,
      title: "Comprehensive Health Records",
      description: "Complete digital health records that follow patients throughout their healthcare journey",
      benefits: ["Unified Patient View", "Medical History Tracking", "Allergy Management", "Vaccination Records"]
    },
    {
      icon: Bell,
      title: "Proactive Care Management",
      description: "Automated reminders and alerts to ensure patients receive timely care and follow-up",
      benefits: ["Appointment Reminders", "Medication Alerts", "Preventive Care Notifications", "Follow-up Scheduling"]
    }
  ];

  const patientStories = [
    {
      name: "Sarah Johnson",
      condition: "Diabetes Management",
      story: "The patient portal helped me track my blood sugar levels and communicate directly with my doctor. I feel more in control of my health.",
      outcome: "Improved HbA1c levels by 2.3%"
    },
    {
      name: "Michael Chen",
      condition: "Cardiac Care",
      story: "The automated reminders for medication and follow-up appointments ensured I never missed important care milestones.",
      outcome: "100% medication adherence"
    },
    {
      name: "Emily Rodriguez",
      condition: "Preventive Care",
      story: "The system proactively scheduled my annual checkups and screenings, catching potential issues early.",
      outcome: "Early detection of hypertension"
    }
  ];

  const safetyMetrics = [
    { label: "Patient Safety Events", value: "99.7%", description: "Reduction in preventable errors" },
    { label: "Patient Satisfaction", value: "4.8/5", description: "Average patient rating" },
    { label: "Care Coordination", value: "95%", description: "Improved care team communication" },
    { label: "Patient Engagement", value: "87%", description: "Active portal usage rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <Heart className="h-4 w-4 mr-2" />
              Patient-Centered Care
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Every Feature Designed for Patient Care
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our platform puts patients at the center of everything we do, ensuring their safety, 
              comfort, and active participation in their healthcare journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="gap-2">
                  <Heart className="h-5 w-5" />
                  Learn More
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

      {/* Safety Metrics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Patient Safety & Satisfaction Metrics
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to patient-centered care delivers measurable results
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {safetyMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Patient-Centered Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tools and features designed to enhance patient care and engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {patientFeatures.map((feature, index) => (
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

      {/* Patient Stories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Patient Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from patients whose lives have been improved through our patient-centered approach
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {patientStories.map((story, index) => (
              <Card key={index} className="shadow-md border-border hover:shadow-lg transition-smooth">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{story.name}</CardTitle>
                      <CardDescription className="text-sm text-primary font-medium">
                        {story.condition}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">
                    "{story.story}"
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                    <Star className="h-4 w-4" />
                    {story.outcome}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Put Patients First?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join healthcare providers who prioritize patient-centered care with our comprehensive platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button variant="secondary" size="lg" className="gap-2">
                <Heart className="h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PatientCenteredPage;
