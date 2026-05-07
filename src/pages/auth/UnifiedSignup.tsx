import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  UserPlus, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Activity,
  Shield,
  Mail,
  Phone,
  Building,
  User,
  GraduationCap,
  Stethoscope,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import realClinicAPI from "@/services/realApi";

const UnifiedSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    consultationFee: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    { value: "receptionist", label: "Receptionist", icon: Users },
    { value: "doctor", label: "Doctor", icon: Stethoscope }
  ];

  const specializations = [
    "Neurologist",
    "Nephrologist", 
    "Eye Specialist",
    "Bone Specialist",
    "Cardiologist",
    "Dermatologist",
    "General Physician",
    "Pediatrician",
    "Gynecologist",
    "Psychiatrist"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      setLoading(false);
      return;
    }

    if (!formData.role) {
      setError("Please select your role");
      setLoading(false);
      return;
    }

    try {
      // Prepare user data for API
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        password: formData.password,
        role: formData.role,
        employeeId: formData.employeeId || undefined,
        department: formData.department || undefined,
        specialization: formData.specialization || undefined,
        licenseNumber: formData.licenseNumber || undefined,
        experience: formData.experience ? parseInt(formData.experience) : undefined,
        consultationFee: formData.consultationFee ? parseFloat(formData.consultationFee) : undefined
      };

      // Try real API first
      try {
        const response = await realClinicAPI.register(userData);
        
        toast({
          title: "Registration Successful!",
          description: `Welcome ${formData.firstName}! Your ${formData.role} account has been created.`
        });
        
        // Redirect based on role
        if (formData.role === "receptionist") {
          navigate("/dashboard/receptionist");
        } else if (formData.role === "doctor") {
          navigate("/doctor");
        } else if (formData.role === "admin") {
          navigate("/dashboard/admin");
        } else if (formData.role === "nurse") {
          navigate("/dashboard/nurse");
        } else if (formData.role === "patient") {
          navigate("/dashboard/patient");
        } else {
          navigate("/dashboard");
        }
        
        return;
      } catch (apiError) {
        console.log("API registration failed, using local storage:", apiError);
      }

      // Fallback to local storage (for demo purposes)
      const newUser = {
        id: `${formData.role.toUpperCase().charAt(0)}${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        employeeId: formData.employeeId,
        department: formData.department,
        specialization: formData.specialization || null,
        licenseNumber: formData.licenseNumber || null,
        experience: formData.experience ? parseInt(formData.experience) : null,
        consultationFee: formData.consultationFee ? parseFloat(formData.consultationFee) : null,
        username: formData.username,
        password: formData.password,
        role: formData.role,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem("userRole", formData.role);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", formData.username);
      localStorage.setItem("userData", JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful!",
        description: `Welcome ${formData.firstName}! Your ${formData.role} account has been created. Please sign in to continue.`
      });
      
      // Redirect to login page
      navigate("/auth/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const selectedRole = roles.find(role => role.value === formData.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
              <p className="text-sm text-muted-foreground">Join our healthcare team</p>
            </div>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Fill in your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Role Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Role Selection
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="role">Select Your Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-2">
                            <role.icon className="h-4 w-4" />
                            {role.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Employment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID *</Label>
                    <Input
                      id="employeeId"
                      type="text"
                      placeholder="Enter your employee ID"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange("employeeId", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      type="text"
                      placeholder="e.g., Front Desk, Neurology, etc."
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Doctor-specific fields */}
              {formData.role === "doctor" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Medical Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Medical Specialization *</Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => handleInputChange("specialization", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Medical License Number *</Label>
                      <Input
                        id="licenseNumber"
                        type="text"
                        placeholder="e.g., MD123456"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="e.g., 5"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consultationFee">Consultation Fee ($) *</Label>
                      <Input
                        id="consultationFee"
                        type="number"
                        placeholder="e.g., 150"
                        value={formData.consultationFee}
                        onChange={(e) => handleInputChange("consultationFee", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Account Credentials */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Account Credentials
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                        className="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                        className="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </div>
                )}
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Activity className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">Available Roles:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Receptionist:</strong> Patient registration, appointment management</li>
                    <li>• <strong>Doctor:</strong> Patient consultation, prescription management</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnifiedSignup;
