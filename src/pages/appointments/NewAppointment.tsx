import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Stethoscope, 
  MapPin, 
  Phone, 
  Mail,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Save,
  Plus,
  Search,
  Filter,
  Users,
  Activity
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { clinicAPI } from "@/services/api";
import { Patient, Doctor, AppointmentForm, CheckupType } from "@/types";

const NewAppointment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<AppointmentForm>({
    patientId: "",
    checkupType: "",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [checkupTypes, setCheckupTypes] = useState<CheckupType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [showPatientSearch, setShowPatientSearch] = useState(false);

  // Time slots
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00"
  ];

  // Appointment types
  const appointmentTypes = [
    { value: "consultation", label: "Consultation", duration: "30 min", color: "bg-blue-100 text-blue-800" },
    { value: "follow-up", label: "Follow-up", duration: "20 min", color: "bg-green-100 text-green-800" },
    { value: "checkup", label: "General Checkup", duration: "30 min", color: "bg-purple-100 text-purple-800" },
    { value: "emergency", label: "Emergency", duration: "45 min", color: "bg-red-100 text-red-800" },
    { value: "surgery-consultation", label: "Surgery Consultation", duration: "45 min", color: "bg-orange-100 text-orange-800" },
    { value: "vaccination", label: "Vaccination", duration: "15 min", color: "bg-teal-100 text-teal-800" }
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  const loadData = async () => {
    try {
      const [patientsData, doctorsData] = await Promise.all([
        clinicAPI.getPatients(),
        clinicAPI.getDoctors()
      ]);
      setPatients(patientsData);
      setDoctors(doctorsData);
      setCheckupTypes(clinicAPI.getCheckupTypes());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormData(prev => ({ ...prev, patientId: patient.id }));
    setShowPatientSearch(false);
    setSearchTerm("");
  };

  const handleDoctorSelect = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    setSelectedDoctor(doctor || null);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setFormData(prev => ({ ...prev, preferredDate: format(date, "yyyy-MM-dd") }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData(prev => ({ ...prev, preferredTime: time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient || !selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await clinicAPI.createAppointment(formData);
      toast({
        title: "Appointment Created",
        description: `Appointment scheduled for ${selectedPatient.name} with ${selectedDoctor.name}`,
      });
      navigate("/appointments");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getAvailableDoctors = () => {
    if (!formData.checkupType) return doctors;
    
    const checkupType = checkupTypes.find(ct => ct.id === formData.checkupType);
    if (!checkupType) return doctors;
    
    return doctors.filter(doctor => doctor.specialization === checkupType.specialization);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/appointments")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Appointments
          </Button>
          <div>
            <h1 className="text-3xl font-bold">New Appointment</h1>
            <p className="text-muted-foreground">Schedule a new patient appointment</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Patient & Doctor Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Patient Information
                </CardTitle>
                <CardDescription>
                  Select an existing patient or search for a patient
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients by name or phone..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowPatientSearch(true);
                    }}
                    className="pl-10"
                  />
                </div>

                {showPatientSearch && searchTerm && (
                  <div className="border rounded-lg max-h-60 overflow-y-auto">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                          onClick={() => handlePatientSelect(patient)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                              {patient.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {patient.phone} • {patient.age} years • {patient.gender}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No patients found
                      </div>
                    )}
                  </div>
                )}

                {selectedPatient && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium text-green-800">{selectedPatient.name}</p>
                        <div className="flex items-center gap-4 text-sm text-green-600">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {selectedPatient.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {selectedPatient.age} years, {selectedPatient.gender}
                          </span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPatient(null);
                          setFormData(prev => ({ ...prev, patientId: "" }));
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Doctor Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Doctor Selection
                </CardTitle>
                <CardDescription>
                  Choose a doctor based on the appointment type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="checkupType">Appointment Type *</Label>
                  <Select
                    value={formData.checkupType}
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, checkupType: value }));
                      setSelectedDoctor(null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Badge className={type.color}>
                              {type.duration}
                            </Badge>
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.checkupType && (
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Available Doctors *</Label>
                    <Select onValueChange={handleDoctorSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableDoctors().map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold text-sm">
                                {doctor.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-medium">{doctor.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {doctor.specialization} • ${doctor.consultationFee}
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedDoctor && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-blue-800">{selectedDoctor.name}</p>
                        <div className="flex items-center gap-4 text-sm text-blue-600">
                          <span className="flex items-center gap-1">
                            <Stethoscope className="h-3 w-3" />
                            {selectedDoctor.specialization}
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {selectedDoctor.experience} years experience
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            ${selectedDoctor.consultationFee}
                          </span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedDoctor(null);
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Add any special notes or requirements for this appointment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any special notes, symptoms, or requirements..."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Date & Time Selection */}
          <div className="space-y-6">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Select Date
                </CardTitle>
                <CardDescription>
                  Choose the appointment date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
                {selectedDate && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium text-primary">
                      Selected: {format(selectedDate, "PPP")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Select Time
                </CardTitle>
                <CardDescription>
                  Choose the appointment time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTimeSelect(time)}
                      className="text-xs"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                {selectedTime && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium text-primary">
                      Selected: {selectedTime}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Appointment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedPatient ? selectedPatient.name : "No patient selected"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedDoctor ? selectedDoctor.name : "No doctor selected"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedDate ? format(selectedDate, "PPP") : "No date selected"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedTime || "No time selected"}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!selectedPatient || !selectedDoctor || !selectedDate || !selectedTime || loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Create Appointment
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewAppointment;