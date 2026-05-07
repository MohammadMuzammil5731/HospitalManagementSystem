import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Search, 
  Filter, 
  Plus, 
  Download,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  FileText,
  Calendar,
  User,
  Receipt
} from "lucide-react";
import { Link } from "react-router-dom";

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");

  const invoices = [
    {
      id: "INV001",
      invoiceNumber: "INV-2024-001",
      patient: "Sarah Johnson",
      patientId: "P001",
      date: "2024-10-20",
      dueDate: "2024-11-19",
      amount: 1250.00,
      paidAmount: 1250.00,
      balance: 0.00,
      status: "Paid",
      paymentMethod: "Insurance",
      items: [
        { description: "Consultation", quantity: 1, unitPrice: 150.00, total: 150.00 },
        { description: "Lab Tests", quantity: 3, unitPrice: 75.00, total: 225.00 },
        { description: "Medications", quantity: 2, unitPrice: 87.50, total: 175.00 },
        { description: "Room Charges", quantity: 2, unitPrice: 350.00, total: 700.00 }
      ]
    },
    {
      id: "INV002",
      invoiceNumber: "INV-2024-002",
      patient: "Michael Brown",
      patientId: "P002",
      date: "2024-10-19",
      dueDate: "2024-11-18",
      amount: 850.00,
      paidAmount: 425.00,
      balance: 425.00,
      status: "Partial",
      paymentMethod: "Cash",
      items: [
        { description: "Emergency Visit", quantity: 1, unitPrice: 200.00, total: 200.00 },
        { description: "X-Ray", quantity: 2, unitPrice: 125.00, total: 250.00 },
        { description: "Medications", quantity: 1, unitPrice: 100.00, total: 100.00 },
        { description: "Follow-up", quantity: 1, unitPrice: 300.00, total: 300.00 }
      ]
    },
    {
      id: "INV003",
      invoiceNumber: "INV-2024-003",
      patient: "Lisa Anderson",
      patientId: "P003",
      date: "2024-10-18",
      dueDate: "2024-11-17",
      amount: 450.00,
      paidAmount: 0.00,
      balance: 450.00,
      status: "Pending",
      paymentMethod: "Insurance",
      items: [
        { description: "Consultation", quantity: 1, unitPrice: 150.00, total: 150.00 },
        { description: "Lab Tests", quantity: 2, unitPrice: 75.00, total: 150.00 },
        { description: "Prescription", quantity: 1, unitPrice: 150.00, total: 150.00 }
      ]
    },
    {
      id: "INV004",
      invoiceNumber: "INV-2024-004",
      patient: "Emma Davis",
      patientId: "P004",
      date: "2024-10-17",
      dueDate: "2024-11-16",
      amount: 2100.00,
      paidAmount: 0.00,
      balance: 2100.00,
      status: "Overdue",
      paymentMethod: "Insurance",
      items: [
        { description: "Surgery", quantity: 1, unitPrice: 1500.00, total: 1500.00 },
        { description: "Anesthesia", quantity: 1, unitPrice: 300.00, total: 300.00 },
        { description: "Room Charges", quantity: 3, unitPrice: 100.00, total: 300.00 }
      ]
    }
  ];

  const payments = [
    {
      id: "PAY001",
      invoiceId: "INV001",
      patient: "Sarah Johnson",
      amount: 1250.00,
      paymentMethod: "Insurance",
      paymentDate: "2024-10-20",
      reference: "INS-2024-001",
      status: "Completed"
    },
    {
      id: "PAY002",
      invoiceId: "INV002",
      patient: "Michael Brown",
      amount: 425.00,
      paymentMethod: "Cash",
      paymentDate: "2024-10-19",
      reference: "CASH-001",
      status: "Completed"
    },
    {
      id: "PAY003",
      invoiceId: "INV003",
      patient: "Lisa Anderson",
      amount: 450.00,
      paymentMethod: "Credit Card",
      paymentDate: "2024-10-21",
      reference: "CC-2024-001",
      status: "Processing"
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = !searchTerm || 
      invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || invoice.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesPaymentMethod = selectedPaymentMethod === "all" || invoice.paymentMethod.toLowerCase() === selectedPaymentMethod.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-success-light text-success";
      case "partial":
        return "bg-warning-light text-warning";
      case "pending":
        return "bg-primary-light text-primary";
      case "overdue":
        return "bg-destructive-light text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-success-light text-success";
      case "processing":
        return "bg-warning-light text-warning";
      case "failed":
        return "bg-destructive-light text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0);
  const totalOutstanding = invoices.reduce((sum, invoice) => sum + invoice.balance, 0);
  const overdueAmount = invoices.filter(inv => inv.status === "Overdue").reduce((sum, invoice) => sum + invoice.balance, 0);

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Billing & Payments</h1>
            <p className="text-muted-foreground">Manage invoices, payments, and financial records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <h3 className="text-3xl font-bold mt-2">${totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                  <h3 className="text-3xl font-bold mt-2">${totalOutstanding.toLocaleString()}</h3>
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
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <h3 className="text-3xl font-bold mt-2">${overdueAmount.toLocaleString()}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-destructive-light flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paid Invoices</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {invoices.filter(inv => inv.status === "Paid").length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card className="shadow-md border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Invoices</CardTitle>
                    <CardDescription>Manage patient billing and invoices</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search invoices..."
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
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="credit card">Credit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                            <Receipt className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{invoice.patient}</h3>
                            <p className="text-sm text-muted-foreground">
                              {invoice.invoiceNumber} • ID: {invoice.patientId}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                          <Badge variant="outline">{invoice.paymentMethod}</Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Invoice Date</Label>
                            <p className="text-sm text-muted-foreground">{invoice.date}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Due Date</Label>
                            <p className="text-sm text-muted-foreground">{invoice.dueDate}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Total Amount</Label>
                            <p className="text-lg font-semibold">${invoice.amount.toFixed(2)}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Paid Amount</Label>
                            <p className="text-sm text-success">${invoice.paidAmount.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Balance</Label>
                            <p className={`text-lg font-semibold ${
                              invoice.balance > 0 ? 'text-destructive' : 'text-success'
                            }`}>
                              ${invoice.balance.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Items</Label>
                            <p className="text-sm text-muted-foreground">{invoice.items.length} items</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Print Invoice
                        </Button>
                        {invoice.balance > 0 && (
                          <Button size="sm" variant="hero">
                            Record Payment
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Payment Records</CardTitle>
                <CardDescription>Track all payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-success" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{payment.patient}</h3>
                            <p className="text-sm text-muted-foreground">
                              Payment ID: {payment.id} • Invoice: {payment.invoiceId}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPaymentStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                          <Badge variant="outline">{payment.paymentMethod}</Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Amount</Label>
                            <p className="text-lg font-semibold">${payment.amount.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Payment Date</Label>
                            <p className="text-sm text-muted-foreground">{payment.paymentDate}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Reference</Label>
                            <p className="text-sm text-muted-foreground">{payment.reference}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Method</Label>
                            <p className="text-sm text-muted-foreground">{payment.paymentMethod}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          View Receipt
                        </Button>
                        <Button size="sm" variant="outline">
                          Print Receipt
                        </Button>
                        {payment.status === "Processing" && (
                          <Button size="sm" variant="outline">
                            Update Status
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Generate and view financial reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Revenue Report</h3>
                        <p className="text-sm text-muted-foreground">Monthly revenue analysis</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </div>

                  <div className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-warning-light flex items-center justify-center">
                        <Clock className="h-6 w-6 text-warning" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Outstanding Report</h3>
                        <p className="text-sm text-muted-foreground">Pending payments</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </div>

                  <div className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Payment Summary</h3>
                        <p className="text-sm text-muted-foreground">Payment methods analysis</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Generate Report
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

export default Billing;
