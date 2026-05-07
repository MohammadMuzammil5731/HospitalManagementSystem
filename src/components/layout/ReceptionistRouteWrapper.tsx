import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import ReceptionistLayout from "@/components/layout/ReceptionistLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface ReceptionistRouteWrapperProps {
  children: ReactNode;
}

const ReceptionistRouteWrapper = ({ children }: ReceptionistRouteWrapperProps) => {
  const { user } = useAuth();
  
  // If user is a receptionist, use ReceptionistLayout (sidebar)
  // Otherwise, use DashboardLayout (top navigation)
  if (user?.role === 'receptionist') {
    return <ReceptionistLayout>{children}</ReceptionistLayout>;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ReceptionistRouteWrapper;

