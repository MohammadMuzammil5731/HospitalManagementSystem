import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter,
  Clock,
  User,
  MapPin,
  Stethoscope,
  Bed,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const HospitalCalendar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = [
    "All Departments", "Cardiology", "Neurology", "Orthopedics", 
    "Pediatrics", "Emergency", "Surgery", "ICU", "General Ward"
  ];

  const events = [
    {
      id: "EVT001",
      title: "Dr. Emily Chen - Cardiology Rounds",
      type: "appointment",
      startTime: "09:00",
      endTime: "10:00",
      date: "2024-10-21",
      doctor: "Dr. Emily Chen",
      department: "Cardiology",
      room: "Room 101",
      status: "scheduled",
      patients: 8
    },
    {
      id: "EVT002",
      title: "Emergency Surgery - Appendectomy",
      type: "surgery",
      startTime: "14:00",
      endTime: "16:00",
      date: "2024-10-21",
      doctor: "Dr. Robert Smith",
      department: "Surgery",
      room: "OR-1",
      status: "confirmed",
      patients: 1
    },
    {
      id: "EVT003",
      title: "Nurse Shift Change - ICU",
      type: "shift",
      startTime: "07:00",
      endTime: "19:00",
      date: "2024-10-21",
      doctor: "Sarah Wilson",
      department: "ICU",
      room: "ICU Ward",
      status: "active",
      patients: 6
    },
    {
      id: "EVT004",
      title: "Staff Meeting - Monthly Review",
      type: "meeting",
      startTime: "11:00",
      endTime: "12:00",
      date: "2024-10-22",
      doctor: "Admin Team",
      department: "Administration",
      room: "Conference Room A",
      status: "scheduled",
      patients: 0
    },
    {
      id: "EVT005",
      title: "Dr. Lisa Anderson - Pediatric Clinic",
      type: "appointment",
      startTime: "10:00",
      endTime: "12:00",
      date: "2024-10-22",
      doctor: "Dr. Lisa Anderson",
      department: "Pediatrics",
      room: "Room 205",
      status: "scheduled",
      patients: 12
    }
  ];

  const shifts = [
    {
      id: "SHIFT001",
      staff: "Dr. Emily Chen",
      role: "Doctor",
      department: "Cardiology",
      shiftType: "Day Shift",
      startTime: "08:00",
      endTime: "17:00",
      date: "2024-10-21",
      status: "active"
    },
    {
      id: "SHIFT002",
      staff: "Sarah Wilson",
      role: "Nurse",
      department: "ICU",
      shiftType: "Night Shift",
      startTime: "19:00",
      endTime: "07:00",
      date: "2024-10-21",
      status: "upcoming"
    },
    {
      id: "SHIFT003",
      staff: "Michael Johnson",
      role: "Receptionist",
      department: "Reception",
      shiftType: "Day Shift",
      startTime: "07:00",
      endTime: "16:00",
      date: "2024-10-21",
      status: "active"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || event.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-primary-light text-primary";
      case "surgery":
        return "bg-destructive-light text-destructive";
      case "shift":
        return "bg-success-light text-success";
      case "meeting":
        return "bg-warning-light text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-primary-light text-primary";
      case "confirmed":
        return "bg-success-light text-success";
      case "active":
        return "bg-success-light text-success";
      case "upcoming":
        return "bg-warning-light text-warning";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getShiftStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-light text-success";
      case "upcoming":
        return "bg-warning-light text-warning";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Hospital Calendar</h1>
            <p className="text-muted-foreground">Schedule management and shift planning</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Export Schedule
            </Button>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              New Event
            </Button>
          </div>
        </div>

        {/* Calendar View Controls */}
        <Card className="shadow-md border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase() === "all departments" ? "all" : dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={selectedView === "day" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedView("day")}
                >
                  Day
                </Button>
                <Button 
                  variant={selectedView === "week" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedView("week")}
                >
                  Week
                </Button>
                <Button 
                  variant={selectedView === "month" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedView("month")}
                >
                  Month
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">Events & Appointments</TabsTrigger>
            <TabsTrigger value="shifts">Staff Shifts</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Hospital Events & Appointments</CardTitle>
                <CardDescription>Manage scheduled events and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                            {event.type === "appointment" && <Stethoscope className="h-6 w-6 text-primary" />}
                            {event.type === "surgery" && <Activity className="h-6 w-6 text-primary" />}
                            {event.type === "shift" && <User className="h-6 w-6 text-primary" />}
                            {event.type === "meeting" && <Calendar className="h-6 w-6 text-primary" />}
                          </div>
                          <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {event.doctor} • {event.department}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <Label className="text-sm font-medium">Date</Label>
                              <p className="text-sm text-muted-foreground">{event.date}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <Label className="text-sm font-medium">Time</Label>
                              <p className="text-sm text-muted-foreground">
                                {event.startTime} - {event.endTime}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <Label className="text-sm font-medium">Location</Label>
                              <p className="text-sm text-muted-foreground">{event.room}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <Label className="text-sm font-medium">Patients</Label>
                              <p className="text-sm text-muted-foreground">{event.patients}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit Event
                        </Button>
                        {event.status === "scheduled" && (
                          <Button size="sm" variant="hero">
                            Confirm
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shifts Tab */}
          <TabsContent value="shifts">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Staff Shifts</CardTitle>
                <CardDescription>Manage staff schedules and shift assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                            <User className="h-6 w-6 text-success" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{shift.staff}</h3>
                            <p className="text-sm text-muted-foreground">
                              {shift.role} • {shift.department}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{shift.shiftType}</Badge>
                          <Badge className={getShiftStatusColor(shift.status)}>
                            {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <Label className="text-sm font-medium">Date</Label>
                              <p className="text-sm text-muted-foreground">{shift.date}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <Label className="text-sm font-medium">Shift Time</Label>
                              <p className="text-sm text-muted-foreground">
                                {shift.startTime} - {shift.endTime}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <Label className="text-sm font-medium">Department</Label>
                              <p className="text-sm text-muted-foreground">{shift.department}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <Label className="text-sm font-medium">Role</Label>
                              <p className="text-sm text-muted-foreground">{shift.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          View Schedule
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit Shift
                        </Button>
                        {shift.status === "upcoming" && (
                          <Button size="sm" variant="hero">
                            Start Shift
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Swap Shift
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar View Tab */}
          <TabsContent value="calendar">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>Visual calendar representation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Calendar View Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    Interactive calendar view will be implemented here
                  </p>
                  <Button variant="hero" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    
  );
};

export default HospitalCalendar;
