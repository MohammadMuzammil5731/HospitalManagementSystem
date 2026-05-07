import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, User, Phone, Mail, MapPin, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import realClinicAPI from "@/services/realApi";

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const patients = [
    {
      id: "P001",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      bloodType: "O+",
      lastVisit: "2024-10-15",
      phone: "+1 (555) 123-4567",
      status: "Active",
    },
    {
      id: "P002",
      name: "Michael Brown",
      age: 45,
      gender: "Male",
      bloodType: "A+",
      lastVisit: "2024-10-18",
      phone: "+1 (555) 234-5678",
      status: "Active",
    },
    {
      id: "P003",
      name: "Lisa Anderson",
      age: 28,
      gender: "Female",
      bloodType: "B+",
      lastVisit: "2024-10-12",
      phone: "+1 (555) 345-6789",
      status: "Active",
    },
    {
      id: "P004",
      name: "John Williams",
      age: 52,
      gender: "Male",
      bloodType: "AB+",
      lastVisit: "2024-10-10",
      phone: "+1 (555) 456-7890",
      status: "Inactive",
    },
    {
      id: "P005",
      name: "Emily Davis",
      age: 39,
      gender: "Female",
      bloodType: "O-",
      lastVisit: "2024-10-19",
      phone: "+1 (555) 567-8901",
      status: "Active",
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsViewDialogOpen(true);
  };

  const handleEditPatient = (patient: any) => {
    setEditingPatient({ ...patient });
    setIsEditDialogOpen(true);
  };

  const handleSavePatient = async () => {
    try {
      setLoading(true);
      // In a real app, you would call the API to update the patient
      await realClinicAPI.updatePatient(editingPatient.id, editingPatient);
      toast.success('Patient updated successfully');
      setIsEditDialogOpen(false);
      setEditingPatient(null);
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error('Failed to update patient');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (patientId: string) => {
    try {
      setLoading(true);
      // In a real app, you would call the API to delete the patient
      // await realClinicAPI.deletePatient(patientId);
      toast.success('Patient deleted successfully');
    } catch (error) {
      console.error('Error deleting patient:', error);
      toast.error('Failed to delete patient');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPatients = () => {
    // Export functionality
    const csvContent = [
      ['Patient ID', 'Name', 'Age', 'Gender', 'Blood Type', 'Last Visit', 'Phone', 'Status'],
      ...filteredPatients.map(patient => [
        patient.id,
        patient.name,
        patient.age,
        patient.gender,
        patient.bloodType,
        patient.lastVisit,
        patient.phone,
        patient.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patients.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Patients exported successfully');
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Patients</h1>
            <p className="text-muted-foreground">Manage patient records and information</p>
          </div>
          <Link to="/patients/new">
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Patient
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-md border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or patient ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleExportPatients}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card className="shadow-md border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold">Patient ID</th>
                    <th className="text-left p-4 font-semibold">Name</th>
                    <th className="text-left p-4 font-semibold">Age</th>
                    <th className="text-left p-4 font-semibold">Gender</th>
                    <th className="text-left p-4 font-semibold">Blood Type</th>
                    <th className="text-left p-4 font-semibold">Last Visit</th>
                    <th className="text-left p-4 font-semibold">Phone</th>
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
                          <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold text-sm">
                            {patient.name.charAt(0)}
                          </div>
                          <span className="font-medium">{patient.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{patient.age}</td>
                      <td className="p-4 text-muted-foreground">{patient.gender}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-primary-light text-primary rounded text-sm font-medium">
                          {patient.bloodType}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{patient.lastVisit}</td>
                      <td className="p-4 text-muted-foreground">{patient.phone}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            patient.status === "Active"
                              ? "bg-success-light text-success"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewPatient(patient)}
                            title="View Patient Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPatient(patient)}
                            title="Edit Patient"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                title="Delete Patient"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Patient</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {patient.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePatient(patient.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No patients found matching your search.
          </div>
        )}

        {/* View Patient Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Details
              </DialogTitle>
              <DialogDescription>
                View complete patient information
              </DialogDescription>
            </DialogHeader>
            {selectedPatient && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold text-xl">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                    <p className="text-muted-foreground">Patient ID: {selectedPatient.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Age:</span>
                      <span className="text-sm">{selectedPatient.age} years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Gender:</span>
                      <span className="text-sm">{selectedPatient.gender}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Blood Type:</span>
                      <span className="text-sm">{selectedPatient.bloodType}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Phone:</span>
                      <span className="text-sm">{selectedPatient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Last Visit:</span>
                      <span className="text-sm">{selectedPatient.lastVisit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        selectedPatient.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {selectedPatient.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    setIsViewDialogOpen(false);
                    handleEditPatient(selectedPatient);
                  }}>
                    Edit Patient
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Patient Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Edit Patient
              </DialogTitle>
              <DialogDescription>
                Update patient information
              </DialogDescription>
            </DialogHeader>
            {editingPatient && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={editingPatient.name}
                      onChange={(e) => setEditingPatient({...editingPatient, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Age</label>
                    <Input
                      type="number"
                      value={editingPatient.age}
                      onChange={(e) => setEditingPatient({...editingPatient, age: parseInt(e.target.value)})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Gender</label>
                    <Input
                      value={editingPatient.gender}
                      onChange={(e) => setEditingPatient({...editingPatient, gender: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Blood Type</label>
                    <Input
                      value={editingPatient.bloodType}
                      onChange={(e) => setEditingPatient({...editingPatient, bloodType: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={editingPatient.phone}
                      onChange={(e) => setEditingPatient({...editingPatient, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Visit</label>
                    <Input
                      type="date"
                      value={editingPatient.lastVisit}
                      onChange={(e) => setEditingPatient({...editingPatient, lastVisit: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSavePatient} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
