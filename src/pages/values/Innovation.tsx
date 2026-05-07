import React from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Zap, 
  Brain, 
  CheckCircle, 
  Rocket,
  Activity,
  Clock,
  FileText,
  Bell,
  ArrowRight,
  Award,
  Users,
  Stethoscope,
  Database,
  BarChart3,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const InnovationPage = () => {
  const innovationFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Machine learning algorithms that provide predictive insights and intelligent recommendations",
      benefits: ["Predictive Analytics", "Risk Assessment", "Treatment Optimization", "Outcome Prediction"]
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description: "Smart automation that reduces manual tasks and streamlines healthcare processes",
      benefits: ["Process Automation", "Smart Scheduling", "Auto-Documentation", "Workflow Optimization"]
    },
    {
      icon: BarChart3,
      title: "Real-Time Insights",
      description: "Advanced reporting and analytics that provide actionable insights for better decision-making",
      benefits: ["Real-time Dashboards", "Performance Metrics", "Trend Analysis", "Custom Reports"]
    },
    {
      icon: Rocket,
      title: "Future-Ready Technology",
      description: "Cutting-edge technology stack that adapts to emerging healthcare trends and requirements",
      benefits: ["Cloud-Native Architecture", "API-First Design", "Scalable Infrastructure", "Integration Ready"]
    }
  ];

  const innovationStats = [
    { label: "AI Models", value: "50+", description: "Machine learning models deployed" },
    { label: "Automation", value: "80%", description: "Reduction in manual tasks" },
    { label: "Performance", value: "3x", description: "Faster processing speeds" },
    { label: "Accuracy", value: "95%", description: "Prediction accuracy rate" }
  ];

  const techInnovations = [
    {
      technology: "Machine Learning",
      description: "Advanced ML algorithms for predictive healthcare analytics",
      applications: ["Disease Prediction", "Treatment Optimization", "Resource Planning", "Risk Assessment"],
      icon: Brain
    },
    {
      technology: "Cloud Computing",
      description: "Scalable cloud infrastructure for global healthcare delivery",
      applications: ["Global Access", "Scalable Storage", "High Availability", "Cost Optimization"],
      icon: Database
    },
    {
      technology: "IoT Integration",
      description: "Internet of Things devices for continuous patient monitoring",
      applications: ["Wearable Devices", "Remote Monitoring", "Real-time Data", "Health Tracking"],
      icon: Activity
    },
    {
      technology: "Blockchain",
      description: "Secure, immutable patient data management and sharing",
      applications: ["Data Integrity", "Secure Sharing", "Audit Trails", "Consent Management"],
      icon: Shield
    }
  ];

  const innovationTimeline = [
    {
      year: "2024",
      title: "AI Integration Launch",
      description: "Deployed machine learning models for predictive analytics and clinical decision support"
    },
    {
      year: "2023",
      title: "Cloud Migration",
      description: "Completed migration to cloud-native architecture for improved scalability and performance"
    },
    {
      year: "2022",
      title: "API Platform",
      description: "Launched comprehensive API platform enabling seamless third-party integrations"
    },
    {
      year: "2021",
      title: "Mobile Innovation",
      description: "Introduced advanced mobile capabilities with offline functionality and real-time sync"
    },
    {
      year: "2020",
      title: "Platform Foundation",
      description: "Built the foundational architecture with microservices and modern development practices"
    }
  ];

  const futureInnovations = [
    {
      title: "Virtual Reality Training",
      description: "Immersive VR training modules for healthcare professionals",
      timeline: "Q2 2025"
    },
    {
      title: "Quantum Computing",
      description: "Quantum algorithms for complex medical research and drug discovery",
      timeline: "Q4 2025"
    },
    {
      title: "5G Integration",
      description: "Ultra-fast connectivity for real-time telemedicine and remote surgery",
      timeline: "Q1 2026"
    },
    {
      title: "Neural Interfaces",
      description: "Brain-computer interfaces for advanced patient communication",
      timeline: "Q3 2026"
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
              <Target className="h-4 w-4 mr-2" />
              Innovation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Continuously Improving with Cutting-Edge Technology
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We continuously improve our platform with cutting-edge technology, 
              ensuring healthcare providers have access to the most advanced tools and capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="gap-2">
                  <Rocket className="h-5 w-5" />
                  Explore Innovation
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

      {/* Innovation Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Innovation Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Measurable improvements through continuous innovation
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {innovationStats.map((stat, index) => (
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

      {/* Innovation Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Innovation Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technologies that drive healthcare innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {innovationFeatures.map((feature, index) => (
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

      {/* Technology Innovations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technology Innovations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technologies powering the future of healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techInnovations.map((tech, index) => (
              <Card key={index} className="shadow-md border-border hover:shadow-lg transition-smooth text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <tech.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{tech.technology}</CardTitle>
                  <CardDescription className="text-base">
                    {tech.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {tech.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Innovation Timeline
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our journey of continuous innovation and technological advancement
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {innovationTimeline.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                      <span className="text-primary font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Innovations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Future Innovations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upcoming technologies that will shape the future of healthcare
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {futureInnovations.map((innovation, index) => (
                <Card key={index} className="shadow-md border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{innovation.title}</CardTitle>
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        {innovation.timeline}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{innovation.description}</p>
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
            Be Part of Healthcare Innovation
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join healthcare providers who are leading the way with innovative technology solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button variant="secondary" size="lg" className="gap-2">
                <Rocket className="h-5 w-5" />
                Start Innovating
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Innovation Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovationPage;
