import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Calendar, 
  Heart, 
  Pill, 
  FileText, 
  Activity, 
  Phone, 
  Mail, 
  MapPin,
  Edit,
  Save,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState({
    patientId: "P001",
    fullName: "Sarah Johnson",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    bloodType: "O+",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    emergencyContact: {
      name: "John Johnson",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse"
    },
    medicalHistory: [
      "Hypertension (2020)",
      "Type 2 Diabetes (2019)",
      "Allergic to Penicillin"
    ],
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Metformin", "Lisinopril", "Aspirin"]
  });

  const vitals = [
    { name: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Normal" },
    { name: "Heart Rate", value: "72", unit: "bpm", status: "Normal" },
    { name: "Temperature", value: "98.6", unit: "°F", status: "Normal" },
    { name: "Weight", value: "65", unit: "kg", status: "Normal" },
    { name: "Height", value: "165", unit: "cm", status: "Normal" },
    { name: "BMI", value: "23.9", unit: "kg/m²", status: "Normal" }
  ];

  const recentAppointments = [
    {
      id: "A001",
      date: "2024-10-15",
      doctor: "Dr. Emily Chen",
      type: "Follow-up",
      diagnosis: "Hypertension management",
      notes: "Patient responding well to current medication"
    },
    {
      id: "A002",
      date: "2024-09-20",
      doctor: "Dr. Robert Smith",
      type: "Checkup",
      diagnosis: "Diabetes monitoring",
      notes: "Blood sugar levels stable"
    }
  ];

  const prescriptions = [
    {
      id: "RX001",
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Emily Chen",
      prescribedDate: "2024-10-15",
      status: "Active"
    },
    {
      id: "RX002",
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Robert Smith",
      prescribedDate: "2024-09-20",
      status: "Active"
    }
  ];

  const labResults = [
    {
      id: "L001",
      testName: "Blood Glucose",
      result: "95 mg/dL",
      normalRange: "70-100 mg/dL",
      status: "Normal",
      date: "2024-10-15"
    },
    {
      id: "L002",
      testName: "HbA1c",
      result: "6.2%",
      normalRange: "<7%",
      status: "Normal",
      date: "2024-10-15"
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the data to the backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Patient Profile</h1>
            <p className="text-muted-foreground">Electronic Medical Record (EMR)</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} variant="hero" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline" className="gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Patient Basic Info */}
        <Card className="shadow-md border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold text-xl">
                    {patientData.fullName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{patientData.fullName}</h2>
                    <p className="text-muted-foreground">Patient ID: {patientData.patientId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={patientData.dateOfBirth}
                        onChange={(e) => setPatientData({...patientData, dateOfBirth: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm font-medium">{patientData.dateOfBirth}</p>
                    )}
                  </div>
                  <div>
                    <Label>Gender</Label>
                    {isEditing ? (
                      <Input
                        value={patientData.gender}
                        onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm font-medium">{patientData.gender}</p>
                    )}
                  </div>
                  <div>
                    <Label>Blood Type</Label>
                    {isEditing ? (
                      <Input
                        value={patientData.bloodType}
                        onChange={(e) => setPatientData({...patientData, bloodType: e.target.value})}
                      />
                    ) : (
                      <Badge variant="outline">{patientData.bloodType}</Badge>
                    )}
                  </div>
                  <div>
                    <Label>Age</Label>
                    <p className="text-sm font-medium">
                      {new Date().getFullYear() - new Date(patientData.dateOfBirth).getFullYear()} years
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Label>
                  {isEditing ? (
                    <Input
                      value={patientData.phone}
                      onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm font-medium">{patientData.phone}</p>
                  )}
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={patientData.email}
                      onChange={(e) => setPatientData({...patientData, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm font-medium">{patientData.email}</p>
                  )}
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        placeholder="Street"
                        value={patientData.address.street}
                        onChange={(e) => setPatientData({
                          ...patientData, 
                          address: {...patientData.address, street: e.target.value}
                        })}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="City"
                          value={patientData.address.city}
                          onChange={(e) => setPatientData({
                            ...patientData, 
                            address: {...patientData.address, city: e.target.value}
                          })}
                        />
                        <Input
                          placeholder="State"
                          value={patientData.address.state}
                          onChange={(e) => setPatientData({
                            ...patientData, 
                            address: {...patientData.address, state: e.target.value}
                          })}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm font-medium">
                      {patientData.address.street}, {patientData.address.city}, {patientData.address.state} {patientData.address.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="medical-history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="medical-history">Medical History</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          </TabsList>

          {/* Medical History Tab */}
          <TabsContent value="medical-history">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Medical History & Allergies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Medical History</Label>
                  {isEditing ? (
                    <Textarea
                      placeholder="Enter medical history..."
                      value={patientData.medicalHistory.join('\n')}
                      onChange={(e) => setPatientData({
                        ...patientData, 
                        medicalHistory: e.target.value.split('\n').filter(item => item.trim())
                      })}
                    />
                  ) : (
                    <div className="mt-2 space-y-2">
                      {patientData.medicalHistory.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Allergies</Label>
                  {isEditing ? (
                    <Textarea
                      placeholder="Enter allergies..."
                      value={patientData.allergies.join('\n')}
                      onChange={(e) => setPatientData({
                        ...patientData, 
                        allergies: e.target.value.split('\n').filter(item => item.trim())
                      })}
                    />
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {patientData.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">{allergy}</Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Current Medications</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {patientData.medications.map((medication, index) => (
                      <Badge key={index} variant="secondary">{medication}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Vital Signs
                </CardTitle>
                <CardDescription>Latest vital signs measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vitals.map((vital, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{vital.name}</p>
                          <p className="text-2xl font-bold">{vital.value} <span className="text-sm text-muted-foreground">{vital.unit}</span></p>
                        </div>
                        <Badge variant={vital.status === 'Normal' ? 'default' : 'destructive'}>
                          {vital.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 rounded-lg border border-border">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold">{appointment.doctor}</h3>
                            <Badge variant="outline">{appointment.type}</Badge>
                            <span className="text-sm text-muted-foreground">{appointment.date}</span>
                          </div>
                          <p className="text-sm font-medium mb-1">Diagnosis: {appointment.diagnosis}</p>
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="p-4 rounded-lg border border-border">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold">{prescription.medication}</h3>
                            <Badge variant="outline">{prescription.dosage}</Badge>
                            <Badge variant={prescription.status === 'Active' ? 'default' : 'secondary'}>
                              {prescription.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {prescription.frequency} • Prescribed by {prescription.prescribedBy}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Prescribed on {prescription.prescribedDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lab Results Tab */}
          <TabsContent value="lab-results">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Lab Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.map((result) => (
                    <div key={result.id} className="p-4 rounded-lg border border-border">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold">{result.testName}</h3>
                            <Badge variant={result.status === 'Normal' ? 'default' : 'destructive'}>
                              {result.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{result.date}</span>
                          </div>
                          <p className="text-sm font-medium mb-1">
                            Result: {result.result} (Normal Range: {result.normalRange})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PatientProfile;
