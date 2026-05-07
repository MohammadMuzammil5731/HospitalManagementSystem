import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import PatientRegistration from "./pages/auth/PatientRegistration";
import RegisterStaff from "./pages/auth/RegisterStaff";
import AppointmentBooking from "./pages/appointments/AppointmentBooking";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Patients from "./pages/patients/Patients";
import PatientProfile from "./pages/patients/PatientProfile";
import Appointments from "./pages/appointments/Appointments";
import Admissions from "./pages/admissions/Admissions";
import DoctorsStaff from "./pages/staff/DoctorsStaff";
import LabOrders from "./pages/labs/LabOrders";
import Pharmacy from "./pages/pharmacy/Pharmacy";
import Billing from "./pages/billing/Billing";
import HospitalCalendar from "./pages/calendar/Calendar";
import Messages from "./pages/messages/Messages";
import SettingsPage from "./pages/settings/Settings";
import FeaturesPage from "./pages/Features";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import PatientCenteredPage from "./pages/values/PatientCentered";
import SecurityFirstPage from "./pages/values/SecurityFirst";
import CollaborationPage from "./pages/values/Collaboration";
import InnovationPage from "./pages/values/Innovation";
import AdminPatients from "./pages/admin/AdminPatients";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import GetStarted from "./pages/GetStarted";
import NewAppointment from "./pages/appointments/NewAppointment";
import DoctorRouteWrapper from "@/components/layout/DoctorRouteWrapper";
import PatientRegistrationForm from "@/components/forms/PatientRegistrationForm";
import ReceptionistRouteWrapper from "@/components/layout/ReceptionistRouteWrapper";
import SmartRouteWrapper from "@/components/layout/SmartRouteWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/values/patient-centered" element={<PatientCenteredPage />} />
            <Route path="/values/security-first" element={<SecurityFirstPage />} />
            <Route path="/values/collaboration" element={<CollaborationPage />} />
            <Route path="/values/innovation" element={<InnovationPage />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/patient-registration" element={<PatientRegistration />} />
            <Route path="/auth/register-staff" element={<RegisterStaff />} />
            <Route path="/patient-registration" element={<PatientRegistrationForm />} />

            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={
              <RoleBasedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleBasedRoute>
            } />
            <Route path="/admin/patients" element={
              <RoleBasedRoute allowedRoles={['admin']}>
                <AdminPatients />
              </RoleBasedRoute>
            } />

            {/* Doctor Routes */}
            <Route path="/dashboard/doctor" element={
              <RoleBasedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </RoleBasedRoute>
            } />
            <Route path="/doctor" element={
              <RoleBasedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </RoleBasedRoute>
            } />

            {/* Patient Routes */}
            <Route path="/dashboard/patient" element={
              <RoleBasedRoute allowedRoles={['patient']}>
                <Dashboard />
              </RoleBasedRoute>
            } />
            <Route path="/appointments/book" element={
              <RoleBasedRoute allowedRoles={['patient']}>
                <AppointmentBooking />
              </RoleBasedRoute>
            } />

            {/* Receptionist Routes */}
            <Route path="/dashboard/receptionist" element={
              <RoleBasedRoute allowedRoles={['receptionist']}>
                <ReceptionistDashboard />
              </RoleBasedRoute>
            } />

            {/* Shared Routes - Admin and Doctor */}
            <Route path="/patients" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor']}>
                <DoctorRouteWrapper>
                  <Patients />
                </DoctorRouteWrapper>
              </RoleBasedRoute>
            } />
            <Route path="/patients/:id" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor']}>
                <DoctorRouteWrapper>
                  <PatientProfile />
                </DoctorRouteWrapper>
              </RoleBasedRoute>
            } />
            <Route path="/doctors" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor']}>
                <DoctorRouteWrapper>
                  <DoctorsStaff />
                </DoctorRouteWrapper>
              </RoleBasedRoute>
            } />

            {/* Shared Routes - Admin, Doctor, Receptionist */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                <SmartRouteWrapper>
                  <Appointments />
                </SmartRouteWrapper>
              </RoleBasedRoute>
            } />
            <Route path="/appointments/new" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                <SmartRouteWrapper>
                  <NewAppointment />
                </SmartRouteWrapper>
              </RoleBasedRoute>
            } />
            <Route path="/admissions" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                <SmartRouteWrapper>
                  <Admissions />
                </SmartRouteWrapper>
              </RoleBasedRoute>
            } />
            <Route path="/labs" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                <SmartRouteWrapper>
                  <LabOrders />
                </SmartRouteWrapper>
              </RoleBasedRoute>
            } />
            <Route path="/pharmacy" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                <SmartRouteWrapper>
                  <Pharmacy />
                </SmartRouteWrapper>
              </RoleBasedRoute>
            } />
            <Route path="/billing" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                <SmartRouteWrapper>
                  <Billing />
                </SmartRouteWrapper>
              </RoleBasedRoute>
            } />
            <Route path="/messages" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                <SmartRouteWrapper>
                  <Messages />
                </SmartRouteWrapper>
              </RoleBasedRoute>
            } />
            <Route path="/settings" element={
              <RoleBasedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                <SmartRouteWrapper>
                  <SettingsPage />
                </SmartRouteWrapper>
              </RoleBasedRoute>
            } />

            {/* Receptionist Only Routes */}
            <Route path="/calendar" element={
              <RoleBasedRoute allowedRoles={['receptionist']}>
                <SmartRouteWrapper>
                  <HospitalCalendar />
                </SmartRouteWrapper>
              </RoleBasedRoute>
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
