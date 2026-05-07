import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Eye, Edit, Trash2, Printer, Plus, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import realClinicAPI from '@/services/realApi';
import PrescriptionForm from './PrescriptionForm';
import PrescriptionView from './PrescriptionView';

interface Prescription {
  _id: string;
  prescriptionId: string;
  patient: {
    _id: string;
    firstName: string;
    lastName: string;
    patientId: string;
  };
  doctor: {
    _id: string;
    firstName: string;
    lastName: string;
    specialization: string;
  };
  diagnosis: {
    primary: string;
    secondary?: string[];
  };
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    quantity: number;
    instructions?: string;
  }>;
  status: 'active' | 'completed' | 'cancelled' | 'modified';
  createdAt: string;
  updatedAt: string;
}

const PrescriptionList: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await realClinicAPI.getPrescriptions();
      setPrescriptions(response.prescriptions || []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      toast.error('Failed to fetch prescriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrescription = async (id: string) => {
    try {
      await realClinicAPI.deletePrescription(id);
      toast.success('Prescription deleted successfully');
      fetchPrescriptions();
    } catch (error) {
      console.error('Error deleting prescription:', error);
      toast.error('Failed to delete prescription');
    }
  };

  const handlePrintPrescription = async (id: string) => {
    try {
      await realClinicAPI.printPrescription(id);
      toast.success('Prescription marked as printed');
      fetchPrescriptions();
    } catch (error) {
      console.error('Error printing prescription:', error);
      toast.error('Failed to print prescription');
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.prescriptionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.diagnosis.primary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'modified':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading prescriptions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Prescriptions</h2>
          <p className="text-muted-foreground">Manage patient prescriptions</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPrescription(null)}>
              <Plus className="h-4 w-4 mr-2" />
              New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPrescription ? 'Edit Prescription' : 'Create New Prescription'}
              </DialogTitle>
              <DialogDescription>
                {editingPrescription ? 'Update prescription details' : 'Fill in the prescription details for the patient'}
              </DialogDescription>
            </DialogHeader>
            <PrescriptionForm
              prescription={editingPrescription}
              onSuccess={() => {
                setIsFormOpen(false);
                setEditingPrescription(null);
                fetchPrescriptions();
              }}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingPrescription(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search prescriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="modified">Modified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Prescription List</CardTitle>
          <CardDescription>
            {filteredPrescriptions.length} prescription(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prescription ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Medications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription._id}>
                  <TableCell className="font-medium">
                    {prescription.prescriptionId}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {prescription.patient.firstName} {prescription.patient.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ID: {prescription.patient.patientId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48 truncate">
                      {prescription.diagnosis.primary}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {prescription.medications.length} medication(s)
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(prescription.status)}>
                      {prescription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPrescription(prescription)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Prescription Details</DialogTitle>
                            <DialogDescription>
                              View prescription information and print
                            </DialogDescription>
                          </DialogHeader>
                          {selectedPrescription && (
                            <PrescriptionView
                              prescription={selectedPrescription}
                              onPrint={() => handlePrintPrescription(selectedPrescription._id)}
                              onClose={() => setIsViewOpen(false)}
                            />
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPrescription(prescription);
                          setIsFormOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrintPrescription(prescription._id)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Prescription</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this prescription? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeletePrescription(prescription._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionList;
