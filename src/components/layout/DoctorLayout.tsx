import { ReactNode } from "react";
import DoctorSidebar from "./DoctorSidebar";

interface DoctorLayoutProps {
  children: ReactNode;
}

const DoctorLayout = ({ children }: DoctorLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DoctorSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DoctorLayout;

