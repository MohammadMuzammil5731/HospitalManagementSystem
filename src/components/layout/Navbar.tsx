import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Menu, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      const role = localStorage.getItem("userRole");
      const user = localStorage.getItem("username");
      
      setIsAuthenticated(authStatus === "true");
      setUserRole(role);
      setUsername(user);
    };

    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("userData");
    
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    
    navigate("/");
  };

  const getDashboardPath = () => {
    switch (userRole) {
      case "receptionist":
        return "/dashboard/receptionist";
      case "doctor":
        return "/doctor";
      case "nurse":
        return "/dashboard/nurse";
      case "admin":
        return "/dashboard/admin";
      case "patient":
        return "/dashboard/patient";
      default:
        return "/dashboard";
    }
  };

  const getRoleDisplayName = () => {
    switch (userRole) {
      case "receptionist":
        return "Receptionist";
      case "doctor":
        return "Doctor";
      case "nurse":
        return "Nurse";
      case "admin":
        return "Administrator";
      case "patient":
        return "Patient";
      default:
        return "User";
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-md group-hover:shadow-glow transition-smooth">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              MediCare HMS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardPath()} className="text-foreground hover:text-primary transition-smooth">
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {username} ({getRoleDisplayName()})
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/features" className="text-foreground hover:text-primary transition-smooth">
                  Features
                </Link>
                <Link to="/about" className="text-foreground hover:text-primary transition-smooth">
                  About
                </Link>
                <Link to="/contact" className="text-foreground hover:text-primary transition-smooth">
                  Contact
                </Link>
                <Link to="/auth/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button variant="hero" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-smooth"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    className="px-4 py-2 hover:bg-muted rounded-lg transition-smooth"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-4 py-2 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {username} ({getRoleDisplayName()})
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/features"
                    className="px-4 py-2 hover:bg-muted rounded-lg transition-smooth"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    to="/about"
                    className="px-4 py-2 hover:bg-muted rounded-lg transition-smooth"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="px-4 py-2 hover:bg-muted rounded-lg transition-smooth"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="hero" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
