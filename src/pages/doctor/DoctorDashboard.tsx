import { useState, useEffect } from "react";
import DoctorLayout from "@/components/layout/DoctorLayout";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Users, 
  Calendar, 
  Pill, 
  Eye, 
  Printer, 
  Send, 
  Clock,
  Stethoscope,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { clinicAPI } from "@/services/api";
import { 
  Patient, 
  Appointment, 
  Prescription, 
  ReceptionistRequest, 
  PrescriptionForm,
  Medication,
  MedicationTiming,
  AppointmentStatus 
} from "@/types";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [requests, setRequests] = useState<ReceptionistRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("appointments");
  const { toast } = useToast();

  // Prescription form state
  const [prescriptionForm, setPrescriptionForm] = useState<PrescriptionForm>({
    patientId: "",
    appointmentId: "",
    diagnosis: "",
    medications: [],
    instructions: "",
    followUpDate: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [patientsData, appointmentsData, prescriptionsData] = await Promise.all([
        clinicAPI.getPatients(),
        clinicAPI.getAppointments(),
        clinicAPI.getPrescriptions()
      ]);
      
      setPatients(patientsData);
      setAppointments(appointmentsData);
      setPrescriptions(prescriptionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingAppointments = appointments.filter(appointment => 
    appointment.status === 'Scheduled' || appointment.status === 'Confirmed'
  );

  const handleCreatePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!selectedPatient || !selectedAppointment) return;
      
      const prescriptionData = {
        ...prescriptionForm,
        patientId: selectedPatient.id,
        appointmentId: selectedAppointment.id
      };
      
      const newPrescription = await clinicAPI.createPrescription(prescriptionData);
      setPrescriptions(prev => [...prev, newPrescription]);
      
      // Update appointment status to completed
      await clinicAPI.updateAppointmentStatus(selectedAppointment.id, 'Completed');
      
      setPrescriptionForm({
        patientId: "",
        appointmentId: "",
        diagnosis: "",
        medications: [],
        instructions: "",
        followUpDate: ""
      });
      setIsPrescriptionOpen(false);
      setSelectedPatient(null);
      setSelectedAppointment(null);
      
      toast({
        title: "Success",
        description: "Prescription created and appointment completed successfully"
      });
      
      // Reload appointments to reflect status change
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create prescription",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addMedication = () => {
    setPrescriptionForm(prev => ({
      ...prev,
      medications: [...prev.medications, {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        timing: "After Meals",
        instructions: ""
      }]
    }));
  };

  const removeMedication = (index: number) => {
    setPrescriptionForm(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    setPrescriptionForm(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handlePrintPrescription = (prescription: Prescription) => {
    // Implement print functionality
    console.log('Printing prescription:', prescription);
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'Scheduled':
        return "bg-blue-100 text-blue-800";
      case 'Confirmed':
        return "bg-green-100 text-green-800";
      case 'In Progress':
        return "bg-yellow-100 text-yellow-800";
      case 'Completed':
        return "bg-purple-100 text-purple-800";
      case 'Cancelled':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderContent = () => (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Emily Chen - Neurologist</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Appointments</p>
                <h3 className="text-2xl font-bold">{pendingAppointments.length}</h3>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <h3 className="text-2xl font-bold">{patients.length}</h3>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prescriptions</p>
                <h3 className="text-2xl font-bold">{prescriptions.length}</h3>
              </div>
              <Pill className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <h3 className="text-2xl font-bold">{requests.length}</h3>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patient Records</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>Manage patient appointments and consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAppointments.map((appointment) => {
                  const patient = patients.find(p => p.id === appointment.patientId);
                  return (
                    <div key={appointment.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{patient?.name || 'Unknown Patient'}</h4>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Checkup Type: {appointment.checkupType}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Time: {appointment.appointmentTime} • Date: {new Date(appointment.appointmentDate).toLocaleDateString()}
                          </p>
                          {appointment.notes && (
                            <p className="text-sm text-muted-foreground">
                              Notes: {appointment.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedPatient(patient || null);
                              setSelectedAppointment(appointment);
                              setIsPrescriptionOpen(true);
                            }}
                          >
                            <Stethoscope className="h-4 w-4 mr-1" />
                            Start Consultation
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {pendingAppointments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending appointments for today.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patient Records Tab */}
        <TabsContent value="patients" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>View and manage patient information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium text-primary">{patient.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                            {patient.name.charAt(0)}
                          </div>
                          <span className="font-medium">{patient.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{patient.bloodType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No patients found matching your search.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>Manage patient prescriptions and medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptions.map((prescription) => {
                  const patient = patients.find(p => p.id === prescription.patientId);
                  return (
                    <div key={prescription.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{patient?.name || 'Unknown Patient'}</h4>
                            <Badge variant="outline">Prescription #{prescription.id}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Diagnosis: {prescription.diagnosis}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Medications: {prescription.medications.length} prescribed
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Created: {new Date(prescription.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePrintPrescription(prescription)}
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            Print
                          </Button>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Send to Reception
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {prescriptions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No prescriptions found. Create prescriptions after patient consultations.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Prescription Dialog */}
      <Dialog open={isPrescriptionOpen} onOpenChange={setIsPrescriptionOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Prescription</DialogTitle>
            <DialogDescription>
              Create prescription for {selectedPatient?.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePrescription} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis *</Label>
              <Textarea
                id="diagnosis"
                placeholder="Enter diagnosis..."
                value={prescriptionForm.diagnosis}
                onChange={(e) => setPrescriptionForm(prev => ({ ...prev, diagnosis: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Medications *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Medication
                </Button>
              </div>
              
              {prescriptionForm.medications.map((medication, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Medication {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedication(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Medication Name *</Label>
                      <Input
                        placeholder="e.g., Paracetamol"
                        value={medication.name}
                        onChange={(e) => updateMedication(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Dosage *</Label>
                      <Input
                        placeholder="e.g., 500mg"
                        value={medication.dosage}
                        onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Frequency *</Label>
                      <Input
                        placeholder="e.g., Twice daily"
                        value={medication.frequency}
                        onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration *</Label>
                      <Input
                        placeholder="e.g., 7 days"
                        value={medication.duration}
                        onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Timing</Label>
                      <Select
                        value={medication.timing}
                        onValueChange={(value) => updateMedication(index, 'timing', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Before Meals">Before Meals</SelectItem>
                          <SelectItem value="After Meals">After Meals</SelectItem>
                          <SelectItem value="With Meals">With Meals</SelectItem>
                          <SelectItem value="Anytime">Anytime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Special Instructions</Label>
                      <Textarea
                        placeholder="Any special instructions..."
                        value={medication.instructions}
                        onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">General Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Enter general instructions for the patient..."
                value={prescriptionForm.instructions}
                onChange={(e) => setPrescriptionForm(prev => ({ ...prev, instructions: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="followUpDate">Follow-up Date</Label>
              <Input
                id="followUpDate"
                type="date"
                value={prescriptionForm.followUpDate}
                onChange={(e) => setPrescriptionForm(prev => ({ ...prev, followUpDate: e.target.value }))}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsPrescriptionOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || prescriptionForm.medications.length === 0}>
                {loading ? "Creating..." : "Create Prescription"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <AuthGuard requiredRole="doctor">
      {activeTab === "patients" ? (
        <div className="min-h-screen bg-gray-50">
          {renderContent()}
        </div>
      ) : (
        <DoctorLayout>
          {renderContent()}
        </DoctorLayout>
      )}
    </AuthGuard>
  );
};

export default DoctorDashboard;