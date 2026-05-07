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
  Activity, 
  Search, 
  Filter, 
  Plus, 
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  User,
  Stethoscope
} from "lucide-react";
import { Link } from "react-router-dom";

const LabOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTestType, setSelectedTestType] = useState("all");

  const testTypes = [
    "Blood Chemistry", "Complete Blood Count", "Urinalysis", "Microbiology",
    "Pathology", "Radiology", "Cardiology", "Neurology", "Endocrinology"
  ];

  const labOrders = [
    {
      id: "LO001",
      orderDate: "2024-10-20",
      patient: "Sarah Johnson",
      patientId: "P001",
      doctor: "Dr. Emily Chen",
      testType: "Blood Chemistry",
      tests: ["Glucose", "Cholesterol", "HbA1c"],
      status: "Completed",
      priority: "Normal",
      resultsDate: "2024-10-20",
      technician: "John Smith"
    },
    {
      id: "LO002",
      orderDate: "2024-10-19",
      patient: "Michael Brown",
      patientId: "P002",
      doctor: "Dr. Robert Smith",
      testType: "Complete Blood Count",
      tests: ["Hemoglobin", "White Blood Cells", "Platelets"],
      status: "In Progress",
      priority: "High",
      resultsDate: null,
      technician: "Jane Doe"
    },
    {
      id: "LO003",
      orderDate: "2024-10-18",
      patient: "Lisa Anderson",
      patientId: "P003",
      doctor: "Dr. Emily Chen",
      testType: "Urinalysis",
      tests: ["Protein", "Glucose", "Ketones"],
      status: "Pending",
      priority: "Normal",
      resultsDate: null,
      technician: null
    },
    {
      id: "LO004",
      orderDate: "2024-10-17",
      patient: "Emma Davis",
      patientId: "P004",
      doctor: "Dr. Robert Smith",
      testType: "Microbiology",
      tests: ["Blood Culture", "Urine Culture"],
      status: "Completed",
      priority: "High",
      resultsDate: "2024-10-19",
      technician: "Mike Wilson"
    }
  ];

  const labResults = [
    {
      id: "LR001",
      orderId: "LO001",
      patient: "Sarah Johnson",
      testName: "Blood Glucose",
      result: "95 mg/dL",
      normalRange: "70-100 mg/dL",
      status: "Normal",
      date: "2024-10-20",
      technician: "John Smith"
    },
    {
      id: "LR002",
      orderId: "LO001",
      patient: "Sarah Johnson",
      testName: "Cholesterol",
      result: "180 mg/dL",
      normalRange: "<200 mg/dL",
      status: "Normal",
      date: "2024-10-20",
      technician: "John Smith"
    },
    {
      id: "LR003",
      orderId: "LO001",
      patient: "Sarah Johnson",
      testName: "HbA1c",
      result: "6.2%",
      normalRange: "<7%",
      status: "Normal",
      date: "2024-10-20",
      technician: "John Smith"
    },
    {
      id: "LR004",
      orderId: "LO004",
      patient: "Emma Davis",
      testName: "Blood Culture",
      result: "Negative",
      normalRange: "Negative",
      status: "Normal",
      date: "2024-10-19",
      technician: "Mike Wilson"
    }
  ];

  const filteredOrders = labOrders.filter(order => {
    const matchesSearch = !searchTerm || 
      order.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesTestType = selectedTestType === "all" || order.testType === selectedTestType;
    
    return matchesSearch && matchesStatus && matchesTestType;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-success-light text-success";
      case "in progress":
        return "bg-warning-light text-warning";
      case "pending":
        return "bg-primary-light text-primary";
      case "cancelled":
        return "bg-destructive-light text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-destructive-light text-destructive";
      case "medium":
        return "bg-warning-light text-warning";
      case "normal":
        return "bg-success-light text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getResultStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-success-light text-success";
      case "abnormal":
        return "bg-destructive-light text-destructive";
      case "critical":
        return "bg-destructive-light text-destructive";
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
            <h1 className="text-3xl font-bold">Lab Orders & Results</h1>
            <p className="text-muted-foreground">Manage laboratory tests and results</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              New Order
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <h3 className="text-3xl font-bold mt-2">{labOrders.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {labOrders.filter(o => o.status === "Completed").length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {labOrders.filter(o => o.status === "In Progress").length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-warning-light flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {labOrders.filter(o => o.status === "Pending").length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Lab Orders</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="pending">Pending Tests</TabsTrigger>
          </TabsList>

          {/* Lab Orders Tab */}
          <TabsContent value="orders">
            <Card className="shadow-md border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Laboratory Orders</CardTitle>
                    <CardDescription>All laboratory test orders</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedTestType} onValueChange={setSelectedTestType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Test Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {testTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                            <Activity className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{order.patient}</h3>
                            <p className="text-sm text-muted-foreground">
                              ID: {order.patientId} • Ordered by {order.doctor}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <Badge className={getPriorityColor(order.priority)}>
                            {order.priority} Priority
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Test Type</Label>
                            <p className="text-sm text-muted-foreground">{order.testType}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Tests Ordered</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {order.tests.map((test, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {test}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Order Date</Label>
                            <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                          </div>
                          {order.resultsDate && (
                            <div>
                              <Label className="text-sm font-medium">Results Date</Label>
                              <p className="text-sm text-muted-foreground">{order.resultsDate}</p>
                            </div>
                          )}
                          {order.technician && (
                            <div>
                              <Label className="text-sm font-medium">Technician</Label>
                              <p className="text-sm text-muted-foreground">{order.technician}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {order.status === "Completed" && (
                          <Button size="sm" variant="outline">
                            View Results
                          </Button>
                        )}
                        {order.status === "Pending" && (
                          <Button size="sm" variant="outline">
                            Start Test
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Print Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Lab Results</CardTitle>
                <CardDescription>Completed laboratory test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-success" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{result.patient}</h3>
                            <p className="text-sm text-muted-foreground">
                              Test: {result.testName} • Order: {result.orderId}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getResultStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                          <Badge variant="outline">{result.date}</Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Result</Label>
                            <p className="text-lg font-semibold">{result.result}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Normal Range</Label>
                            <p className="text-sm text-muted-foreground">{result.normalRange}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Test Date</Label>
                            <p className="text-sm text-muted-foreground">{result.date}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Technician</Label>
                            <p className="text-sm text-muted-foreground">{result.technician}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          View Full Report
                        </Button>
                        <Button size="sm" variant="outline">
                          Print Result
                        </Button>
                        <Button size="sm" variant="outline">
                          Email to Doctor
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Tests Tab */}
          <TabsContent value="pending">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Pending Tests</CardTitle>
                <CardDescription>Tests awaiting processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labOrders.filter(order => order.status === "Pending").map((order) => (
                    <div
                      key={order.id}
                      className="p-6 rounded-lg border border-primary/20 bg-primary/5"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                            <Clock className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{order.patient}</h3>
                            <p className="text-sm text-muted-foreground">
                              ID: {order.patientId} • Ordered by {order.doctor}
                            </p>
                          </div>
                        </div>
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority} Priority
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Test Type</Label>
                            <p className="text-sm text-muted-foreground">{order.testType}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Tests Ordered</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {order.tests.map((test, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {test}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Order Date</Label>
                            <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Expected Completion</Label>
                            <p className="text-sm text-muted-foreground">
                              {new Date(new Date(order.orderDate).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="hero">
                          Start Processing
                        </Button>
                        <Button size="sm" variant="outline">
                          Assign Technician
                        </Button>
                        <Button size="sm" variant="outline">
                          View Order Details
                        </Button>
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

export default LabOrders;
