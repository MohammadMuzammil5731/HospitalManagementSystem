import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Activity,
  Users,
  Calendar,
  FileText,
  Shield,
  BarChart3,
  Clock,
  Heart,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  User,
  Stethoscope
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import heroImage from "@/assets/hero-hospital.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import AppointmentRequestForm from "@/components/forms/AppointmentRequestForm";
import { useEffect } from "react";

const Landing = () => {
  const navigate = useNavigate();

  // Removed automatic redirect - users can now see the landing page even when logged in
  // They can use the navbar to navigate to their dashboard if needed

  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive electronic medical records and patient data management",
      link: "/patients",
      benefits: ["Digital Health Records", "Medical History", "Patient Portal"]
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Smart scheduling system with automated reminders and conflict detection",
      link: "/appointments",
      benefits: ["Online Booking", "Automated Reminders", "Calendar Sync"]
    },
    {
      icon: FileText,
      title: "Digital Prescriptions",
      description: "E-prescribing with drug interaction alerts and patient history",
      link: "/pharmacy",
      benefits: ["E-Prescribing", "Drug Alerts", "Patient History"]
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Bank-level security with complete data encryption and access controls",
      link: "/settings",
      benefits: ["Data Encryption", "Access Controls", "Audit Trails"]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Real-time insights and customizable reports for better decision making",
      link: "/dashboard",
      benefits: ["Real-time Analytics", "Custom Reports", "Insights"]
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Cloud-based system accessible anytime, anywhere on any device",
      link: "/dashboard",
      benefits: ["Cloud Access", "Mobile Ready", "Any Device"]
    },
  ];

  const benefits = [
    "Reduce administrative time by 40%",
    "Improve patient satisfaction scores",
    "Streamline billing and insurance claims",
    "Enhanced care coordination",
    "Real-time data synchronization",
    "Integrated lab and pharmacy systems",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* <div className="absolute inset-0 bg-gradient-subtle opacity-50" > */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-primary-light rounded-full text-primary font-semibold text-sm">
                Modern Healthcare Management
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Hospital Operations
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Streamline patient care, optimize workflows, and improve outcomes with our
                comprehensive hospital management system trusted by healthcare providers worldwide.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/get-started">
                  <Button variant="hero" size="xl">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <AppointmentRequestForm />
                <Link to="/features">
                  <Button variant="outline" size="xl">
                    View Features
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-6">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Hospitals</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50k+</div>
                  <div className="text-sm text-muted-foreground">Healthcare Workers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">2M+</div>
                  <div className="text-sm text-muted-foreground">Patients Served</div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-2xl blur-3xl" />
              <img
                src={heroImage}
                alt="Healthcare professionals in modern hospital"
                className="relative rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        {/* </div> */}
        </div>
      </section>

      {/* Welcome Message for Logged-in Users */}
      {localStorage.getItem("isAuthenticated") === "true" && (
        <section className="py-8 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
                <User className="h-4 w-4" />
                Welcome back, {localStorage.getItem("username")}! 
                <span className="text-sm text-muted-foreground">
                  ({localStorage.getItem("userRole")?.charAt(0).toUpperCase() + localStorage.getItem("userRole")?.slice(1)})
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Use the navigation bar above to access your dashboard or explore our features below.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything You Need for{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Better Healthcare
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to improve efficiency and patient care quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in border-border bg-card min-h-[320px] h-[400px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={feature.link} className="block">
                  <div className="p-4 bg-primary-light rounded-lg w-fit mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-base leading-relaxed">{feature.description}</p>
                  
                  {/* Benefits List */}
                  <ul className="space-y-2 mb-6">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Learn More Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-primary font-medium group-hover:text-primary-foreground transition-colors duration-300">
                      Learn More
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:text-primary-foreground group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Services Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Patient Services{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Made Simple
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Easy access to healthcare services with our patient-friendly portal
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border bg-card">
              <div className="p-4 bg-primary-light rounded-lg w-fit mx-auto mb-6">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Book Appointment</h3>
              <p className="text-muted-foreground mb-6">
                Schedule your appointment with our qualified doctors online
              </p>
              <AppointmentRequestForm />
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border bg-card">
              <div className="p-4 bg-primary-light rounded-lg w-fit mx-auto mb-6">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Patient Registration</h3>
              <p className="text-muted-foreground mb-6">
                Register as a new patient to access our healthcare services
              </p>
              <Link to="/patient-registration">
                <Button variant="outline" size="lg" className="w-full">
                  Register Now
                </Button>
              </Link>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border bg-card">
              <div className="p-4 bg-primary-light rounded-lg w-fit mx-auto mb-6">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Find Doctors</h3>
              <p className="text-muted-foreground mb-6">
                Browse our directory of qualified healthcare professionals
              </p>
              <Link to="/staff/doctors">
                <Button variant="outline" size="lg" className="w-full">
                  View Doctors
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Intuitive Dashboard for{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Real-Time Insights
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Get a complete overview of your hospital operations with customizable dashboards,
                real-time analytics, and actionable insights.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth/register">
                <Button variant="hero" size="lg" className="mt-4">
                  Get Started Today
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-secondary opacity-20 rounded-2xl blur-3xl" />
              <img
                src={dashboardPreview}
                alt="Hospital management dashboard preview"
                className="relative rounded-2xl shadow-lg w-full h-auto border border-border"
              />
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Heart className="h-16 w-16 text-primary-foreground mx-auto mb-6 animate-pulse-glow" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Healthcare Delivery?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of hospitals already using MediCare HMS to provide better patient care
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/auth/login">
              <Button variant="secondary" size="xl" className="shadow-lg">
                Staff Login
              </Button>
            </Link>
            <Link to="/patient-registration">
              <Button
                variant="outline"
                size="xl"
                className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Patient Registration
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="xl"
                className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
