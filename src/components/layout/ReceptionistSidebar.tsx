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
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ReceptionistSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard/receptionist", icon: Home },
    { name: "Patient Management", href: "/dashboard/receptionist", icon: Users },
    { name: "Appointments", href: "/appointments", icon: Calendar },
    { name: "Calendar", href: "/calendar", icon: Clock },
    { name: "Billing", href: "/billing", icon: DollarSign },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href);
  };

  return (
    <div className={`bg-white shadow-lg border-r transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-gray-900">Receptionist Panel</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold">
            {user?.name?.charAt(0) || 'R'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Receptionist User'}
              </p>
              <Badge variant="secondary" className="text-xs">
                Receptionist
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50 ${
            isCollapsed ? 'px-3' : 'px-3'
          }`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default ReceptionistSidebar;

