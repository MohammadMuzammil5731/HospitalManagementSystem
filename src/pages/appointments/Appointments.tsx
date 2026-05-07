import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Plus, Filter, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState("2024-10-20");

  const appointments = [
    {
      id: "A001",
      time: "09:00 AM",
      patient: "Sarah Johnson",
      doctor: "Dr. Emily Chen",
      type: "Consultation",
      duration: "30 min",
      status: "confirmed",
      room: "Room 101",
    },
    {
      id: "A002",
      time: "09:30 AM",
      patient: "Michael Brown",
      doctor: "Dr. Robert Smith",
      type: "Follow-up",
      duration: "20 min",
      status: "in-progress",
      room: "Room 203",
    },
    {
      id: "A003",
      time: "10:00 AM",
      patient: "Lisa Anderson",
      doctor: "Dr. Emily Chen",
      type: "Checkup",
      duration: "30 min",
      status: "confirmed",
      room: "Room 101",
    },
    {
      id: "A004",
      time: "10:30 AM",
      patient: "John Williams",
      doctor: "Dr. Michael Lee",
      type: "Surgery Consultation",
      duration: "45 min",
      status: "pending",
      room: "Room 305",
    },
    {
      id: "A005",
      time: "11:30 AM",
      patient: "Emily Davis",
      doctor: "Dr. Sarah Johnson",
      type: "Vaccination",
      duration: "15 min",
      status: "confirmed",
      room: "Room 102",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success-light text-success";
      case "in-progress":
        return "bg-primary-light text-primary";
      case "pending":
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
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-muted-foreground">Manage and schedule patient appointments</p>
          </div>
          <Link to="/appointments/new">
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </Link>
        </div>

        {/* Calendar and Filters */}
        <div className="grid lg:grid-cols-4 gap-6">
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Calendar</span>
                </div>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Today
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Tomorrow
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    This Week
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    This Month
                  </Button>
                </div>
                <div className="pt-4 border-t border-border">
                  <Button variant="outline" className="w-full gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            {/* Date Header */}
            <Card className="shadow-md border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary-light rounded-lg">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">October 20, 2024</h2>
                      <p className="text-muted-foreground">
                        {appointments.length} appointments scheduled
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Local Time: 9:45 AM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointments List */}
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="shadow-md hover:shadow-lg transition-smooth border-border"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="text-center min-w-[80px]">
                          <div className="text-2xl font-bold text-primary">
                            {appointment.time.split(" ")[0]}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.time.split(" ")[1]}
                          </div>
                        </div>

                        <div className="h-16 w-px bg-border" />

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                                {appointment.patient.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold">{appointment.patient}</p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.doctor}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {appointment.status.charAt(0).toUpperCase() +
                                appointment.status.slice(1)}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {appointment.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.duration}
                            </span>
                            <span>{appointment.room}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default Appointments;
