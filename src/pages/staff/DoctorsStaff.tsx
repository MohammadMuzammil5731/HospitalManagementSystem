import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Stethoscope,
  UserCheck,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorsStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  const departments = [
    "Cardiology", "Neurology", "Orthopedics", "Pediatrics", 
    "Emergency", "Surgery", "Radiology", "Pathology", "Pharmacy"
  ];

  const staff = [
    {
      id: "S001",
      fullName: "Dr. Emily Chen",
      role: "doctor",
      department: "Cardiology",
      email: "emily.chen@hospital.com",
      phone: "+1 (555) 123-4567",
      specialization: "Interventional Cardiology",
      experience: "12 years",
      status: "active",
      schedule: "Mon-Fri 8AM-5PM",
      patients: 45,
      avatar: "EC"
    },
    {
      id: "S002",
      fullName: "Dr. Robert Smith",
      role: "doctor",
      department: "Neurology",
      email: "robert.smith@hospital.com",
      phone: "+1 (555) 234-5678",
      specialization: "Neurological Surgery",
      experience: "15 years",
      status: "active",
      schedule: "Mon-Fri 9AM-6PM",
      patients: 38,
      avatar: "RS"
    },
    {
      id: "S003",
      fullName: "Sarah Wilson",
      role: "nurse",
      department: "ICU",
      email: "sarah.wilson@hospital.com",
      phone: "+1 (555) 345-6789",
      specialization: "Critical Care Nursing",
      experience: "8 years",
      status: "active",
      schedule: "Rotating Shifts",
      patients: 24,
      avatar: "SW"
    },
    {
      id: "S004",
      fullName: "Michael Johnson",
      role: "receptionist",
      department: "Reception",
      email: "michael.johnson@hospital.com",
      phone: "+1 (555) 456-7890",
      specialization: "Patient Services",
      experience: "5 years",
      status: "active",
      schedule: "Mon-Fri 7AM-4PM",
      patients: null,
      avatar: "MJ"
    },
    {
      id: "S005",
      fullName: "Dr. Lisa Anderson",
      role: "doctor",
      department: "Pediatrics",
      email: "lisa.anderson@hospital.com",
      phone: "+1 (555) 567-8901",
      specialization: "Pediatric Cardiology",
      experience: "10 years",
      status: "active",
      schedule: "Mon-Fri 8AM-5PM",
      patients: 52,
      avatar: "LA"
    },
    {
      id: "S006",
      fullName: "James Brown",
      role: "billing",
      department: "Finance",
      email: "james.brown@hospital.com",
      phone: "+1 (555) 678-9012",
      specialization: "Medical Billing",
      experience: "7 years",
      status: "active",
      schedule: "Mon-Fri 9AM-6PM",
      patients: null,
      avatar: "JB"
    }
  ];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = !searchTerm || 
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || member.department === selectedDepartment;
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "doctor":
        return "bg-primary-light text-primary";
      case "nurse":
        return "bg-success-light text-success";
      case "receptionist":
        return "bg-warning-light text-warning";
      case "billing":
        return "bg-secondary-light text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-light text-success";
      case "inactive":
        return "bg-destructive-light text-destructive";
      case "on-leave":
        return "bg-warning-light text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const roleStats = {
    doctors: staff.filter(s => s.role === "doctor").length,
    nurses: staff.filter(s => s.role === "nurse").length,
    receptionists: staff.filter(s => s.role === "receptionist").length,
    billing: staff.filter(s => s.role === "billing").length,
    total: staff.length
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Doctors & Staff Directory</h1>
            <p className="text-muted-foreground">Manage hospital staff and medical professionals</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Staff
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Staff</p>
                  <h3 className="text-3xl font-bold mt-2">{roleStats.total}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Doctors</p>
                  <h3 className="text-3xl font-bold mt-2">{roleStats.doctors}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Nurses</p>
                  <h3 className="text-3xl font-bold mt-2">{roleStats.nurses}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Receptionists</p>
                  <h3 className="text-3xl font-bold mt-2">{roleStats.receptionists}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-warning-light flex items-center justify-center">
                  <Activity className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Billing Staff</p>
                  <h3 className="text-3xl font-bold mt-2">{roleStats.billing}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-secondary-light flex items-center justify-center">
                  <Activity className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all-staff" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-staff">All Staff</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="nurses">Nurses</TabsTrigger>
            <TabsTrigger value="support">Support Staff</TabsTrigger>
          </TabsList>

          {/* All Staff Tab */}
          <TabsContent value="all-staff">
            <Card className="shadow-md border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Staff Members</CardTitle>
                    <CardDescription>Complete directory of hospital staff</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search staff..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="receptionist">Receptionist</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStaff.map((member) => (
                    <div
                      key={member.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                            {member.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold">{member.fullName}</h3>
                            <p className="text-sm text-muted-foreground">ID: {member.id}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge className={getRoleColor(member.role)}>
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </Badge>
                          <Badge variant="outline">{member.department}</Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.specialization}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.schedule}</span>
                          </div>
                        </div>

                        {member.patients && (
                          <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground">
                              Active Patients: <span className="font-medium">{member.patients}</span>
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Medical Doctors</CardTitle>
                <CardDescription>Specialized medical professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStaff.filter(member => member.role === "doctor").map((doctor) => (
                    <div
                      key={doctor.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                            {doctor.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold">{doctor.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(doctor.status)}>
                          {doctor.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge className={getRoleColor(doctor.role)}>
                            Doctor
                          </Badge>
                          <Badge variant="outline">{doctor.department}</Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{doctor.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{doctor.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{doctor.experience}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <p className="text-sm text-muted-foreground">
                            Active Patients: <span className="font-medium">{doctor.patients}</span>
                          </p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nurses Tab */}
          <TabsContent value="nurses">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Nursing Staff</CardTitle>
                <CardDescription>Registered nurses and nursing specialists</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStaff.filter(member => member.role === "nurse").map((nurse) => (
                    <div
                      key={nurse.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                            {nurse.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold">{nurse.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{nurse.specialization}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(nurse.status)}>
                          {nurse.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge className={getRoleColor(nurse.role)}>
                            Nurse
                          </Badge>
                          <Badge variant="outline">{nurse.department}</Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{nurse.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{nurse.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{nurse.experience}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <p className="text-sm text-muted-foreground">
                            Ward Patients: <span className="font-medium">{nurse.patients}</span>
                          </p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Staff Tab */}
          <TabsContent value="support">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Support Staff</CardTitle>
                <CardDescription>Administrative and support personnel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStaff.filter(member => member.role !== "doctor" && member.role !== "nurse").map((member) => (
                    <div
                      key={member.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                            {member.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold">{member.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{member.specialization}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge className={getRoleColor(member.role)}>
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </Badge>
                          <Badge variant="outline">{member.department}</Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{member.experience}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Schedule
                          </Button>
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

export default DoctorsStaff;
