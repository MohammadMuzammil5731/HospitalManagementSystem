import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  UserPlus, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  Shield, 
  Stethoscope,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "sonner";
import realClinicAPI from "@/services/realApi";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    contact: "",
    specialization: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, patientsData, appointmentsData] = await Promise.all([
        realClinicAPI.getUsers(),
        realClinicAPI.getPatients(),
        realClinicAPI.getAppointments()
      ]);
      setUsers(usersData.users || []);
      setPatients(patientsData.patients || []);
      setAppointments(appointmentsData.appointments || []);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      if (!userFormData.name || !userFormData.email || !userFormData.password || !userFormData.role || !userFormData.contact) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (userFormData.role === 'doctor' && !userFormData.specialization) {
        toast.error("Specialization is required for doctors");
        return;
      }

      await realClinicAPI.createUser(userFormData);
      toast.success("User created successfully!");
      setShowUserForm(false);
      setUserFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        contact: "",
        specialization: ""
      });
      loadData();
    } catch (error: any) {
      console.error("Failed to create user:", error);
      toast.error(error.message || "Failed to create user");
    }
  };

  const handleUpdateUser = async (userId: string, updates: any) => {
    try {
      await realClinicAPI.updateUser(userId, updates);
      toast.success("User updated successfully!");
      loadData();
    } catch (error: any) {
      console.error("Failed to update user:", error);
      toast.error(error.message || "Failed to update user");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await realClinicAPI.deleteUser(userId);
      toast.success("User deleted successfully!");
      loadData();
    } catch (error: any) {
      console.error("Failed to delete user:", error);
      toast.error(error.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "doctor":
        return "bg-blue-100 text-blue-800";
      case "receptionist":
        return "bg-green-100 text-green-800";
      case "patient":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const stats = {
    totalUsers: users.length,
    totalPatients: patients.length,
    totalAppointments: appointments.length,
    activeUsers: users.filter(u => u.isActive).length,
    doctors: users.filter(u => u.role === 'doctor').length,
    receptionists: users.filter(u => u.role === 'receptionist').length,
    pendingAppointments: appointments.filter(a => a.status === 'pending').length,
    completedAppointments: appointments.filter(a => a.status === 'completed').length
  };

  return (
    <AuthGuard requiredRole="admin">
      <DashboardLayout>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, patients, and system overview</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <h3 className="text-2xl font-bold">{stats.totalPatients}</h3>
                  </div>
                  <Shield className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Appointments</p>
                    <h3 className="text-2xl font-bold">{stats.totalAppointments}</h3>
                  </div>
                  <Calendar className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <h3 className="text-2xl font-bold">{stats.activeUsers}</h3>
                  </div>
                  <Activity className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="patients">Patient Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>

            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-6">
              {/* Search and Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Search users by name, email, or role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Create New User</DialogTitle>
                          <DialogDescription>
                            Add a new user to the system
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Name *</Label>
                              <Input
                                id="name"
                                value={userFormData.name}
                                onChange={(e) => setUserFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter full name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={userFormData.email}
                                onChange={(e) => setUserFormData(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="Enter email"
                              />
                            </div>
                            <div>
                              <Label htmlFor="password">Password *</Label>
                              <Input
                                id="password"
                                type="password"
                                value={userFormData.password}
                                onChange={(e) => setUserFormData(prev => ({ ...prev, password: e.target.value }))}
                                placeholder="Enter password"
                              />
                            </div>
                            <div>
                              <Label htmlFor="contact">Contact *</Label>
                              <Input
                                id="contact"
                                value={userFormData.contact}
                                onChange={(e) => setUserFormData(prev => ({ ...prev, contact: e.target.value }))}
                                placeholder="Enter phone number"
                              />
                            </div>
                            <div>
                              <Label htmlFor="role">Role *</Label>
                              <Select value={userFormData.role} onValueChange={(value) => setUserFormData(prev => ({ ...prev, role: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="doctor">Doctor</SelectItem>
                                  <SelectItem value="receptionist">Receptionist</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {userFormData.role === 'doctor' && (
                              <div>
                                <Label htmlFor="specialization">Specialization *</Label>
                                <Input
                                  id="specialization"
                                  value={userFormData.specialization}
                                  onChange={(e) => setUserFormData(prev => ({ ...prev, specialization: e.target.value }))}
                                  placeholder="e.g., Cardiology"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowUserForm(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleCreateUser}>
                              Create User
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage all system users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b">
                        <tr>
                          <th className="text-left p-4 font-semibold">Name</th>
                          <th className="text-left p-4 font-semibold">Email</th>
                          <th className="text-left p-4 font-semibold">Role</th>
                          <th className="text-left p-4 font-semibold">Contact</th>
                          <th className="text-left p-4 font-semibold">Status</th>
                          <th className="text-left p-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user._id} className="border-b hover:bg-muted/30">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                                  {user.name?.charAt(0)}
                                </div>
                                <span className="font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-muted-foreground">{user.email}</td>
                            <td className="p-4">
                              <Badge className={getRoleColor(user.role)}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="p-4 text-muted-foreground">{user.contact}</td>
                            <td className="p-4">
                              <Badge variant={user.isActive ? "default" : "secondary"}>
                                {user.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteUser(user._id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No users found matching your search.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Patient Overview Tab */}
            <TabsContent value="patients" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Overview</CardTitle>
                  <CardDescription>All registered patients in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Total Patients</p>
                          <h3 className="text-2xl font-bold">{stats.totalPatients}</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Active Patients</p>
                          <h3 className="text-2xl font-bold">{patients.filter(p => p.isActive).length}</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">New This Month</p>
                          <h3 className="text-2xl font-bold">
                            {patients.filter(p => 
                              new Date(p.createdAt).getMonth() === new Date().getMonth()
                            ).length}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    {patients.slice(0, 10).map((patient) => (
                      <div key={patient._id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h4 className="font-semibold">{patient.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Age: {patient.age} | Gender: {patient.gender} | Phone: {patient.phone}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Registered: {formatDate(patient.createdAt)}
                            </p>
                          </div>
                          <Badge variant={patient.isActive ? "default" : "secondary"}>
                            {patient.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Management</CardTitle>
                  <CardDescription>Overview of all appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Total Appointments</p>
                          <h3 className="text-2xl font-bold">{stats.totalAppointments}</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <h3 className="text-2xl font-bold">{stats.pendingAppointments}</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <h3 className="text-2xl font-bold">{stats.completedAppointments}</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Today</p>
                          <h3 className="text-2xl font-bold">
                            {appointments.filter(a => 
                              new Date(a.date).toDateString() === new Date().toDateString()
                            ).length}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    {appointments.slice(0, 10).map((appointment) => (
                      <div key={appointment._id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h4 className="font-semibold">
                              {appointment.patientId?.name || 'Unknown Patient'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Doctor: {appointment.doctorId?.name || 'Unknown Doctor'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Date: {formatDate(appointment.date)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Problem: {appointment.problem}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
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
    </AuthGuard>
  );
};

export default AdminDashboard;