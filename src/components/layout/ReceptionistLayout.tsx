import { ReactNode } from "react";
import ReceptionistSidebar from "./ReceptionistSidebar";

interface ReceptionistLayoutProps {
  children: ReactNode;
}

const ReceptionistLayout = ({ children }: ReceptionistLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ReceptionistSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default ReceptionistLayout;

