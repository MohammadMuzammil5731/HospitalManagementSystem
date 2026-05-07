import { useState, useEffect } from "react";
import ReceptionistLayout from "@/components/layout/ReceptionistLayout";
import AuthGuard from "@/components/AuthGuard";
import CreatePatientForm from "@/components/forms/CreatePatientForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, UserPlus, Calendar, Send, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import realClinicAPI from "@/services/realApi";

const ReceptionistDashboard = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [patientsData, appointmentsData, doctorsData] = await Promise.all([
        realClinicAPI.getPatients(),
        realClinicAPI.getAppointments(),
        realClinicAPI.getDoctors()
      ]);
      setPatients(patientsData.patients || []);
      setAppointments(appointmentsData.appointments || []);
      setDoctors(doctorsData.doctors || []);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handlePatientCreated = (newPatient: any) => {
    setPatients(prev => [...prev, newPatient]);
  };

  const handleAppointmentStatusChange = async (appointmentId: string, newStatus: string) => {
    try {
      await realClinicAPI.updateAppointment(appointmentId, { status: newStatus });
      setAppointments(prev => 
        prev.map(apt => 
          apt._id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );
      toast.success(`Appointment ${newStatus} successfully`);
    } catch (error) {
      toast.error("Failed to update appointment status");
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone?.includes(searchQuery)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AuthGuard requiredRole="receptionist">
      <ReceptionistLayout>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Receptionist Dashboard</h1>
            <p className="text-muted-foreground">Manage patient registrations and appointments</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <h3 className="text-2xl font-bold">{patients.length}</h3>
                  </div>
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Appointments</p>
                    <h3 className="text-2xl font-bold">
                      {appointments.filter(a => a.status === 'pending').length}
                    </h3>
                  </div>
                  <Calendar className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Appointments</p>
                    <h3 className="text-2xl font-bold">
                      {appointments.filter(a => a.status === 'completed').length}
                    </h3>
                  </div>
                  <Send className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Appointments</p>
                    <h3 className="text-2xl font-bold">
                      {appointments.filter(a => 
                        new Date(a.date).toDateString() === new Date().toDateString()
                      ).length}
                    </h3>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="patients" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patients">Patient Management</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>

            {/* Patient Management Tab */}
            <TabsContent value="patients" className="space-y-6">
              {/* Search and Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search patients by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <CreatePatientForm onPatientCreated={handlePatientCreated} />
                  </div>
                </CardContent>
              </Card>

              {/* Patients Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Patient List</CardTitle>
                  <CardDescription>All registered patients in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b">
                        <tr>
                          <th className="text-left p-4 font-semibold">Name</th>
                          <th className="text-left p-4 font-semibold">Age</th>
                          <th className="text-left p-4 font-semibold">Gender</th>
                          <th className="text-left p-4 font-semibold">Email</th>
                          <th className="text-left p-4 font-semibold">Phone</th>
                          <th className="text-left p-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPatients.map((patient) => (
                          <tr key={patient._id} className="border-b hover:bg-muted/30">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                                  {patient.name?.charAt(0)}
                                </div>
                                <span className="font-medium">{patient.name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-muted-foreground">{patient.age}</td>
                            <td className="p-4 text-muted-foreground">{patient.gender}</td>
                            <td className="p-4 text-muted-foreground">{patient.email}</td>
                            <td className="p-4 text-muted-foreground">{patient.phone}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedPatient(patient);
                                    setShowAppointmentForm(true);
                                  }}
                                >
                                  <Calendar className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredPatients.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No patients found matching your search.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>All scheduled appointments in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment._id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">
                                {appointment.patientId?.name || 'Unknown Patient'}
                              </h4>
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Doctor: {appointment.doctorId?.name || 'Unknown Doctor'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Date: {formatDate(appointment.date)} at {formatTime(appointment.date)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Problem: {appointment.problem}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Created by: {appointment.createdBy}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            {appointment.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleAppointmentStatusChange(appointment._id, 'approved')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleAppointmentStatusChange(appointment._id, 'cancelled')}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            )}
                            <p className="text-sm text-muted-foreground">
                              Created: {formatDate(appointment.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {appointments.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No appointments found.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ReceptionistLayout>
    </AuthGuard>
  );
};

export default ReceptionistDashboard;