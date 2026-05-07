import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import DoctorLayout from "@/components/layout/DoctorLayout";
import ReceptionistLayout from "@/components/layout/ReceptionistLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface SmartRouteWrapperProps {
  children: ReactNode;
}

const SmartRouteWrapper = ({ children }: SmartRouteWrapperProps) => {
  const { user } = useAuth();
  
  // Use role-specific layouts
  if (user?.role === 'doctor') {
    return <DoctorLayout>{children}</DoctorLayout>;
  }
  
  if (user?.role === 'receptionist') {
    return <ReceptionistLayout>{children}</ReceptionistLayout>;
  }
  
  // Default to top navigation for other roles
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default SmartRouteWrapper;

