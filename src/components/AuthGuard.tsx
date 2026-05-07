import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, ArrowLeft, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      const role = localStorage.getItem("userRole");
      
      if (authStatus === "true" && role) {
        setIsAuthenticated(true);
        setUserRole(role);
        
        // Check if user has required role
        if (requiredRole && role !== requiredRole) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [requiredRole, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const loginPath = requiredRole === "receptionist" 
      ? "/auth/receptionist-login" 
      : requiredRole === "doctor" 
      ? "/auth/doctor-login" 
      : "/auth/login";

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto p-3 bg-red-100 rounded-xl w-fit">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl">Access Restricted</CardTitle>
              <CardDescription>
                You need to be authenticated to access this page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  {requiredRole 
                    ? `This page requires ${requiredRole} access. Please sign in with your ${requiredRole} credentials.`
                    : "Please sign in to access this page."
                  }
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Link to={loginPath}>
                  <Button className="w-full gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
