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
  Award,
  Target,
  Globe,
  Building,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "SJ",
      experience: "15 years in healthcare technology"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "MC",
      experience: "10 years in software development"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Clinical Advisor",
      image: "ER",
      experience: "12 years in hospital administration"
    },
    {
      name: "David Kim",
      role: "Product Manager",
      image: "DK",
      experience: "8 years in healthcare products"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize hospital management"
    },
    {
      year: "2021",
      title: "First Hospital Client",
      description: "Successfully deployed our system in a 200-bed hospital"
    },
    {
      year: "2022",
      title: "HIPAA Certification",
      description: "Achieved full HIPAA compliance and security certification"
    },
    {
      year: "2023",
      title: "100+ Hospitals",
      description: "Reached milestone of serving over 100 healthcare facilities"
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Launched AI-powered features for predictive analytics"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient-Centered",
      description: "Every feature is designed with patient care and safety as the top priority"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "We maintain the highest standards of data security and privacy protection"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work closely with healthcare professionals to understand their needs"
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Continuously improving our platform with cutting-edge technology"
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
              <Building className="h-4 w-4 mr-2" />
              About MediCare HMS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Transforming Healthcare Through Technology
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're on a mission to streamline hospital operations and improve patient care through innovative technology solutions
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To empower healthcare professionals with intuitive, comprehensive technology that enhances patient care, 
                streamlines operations, and improves outcomes across the entire healthcare ecosystem.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We believe that technology should serve healthcare, not complicate it. Our platform is designed to 
                integrate seamlessly into existing workflows while providing powerful tools for better decision-making.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/features">
                  <Button variant="hero" className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Explore Features
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-md border-border">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Healthcare Facilities</div>
                </CardContent>
              </Card>
              <Card className="shadow-md border-border">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                  <div className="text-sm text-muted-foreground">Patients Served</div>
                </CardContent>
              </Card>
              <Card className="shadow-md border-border">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </CardContent>
              </Card>
              <Card className="shadow-md border-border">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group shadow-md border-border hover:shadow-lg transition-smooth text-center cursor-pointer" onClick={() => {
                const routes = ['/values/patient-centered', '/values/security-first', '/values/collaboration', '/values/innovation'];
                window.location.href = routes[index];
              }}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary-light flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <value.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center justify-center text-sm text-primary font-medium group-hover:text-primary-foreground transition-colors duration-300">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to transform healthcare
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
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

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Healthcare and technology experts working together to improve patient care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="shadow-md border-border hover:shadow-lg transition-smooth text-center">
                <CardHeader>
                  <div className="h-20 w-20 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                    {member.image}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {member.experience}
                  </p>
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
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Be part of the healthcare transformation. Let's work together to improve patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button variant="secondary" size="lg" className="gap-2">
                <CheckCircle className="h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
