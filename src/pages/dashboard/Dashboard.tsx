import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Activity, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary-light",
    },
    {
      title: "Today's Appointments",
      value: "47",
      change: "+8.2%",
      icon: Calendar,
      color: "text-secondary",
      bgColor: "bg-secondary-light",
    },
    {
      title: "Active Staff",
      value: "156",
      change: "+2.1%",
      icon: Activity,
      color: "text-success",
      bgColor: "bg-success-light",
    },
    {
      title: "Avg. Wait Time",
      value: "18min",
      change: "-5.3%",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning-light",
    },
  ];

  const recentAppointments = [
    {
      id: "1",
      patient: "Sarah Johnson",
      doctor: "Dr. Emily Chen",
      time: "09:00 AM",
      type: "Consultation",
      status: "In Progress",
    },
    {
      id: "2",
      patient: "Michael Brown",
      doctor: "Dr. Robert Smith",
      time: "09:30 AM",
      type: "Follow-up",
      status: "Waiting",
    },
    {
      id: "3",
      patient: "Lisa Anderson",
      doctor: "Dr. Emily Chen",
      time: "10:00 AM",
      type: "Checkup",
      status: "Scheduled",
    },
  ];

  const alerts = [
    {
      id: "1",
      type: "critical",
      message: "Patient John Doe requires immediate attention in Room 203",
      time: "5 min ago",
    },
    {
      id: "2",
      type: "warning",
      message: "Low inventory alert: Paracetamol stock below threshold",
      time: "1 hour ago",
    },
    {
      id: "3",
      type: "info",
      message: "System maintenance scheduled for tonight at 11 PM",
      time: "2 hours ago",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your hospital overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-smooth animate-fade-in border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                    <p className={`text-sm mt-2 flex items-center gap-1 ${
                      stat.change.startsWith('+') ? 'text-success' : 'text-destructive'
                    }`}>
                      <TrendingUp className="h-4 w-4" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-4 ${stat.bgColor} rounded-xl`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Appointments */}
          <Card className="lg:col-span-2 shadow-md border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>Current schedule overview</CardDescription>
                </div>
                <Link to="/appointments">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                        {appointment.patient.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === "In Progress"
                            ? "bg-success-light text-success"
                            : appointment.status === "Waiting"
                            ? "bg-warning-light text-warning"
                            : "bg-primary-light text-primary"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="shadow-md border-border">
            <CardHeader>
              <CardTitle>Alerts & Notifications</CardTitle>
              <CardDescription>Recent system alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.type === "critical"
                        ? "border-destructive/20 bg-destructive/5"
                        : alert.type === "warning"
                        ? "border-warning/20 bg-warning/5"
                        : "border-primary/20 bg-primary/5"
                    }`}
                  >
                    <div className="flex gap-3">
                      <AlertCircle
                        className={`h-5 w-5 flex-shrink-0 ${
                          alert.type === "critical"
                            ? "text-destructive"
                            : alert.type === "warning"
                            ? "text-warning"
                            : "text-primary"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-md border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/patients">
                <Button variant="outline" className="w-full h-24 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span>Add Patient</span>
                </Button>
              </Link>
              <Link to="/appointments">
                <Button variant="outline" className="w-full h-24 flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule</span>
                </Button>
              </Link>
              <Link to="/labs">
                <Button variant="outline" className="w-full h-24 flex-col gap-2">
                  <Activity className="h-6 w-6" />
                  <span>Lab Order</span>
                </Button>
              </Link>
              <Link to="/billing">
                <Button variant="outline" className="w-full h-24 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Billing</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
