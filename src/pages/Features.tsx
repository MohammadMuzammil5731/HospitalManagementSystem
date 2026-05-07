import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Users, 
  Calendar, 
  FileText, 
  Pill, 
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  Heart,
  Stethoscope,
  Bed,
  Database,
  Bell,
  Settings,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records with EMR, medical history, and real-time updates",
      benefits: ["Digital Health Records", "Medical History Tracking", "Patient Portal Access"],
      link: "/patients",
      demoLink: "/demo/patients"
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Smart scheduling system with automated reminders and conflict resolution",
      benefits: ["Online Booking", "Automated Reminders", "Calendar Integration"],
      link: "/appointments",
      demoLink: "/demo/appointments"
    },
    {
      icon: Stethoscope,
      title: "Doctor Dashboard",
      description: "Role-based dashboards for doctors with patient overview and task management",
      benefits: ["Patient Overview", "Task Management", "Medical Notes"],
      link: "/dashboard/doctor",
      demoLink: "/demo/doctor-dashboard"
    },
    {
      icon: Bed,
      title: "Admission Management",
      description: "Streamlined admission process with bed allocation and ward management",
      benefits: ["Bed Allocation", "Ward Management", "Discharge Planning"],
      link: "/admissions",
      demoLink: "/demo/admissions"
    },
    {
      icon: FileText,
      title: "Lab Management",
      description: "Complete lab workflow from order placement to result delivery",
      benefits: ["Lab Orders", "Result Tracking", "Report Generation"],
      link: "/labs",
      demoLink: "/demo/labs"
    },
    {
      icon: Pill,
      title: "Pharmacy System",
      description: "Inventory management with prescription tracking and medication alerts",
      benefits: ["Inventory Control", "Prescription Management", "Stock Alerts"],
      link: "/pharmacy",
      demoLink: "/demo/pharmacy"
    },
    {
      icon: DollarSign,
      title: "Billing & Payments",
      description: "Automated billing system with insurance integration and payment tracking",
      benefits: ["Automated Billing", "Insurance Claims", "Payment Tracking"],
      link: "/billing",
      demoLink: "/demo/billing"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "HIPAA compliant system with role-based access control and audit trails",
      benefits: ["HIPAA Compliance", "Role-based Access", "Audit Trails"],
      link: "/settings",
      demoLink: "/demo/security"
    }
  ];

  const stats = [
    { label: "Patients Managed", value: "10,000+" },
    { label: "Appointments Scheduled", value: "50,000+" },
    { label: "Staff Members", value: "500+" },
    { label: "Departments", value: "15+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <Activity className="h-4 w-4 mr-2" />
              Comprehensive Hospital Management
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Powerful Features for Modern Healthcare
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Streamline your hospital operations with our comprehensive suite of tools designed for healthcare professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button variant="hero" size="lg" className="gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Manage Your Hospital
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools necessary for efficient hospital management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group shadow-md border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer hover:scale-105">
                <Link to={feature.link} className="block">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
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
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-primary font-medium group-hover:text-primary-foreground transition-colors duration-300">
                        Learn More
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:text-primary-foreground group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Hospital Management?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who trust MediCare HMS for their hospital operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button variant="secondary" size="lg" className="gap-2">
                <CheckCircle className="h-5 w-5" />
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

export default FeaturesPage;
