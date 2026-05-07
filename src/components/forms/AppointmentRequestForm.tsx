import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, User, Phone, Mail, ArrowLeft, Stethoscope, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import realClinicAPI from "@/services/realApi";

interface AppointmentRequestFormProps {
  onAppointmentRequested?: (appointment: any) => void;
}

const AppointmentRequestForm = ({ onAppointmentRequested }: AppointmentRequestFormProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    preferredDate: "",
    preferredTime: "",
    doctorSpecialization: "",
    appointmentType: "",
    reason: "",
    urgency: "medium",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "General Medicine",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Urology"
  ];

  const appointmentTypes = [
    "Consultation",
    "Follow-up",
    "Checkup",
    "Emergency",
    "Surgery Consultation",
    "Vaccination",
    "Lab Test",
    "Imaging"
  ];

  const urgencyLevels = [
    { value: "low", label: "Low", description: "Routine appointment" },
    { value: "medium", label: "Medium", description: "Standard priority" },
    { value: "high", label: "High", description: "Urgent but not emergency" },
    { value: "emergency", label: "Emergency", description: "Immediate attention needed" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
    if (!formData.patientPhone.trim()) newErrors.patientPhone = "Phone number is required";
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required";
    if (!formData.preferredTime) newErrors.preferredTime = "Preferred time is required";
    if (!formData.doctorSpecialization) newErrors.doctorSpecialization = "Doctor specialization is required";
    if (!formData.appointmentType) newErrors.appointmentType = "Appointment type is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason for appointment is required";
    
    // Validate email format if provided
    if (formData.patientEmail && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.patientEmail)) {
      newErrors.patientEmail = "Invalid email format";
    }
    
    // Validate phone format
    if (formData.patientPhone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.patientPhone.replace(/\s/g, ''))) {
      newErrors.patientPhone = "Invalid phone number format";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user selects
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setLoading(true);
    try {
      // For now, we'll create a patient first, then create an appointment
      // In a real system, you might want to check if patient already exists
      
      const patientData = {
        firstName: formData.patientName.split(' ')[0] || formData.patientName,
        lastName: formData.patientName.split(' ').slice(1).join(' ') || '',
        dateOfBirth: new Date('1990-01-01'), // Default date, should be collected in real system
        gender: 'Other', // Default, should be collected in real system
        bloodType: 'O+', // Default, should be collected in real system
        phone: formData.patientPhone,
        email: formData.patientEmail || undefined,
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        },
        emergencyContact: {
          name: '',
          phone: '',
          relationship: ''
        },
        medicalHistory: [],
        allergies: [],
        currentMedications: []
      };

      // Create patient
      const patientResponse = await realClinicAPI.registerPatient(patientData);
      const patient = patientResponse.patient;

      // Get available doctors for the specialization
      const doctorsResponse = await realClinicAPI.getDoctors({ 
        specialization: formData.doctorSpecialization 
      });
      
      if (!doctorsResponse.doctors || doctorsResponse.doctors.length === 0) {
        toast.error("No doctors available for the selected specialization.");
        return;
      }

      // Use the first available doctor
      const doctor = doctorsResponse.doctors[0];

      // Create appointment
      const appointmentData = {
        patient: patient._id,
        doctor: doctor._id,
        appointmentDate: formData.preferredDate,
        appointmentTime: formData.preferredTime,
        duration: 30,
        type: formData.appointmentType.toLowerCase().replace(' ', '-'),
        status: 'scheduled',
        priority: formData.urgency,
        notes: formData.notes,
        reason: formData.reason
      };

      const appointmentResponse = await realClinicAPI.createAppointment(appointmentData);
      
      toast.success(`Appointment requested successfully! Your appointment ID is ${appointmentResponse.appointment.appointmentId}`);
      
      // Reset form
      setFormData({
        patientName: "",
        patientPhone: "",
        patientEmail: "",
        preferredDate: "",
        preferredTime: "",
        doctorSpecialization: "",
        appointmentType: "",
        reason: "",
        urgency: "medium",
        notes: ""
      });
      setOpen(false);
      
      // Notify parent component
      if (onAppointmentRequested) {
        onAppointmentRequested(appointmentResponse.appointment);
      }
    } catch (error: any) {
      console.error("Appointment request failed:", error);
      toast.error(error.message || "Failed to request appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      patientName: "",
      patientPhone: "",
      patientEmail: "",
      preferredDate: "",
      preferredTime: "",
      doctorSpecialization: "",
      appointmentType: "",
      reason: "",
      urgency: "medium",
      notes: ""
    });
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-green-600 hover:bg-green-700">
          <Calendar className="h-4 w-4" />
          Request Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Request Appointment with Doctor
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to request an appointment. We'll contact you to confirm the details.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName">Full Name *</Label>
                <Input
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={errors.patientName ? "border-destructive" : ""}
                />
                {errors.patientName && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.patientName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="patientPhone">Phone Number *</Label>
                <Input
                  id="patientPhone"
                  name="patientPhone"
                  type="tel"
                  value={formData.patientPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={errors.patientPhone ? "border-destructive" : ""}
                />
                {errors.patientPhone && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.patientPhone}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="patientEmail">Email (Optional)</Label>
                <Input
                  id="patientEmail"
                  name="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className={errors.patientEmail ? "border-destructive" : ""}
                />
                {errors.patientEmail && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.patientEmail}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.preferredDate ? "border-destructive" : ""}
                />
                {errors.preferredDate && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.preferredDate}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="preferredTime">Preferred Time *</Label>
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={errors.preferredTime ? "border-destructive" : ""}
                />
                {errors.preferredTime && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.preferredTime}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="doctorSpecialization">Doctor Specialization *</Label>
                <Select 
                  name="doctorSpecialization" 
                  value={formData.doctorSpecialization} 
                  onValueChange={(value) => handleSelectChange("doctorSpecialization", value)}
                >
                  <SelectTrigger className={errors.doctorSpecialization ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.doctorSpecialization && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.doctorSpecialization}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="appointmentType">Appointment Type *</Label>
                <Select 
                  name="appointmentType" 
                  value={formData.appointmentType} 
                  onValueChange={(value) => handleSelectChange("appointmentType", value)}
                >
                  <SelectTrigger className={errors.appointmentType ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.appointmentType && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.appointmentType}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select 
                  name="urgency" 
                  value={formData.urgency} 
                  onValueChange={(value) => handleSelectChange("urgency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-sm text-muted-foreground">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Reason and Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Additional Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">Reason for Appointment *</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Please describe the reason for your appointment..."
                  rows={3}
                  className={errors.reason ? "border-destructive" : ""}
                />
                {errors.reason && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.reason}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional information you'd like to share..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Requesting..." : "Request Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentRequestForm;
