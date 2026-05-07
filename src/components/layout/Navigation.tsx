import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  UserCheck, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  FileText,
  Pill,
  DollarSign,
  Activity,
  MessageSquare,
  Clock
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const getNavigationItems = () => {
    if (!user) return [];

    const baseItems = [
      { name: "Dashboard", href: `/dashboard/${user.role}`, icon: Home },
    ];

    switch (user.role) {
      case "admin":
        return [
          ...baseItems,
          { name: "Patient Overview", href: "/admin/patients", icon: UserCheck },
          { name: "Appointments", href: "/appointments", icon: Calendar },
          { name: "System Settings", href: "/settings", icon: Settings },
        ];
      
      case "doctor":
        return [
          ...baseItems,
          { name: "My Appointments", href: "/appointments", icon: Calendar },
          { name: "Patient Records", href: "/patients", icon: Users },
          { name: "Messages", href: "/messages", icon: MessageSquare },
          { name: "Settings", href: "/settings", icon: Settings },
        ];
      
      case "receptionist":
        return [
          ...baseItems,
          { name: "Patient Management", href: "/dashboard/receptionist", icon: Users },
          { name: "Appointments", href: "/appointments", icon: Calendar },
          { name: "Calendar", href: "/calendar", icon: Clock },
          { name: "Billing", href: "/billing", icon: DollarSign },
          { name: "Messages", href: "/messages", icon: MessageSquare },
          { name: "Settings", href: "/settings", icon: Settings },
        ];
      
      case "patient":
        return [
          ...baseItems,
          { name: "Book Appointment", href: "/appointments/book", icon: Calendar },
          { name: "My Appointments", href: "/appointments", icon: Clock },
          { name: "Profile", href: "/patients", icon: UserCheck },
        ];
      
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gray-900">MediCare HMS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                {/* Navigation Items */}
                <div className="flex space-x-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-700 hover:text-primary hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* User Info and Logout */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="capitalize">
                      {user.role}
                    </Badge>
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/auth/patient-registration">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {user ? (
              <>
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 hover:text-primary hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="capitalize">
                        {user.role}
                      </Badge>
                      <span className="text-sm font-medium text-gray-700">
                        {user.name}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/patient-registration" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-start">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
