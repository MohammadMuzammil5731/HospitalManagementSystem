import React from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Activity,
  Clock,
  FileText,
  Database,
  ArrowRight,
  Award,
  Target,
  Users,
  Server
} from "lucide-react";
import { Link } from "react-router-dom";

const SecurityFirstPage = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All patient data is encrypted using industry-standard AES-256 encryption both in transit and at rest",
      benefits: ["AES-256 Encryption", "SSL/TLS Protection", "Data at Rest Security", "Secure Key Management"]
    },
    {
      icon: Users,
      title: "Role-Based Access Control",
      description: "Granular permissions system ensuring users only access data appropriate to their role and responsibilities",
      benefits: ["Granular Permissions", "Role Hierarchy", "Access Auditing", "Privilege Escalation Controls"]
    },
    {
      icon: Eye,
      title: "Comprehensive Audit Trails",
      description: "Complete logging and monitoring of all system activities for compliance and security monitoring",
      benefits: ["Activity Logging", "Compliance Reporting", "Real-time Monitoring", "Forensic Analysis"]
    },
    {
      icon: Database,
      title: "HIPAA Compliance",
      description: "Full compliance with HIPAA regulations including administrative, physical, and technical safeguards",
      benefits: ["HIPAA Certification", "Business Associate Agreements", "Risk Assessments", "Compliance Training"]
    }
  ];

  const certifications = [
    {
      name: "HIPAA Compliance",
      description: "Full compliance with Health Insurance Portability and Accountability Act",
      status: "Certified",
      icon: Shield
    },
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality controls audit",
      status: "Certified",
      icon: Award
    },
    {
      name: "ISO 27001",
      description: "Information security management system certification",
      status: "Certified",
      icon: Target
    },
    {
      name: "HITRUST CSF",
      description: "Healthcare-specific security framework certification",
      status: "Certified",
      icon: CheckCircle
    }
  ];

  const securityMetrics = [
    { label: "Data Breaches", value: "0", description: "Zero breaches since launch" },
    { label: "Uptime", value: "99.99%", description: "System availability" },
    { label: "Encryption", value: "256-bit", description: "AES encryption standard" },
    { label: "Compliance", value: "100%", description: "HIPAA compliant" }
  ];

  const securityBestPractices = [
    {
      title: "Multi-Factor Authentication",
      description: "All user accounts require MFA for enhanced security",
      implementation: "Mandatory for all users"
    },
    {
      title: "Regular Security Audits",
      description: "Quarterly security assessments and penetration testing",
      implementation: "Automated + Manual reviews"
    },
    {
      title: "Data Backup & Recovery",
      description: "Automated backups with point-in-time recovery capabilities",
      implementation: "Daily automated backups"
    },
    {
      title: "Staff Training",
      description: "Comprehensive security training for all healthcare staff",
      implementation: "Annual certification required"
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
              <Shield className="h-4 w-4 mr-2" />
              Security First
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Bank-Level Security for Healthcare
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We maintain the highest standards of data security and privacy protection, 
              ensuring your patients' sensitive information is always safe and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="gap-2">
                  <Shield className="h-5 w-5" />
                  Security Assessment
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

      {/* Security Metrics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Security Performance Metrics
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to security delivers measurable results
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {securityMetrics.map((metric, index) => (
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

      {/* Security Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Security Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive security measures protecting your healthcare data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
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

      {/* Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Security Certifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-recognized certifications demonstrating our commitment to security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="shadow-md border-border hover:shadow-lg transition-smooth text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{cert.name}</CardTitle>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {cert.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {cert.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Security Best Practices
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proactive security measures we implement to protect your data
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {securityBestPractices.map((practice, index) => (
                <Card key={index} className="shadow-md border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{practice.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {practice.implementation}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{practice.description}</p>
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
            Secure Your Healthcare Data Today
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join healthcare providers who trust our security-first approach to protect their patients' data
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button variant="secondary" size="lg" className="gap-2">
                <Shield className="h-5 w-5" />
                Start Secure Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Security Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SecurityFirstPage;
