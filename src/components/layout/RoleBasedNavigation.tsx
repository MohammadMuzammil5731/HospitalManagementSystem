import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Activity,
  Pill,
  DollarSign,
  Settings,
  LogOut,
  Bell,
  Bed,
  Stethoscope,
} from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: any;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, roles: ['admin', 'doctor', 'receptionist'] },
  { title: "Receptionist", url: "/dashboard/receptionist", icon: Users, roles: ['admin', 'doctor'] },
  { title: "Doctor", url: "/doctor", icon: Stethoscope, roles: ['admin', 'doctor'] },
  { title: "Patients", url: "/patients", icon: Users, roles: ['admin', 'doctor'] },
  { title: "Admin Patients", url: "/admin/patients", icon: Users, roles: ['admin'] },
  { title: "Appointments", url: "/appointments", icon: Calendar, roles: ['admin', 'doctor', 'receptionist'] },
  { title: "Admissions", url: "/admissions", icon: Bed, roles: ['admin', 'doctor', 'receptionist'] },
  { title: "Doctors & Staff", url: "/doctors", icon: Stethoscope, roles: ['admin', 'doctor'] },
  { title: "Lab Orders", url: "/labs", icon: FileText, roles: ['admin', 'doctor', 'receptionist'] },
  { title: "Pharmacy", url: "/pharmacy", icon: Pill, roles: ['admin', 'doctor', 'receptionist'] },
  { title: "Billing", url: "/billing", icon: DollarSign, roles: ['admin', 'doctor', 'receptionist'] },
  { title: "Calendar", url: "/calendar", icon: Calendar, roles: ['receptionist'] },
  { title: "Messages", url: "/messages", icon: Bell, roles: ['admin', 'doctor', 'receptionist'] },
  { title: "Settings", url: "/settings", icon: Settings, roles: ['admin', 'doctor', 'receptionist'] },
];

export const getRoleBasedMenuItems = (userRole: string): MenuItem[] => {
  return menuItems.filter(item => item.roles.includes(userRole));
};

export default menuItems;
