import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bed, 
  User, 
  Calendar, 
  Clock, 
  Plus, 
  Search,
  Filter,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Admissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWard, setSelectedWard] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const wards = [
    {
      id: "W001",
      name: "ICU",
      totalBeds: 10,
      occupiedBeds: 8,
      availableBeds: 2,
      occupancyRate: 80
    },
    {
      id: "W002", 
      name: "General Ward A",
      totalBeds: 20,
      occupiedBeds: 12,
      availableBeds: 8,
      occupancyRate: 60
    },
    {
      id: "W003",
      name: "General Ward B", 
      totalBeds: 20,
      occupiedBeds: 15,
      availableBeds: 5,
      occupancyRate: 75
    },
    {
      id: "W004",
      name: "Pediatric Ward",
      totalBeds: 8,
      occupiedBeds: 6,
      availableBeds: 2,
      occupancyRate: 75
    }
  ];

  const rooms = [
    {
      id: "R001",
      ward: "ICU",
      roomNumber: "ICU-101",
      bedNumber: "Bed 1",
      patient: "Emma Davis",
      admissionDate: "2024-10-18",
      diagnosis: "Post-surgery monitoring",
      status: "Occupied",
      priority: "High"
    },
    {
      id: "R002",
      ward: "ICU", 
      roomNumber: "ICU-102",
      bedNumber: "Bed 2",
      patient: null,
      admissionDate: null,
      diagnosis: null,
      status: "Available",
      priority: null
    },
    {
      id: "R003",
      ward: "General Ward A",
      roomNumber: "GA-201",
      bedNumber: "Bed 1",
      patient: "Sarah Johnson",
      admissionDate: "2024-10-15",
      diagnosis: "Hypertension management",
      status: "Occupied",
      priority: "Medium"
    },
    {
      id: "R004",
      ward: "General Ward A",
      roomNumber: "GA-202", 
      bedNumber: "Bed 2",
      patient: "Michael Brown",
      admissionDate: "2024-10-16",
      diagnosis: "Diabetes monitoring",
      status: "Occupied",
      priority: "Low"
    },
    {
      id: "R005",
      ward: "General Ward B",
      roomNumber: "GB-301",
      bedNumber: "Bed 1",
      patient: "Lisa Anderson",
      admissionDate: "2024-10-17",
      diagnosis: "Respiratory infection",
      status: "Occupied",
      priority: "Medium"
    },
    {
      id: "R006",
      ward: "Pediatric Ward",
      roomNumber: "PED-401",
      bedNumber: "Bed 1",
      patient: "Tommy Wilson",
      admissionDate: "2024-10-19",
      diagnosis: "Fever management",
      status: "Occupied",
      priority: "Medium"
    }
  ];

  const admissions = [
    {
      id: "ADM001",
      patient: "Emma Davis",
      patientId: "P001",
      admissionDate: "2024-10-18",
      ward: "ICU",
      room: "ICU-101",
      diagnosis: "Post-surgery monitoring",
      status: "Active",
      doctor: "Dr. Emily Chen",
      estimatedDischarge: "2024-10-22"
    },
    {
      id: "ADM002",
      patient: "Sarah Johnson",
      patientId: "P002", 
      admissionDate: "2024-10-15",
      ward: "General Ward A",
      room: "GA-201",
      diagnosis: "Hypertension management",
      status: "Active",
      doctor: "Dr. Robert Smith",
      estimatedDischarge: "2024-10-21"
    },
    {
      id: "ADM003",
      patient: "Michael Brown",
      patientId: "P003",
      admissionDate: "2024-10-16",
      ward: "General Ward A", 
      room: "GA-202",
      diagnosis: "Diabetes monitoring",
      status: "Discharged",
      doctor: "Dr. Emily Chen",
      dischargeDate: "2024-10-20"
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = !searchTerm || 
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.patient && room.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesWard = selectedWard === "all" || room.ward === selectedWard;
    const matchesStatus = selectedStatus === "all" || room.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesWard && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "occupied":
        return "bg-destructive-light text-destructive";
      case "available":
        return "bg-success-light text-success";
      case "maintenance":
        return "bg-warning-light text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-destructive-light text-destructive";
      case "medium":
        return "bg-warning-light text-warning";
      case "low":
        return "bg-success-light text-success";
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
            <h1 className="text-3xl font-bold">Admissions & Bed Management</h1>
            <p className="text-muted-foreground">Manage patient admissions and bed allocation</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              New Admission
            </Button>
          </div>
        </div>

        {/* Ward Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wards.map((ward) => (
            <Card key={ward.id} className="shadow-md border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{ward.name}</p>
                    <h3 className="text-2xl font-bold mt-2">{ward.occupiedBeds}/{ward.totalBeds}</h3>
                    <p className="text-sm text-muted-foreground">
                      {ward.availableBeds} beds available
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                      <Bed className="h-6 w-6 text-primary" />
                    </div>
                    <p className={`text-sm mt-2 font-medium ${
                      ward.occupancyRate >= 80 ? 'text-destructive' : 
                      ward.occupancyRate >= 60 ? 'text-warning' : 'text-success'
                    }`}>
                      {ward.occupancyRate}% occupied
                    </p>
                  </div>
                </div>
                <div className="mt-4 w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      ward.occupancyRate >= 80 ? 'bg-destructive' : 
                      ward.occupancyRate >= 60 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${ward.occupancyRate}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bed-management" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bed-management">Bed Management</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="discharges">Discharges</TabsTrigger>
          </TabsList>

          {/* Bed Management Tab */}
          <TabsContent value="bed-management">
            <Card className="shadow-md border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Bed Management</CardTitle>
                    <CardDescription>Monitor bed availability and occupancy</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search rooms or patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedWard} onValueChange={setSelectedWard}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Ward" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Wards</SelectItem>
                        {wards.map((ward) => (
                          <SelectItem key={ward.id} value={ward.name}>
                            {ward.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.id}
                      className={`p-4 rounded-lg border transition-smooth hover:shadow-md ${
                        room.status === "Occupied" 
                          ? "border-destructive/20 bg-destructive/5" 
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{room.roomNumber}</h3>
                          <p className="text-sm text-muted-foreground">{room.bedNumber}</p>
                        </div>
                        <Badge className={getStatusColor(room.status)}>
                          {room.status}
                        </Badge>
                      </div>

                      {room.patient ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{room.patient}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Admitted: {room.admissionDate}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{room.diagnosis}</p>
                          {room.priority && (
                            <Badge className={getPriorityColor(room.priority)}>
                              {room.priority} Priority
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Bed className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Bed Available</p>
                          <Button size="sm" variant="outline" className="mt-2">
                            Assign Patient
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admissions Tab */}
          <TabsContent value="admissions">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Active Admissions</CardTitle>
                <CardDescription>Currently admitted patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {admissions.filter(adm => adm.status === "Active").map((admission) => (
                    <div key={admission.id} className="p-4 rounded-lg border border-border">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold">{admission.patient}</h3>
                            <Badge variant="outline">ID: {admission.patientId}</Badge>
                            <Badge variant="default">Active</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Admission Date: {admission.admissionDate}</p>
                              <p className="text-muted-foreground">Ward: {admission.ward}</p>
                              <p className="text-muted-foreground">Room: {admission.room}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Doctor: {admission.doctor}</p>
                              <p className="text-muted-foreground">Diagnosis: {admission.diagnosis}</p>
                              <p className="text-muted-foreground">Est. Discharge: {admission.estimatedDischarge}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Discharge
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discharges Tab */}
          <TabsContent value="discharges">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Recent Discharges</CardTitle>
                <CardDescription>Recently discharged patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {admissions.filter(adm => adm.status === "Discharged").map((admission) => (
                    <div key={admission.id} className="p-4 rounded-lg border border-border">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold">{admission.patient}</h3>
                            <Badge variant="outline">ID: {admission.patientId}</Badge>
                            <Badge variant="secondary">Discharged</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Admission Date: {admission.admissionDate}</p>
                              <p className="text-muted-foreground">Discharge Date: {admission.dischargeDate}</p>
                              <p className="text-muted-foreground">Ward: {admission.ward}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Doctor: {admission.doctor}</p>
                              <p className="text-muted-foreground">Diagnosis: {admission.diagnosis}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Generate Report
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

export default Admissions;
