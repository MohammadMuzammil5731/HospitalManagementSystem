import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Calendar, Clock, User, Stethoscope, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import realClinicAPI from "@/services/realApi";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorId: "",
    problem: "",
    date: "",
    time: "",
    notes: ""
  });
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const response = await realClinicAPI.getDoctors();
      setDoctors(response.doctors || []);
    } catch (error) {
      console.error("Failed to load doctors:", error);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.doctorId) newErrors.doctorId = "Please select a doctor";
    if (!formData.problem.trim()) newErrors.problem = "Problem description is required";
    if (!formData.date) newErrors.date = "Appointment date is required";
    if (!formData.time) newErrors.time = "Appointment time is required";
    
    // Validate date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      newErrors.date = "Appointment date cannot be in the past";
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

    setSubmitting(true);
    try {
      // Combine date and time
      const appointmentDateTime = new Date(`${formData.date}T${formData.time}`);
      
      const appointmentData = {
        doctorId: formData.doctorId,
        problem: formData.problem,
        date: appointmentDateTime,
        createdBy: "patient",
        notes: formData.notes
      };

      const response = await realClinicAPI.createAppointment(appointmentData);
      
      toast.success("Appointment booked successfully!");
      
      // Redirect to patient dashboard
      navigate("/dashboard/patient");
    } catch (error: any) {
      console.error("Appointment booking failed:", error);
      toast.error(error.message || "Failed to book appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // 3 months ahead
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
              <Calendar className="h-8 w-8" />
              Book Appointment
            </CardTitle>
            <CardDescription className="text-lg">
              Schedule your appointment with our qualified doctors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Doctor Selection */}
              <div>
                <Label htmlFor="doctorId">Select Doctor *</Label>
                <Select 
                  name="doctorId" 
                  value={formData.doctorId} 
                  onValueChange={(value) => handleSelectChange("doctorId", value)}
                >
                  <SelectTrigger className={errors.doctorId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {loading ? (
                      <SelectItem value="" disabled>Loading doctors...</SelectItem>
                    ) : doctors.length === 0 ? (
                      <SelectItem value="" disabled>No doctors available</SelectItem>
                    ) : (
                      doctors.map((doctor) => (
                        <SelectItem key={doctor._id} value={doctor._id}>
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {doctor.specialization}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {errors.doctorId && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.doctorId}
                  </p>
                )}
              </div>

              {/* Problem Description */}
              <div>
                <Label htmlFor="problem">Problem or Reason for Consultation *</Label>
                <Textarea
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="Please describe your symptoms or reason for the appointment..."
                  rows={4}
                  className={errors.problem ? "border-destructive" : ""}
                />
                {errors.problem && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.problem}
                  </p>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Appointment Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className={errors.date ? "border-destructive" : ""}
                  />
                  {errors.date && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.date}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time *</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? "border-destructive" : ""}
                  />
                  {errors.time && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
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

              {/* Submit Button */}
              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={submitting || loading}
                >
                  {submitting ? "Booking Appointment..." : "Book Appointment"}
                </Button>
                
                <div className="text-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/dashboard/patient")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentBooking;
