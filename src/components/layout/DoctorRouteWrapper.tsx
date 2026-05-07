import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import DoctorLayout from "@/components/layout/DoctorLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface DoctorRouteWrapperProps {
  children: ReactNode;
}

const DoctorRouteWrapper = ({ children }: DoctorRouteWrapperProps) => {
  const { user } = useAuth();
  
  // If user is a doctor, use DoctorLayout (sidebar)
  // Otherwise, use DashboardLayout (top navigation)
  if (user?.role === 'doctor') {
    return <DoctorLayout>{children}</DoctorLayout>;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DoctorRouteWrapper;

