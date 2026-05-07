import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Bell, 
  Send, 
  Search, 
  Plus,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Mail,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const notifications = [
    {
      id: "NOT001",
      title: "Critical Patient Alert",
      message: "Patient Emma Davis in ICU requires immediate attention",
      type: "critical",
      sender: "ICU Nurse",
      recipient: "Dr. Emily Chen",
      timestamp: "2024-10-21 14:30",
      isRead: false,
      priority: "high"
    },
    {
      id: "NOT002",
      title: "Lab Results Ready",
      message: "Blood test results for Sarah Johnson are now available",
      type: "info",
      sender: "Lab Technician",
      recipient: "Dr. Robert Smith",
      timestamp: "2024-10-21 13:45",
      isRead: true,
      priority: "medium"
    },
    {
      id: "NOT003",
      title: "Appointment Reminder",
      message: "Upcoming appointment with Michael Brown in 30 minutes",
      type: "warning",
      sender: "System",
      recipient: "Dr. Emily Chen",
      timestamp: "2024-10-21 13:15",
      isRead: false,
      priority: "medium"
    },
    {
      id: "NOT004",
      title: "Shift Change Notification",
      message: "Night shift starting in 1 hour. Please prepare handover notes",
      type: "info",
      sender: "Nursing Supervisor",
      recipient: "Sarah Wilson",
      timestamp: "2024-10-21 12:00",
      isRead: true,
      priority: "low"
    }
  ];

  const messages = [
    {
      id: "MSG001",
      sender: "Dr. Emily Chen",
      recipient: "Dr. Robert Smith",
      subject: "Patient Consultation Request",
      message: "Hi Robert, I need your opinion on the MRI results for patient Sarah Johnson. Can you review and provide your assessment?",
      timestamp: "2024-10-21 14:20",
      isRead: false,
      priority: "medium",
      type: "consultation"
    },
    {
      id: "MSG002",
      sender: "Sarah Wilson",
      recipient: "Dr. Emily Chen",
      subject: "Medication Administration",
      message: "Dr. Chen, I've administered the prescribed medication to patient Emma Davis. Her vitals are stable. Should I continue with the current dosage?",
      timestamp: "2024-10-21 13:50",
      isRead: true,
      priority: "high",
      type: "medical"
    },
    {
      id: "MSG003",
      sender: "Michael Johnson",
      recipient: "Admin Team",
      subject: "Patient Registration Issue",
      message: "We have a patient trying to register but their insurance information is not matching our records. How should I proceed?",
      timestamp: "2024-10-21 13:30",
      isRead: false,
      priority: "medium",
      type: "administrative"
    },
    {
      id: "MSG004",
      sender: "Dr. Lisa Anderson",
      recipient: "Pharmacy Team",
      subject: "Prescription Clarification",
      message: "I need clarification on the dosage for the pediatric prescription I sent earlier. The patient is 8 years old, 25kg weight.",
      timestamp: "2024-10-21 12:45",
      isRead: true,
      priority: "medium",
      type: "pharmacy"
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = !searchTerm || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || notification.type === selectedType;
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "read" && notification.isRead) ||
      (selectedStatus === "unread" && !notification.isRead);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredMessages = messages.filter(message => {
    const matchesSearch = !searchTerm || 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || message.type === selectedType;
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "read" && message.isRead) ||
      (selectedStatus === "unread" && !message.isRead);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-destructive-light text-destructive";
      case "warning":
        return "bg-warning-light text-warning";
      case "info":
        return "bg-primary-light text-primary";
      case "success":
        return "bg-success-light text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "medical":
        return "bg-primary-light text-primary";
      case "consultation":
        return "bg-success-light text-success";
      case "administrative":
        return "bg-warning-light text-warning";
      case "pharmacy":
        return "bg-secondary-light text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Messages & Notifications</h1>
            <p className="text-muted-foreground">Communicate with staff and manage alerts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Mark All Read
            </Button>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread Notifications</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {notifications.filter(n => !n.isRead).length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-warning-light flex items-center justify-center">
                  <Bell className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread Messages</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {messages.filter(m => !m.isRead).length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Alerts</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {notifications.filter(n => n.type === "critical").length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-destructive-light flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                  <h3 className="text-3xl font-bold mt-2">{messages.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="shadow-md border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>System Notifications</CardTitle>
                    <CardDescription>Alerts and system-generated notifications</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search notifications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 rounded-lg border transition-smooth hover:shadow-md ${
                        !notification.isRead 
                          ? "border-primary/20 bg-primary/5" 
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                            notification.type === "critical" ? "bg-destructive-light" :
                            notification.type === "warning" ? "bg-warning-light" :
                            notification.type === "info" ? "bg-primary-light" :
                            "bg-success-light"
                          }`}>
                            {notification.type === "critical" && <AlertCircle className="h-6 w-6 text-destructive" />}
                            {notification.type === "warning" && <AlertCircle className="h-6 w-6 text-warning" />}
                            {notification.type === "info" && <Info className="h-6 w-6 text-primary" />}
                            {notification.type === "success" && <CheckCircle className="h-6 w-6 text-success" />}
                          </div>
                          <div>
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              From: {notification.sender} • To: {notification.recipient}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getNotificationTypeColor(notification.type)}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </Badge>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority} Priority
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{notification.timestamp}</span>
                          {!notification.isRead && (
                            <Badge variant="outline" className="text-xs">
                              Unread
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        {!notification.isRead && (
                          <Button size="sm" variant="hero">
                            Mark as Read
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          Forward
                        </Button>
                        <Button size="sm" variant="outline">
                          Archive
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Staff Messages</CardTitle>
                <CardDescription>Internal communication between staff members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-6 rounded-lg border transition-smooth hover:shadow-md ${
                        !message.isRead 
                          ? "border-primary/20 bg-primary/5" 
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{message.subject}</h3>
                            <p className="text-sm text-muted-foreground">
                              From: {message.sender} • To: {message.recipient}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getMessageTypeColor(message.type)}>
                            {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                          </Badge>
                          <Badge className={getPriorityColor(message.priority)}>
                            {message.priority} Priority
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm">{message.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{message.timestamp}</span>
                          {!message.isRead && (
                            <Badge variant="outline" className="text-xs">
                              Unread
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        {!message.isRead && (
                          <Button size="sm" variant="hero">
                            Mark as Read
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          Forward
                        </Button>
                        <Button size="sm" variant="outline">
                          Archive
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compose Tab */}
          <TabsContent value="compose">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Compose Message</CardTitle>
                <CardDescription>Send a message to staff members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recipient">Recipient</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dr-emily">Dr. Emily Chen</SelectItem>
                          <SelectItem value="dr-robert">Dr. Robert Smith</SelectItem>
                          <SelectItem value="nurse-sarah">Sarah Wilson</SelectItem>
                          <SelectItem value="reception-mike">Michael Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Enter message subject"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message here..."
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="hero" className="gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                    <Button variant="outline">
                      Save Draft
                    </Button>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    
  );
};

export default Messages;
