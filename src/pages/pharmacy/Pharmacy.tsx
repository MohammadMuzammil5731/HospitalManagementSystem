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
  Pill, 
  Search, 
  Filter, 
  Plus, 
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShoppingCart,
  Package,
  FileText,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const categories = [
    "Antibiotics", "Pain Relief", "Cardiovascular", "Diabetes", 
    "Respiratory", "Gastrointestinal", "Neurological", "Vitamins"
  ];

  const medications = [
    {
      id: "M001",
      name: "Metformin",
      genericName: "Metformin HCl",
      category: "Diabetes",
      dosageForm: "Tablet",
      strength: "500mg",
      manufacturer: "Generic Pharma",
      stockQuantity: 150,
      minStockLevel: 50,
      unitPrice: 0.25,
      expiryDate: "2025-12-31",
      status: "In Stock"
    },
    {
      id: "M002",
      name: "Lisinopril",
      genericName: "Lisinopril",
      category: "Cardiovascular",
      dosageForm: "Tablet",
      strength: "10mg",
      manufacturer: "CardioMed",
      stockQuantity: 25,
      minStockLevel: 30,
      unitPrice: 0.45,
      expiryDate: "2025-08-15",
      status: "Low Stock"
    },
    {
      id: "M003",
      name: "Amoxicillin",
      genericName: "Amoxicillin",
      category: "Antibiotics",
      dosageForm: "Capsule",
      strength: "250mg",
      manufacturer: "AntibioCorp",
      stockQuantity: 0,
      minStockLevel: 20,
      unitPrice: 0.35,
      expiryDate: "2024-11-30",
      status: "Out of Stock"
    },
    {
      id: "M004",
      name: "Aspirin",
      genericName: "Acetylsalicylic Acid",
      category: "Pain Relief",
      dosageForm: "Tablet",
      strength: "81mg",
      manufacturer: "PainFree Inc",
      stockQuantity: 200,
      minStockLevel: 100,
      unitPrice: 0.15,
      expiryDate: "2026-03-20",
      status: "In Stock"
    }
  ];

  const prescriptions = [
    {
      id: "RX001",
      prescriptionId: "RX001",
      patient: "Sarah Johnson",
      patientId: "P001",
      doctor: "Dr. Emily Chen",
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      durationDays: 30,
      instructions: "Take with food",
      prescribedDate: "2024-10-15",
      status: "Active",
      quantity: 60
    },
    {
      id: "RX002",
      prescriptionId: "RX002",
      patient: "Michael Brown",
      patientId: "P002",
      doctor: "Dr. Robert Smith",
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      durationDays: 30,
      instructions: "Take in the morning",
      prescribedDate: "2024-10-16",
      status: "Fulfilled",
      quantity: 30
    },
    {
      id: "RX003",
      prescriptionId: "RX003",
      patient: "Lisa Anderson",
      patientId: "P003",
      doctor: "Dr. Emily Chen",
      medication: "Amoxicillin",
      dosage: "250mg",
      frequency: "Three times daily",
      durationDays: 7,
      instructions: "Take with water",
      prescribedDate: "2024-10-18",
      status: "Pending",
      quantity: 21
    }
  ];

  const filteredMedications = medications.filter(med => {
    const matchesSearch = !searchTerm || 
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || med.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || med.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in stock":
        return "bg-success-light text-success";
      case "low stock":
        return "bg-warning-light text-warning";
      case "out of stock":
        return "bg-destructive-light text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPrescriptionStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-primary-light text-primary";
      case "fulfilled":
        return "bg-success-light text-success";
      case "pending":
        return "bg-warning-light text-warning";
      case "cancelled":
        return "bg-destructive-light text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStockStatus = (quantity: number, minLevel: number) => {
    if (quantity === 0) return "Out of Stock";
    if (quantity <= minLevel) return "Low Stock";
    return "In Stock";
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pharmacy Management</h1>
            <p className="text-muted-foreground">Manage medications and prescriptions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Medication
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Medications</p>
                  <h3 className="text-3xl font-bold mt-2">{medications.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {medications.filter(m => m.status === "In Stock").length}
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
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {medications.filter(m => m.status === "Low Stock").length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-warning-light flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {medications.filter(m => m.status === "Out of Stock").length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-destructive-light flex items-center justify-center">
                  <Package className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card className="shadow-md border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Medication Inventory</CardTitle>
                    <CardDescription>Manage medication stock levels</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search medications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
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
                        <SelectItem value="in stock">In Stock</SelectItem>
                        <SelectItem value="low stock">Low Stock</SelectItem>
                        <SelectItem value="out of stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMedications.map((medication) => (
                    <div
                      key={medication.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                            <Pill className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{medication.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {medication.genericName} • {medication.strength} {medication.dosageForm}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(medication.status)}>
                            {medication.status}
                          </Badge>
                          <Badge variant="outline">{medication.category}</Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Stock Quantity</Label>
                            <p className="text-2xl font-bold">{medication.stockQuantity}</p>
                            <p className="text-sm text-muted-foreground">
                              Min Level: {medication.minStockLevel}
                            </p>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                medication.stockQuantity === 0 ? 'bg-destructive' :
                                medication.stockQuantity <= medication.minStockLevel ? 'bg-warning' : 'bg-success'
                              }`}
                              style={{ 
                                width: `${Math.min((medication.stockQuantity / (medication.minStockLevel * 2)) * 100, 100)}%` 
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Manufacturer</Label>
                            <p className="text-sm text-muted-foreground">{medication.manufacturer}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Unit Price</Label>
                            <p className="text-sm font-medium">${medication.unitPrice}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Expiry Date</Label>
                            <p className="text-sm text-muted-foreground">{medication.expiryDate}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Days Until Expiry</Label>
                            <p className={`text-sm font-medium ${
                              new Date(medication.expiryDate).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000
                                ? 'text-warning' : 'text-success'
                            }`}>
                              {Math.ceil((new Date(medication.expiryDate).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))} days
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Total Value</Label>
                            <p className="text-lg font-semibold">
                              ${(medication.stockQuantity * medication.unitPrice).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          Update Stock
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit Details
                        </Button>
                        {medication.status === "Out of Stock" && (
                          <Button size="sm" variant="hero">
                            Reorder
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View History
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Prescriptions</CardTitle>
                <CardDescription>Manage patient prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{prescription.patient}</h3>
                            <p className="text-sm text-muted-foreground">
                              ID: {prescription.patientId} • Prescribed by {prescription.doctor}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPrescriptionStatusColor(prescription.status)}>
                            {prescription.status}
                          </Badge>
                          <Badge variant="outline">{prescription.prescriptionId}</Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Medication</Label>
                            <p className="text-sm font-medium">{prescription.medication}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Dosage & Frequency</Label>
                            <p className="text-sm text-muted-foreground">
                              {prescription.dosage} • {prescription.frequency}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Instructions</Label>
                            <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Prescribed Date</Label>
                            <p className="text-sm text-muted-foreground">{prescription.prescribedDate}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Duration</Label>
                            <p className="text-sm text-muted-foreground">{prescription.durationDays} days</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Quantity</Label>
                            <p className="text-sm font-medium">{prescription.quantity} units</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        {prescription.status === "Pending" && (
                          <Button size="sm" variant="hero">
                            Fulfill Prescription
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Print Label
                        </Button>
                        {prescription.status === "Active" && (
                          <Button size="sm" variant="outline">
                            Refill
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>Manage medication orders and suppliers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create purchase orders to restock medications
                  </p>
                  <Button variant="hero" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Pharmacy;
