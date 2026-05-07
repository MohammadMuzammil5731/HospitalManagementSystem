import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  Phone,
  Mail,
  Calendar,
  MapPin,
  User,
  FileText,
  Activity,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminPatients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: "P001",
      firstName: "Sarah",
      lastName: "Johnson",
      age: 34,
      gender: "Female",
      bloodType: "O+",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      address: "123 Main St, New York, NY 10001",
      dateOfBirth: "1990-05-15",
      lastVisit: "2024-10-15",
      status: "Active",
      emergencyContact: {
        name: "John Johnson",
        relationship: "Spouse",
        phone: "+1 (555) 123-4568"
      },
      medicalHistory: [
        "Hypertension",
        "Diabetes Type 2"
      ],
      allergies: [
        "Penicillin",
        "Shellfish"
      ],
      insurance: {
        provider: "Blue Cross Blue Shield",
        policyNumber: "BC123456789",
        groupNumber: "GRP001"
      }
    },
    {
      id: "P002",
      firstName: "Michael",
      lastName: "Brown",
      age: 45,
      gender: "Male",
      bloodType: "A+",
      phone: "+1 (555) 234-5678",
      email: "michael.brown@email.com",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      dateOfBirth: "1979-03-22",
      lastVisit: "2024-10-18",
      status: "Active",
      emergencyContact: {
        name: "Lisa Brown",
        relationship: "Wife",
        phone: "+1 (555) 234-5679"
      },
      medicalHistory: [
        "High Cholesterol"
      ],
      allergies: [
        "Latex"
      ],
      insurance: {
        provider: "Aetna",
        policyNumber: "AE987654321",
        groupNumber: "GRP002"
      }
    },
    {
      id: "P003",
      firstName: "Lisa",
      lastName: "Anderson",
      age: 28,
      gender: "Female",
      bloodType: "B+",
      phone: "+1 (555) 345-6789",
      email: "lisa.anderson@email.com",
      address: "789 Pine St, Chicago, IL 60601",
      dateOfBirth: "1996-08-10",
      lastVisit: "2024-10-12",
      status: "Active",
      emergencyContact: {
        name: "Robert Anderson",
        relationship: "Father",
        phone: "+1 (555) 345-6790"
      },
      medicalHistory: [],
      allergies: [],
      insurance: {
        provider: "Cigna",
        policyNumber: "CI456789123",
        groupNumber: "GRP003"
      }
    },
    {
      id: "P004",
      firstName: "John",
      lastName: "Williams",
      age: 52,
      gender: "Male",
      bloodType: "AB+",
      phone: "+1 (555) 456-7890",
      email: "john.williams@email.com",
      address: "321 Elm St, Houston, TX 77001",
      dateOfBirth: "1972-12-03",
      lastVisit: "2024-10-10",
      status: "Inactive",
      emergencyContact: {
        name: "Mary Williams",
        relationship: "Wife",
        phone: "+1 (555) 456-7891"
      },
      medicalHistory: [
        "Heart Disease",
        "Diabetes Type 1"
      ],
      allergies: [
        "Aspirin",
        "Nuts"
      ],
      insurance: {
        provider: "UnitedHealth",
        policyNumber: "UH789123456",
        groupNumber: "GRP004"
      }
    },
    {
      id: "P005",
      firstName: "Emily",
      lastName: "Davis",
      age: 39,
      gender: "Female",
      bloodType: "O-",
      phone: "+1 (555) 567-8901",
      email: "emily.davis@email.com",
      address: "654 Maple Dr, Phoenix, AZ 85001",
      dateOfBirth: "1985-07-18",
      lastVisit: "2024-10-19",
      status: "Active",
      emergencyContact: {
        name: "David Davis",
        relationship: "Husband",
        phone: "+1 (555) 567-8902"
      },
      medicalHistory: [
        "Asthma"
      ],
      allergies: [
        "Dust",
        "Pollen"
      ],
      insurance: {
        provider: "Kaiser Permanente",
        policyNumber: "KP321654987",
        groupNumber: "GRP005"
      }
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
    const matchesGender = filterGender === "all" || patient.gender === filterGender;
    
    return matchesSearch && matchesStatus && matchesGender;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success-light text-success";
      case "Inactive":
        return "bg-destructive-light text-destructive";
      case "Pending":
        return "bg-warning-light text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getBloodTypeColor = (bloodType: string) => {
    switch (bloodType) {
      case "O+":
        return "bg-primary-light text-primary";
      case "A+":
        return "bg-secondary-light text-secondary";
      case "B+":
        return "bg-success-light text-success";
      case "AB+":
        return "bg-warning-light text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Patient Management</h1>
            <p className="text-muted-foreground">Comprehensive patient records and information management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Patient
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-md border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Patients
            </CardTitle>
            <CardDescription>Find patients by name, ID, email, or other criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterGender} onValueChange={setFilterGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gender</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold">{patients.length}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
                  <p className="text-2xl font-bold">{patients.filter(p => p.status === "Active").length}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-success-light flex items-center justify-center">
                  <Activity className="h-4 w-4 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary-light flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-destructive-light flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card className="shadow-md border-border">
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>
              Showing {filteredPatients.length} of {patients.length} patients
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold">Patient ID</th>
                    <th className="text-left p-4 font-semibold">Name</th>
                    <th className="text-left p-4 font-semibold">Age/Gender</th>
                    <th className="text-left p-4 font-semibold">Blood Type</th>
                    <th className="text-left p-4 font-semibold">Contact</th>
                    <th className="text-left p-4 font-semibold">Last Visit</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-border hover:bg-muted/30 transition-smooth"
                    >
                      <td className="p-4 font-medium text-primary">{patient.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                            {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{patient.firstName} {patient.lastName}</div>
                            <div className="text-sm text-muted-foreground">{patient.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="font-medium">{patient.age} years</div>
                          <div className="text-muted-foreground">{patient.gender}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={getBloodTypeColor(patient.bloodType)}>
                          {patient.bloodType}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {patient.address.split(',')[0]}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{patient.lastVisit}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Patient Detail Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold text-lg">
                        {selectedPatient.firstName.charAt(0)}{selectedPatient.lastName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xl">{selectedPatient.firstName} {selectedPatient.lastName}</div>
                        <div className="text-sm text-muted-foreground">Patient ID: {selectedPatient.id}</div>
                      </div>
                    </CardTitle>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPatient(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="medical">Medical History</TabsTrigger>
                    <TabsTrigger value="insurance">Insurance</TabsTrigger>
                    <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Full Name</Label>
                          <div className="text-lg font-medium">{selectedPatient.firstName} {selectedPatient.lastName}</div>
                        </div>
                        <div>
                          <Label>Date of Birth</Label>
                          <div className="text-lg">{selectedPatient.dateOfBirth}</div>
                        </div>
                        <div>
                          <Label>Age</Label>
                          <div className="text-lg">{selectedPatient.age} years</div>
                        </div>
                        <div>
                          <Label>Gender</Label>
                          <div className="text-lg">{selectedPatient.gender}</div>
                        </div>
                        <div>
                          <Label>Blood Type</Label>
                          <Badge className={getBloodTypeColor(selectedPatient.bloodType)}>
                            {selectedPatient.bloodType}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </Label>
                          <div className="text-lg">{selectedPatient.phone}</div>
                        </div>
                        <div>
                          <Label className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </Label>
                          <div className="text-lg">{selectedPatient.email}</div>
                        </div>
                        <div>
                          <Label className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Address
                          </Label>
                          <div className="text-lg">{selectedPatient.address}</div>
                        </div>
                        <div>
                          <Label>Last Visit</Label>
                          <div className="text-lg">{selectedPatient.lastVisit}</div>
                        </div>
                        <div>
                          <Label>Status</Label>
                          <Badge className={getStatusColor(selectedPatient.status)}>
                            {selectedPatient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="medical" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-lg font-semibold">Medical History</Label>
                        <div className="mt-2 space-y-2">
                          {selectedPatient.medicalHistory.length > 0 ? (
                            selectedPatient.medicalHistory.map((condition, index) => (
                              <Badge key={index} variant="outline" className="mr-2">
                                {condition}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-muted-foreground">No medical history recorded</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label className="text-lg font-semibold">Allergies</Label>
                        <div className="mt-2 space-y-2">
                          {selectedPatient.allergies.length > 0 ? (
                            selectedPatient.allergies.map((allergy, index) => (
                              <Badge key={index} variant="destructive" className="mr-2">
                                {allergy}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-muted-foreground">No known allergies</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="insurance" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label>Insurance Provider</Label>
                        <div className="text-lg font-medium">{selectedPatient.insurance.provider}</div>
                      </div>
                      <div>
                        <Label>Policy Number</Label>
                        <div className="text-lg">{selectedPatient.insurance.policyNumber}</div>
                      </div>
                      <div>
                        <Label>Group Number</Label>
                        <div className="text-lg">{selectedPatient.insurance.groupNumber}</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="emergency" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label>Emergency Contact Name</Label>
                        <div className="text-lg font-medium">{selectedPatient.emergencyContact.name}</div>
                      </div>
                      <div>
                        <Label>Relationship</Label>
                        <div className="text-lg">{selectedPatient.emergencyContact.relationship}</div>
                      </div>
                      <div>
                        <Label className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Emergency Phone
                        </Label>
                        <div className="text-lg">{selectedPatient.emergencyContact.phone}</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {filteredPatients.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No patients found</h3>
            <p>No patients match your current search and filter criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminPatients;
