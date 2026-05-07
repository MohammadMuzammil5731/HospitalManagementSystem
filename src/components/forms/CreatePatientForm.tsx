import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Phone, Mail, Calendar, Heart, MapPin, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import realClinicAPI from "@/services/realApi";

interface CreatePatientFormProps {
  onPatientCreated?: (patient: any) => void;
}

const CreatePatientForm = ({ onPatientCreated }: CreatePatientFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    emergencyContact: {
      name: "",
      phone: "",
      relationship: ""
    },
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.bloodType) newErrors.bloodType = "Blood type is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    
    // Validate email format if provided
    if (formData.email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    // Validate phone format
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Invalid phone number format";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else if (name.startsWith("emergencyContact.")) {
      const contactField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [contactField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
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
      // Convert comma-separated strings to arrays
      const patientData = {
        ...formData,
        medicalHistory: formData.medicalHistory ? formData.medicalHistory.split(',').map(item => item.trim()).filter(item => item) : [],
        allergies: formData.allergies ? formData.allergies.split(',').map(item => item.trim()).filter(item => item) : [],
        currentMedications: formData.currentMedications ? formData.currentMedications.split(',').map(item => item.trim()).filter(item => item) : []
      };

      const response = await realClinicAPI.createPatient(patientData);
      toast.success(`Patient ${response.patient.patientId} created successfully!`);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        bloodType: "",
        phone: "",
        email: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: ""
        },
        emergencyContact: {
          name: "",
          phone: "",
          relationship: ""
        },
        medicalHistory: "",
        allergies: "",
        currentMedications: "",
        notes: ""
      });
      setOpen(false);
      
      // Notify parent component
      if (onPatientCreated) {
        onPatientCreated(response.patient);
      }
    } catch (error: any) {
      console.error("Patient creation failed:", error);
      toast.error(error.message || "Failed to create patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      bloodType: "",
      phone: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
      },
      emergencyContact: {
        name: "",
        phone: "",
        relationship: ""
      },
      medicalHistory: "",
      allergies: "",
      currentMedications: "",
      notes: ""
    });
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Create New Patient
          </DialogTitle>
          <DialogDescription>
            Add a new patient to the system. All required fields must be filled.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.lastName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={errors.dateOfBirth ? "border-destructive" : ""}
                />
                {errors.dateOfBirth && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select name="gender" value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.gender}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="bloodType">Blood Type *</Label>
                <Select name="bloodType" value={formData.bloodType} onValueChange={(value) => handleSelectChange("bloodType", value)}>
                  <SelectTrigger className={errors.bloodType ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bloodType && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.bloodType}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address.street">Street Address</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder="New York"
                />
              </div>
              <div>
                <Label htmlFor="address.state">State</Label>
                <Input
                  id="address.state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  placeholder="NY"
                />
              </div>
              <div>
                <Label htmlFor="address.zipCode">Zip Code</Label>
                <Input
                  id="address.zipCode"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                />
              </div>
              <div>
                <Label htmlFor="address.country">Country</Label>
                <Input
                  id="address.country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  placeholder="USA"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact.name">Name</Label>
                <Input
                  id="emergencyContact.name"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact.phone">Phone Number</Label>
                <Input
                  id="emergencyContact.phone"
                  name="emergencyContact.phone"
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 987-6543"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="emergencyContact.relationship">Relationship</Label>
                <Input
                  id="emergencyContact.relationship"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  placeholder="Spouse, Parent, etc."
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Medical Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  placeholder="Enter medical history (comma-separated)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Separate multiple entries with commas
                </p>
              </div>
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Enter allergies (comma-separated)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Separate multiple entries with commas
                </p>
              </div>
              <div>
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea
                  id="currentMedications"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  placeholder="Enter current medications (comma-separated)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Separate multiple entries with commas
                </p>
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional notes about the patient"
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
              {loading ? "Creating..." : "Create Patient"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePatientForm;
