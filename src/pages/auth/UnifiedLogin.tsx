import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LogIn, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Activity,
  Shield,
  Users,
  Stethoscope
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const UnifiedLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = [
    { value: "admin", label: "Admin", icon: Shield },
    { value: "doctor", label: "Doctor", icon: Stethoscope },
    { value: "receptionist", label: "Receptionist", icon: Users }
  ];

  const demoCredentials = {
    receptionist: [
      { username: "receptionist_smith", password: "receptionist123", name: "Receptionist Smith" }
    ],
    doctor: [
      { username: "dr_sarah", password: "doctor123", name: "Dr. Sarah Johnson", specialization: "Cardiologist" }
    ],
    admin: [
      { username: "admin", password: "admin123", name: "Admin User" }
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.role) {
      setError("Please select your role");
      setLoading(false);
      return;
    }

    try {
      await login(formData.username, formData.password);
      
      // Navigate based on role
      if (formData.role === "receptionist") {
        navigate("/dashboard/receptionist");
      } else if (formData.role === "doctor") {
        navigate("/dashboard/doctor");
      } else if (formData.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard");
      }
      
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const selectedRole = roles.find(role => role.value === formData.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl">
              <LogIn className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
              <p className="text-sm text-muted-foreground">Access your healthcare portal</p>
            </div>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
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

              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Activity className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Demo Credentials:</h4>
                  {formData.role && (
                    <div className="space-y-1">
                      {demoCredentials[formData.role as keyof typeof demoCredentials]?.map((cred, index) => (
                        <div key={index} className="text-xs text-muted-foreground">
                          <div className="font-medium">{cred.name}</div>
                          <div>Username: <span className="font-mono">{cred.username}</span></div>
                          <div>Password: <span className="font-mono">{cred.password}</span></div>
                          {cred.specialization && (
                            <div>Specialization: {cred.specialization}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {!formData.role && (
                    <p className="text-xs text-muted-foreground">
                      Select a role to see available demo credentials
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground mt-2 p-2 bg-blue-50 rounded">
                    <strong>Note:</strong> For accounts created through signup, use the password you set during registration.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLogin;
