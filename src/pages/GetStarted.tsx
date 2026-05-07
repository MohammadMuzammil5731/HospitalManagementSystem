import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  Stethoscope, 
  Shield, 
  Clock, 
  Star,
  Play,
  Download,
  BookOpen,
  MessageCircle,
  Zap,
  Target,
  TrendingUp,
  Heart,
  Activity,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  UserPlus,
  LogIn,
  ExternalLink,
  ChevronRight,
  Info
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const navigate = useNavigate();

  const steps = [
    { id: 0, title: "Welcome", description: "Get oriented with MediCare HMS" },
    { id: 1, title: "Choose Role", description: "Select your healthcare role" },
    { id: 2, title: "Quick Setup", description: "Create your account" },
    { id: 3, title: "Dashboard Tour", description: "Explore your workspace" },
    { id: 4, title: "Ready to Go", description: "Start using the system" }
  ];

  const roles = [
    {
      id: "receptionist",
      title: "Receptionist",
      icon: Users,
      description: "Patient registration, appointment management, front desk operations",
      features: ["Patient Registration", "Appointment Scheduling", "Billing Management", "Patient Communication"],
      color: "bg-blue-500",
      demoCredentials: { username: "receptionist1", password: "password123" }
    },
    {
      id: "doctor",
      title: "Doctor",
      icon: Stethoscope,
      description: "Patient consultation, medical records, prescription management",
      features: ["Patient Consultation", "Medical Records", "Prescription Management", "Diagnosis Tools"],
      color: "bg-green-500",
      demoCredentials: { username: "dr.smith", password: "password123" }
    },
    {
      id: "nurse",
      title: "Nurse",
      icon: Heart,
      description: "Patient care coordination, vital monitoring, medication administration",
      features: ["Patient Care", "Vital Monitoring", "Medication Admin", "Care Coordination"],
      color: "bg-purple-500",
      demoCredentials: { username: "nurse1", password: "password123" }
    },
    {
      id: "admin",
      title: "Administrator",
      icon: Settings,
      description: "System management, user administration, analytics and reporting",
      features: ["System Management", "User Administration", "Analytics", "Reports"],
      color: "bg-orange-500",
      demoCredentials: { username: "admin1", password: "password123" }
    }
  ];

  const quickActions = [
    {
      title: "Try Demo Account",
      description: "Experience the system with pre-loaded demo data",
      icon: Play,
      action: () => {
        if (selectedRole) {
          const role = roles.find(r => r.id === selectedRole);
          if (role) {
            navigate("/auth/login", { 
              state: { 
                demoCredentials: role.demoCredentials,
                role: selectedRole 
              } 
            });
          }
        }
      },
      variant: "default" as const
    },
    {
      title: "Create Account",
      description: "Set up your personal account and start managing patients",
      icon: UserPlus,
      action: () => navigate("/auth/signup"),
      variant: "outline" as const
    },
    {
      title: "Schedule Demo",
      description: "Book a personalized demo with our team",
      icon: Calendar,
      action: () => navigate("/contact"),
      variant: "secondary" as const
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Complete patient records with medical history, appointments, and billing",
      benefits: ["Digital Records", "Medical History", "Patient Portal"]
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Smart scheduling with automated reminders and conflict detection",
      benefits: ["Online Booking", "Automated Reminders", "Calendar Sync"]
    },
    {
      icon: FileText,
      title: "Digital Prescriptions",
      description: "E-prescribing with drug interaction alerts and patient history",
      benefits: ["E-Prescribing", "Drug Alerts", "Patient History"]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Real-time insights and customizable reports for better decisions",
      benefits: ["Real-time Analytics", "Custom Reports", "Insights"]
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-block p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl">
                <Activity className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold">Welcome to MediCare HMS</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your comprehensive hospital management system designed to streamline operations, 
                improve patient care, and enhance healthcare delivery.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Get up and running in minutes with our guided setup process.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Choose your role
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Create your account
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Explore your dashboard
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Transform your healthcare operations with powerful features.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      40% reduction in admin time
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-600" />
                      Improved patient satisfaction
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      HIPAA compliant security
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Choose Your Role</h2>
              <p className="text-muted-foreground">
                Select your healthcare role to customize your experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <Card 
                  key={role.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedRole === role.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${role.color} text-white`}>
                        <role.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{role.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {role.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedRole && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You've selected <strong>{roles.find(r => r.id === selectedRole)?.title}</strong>. 
                  This will customize your dashboard and available features.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Quick Setup</h2>
              <p className="text-muted-foreground">
                Choose how you'd like to get started with MediCare HMS
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-200">
                  <CardHeader className="text-center pb-3">
                    <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      variant={action.variant} 
                      className="w-full"
                      onClick={action.action}
                    >
                      {action.title}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Recommended: Try Demo First
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Experience the full system with pre-loaded demo data. No setup required - 
                just login and explore all features with sample patients, appointments, and records.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Demo accounts available for all roles</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Dashboard Tour</h2>
              <p className="text-muted-foreground">
                Get familiar with your personalized workspace
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="navigation">Navigation</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Dashboard Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Your personalized dashboard provides quick access to key information and tasks.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Real-time patient statistics
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Upcoming appointments
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Quick action buttons
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-primary" />
                        Role-Based Access
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Your dashboard is customized based on your selected role and permissions.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Relevant features only
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Streamlined workflow
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Secure access controls
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <feature.icon className="h-5 w-5 text-primary" />
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                        <div className="space-y-1">
                          {feature.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <ChevronRight className="h-3 w-3 text-muted-foreground" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="navigation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Navigation Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Main Navigation</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Use the sidebar for quick access to modules</li>
                          <li>• Breadcrumbs show your current location</li>
                          <li>• Search bar for finding patients or records</li>
                          <li>• Notifications for important updates</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Quick Actions</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Floating action buttons for common tasks</li>
                          <li>• Keyboard shortcuts for power users</li>
                          <li>• Recent items for quick access</li>
                          <li>• Favorites for frequently used features</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <Zap className="h-5 w-5" />
                        Pro Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="text-green-700">Maximize your productivity with these tips:</p>
                      <ul className="space-y-1 text-green-600">
                        <li>• Use keyboard shortcuts (Ctrl+K for search)</li>
                        <li>• Set up notifications for important events</li>
                        <li>• Customize your dashboard layout</li>
                        <li>• Use bulk actions for efficiency</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <MessageCircle className="h-5 w-5" />
                        Need Help?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="text-blue-700">Get support when you need it:</p>
                      <ul className="space-y-1 text-blue-600">
                        <li>• In-app help tooltips</li>
                        <li>• Video tutorials and guides</li>
                        <li>• 24/7 support chat</li>
                        <li>• Community forum access</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold">You're All Set!</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                You're ready to start using MediCare HMS. Choose your next step to begin your journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Start with Demo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Experience the full system with pre-loaded demo data. Perfect for exploring features 
                    and understanding the workflow.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        if (selectedRole) {
                          const role = roles.find(r => r.id === selectedRole);
                          if (role) {
                            navigate("/auth/login", { 
                              state: { 
                                demoCredentials: role.demoCredentials,
                                role: selectedRole 
                              } 
                            });
                          }
                        }
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Launch Demo
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      No account required • Instant access
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-green-600" />
                    Create Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Set up your personal account to start managing real patients and data. 
                    Your account will be customized for your selected role.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-green-300 text-green-700 hover:bg-green-100"
                      onClick={() => navigate("/auth/signup")}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up Now
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Free setup • Role-based access
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Additional Resources
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">Documentation</h4>
                  <p className="text-xs text-muted-foreground">Complete user guides and API docs</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">Support</h4>
                  <p className="text-xs text-muted-foreground">24/7 help and community support</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <Download className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">Mobile App</h4>
                  <p className="text-xs text-muted-foreground">Download our mobile app</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Get Started</h1>
              <p className="text-muted-foreground">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Progress</div>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-8 h-px bg-border mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="min-h-[600px]">
            <CardContent className="p-8">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => navigate("/features")}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                  <Button onClick={() => navigate("/auth/signup")}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GetStarted;
